# Performance Audit Report
**Date**: 2026-06-07
**Target**: Buildogram Public Pages

## Core Web Vitals Risks
1. **LCP (Largest Contentful Paint)**:
   - Hero sections on Homepage and Services pages may load unoptimized images without the `priority` attribute.
   - Client-side rendering of the main page (`'use client'` in `page.js`) delays the HTML streaming, severely impacting LCP on slower devices.
2. **CLS (Cumulative Layout Shift)**:
   - Missing `width` and `height` attributes on `<img ... />` tags across the site (`about`, `partners`, `case-studies`, etc.).
   - Mega menu opens might cause unexpected DOM shifts on mobile if not absolutely positioned correctly.
3. **INP (Interaction to Next Paint)**:
   - Heavy JavaScript bundle size due to top-level `'use client'` on primary hubs. This locks the main thread during hydration, causing sluggish tap responses on mobile.
   - The Floating Reel Player iframe loads immediately and may contend with main thread execution.

## Media & Bundle Size
- **Oversized JS**: `src/app/page.js` and `PublicServicePage.js` are currently client components. This pulls massive amounts of React hooks and context into the initial bundle unnecessarily.
- **Images**: 7 distinct files use raw `<img>` instead of `next/image`, skipping Next.js's native WebP optimization and resizing.

## Layout & A11y Polish
- Floating reel may overlap floating action buttons (like WhatsApp or Call) on narrow mobile screens.
- Mobile tap targets in the mega-menu and footer need sufficient padding (44px x 44px minimum).

## Recommended Actions
1. Convert `src/app/page.js` and `PublicServicePage` to Server Components.
2. Replace all `<img>` with `<Image>` from `next/image`.
3. Defer `FloatingReelPlayer` using dynamic imports or `useEffect`.
4. Ensure Mega Menu DOM is lightweight on mobile.
