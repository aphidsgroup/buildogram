#!/usr/bin/env bash
# ============================================================================
# Buildogram — preview verification runner (items 6–9 of the owner brief)
# Usage:  BASE="https://<preview-url>" bash seo-growth/preview-verification.sh
# Optional (Vercel Deployment Protection):
#   export VERCEL_PROTECTION_BYPASS="<token>"   (preferred)  or  export BYPASS="<token>"
#   export VERCEL_PROTECTION_COOKIE_FILE="<temporary-cookie-jar>"
# Authentication is sent only as a bypass header or from the temporary cookie
# jar. Credentials are never echoed, written to a .tsv, or placed in a URL.
# Output:  seo-growth/preview-results/*.tsv  (paste into 20-…md)
# Read-only: performs GET/HEAD requests only.
# ============================================================================
set -uo pipefail
export LC_ALL=C.utf8
BASE="${BASE:?set BASE to the preview URL, no trailing slash}"
OUT="seo-growth/preview-results"; mkdir -p "$OUT"
CURL=(curl -sS --max-time 30)
# Accept either variable name; VERCEL_PROTECTION_BYPASS wins.
BYPASS="${VERCEL_PROTECTION_BYPASS:-${BYPASS:-}}"
COOKIE_FILE="${VERCEL_PROTECTION_COOKIE_FILE:-}"
if [ -n "$BYPASS" ]; then
  CURL+=(-H "x-vercel-protection-bypass: ${BYPASS}")
  echo "[auth] protection bypass header enabled (token redacted, ${#BYPASS} chars)"
fi
if [ -n "$COOKIE_FILE" ]; then
  [ -r "$COOKIE_FILE" ] || { echo "[auth] cookie file is not readable" >&2; exit 2; }
  CURL+=(-b "$COOKIE_FILE")
  echo "[auth] temporary protection cookie enabled (contents redacted)"
fi
# Guard: never let the token reach stdout or any output file.
redact() { if [ -n "$BYPASS" ]; then sed "s/${BYPASS//\//\\/}/[REDACTED]/g"; else cat; fi; }

fetch() { "${CURL[@]}" -L "$BASE$1"; }
field() { grep -oiPm1 "$2" <<<"$1" | head -1; }

# ── 0. Preview protection check (item 5 evidence) ───────────────────────────
echo -e "check\tresult" > "$OUT/00-protection.tsv"
code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$BASE/")
echo -e "unauthenticated_status\t$code" >> "$OUT/00-protection.tsv"
echo -e "x_robots_tag\t$(curl -sSI --max-time 20 "$BASE/" | grep -i '^x-robots-tag' | tr -d '\r')" >> "$OUT/00-protection.tsv"
# Vercel SSO protection answers with a 302 to vercel.com/login, not 401/403.
loc=$(curl -sSI --max-time 20 "$BASE/" | grep -i '^location:' | tr -d '\r' | cut -d' ' -f2-)
case "$code:$loc" in
  401:*|403:*)            prot="PROTECTED (HTTP $code)";;
  30[0-9]:*vercel.com/*)  prot="PROTECTED (HTTP $code -> Vercel SSO login)";;
  200:*)                  prot="UNPROTECTED (HTTP 200) - preview is publicly reachable";;
  *)                      prot="UNKNOWN (HTTP $code)";;
esac
echo -e "protection_verdict\t$prot" >> "$OUT/00-protection.tsv"
echo "[0] protection: $prot"

if [ -z "$BYPASS" ] && [ -z "$COOKIE_FILE" ] && [[ "$prot" == PROTECTED* ]]; then
  cat >&2 <<'ABORT'

=============================================================================
ABORTED — the preview is behind Vercel Deployment Protection and no bypass
token was supplied. No application verification has been attempted.

Configure a Protection Bypass for Automation secret locally and re-run. Never
print, commit, or place the secret in a URL.
=============================================================================

ABORT
  exit 2
fi

# ABORT GUARD — if the authenticated fetch still lands on Vercel's login page,
# every downstream section would silently measure vercel.com instead of the app.
probe=$(fetch / 2>/dev/null)
probe="${probe:0:4000}"
case "$probe" in
  *"Log in to Vercel"*|*"vercel.com/login"*|*"Authentication Required"*)
    cat >&2 <<'ABORT'

=============================================================================
ABORTED — the preview is behind Vercel Deployment Protection and no working
bypass token was supplied. Requests are being answered by vercel.com/login.

Any results written now would describe Vercel's login page, not Buildogram.
That is worse than no evidence, so nothing further will be written.

Fix, then re-run:
  Vercel -> Project -> Settings -> Deployment Protection -> Protection Bypass
  for Automation -> copy the secret, then:

  VERCEL_PROTECTION_BYPASS="<secret>" BASE="<preview-url>" \
    bash seo-growth/preview-verification.sh

Alternatively disable protection for this one preview and re-run without a
token. Do not disable it for production.
=============================================================================

ABORT
    exit 2;;
esac

# ── 1. Route families (item 6) ──────────────────────────────────────────────
URLS=(
 /services/villa-construction /services/boq-review /services/turnkey-construction
 /materials/aggregates /materials/paint /materials/roofing
 /guides/what-is-boq-in-construction /guides/how-to-compare-contractor-quotes /guides/why-low-construction-quote-can-be-risky
 /glossary/rmc /glossary/boq /glossary/sbc
 /faqs/construction /faqs/boq /faqs/plan-review
 /compare/buildogram-vs-contractor /compare/pmc-vs-turnkey-construction /compare/boq-review-vs-contractor-estimate
 /partners/builders
 /locations/chennai/velachery /locations/chennai/adyar
 /construction-in-chennai /quality-system /boq-review-chennai /
)
printf 'url\tstatus\tfinal_url\tcanonical\trobots\ttitle\tdescription\th1\tbody_chars\tjsonld_types\tinternal_links\n' > "$OUT/01-routes.tsv"
for u in "${URLS[@]}"; do
  st=$("${CURL[@]}" -o /dev/null -w '%{http_code}' -L "$BASE$u")
  fin=$("${CURL[@]}" -o /dev/null -w '%{url_effective}' -L "$BASE$u")
  html=$(fetch "$u")
  can=$(grep -oPm1 '<link[^>]+rel="canonical"[^>]+href="\K[^"]+' <<<"$html")
  rob=$(grep -oPm1 '<meta[^>]+name="robots"[^>]+content="\K[^"]+' <<<"$html")
  ti=$(grep -oPm1 '<title[^>]*>\K[^<]+' <<<"$html")
  de=$(grep -oPm1 '<meta[^>]+name="description"[^>]+content="\K[^"]+' <<<"$html")
  h1=$(grep -oPm1 '<h1[^>]*>\K[^<]+' <<<"$html")
  body=$(sed 's/<[^>]*>//g' <<<"$html" | tr -s ' \n' ' ' | wc -c)
  types=$(grep -oP '"@type"\s*:\s*"\K[^"]+' <<<"$html" | sort -u | paste -sd, -)
  links=$(grep -oP 'href="/[^"]*"' <<<"$html" | sort -u | wc -l)
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$u" "$st" "$fin" "$can" "$rob" "$ti" "$de" "$h1" "$body" "$types" "$links" >> "$OUT/01-routes.tsv"
done
echo "[1] routes -> $OUT/01-routes.tsv  (classify each row manually: Substantial/Useful/Thin/Templated/Duplicate/BusinessVerification/NoindexCandidate/MergeCandidate)"

# ── 2. Redirects (item 7) — record ACTUAL status (Next emits 308) ───────────
declare -A R=(
 [/villa-construction]=/build/villa-construction
 [/apartment-structural-audit-chennai]=/structural-audit-chennai
 [/material-quotes]=/materials/request-quote
 [/materials/ready-mix-concrete]=/materials/rmc
 [/steel-fabrication-contractors-chennai]=/steel-construction-chennai
 [/warehouse-steel-building-chennai]=/industrial-shed-construction-chennai
 [/factory-shed-construction-chennai]=/industrial-shed-construction-chennai
 [/verified-contractors-chennai]=/partners/contractors
)
printf 'source\tactual_status\thops\tchain\tfinal_url\texpected_dest\tdest_status\tdest_canonical\n' > "$OUT/02-redirects.tsv"
for s in "${!R[@]}"; do
  first=$("${CURL[@]}" -o /dev/null -w '%{http_code}' "$BASE$s")
  chain=$("${CURL[@]}" -I -L "$BASE$s" | grep -ci '^HTTP/')
  fin=$("${CURL[@]}" -o /dev/null -w '%{url_effective}' -L "$BASE$s")
  dst=$("${CURL[@]}" -o /dev/null -w '%{http_code}' -L "$BASE$s")
  redirect_html=$(fetch "$s")
  can=$(grep -oPm1 'rel="canonical"[^>]+href="\K[^"]+' <<<"$redirect_html")
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$s" "$first" "$((chain-1))" "$chain" "$fin" "${R[$s]}" "$dst" "$can" >> "$OUT/02-redirects.tsv"
done
echo "[2] redirects -> $OUT/02-redirects.tsv  (PASS = 301/308, hops=1, dest 200, self-canonical)"

# ── 3. Sitemap (item 8) — status-check EVERY url ────────────────────────────
fetch /sitemap.xml > "$OUT/sitemap.xml"
if grep -oP '<loc>\K[^<]+' "$OUT/sitemap.xml" > "$OUT/sitemap-urls.txt" 2>/dev/null && [ -s "$OUT/sitemap-urls.txt" ]; then :; else
  # Git Bash for Windows often ships grep without PCRE. sed works everywhere.
  sed -n 's|.*<loc>\([^<]*\)</loc>.*|\1|p' "$OUT/sitemap.xml" > "$OUT/sitemap-urls.txt"
fi
sort -o "$OUT/sitemap-urls.txt" "$OUT/sitemap-urls.txt"
total=$(wc -l < "$OUT/sitemap-urls.txt"); uniq=$(sort -u "$OUT/sitemap-urls.txt" | wc -l)
{ echo -e "metric\tvalue"
  echo -e "sitemap_http\t$("${CURL[@]}" -o /dev/null -w '%{http_code}' "$BASE/sitemap.xml")"
  if command -v xmllint >/dev/null 2>&1; then
    echo -e "xml_wellformed\t$(xmllint --noout "$OUT/sitemap.xml" 2>&1 && echo yes || echo NO)"
  else
    # No xmllint (common on Git Bash for Windows). Fall back to a structural check.
    if head -c 200 "$OUT/sitemap.xml" | grep -q '<urlset' && grep -q '</urlset>' "$OUT/sitemap.xml"; then
      echo -e "xml_wellformed\tprobably (xmllint unavailable; urlset open+close found)"
    else
      echo -e "xml_wellformed\tNO (xmllint unavailable; urlset tags missing)"
    fi
  fi
  echo -e "total_urls\t$total"; echo -e "unique_urls\t$uniq"; echo -e "duplicates\t$((total-uniq))"
  echo -e "non_www_hosts\t$(grep -vc '^https://www\.buildogram\.in' "$OUT/sitemap-urls.txt")"
  echo -e "preview_domain_urls\t$(grep -c 'vercel\.app' "$OUT/sitemap-urls.txt")"
  echo -e "demo_partner_urls\t$(grep -c '/partners/demo-' "$OUT/sitemap-urls.txt")"
} > "$OUT/03-sitemap-summary.tsv"
printf 'url\tstatus\n' > "$OUT/03-sitemap-status.tsv"
while read -r u; do
  p="${u#https://www.buildogram.in}"
  printf '%s\t%s\n' "$u" "$("${CURL[@]}" -o /dev/null -w '%{http_code}' "$BASE$p")" >> "$OUT/03-sitemap-status.tsv"
done < "$OUT/sitemap-urls.txt"
echo "[3] sitemap -> $OUT/03-sitemap-*.tsv  (PASS = every url 200, 0 duplicates, 0 non-www, 0 preview-domain, 0 demo-*)"

# ── 4. Rendered claim / domain / encoding scan (item 9) ─────────────────────
PAT='500\+ Project|₹12\.8Cr|₹2\.1Cr|₹50Cr\+|18% *(Average|Avg)|10-Year (Partner )?Warranty|8–15%|8-15%|starts around ₹10,000|certified pilots|Verified Partner Network|vetted|screened|certified structural engineer|licensed structural engineer|qualified structural engineer|2500\+|2,500\+|up to 2,?500|500\+ QC|[Pp]ile foundations are mandatory|prone to flooding|high water table|Live Rates|current Chennai market|\+91-XXXXXXXXXX|600000|info@buildogram\.in|app\.buildogram\.com|buildogram\.com|â‚¹|â€“|â€”|Â·'
printf 'url\tmatch\tcontext\n' > "$OUT/04-claim-scan.tsv"
SCAN=( / /about /construction-in-chennai /locations/chennai /locations/chennai/velachery /locations/chennai/adyar /locations/chennai/pallikaranai /structural-audit-chennai /boq-review-chennai /quality-system /materials /partners/builders /land-survey-chennai /drone-survey-chennai )
for u in "${SCAN[@]}"; do
  scan_html=$(fetch "$u")
  grep -ohiE "$PAT" <<<"$scan_html" | sort -u | while read -r m; do
    printf '%s\t%s\tsee rendered HTML\n' "$u" "$m" >> "$OUT/04-claim-scan.tsv"
  done
done
hits=$(($(wc -l < "$OUT/04-claim-scan.tsv")-1))
echo "[4] claim scan -> $OUT/04-claim-scan.tsv  (PASS = 0 rows; found: $hits)"

# ── 5. Route-specific metadata (Sprint 2) ───────────────────────────────────
# Verifies the shared-metadata-helper rewiring: every URL must emit its OWN
# canonical / og:url / og:title, never the homepage defaults.
META=( /glossary/rcc /glossary/rmc /glossary/boq
       /faqs/boq /faqs/materials /faqs/plan-review
       /guides/what-is-boq-in-construction /guides/boq-checklist-for-homeowners /guides/how-to-compare-contractor-quotes
       /materials/cement /materials/tmt-steel /materials/rmc
       /services/boq-review /services/house-construction /services/quality-inspection
       /compare/boq-review-vs-contractor-estimate
       /proof /boq-calculator )
printf 'url\tstatus\tcanonical\tog_url\tog_title\ttwitter_title\trobots\ttitle\th1\tverdict\n' > "$OUT/05-metadata.tsv"
metafail=0
for u in "${META[@]}"; do
  body=$("${CURL[@]}" -L "$BASE$u" 2>/dev/null)
  st=$("${CURL[@]}" -o /dev/null -w '%{http_code}' -L "$BASE$u" 2>/dev/null)
  can=$(printf '%s' "$body" | grep -o '<link rel="canonical" href="[^"]*"' | head -1 | sed 's/.*href="//;s/"//')
  ogu=$(printf '%s' "$body" | grep -o '<meta property="og:url" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"//')
  ogt=$(printf '%s' "$body" | grep -o '<meta property="og:title" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"//')
  twt=$(printf '%s' "$body" | grep -o '<meta name="twitter:title" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"//')
  rob=$(printf '%s' "$body" | grep -o '<meta name="robots" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"//')
  ttl=$(printf '%s' "$body" | grep -o '<title>[^<]*' | head -1 | sed 's/<title>//')
  h1=$(printf '%s' "$body" | grep -o '<h1[^>]*>[^<]*' | head -1 | sed 's/<h1[^>]*>//')
  v="PASS"
  # canonical must be absolute, www, and end with this exact path
  case "$can" in "https://www.buildogram.in$u") ;; *) v="FAIL:canonical";; esac
  # og:url must equal canonical — never the bare homepage
  [ "$ogu" != "$can" ] && v="FAIL:og_url"
  # og:title must not be the homepage default
  case "$ogt" in *"Engineer-Led Construction Intelligence"*) v="FAIL:og_title_is_homepage";; esac
  # nothing may leak a preview host
  case "$can$ogu" in *vercel.app*) v="FAIL:preview_host_leak";; esac
  [ "$st" != "200" ] && v="FAIL:status_$st"
  [ "$v" != "PASS" ] && metafail=$((metafail+1))
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$u" "$st" "$can" "$ogu" "$ogt" "$twt" "$rob" "$ttl" "$h1" "$v" | redact >> "$OUT/05-metadata.tsv"
done
echo "[5] metadata -> $OUT/05-metadata.tsv  (PASS = 0 failures; found: $metafail)"

# ── 6. Stale-cache detection (production only) ──────────────────────────────
# Production has twice served pre-release HTML on bare canonical paths while the
# same path with a query string served current content. Status codes do not
# reveal this — only a content comparison does.
# Skipped automatically on preview (nothing is cached there yet).
case "$BASE" in
  *www.buildogram.in*)
    CACHE=( / /glossary/rcc /glossary/rmc /faqs/boq /guides/what-is-boq-in-construction
            /materials/cement /materials/tmt-steel /services/boq-review
            /compare/boq-review-vs-contractor-estimate /boq-calculator )
    printf 'url\tbare_status\tbare_bytes\tbusted_bytes\tbare_ogurl\tbusted_ogurl\tverdict\n' > "$OUT/06-cache.tsv"
    stale=0
    for u in "${CACHE[@]}"; do
      b=$("${CURL[@]}" -L "$BASE$u" 2>/dev/null)
      q=$("${CURL[@]}" -L "$BASE$u?cachebust=$RANDOM$$" 2>/dev/null)
      bs=$("${CURL[@]}" -o /dev/null -w '%{http_code}' -L "$BASE$u" 2>/dev/null)
      bl=$(printf '%s' "$b" | wc -c); ql=$(printf '%s' "$q" | wc -c)
      bo=$(printf '%s' "$b" | grep -o '<meta property="og:url" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"//')
      qo=$(printf '%s' "$q" | grep -o '<meta property="og:url" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"//')
      # allow a small delta for the cachebust param echoed into the page
      diff=$(( bl > ql ? bl - ql : ql - bl ))
      v="FRESH"
      [ "$bs" != "200" ] && v="FAIL:bare_status_$bs"
      [ "$diff" -gt 200 ] && v="STALE:content_differs_${diff}b"
      [ -n "$bo" ] && [ "$bo" != "$qo" ] && v="STALE:og_url_differs"
      [ "$v" != "FRESH" ] && stale=$((stale+1))
      printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$u" "$bs" "$bl" "$ql" "$bo" "$qo" "$v" >> "$OUT/06-cache.tsv"
    done
    echo "[6] cache -> $OUT/06-cache.tsv  (PASS = 0 stale; found: $stale)"
    [ "$stale" -gt 0 ] && echo "    ACTION: purge the CDN, then re-run. Do NOT mark production verified."
    ;;
  *) echo "[6] cache check skipped (preview)";;
esac

echo
echo "DONE. Paste results into seo-growth/20-post-deployment-verification.md §§5–8 and seo-growth/execution/11-preview-validation.md."
