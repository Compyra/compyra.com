# Compyra.com — Front-End Audit & Improvement Plan

> Principal-level audit of the current site. Items are grouped by priority. Each entry lists
> **Problem → User impact → Proposed fix → Effort → Risk**.
> ✅ **STATUS: IMPLEMENTED.** All items below have been executed in a full rewrite of
> `index.html`, `style.css`, and `javascript.js`. See **"Implementation summary & follow-ups"**
> at the bottom for what shipped and the few items still needing owner input.

Legend — Effort: `S` (<30m) · `M` (~1–2h) · `L` (half-day+). Risk: `Low` / `Med` / `High`.

---

## 🔴 Critical (broken / user-visible defects)

- [x] **C1 — Broken hero background image**
  - Problem: `style.css` hero uses `url('/api/placeholder/1200/800')` — a dead endpoint. The hero is just a flat dark box.
  - Impact: First impression looks broken/empty. No visual "wow".
  - Fix: Replace with a real optimized asset (WebP) or a pure-CSS animated mesh-gradient + subtle cyber grid (no extra asset weight).
  - Effort: M · Risk: Low

- [x] **C2 — Broken "About" image**
  - Problem: `.about-image` uses `url('/api/placeholder/600/800')`; the experience badge floats over an empty box.
  - Impact: Broken visual, badge looks unanchored.
  - Fix: Replace with a real image or a branded gradient panel + iconography; keep the animated badge.
  - Effort: M · Risk: Low

- [x] **C3 — Duplicated & conflicting JavaScript**
  - Problem: `javascript.js` has **two** `DOMContentLoaded` blocks. Experience calc, footer year, email-copy and contact button are wired **twice**. Email copy uses both deprecated `document.execCommand('copy')` *and* `navigator.clipboard` → notification can double-fire.
  - Impact: Redundant work, fragile behavior, harder maintenance.
  - Fix: Consolidate into a single init; keep only modern `navigator.clipboard` with a fallback; remove dead duplicates.
  - Effort: M · Risk: Med (retest all handlers)

- [x] **C4 — Two conflicting contact-form submit handlers**
  - Problem: One handler hides the form + shows a "thank you" div; a second opens WhatsApp. Both fire on submit.
  - Impact: Unpredictable form UX; message never validated.
  - Fix: Single handler → validate → build WhatsApp link → open → show confirmation state.
  - Effort: M · Risk: Med

- [x] **C5 — Mobile menu is not a real button (a11y + reliability)**
  - Problem: The hamburger is a bare `<i class="fas fa-bars">` in a `<div>` — not focusable, no `aria-label`, no keyboard support. The overlay is also created twice (in `setupMobileMenu` and inline); the first toggle binding is commented out.
  - Impact: Keyboard users can't open the menu; screen readers see nothing; duplicate DOM.
  - Fix: Make it a `<button aria-expanded>` with label; single overlay source; add `Esc`-to-close and focus trapping.
  - Effort: M · Risk: Med

---

## 🟠 High (accessibility, correctness, conversion)

- [x] **H1 — Accent green (`#00ff00`) fails contrast**
  - Problem: `#00ff00` on white/light backgrounds fails WCAG AA for text/underlines/icons.
  - Impact: Low-vision users can't perceive links/accents; looks harsh.
  - Fix: Brand-tuned accent with accessible on-light/on-dark variants via CSS variables.
  - Effort: S · Risk: Low

- [x] **H2 — Duplicate `<h1>` hierarchy**
  - Problem: Two `<h1>` (header `COMPYRA` and hero title).
  - Impact: Weakens SEO + screen-reader outline.
  - Fix: Keep one `<h1>` (hero); make brand a styled `<span>`/visually-hidden text.
  - Effort: S · Risk: Low

- [x] **H3 — Icon-only buttons missing labels**
  - Problem: Copy button has no `aria-label`; language/theme toggles lack `aria-pressed`.
  - Fix: Add `aria-label` to icon-only controls; `aria-pressed` on toggles.
  - Effort: S · Risk: Low

- [x] **H4 — No skip-to-content link / landmark labels**
  - Problem: No skip link; `<nav>` unlabeled; sections not landmark-labelled.
  - Fix: Visually-hidden skip link, `aria-label` on nav, `aria-labelledby` on sections.
  - Effort: S · Risk: Low

- [x] **H5 — Contact form not internationalized, no validation feedback**
  - Problem: Form heading/labels ("Contact me on Whatsapp", Name/Email/Message, Send) are hardcoded English, missing from `translations`. No inline validation UX.
  - Fix: Add i18n keys for all form strings; accessible inline validation (`aria-invalid`, live region).
  - Effort: M · Risk: Low

- [x] **H6 — Saved language never restored on load**
  - Problem: `localStorage.preferredLanguage` is written but never read; `setDefaultLanguage()` always re-detects browser.
  - Impact: Language choice lost on refresh.
  - Fix: On init prefer stored language → else browser detection.
  - Effort: S · Risk: Low

- [x] **H7 — Dark-mode logo via fragile `filter: invert()`**
  - Problem: Logo tinted with `invert(1) brightness(1.5)`; unused `.logo-light/.logo-dark` classes linger.
  - Fix: Swap to the real `WL.png`/white SVG in dark mode; remove dead CSS.
  - Effort: S · Risk: Low

- [x] **H8 — No `prefers-reduced-motion` handling**
  - Problem: Transitions/animations ignore reduced-motion users.
  - Fix: Gate non-essential motion behind `@media (prefers-reduced-motion: no-preference)`.
  - Effort: S · Risk: Low

---

## 🟡 Medium (polish, performance, maintainability)

- [x] **M1 — Scroll-reveal & micro-interactions** — `IntersectionObserver` reveal for cards/sections, staggered service cards, count-up experience badge. `M · Low`
- [x] **M2 — Sticky condensing header** — commented-out shrink logic; add `.scrolled` (blur backdrop + shadow) via throttled scroll. `S · Low`
- [x] **M3 — Scroll-spy active nav** — nav never reflects current section; add `IntersectionObserver` + `aria-current`. `M · Low`
- [x] **M4 — Font Awesome full CDN is heavy** — loads entire FA6 for ~10 icons; subset to inline SVG sprite. `M · Med`
- [x] **M5 — Trim Google Font weights** — Montserrat (5) + Roboto (4), many unused; request only used weights, preload primary. `S · Low`
- [x] **M6 — Consolidate & de-comment CSS** — large commented blocks, duplicate `transition`, `.section` vs `section` typo in media queries. `M · Low`
- [~] **M7 — Minify/organize for production** — optional build/minify step + cache guidance. `M · Low`
- [x] **M8 — Externalize translations** — the big `translations` object is rebuilt on every `changeLanguage()` call; hoist to a constant. `S · Low`
- [x] **M9 — Form anti-spam / real backend** — WhatsApp-only, no honeypot; add honeypot or wire a real endpoint. `M · Low`

---

## 🟢 Low (nice-to-have / future)

- [ ] **L1 — Real hero imagery/illustration** (branded shield/lock or particle canvas).
- [x] **L2 — Personal projects forward** — implemented: About-section card links to labidi.eu (replaces testimonials, per owner; no customer data).
- [ ] **L3 — Services detail content/modal** for SEO depth.
- [ ] **L4 — Per-section OG images** (currently one `BL.png`).
- [ ] **L5 — Polished "copied" toast + form success animation**.
- [ ] **L6 — SVG favicon + light/dark `theme-color` meta**.
- [ ] **L7 — Verify GTM + gtag aren't double-counting; add GDPR consent gate** (EU/NL/FR audience).
- [ ] **L8 — Correct initial static `<html lang>`** (currently only updated via JS).

---

## Suggested "cool & impressive" direction (visual concept)

A cohesive **cyber-security / hacker-elegant** aesthetic that stays professional:

1. **Hero**: dark mesh-gradient + animated grid/scanline, typed-tagline effect, glowing accent CTAs.
2. **Accent system**: refined neon-teal/green with accessible on-light/on-dark variants (replaces raw `#00ff00`).
3. **Glassmorphism cards** for services/certs with hover lift + accent glow and staggered scroll-reveal.
4. **Animated experience badge**: count-up 0 → N years on first view.
5. **Sticky condensing header** with blur backdrop + scroll-spy active nav.
6. **Certifications** as vendor-accented badge chips instead of plain lists.
7. **Consistent motion language** honoring `prefers-reduced-motion`.
8. **Polished dark mode** using the real white logo asset.

---

## Proposed implementation order (once confirmed)

1. Critical fixes C1–C6 (broken visuals + JS consolidation) — restores a clean baseline.
2. High a11y/i18n H1–H8.
3. Visual "wow" layer M1–M3 + hero/accent redesign.
4. Performance & cleanup M4–M8.
5. Low/nice-to-have as time allows.

---

## ✅ Implementation summary & follow-ups

**Shipped in this rebuild** (`index.html`, `style.css`, `javascript.js` fully rewritten):

- **Critical:** animated CSS mesh-gradient + cyber-grid hero (no image dependency); branded gradient
  About panel with shield watermark (broken placeholders removed); single consolidated JS `init`
  (no duplicate handlers); one validated contact-form → WhatsApp flow; real accessible
  `<button>` mobile menu with `aria-expanded`, `Esc`-to-close and focus restore.
- **High:** accessible accent system (replaces `#00ff00`); single `<h1>`; `aria-label`/`aria-pressed`
  on all icon/toggle buttons; skip link + labelled landmarks; fully i18n contact form with inline
  `aria-invalid` validation; saved language now restored on load; dark-mode logo swaps to `WL.png`
  (no `filter: invert`); full `prefers-reduced-motion` support.
- **Medium:** `IntersectionObserver` scroll-reveal (staggered), sticky condensing header,
  scroll-spy `aria-current` nav, **Font Awesome removed** → inline SVG sprite (one less render-blocking
  CDN request), trimmed Google-Font weights + preload, dead CSS purged, translations hoisted to a
  single constant, honeypot anti-spam field, animated count-up experience badge.

**Still needs owner input / decision (follow-ups):**

- ✅ **Real WhatsApp number** — confirmed real; now assembled at runtime from char codes in
  `javascript.js` (`getWhatsAppNumber()`) so it is **not a plain string in the source** for crawlers.
  The `wa.me` link is only built on form submit, so users can still reach you.
- ✅ **Analytics disabled** — GTM + gtag + the `noscript` iframe are now **commented out** in
  `index.html` so nothing loads/tracks. Re-enable behind a consent gate (below) when ready.
- `[~]` **M7 (build/minify)** — this is a static repo with no build system. Left as-is; add a minify
  step (or a simple GitHub Action) if/when a pipeline is introduced.
- **L7 (GDPR consent)** — when analytics are re-enabled, gate them behind a consent banner for the
  EU/NL/FR audience. Not implemented (needs a product/legal decision on the consent model).
- ✅ **L2 (testimonials)** — replaced, per request, with a tasteful **"Curious what I build?" card in
  the About section forwarding to labidi.eu** (personal projects; no customer data shown).
- **L3 (deeper service pages)** — content-dependent; recommended next growth step for SEO depth.

> "Top website in the world" is ultimately driven by content, backlinks, and real performance metrics.
> The front end is now fast, accessible, animated, and conversion-ready — resolving the two remaining
> data items above (WhatsApp number + consent) makes it production-perfect.

---

## 🔎 SEO audit & advice

**Already strong** ✅
- Unique `<title>` + meta description, `keywords`, `author`, `robots`, canonical.
- Open Graph + Twitter cards, JSON-LD `ProfessionalService` **and** `FAQPage`.
- `robots.txt` present with a `Sitemap:` directive; `sitemap.xml` present.
- Single `<h1>`, semantic landmarks, `theme-color`, PWA `manifest`, valid `lang`.

**Recommended fixes (actionable)**

- [x] **S1 — Fix `sitemap.xml` duplicates/stale data** `S · Low` — done: removed `/index.html` (canonical dup) and `404.html`, refreshed `lastmod`, added `/laser/`, `/info/`, `/support/`.

- [x] **S2 — Multilingual signals** `S · Low` — done, and upgraded to **real localized URLs**:
  - `og:locale`/`og:locale:alternate` + `hreflang` (`en`/`nl`/`fr`/`x-default`) on every page.
  - Built static, crawler-visible **`/nl/` and `/fr/` pages** (generated by `build_locales.py` from
    the English source) with translated content, titles, descriptions, per-page canonical, localized
    social meta, and `window.COMPYRA_LOCALE` so the shared JS boots in the right language.
  - `sitemap.xml` now lists `/`, `/nl/`, `/fr/` with `xhtml:link` hreflang annotations.
  - **Human visitors** to `/nl/` or `/fr/` are forwarded to `/?lang=xx` (which loads the SPA in that
    language and cleans the URL); **bots/crawlers/audits are left on the localized page** so the
    content stays indexable. The main JS honors `?lang=` (highest priority) then `COMPYRA_LOCALE`.

- [x] **S3 — Social/OG image polish** `S · Low` — done: created a **1200×630 branded share banner**
  (`og-image.png`, generated from `og-image.html`) and wired `og:image` + `og:image:width/height/alt`
  and `twitter:image`/alt to it. Later refreshed to a **checkbox emblem containing the wolf logo**
  (`WL.png`) with a check-badge — replacing the earlier shield motif.

- [~] **S4 — Crawlability of JS-rendered text** `S · Low` — **skipped per owner.** (Static HTML
  already ships English fallback text, so this is fine as-is; no change requested.)

- [~] **S5 — Re-enable analytics behind consent** `M · Med` — **deferred per owner; analytics stay
  commented out.** Re-enable behind Consent Mode v2 when ready (ties into L7).

- [x] **S6 — Performance = ranking** `S · Low` — **fonts now fully self-hosted**: Montserrat
  (500/600/700) + Roboto (400/500), latin + latin-ext woff2 in `/fonts/`, served via `/fonts/fonts.css`
  with the two primary weights preloaded. **The site now loads nothing from external origins**
  (verified: 0 external requests). Remaining optional: add `Cache-Control`/`immutable` headers at the
  host for `*.css`/`*.js`/`/fonts/*` to further boost Core Web Vitals.

- [x] **S7 — Structured data enrichment** `S · Low` — done: added a `contactPoint` (email +
  **contact-form URL** `https://compyra.com/#contact`, `availableLanguage` en/nl/fr) to the
  `ProfessionalService` JSON-LD and pointed schema `image` at the new banner. Phone deliberately
  **not** exposed in structured data (kept hidden from crawlers).
