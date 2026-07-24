#!/usr/bin/env bash
# ============================================================================
# Buildogram — preview verification runner (items 6–9 of the owner brief)
# Usage:  BASE="https://<preview-url>" bash seo-growth/preview-verification.sh
# Optional (Vercel Deployment Protection): export BYPASS="<protection-bypass-token>"
# Output:  seo-growth/preview-results/*.tsv  (paste into 20-…md)
# Read-only: performs GET/HEAD requests only.
# ============================================================================
set -uo pipefail
BASE="${BASE:?set BASE to the preview URL, no trailing slash}"
OUT="seo-growth/preview-results"; mkdir -p "$OUT"
CURL=(curl -sS --max-time 30)
[ -n "${BYPASS:-}" ] && CURL+=(-H "x-vercel-protection-bypass: ${BYPASS}")

fetch() { "${CURL[@]}" -L "$BASE$1"; }
field() { grep -oiPm1 "$2" <<<"$1" | head -1; }

# ── 0. Preview protection check (item 5 evidence) ───────────────────────────
echo -e "check\tresult" > "$OUT/00-protection.tsv"
code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$BASE/")
echo -e "unauthenticated_status\t$code" >> "$OUT/00-protection.tsv"
echo -e "x_robots_tag\t$(curl -sSI --max-time 20 "$BASE/" | grep -i '^x-robots-tag' | tr -d '\r')" >> "$OUT/00-protection.tsv"
echo "[0] protection: HTTP $code (401/403 = protected)"

# ── 1. Route families (item 6) ──────────────────────────────────────────────
URLS=(
 /services/villa-construction /services/boq-review /services/turnkey-construction
 /materials/aggregates /materials/paint /materials/roofing
 /guides/what-is-boq-in-construction /guides/how-to-compare-contractor-quotes /guides/why-low-construction-quote-can-be-risky
 /glossary/rmc /glossary/boq /glossary/sbc
 /faqs/construction-cost /faqs/boq-and-quotes /faqs/structural-audit
 /compare/boq-review-vs-contractor-quote /compare/turnkey-vs-labour-contract /compare/rcc-vs-steel
 /partners/demo-builder
 /locations/chennai/velachery /locations/chennai/adyar
 /construction-in-chennai /quality-system /boq-review-chennai /
)
printf 'url\tstatus\tfinal_url\tcanonical\trobots\ttitle\tdescription\th1\tbody_chars\tjsonld_types\tinternal_links\n' > "$OUT/01-routes.tsv"
for u in "${URLS[@]}"; do
  st=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 30 "$BASE$u")
  fin=$(curl -sS -o /dev/null -w '%{url_effective}' -L --max-time 30 "$BASE$u")
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
  first=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$s")
  chain=$(curl -sSI -L --max-time 30 "$BASE$s" | grep -ci '^HTTP/')
  fin=$(curl -sS -o /dev/null -w '%{url_effective}' -L --max-time 30 "$BASE$s")
  dst=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 30 "$BASE$s")
  can=$(fetch "$s" | grep -oPm1 'rel="canonical"[^>]+href="\K[^"]+')
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$s" "$first" "$((chain-1))" "$chain" "$fin" "${R[$s]}" "$dst" "$can" >> "$OUT/02-redirects.tsv"
done
echo "[2] redirects -> $OUT/02-redirects.tsv  (PASS = 301/308, hops=1, dest 200, self-canonical)"

# ── 3. Sitemap (item 8) — status-check EVERY url ────────────────────────────
fetch /sitemap.xml > "$OUT/sitemap.xml"
grep -oP '<loc>\K[^<]+' "$OUT/sitemap.xml" | sort > "$OUT/sitemap-urls.txt"
total=$(wc -l < "$OUT/sitemap-urls.txt"); uniq=$(sort -u "$OUT/sitemap-urls.txt" | wc -l)
{ echo -e "metric\tvalue"
  echo -e "sitemap_http\t$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/sitemap.xml")"
  echo -e "xml_wellformed\t$(xmllint --noout "$OUT/sitemap.xml" 2>&1 && echo yes || echo NO)"
  echo -e "total_urls\t$total"; echo -e "unique_urls\t$uniq"; echo -e "duplicates\t$((total-uniq))"
  echo -e "non_www_hosts\t$(grep -vc '^https://www\.buildogram\.in' "$OUT/sitemap-urls.txt")"
  echo -e "preview_domain_urls\t$(grep -c 'vercel\.app' "$OUT/sitemap-urls.txt")"
  echo -e "demo_partner_urls\t$(grep -c '/partners/demo-' "$OUT/sitemap-urls.txt")"
} > "$OUT/03-sitemap-summary.tsv"
printf 'url\tstatus\n' > "$OUT/03-sitemap-status.tsv"
while read -r u; do
  p="${u#https://www.buildogram.in}"
  printf '%s\t%s\n' "$u" "$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$p")" >> "$OUT/03-sitemap-status.tsv"
done < "$OUT/sitemap-urls.txt"
echo "[3] sitemap -> $OUT/03-sitemap-*.tsv  (PASS = every url 200, 0 duplicates, 0 non-www, 0 preview-domain, 0 demo-*)"

# ── 4. Rendered claim / domain / encoding scan (item 9) ─────────────────────
PAT='500\+ Project|₹12\.8Cr|₹2\.1Cr|₹50Cr\+|18% *(Average|Avg)|10-Year (Partner )?Warranty|8–15%|8-15%|starts around ₹10,000|certified pilots|Verified Partner Network|vetted|screened|certified structural engineer|licensed structural engineer|qualified structural engineer|2500\+|2,500\+|up to 2,?500|500\+ QC|[Pp]ile foundations are mandatory|prone to flooding|high water table|Live Rates|current Chennai market|\+91-XXXXXXXXXX|600000|info@buildogram\.in|app\.buildogram\.com|buildogram\.com|â‚¹|â€“|â€”|Â·'
printf 'url\tmatch\tcontext\n' > "$OUT/04-claim-scan.tsv"
SCAN=( / /about /construction-in-chennai /locations/chennai /locations/chennai/velachery /locations/chennai/adyar /locations/chennai/pallikaranai /structural-audit-chennai /boq-review-chennai /quality-system /materials /partners/builders /land-survey-chennai /drone-survey-chennai )
for u in "${SCAN[@]}"; do
  fetch "$u" | grep -ohiE "$PAT" | sort -u | while read -r m; do
    printf '%s\t%s\tsee rendered HTML\n' "$u" "$m" >> "$OUT/04-claim-scan.tsv"
  done
done
hits=$(($(wc -l < "$OUT/04-claim-scan.tsv")-1))
echo "[4] claim scan -> $OUT/04-claim-scan.tsv  (PASS = 0 rows; found: $hits)"
echo
echo "DONE. Paste results into seo-growth/20-post-deployment-verification.md §§5–8."
