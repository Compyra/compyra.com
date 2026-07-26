# Bistro De Peerdeblomme — Website TODO

New static website for **Bistro De Peerdeblomme**, a pancake & waffle bistro in
Assebroek (Brugge, Belgium). Rebuilt from the old Webnode site with modern,
SEO-first, dependency-free static HTML/CSS/JS. Designed to be hosted for free on
GitHub Pages (a `CNAME` is included).

## Business facts (verified from the old site)

- **Name:** Bistro De Peerdeblomme _(West-Flemish for "paardenbloem" = dandelion 🌼)_
- **Owners:** Jan & Melina (welcoming guests from 2026 in a fully renovated interior)
- **Setting:** "In het mooie ver Assebroek, aan de rand van de fietsroute en oude
  spoorwegbedding" — on the cycling route & old railway bed
- **Address:** Weidestraat 313, 8310 Assebroek (Brugge)
- **Phone:** 0478 77 06 01 → `+32478770601`
- **E-mail:** depeerdeblomme.assebroek@gmail.com
- **Facebook:** https://www.facebook.com/profile.php?id=61583527708566
- **VAT / BTW:** BE 1030.795.442
- **Specialties:** pannenkoeken, Belgische wafels, ijs, wekelijkse lunch
- **Opening hours:** Wed–Sun 11:00–19:00 · **closed Mon & Tue**
  - Kitchen open from 12:00 · Pancakes/waffles from 14:00 · Kitchen closes 17:30
- **Coordinates used (approx.):** 51.191, 3.253 — ⚠️ verify exact lat/long

## Done ✅

### Structure & files
- [x] `index.html` — single-page site (hero, over ons, specialiteiten, menu,
      fotogalerij, uren, contact)
- [x] `css/style.css` — token-driven, warm dandelion theme, dark-mode aware, responsive
- [x] `js/main.js` — progressive enhancement only (mobile nav, scroll header,
      "today" highlight + live open/closed status, gallery lightbox). Works 100% without JS.
- [x] `privacy/index.html` — GDPR-friendly privacy page
- [x] `404.html` — friendly branded not-found page
- [x] `robots.txt`, `sitemap.xml` (with image sitemap), `site.webmanifest`, `CNAME`

### Personal touches & real content (from the client)
- [x] Owner welcome from **Jan & Melina** in hero + "Over ons" (renovated interior, 2026)
- [x] Location story: on the cycling route & old railway bed in Assebroek
- [x] "Dagelijks open van 11u tot 19u voor een gezellige lunch, een pannenkoek,
      ijsje of een lekkere wafel" featured in the Menu section
- [x] Full NAP + VAT shown: Weidestraat 313 · 8310 Assebroek · 0478/77.06.01 ·
      depeerdeblomme.assebroek@gmail.com · BTW BE 1030.795.442
- [x] **20 photos** downloaded from the old fotogalerij, optimized (max 1400px, q82,
      ~5 MB total) into `media/gallery/` and shown in a masonry gallery + lightbox
- [x] Terrace photo used as hero background and as `media/og-image.jpg` (1200×630)
- [x] **Menu PDF** in `data/menu-de-peerdeblomme.pdf` with a download button
- [x] Facebook linked for the **weekly lunchmenu** (hero, specialiteiten, menu, contact)

### SEO (genius-level, on-page)
- [x] Localized `<title>` + meta description targeting "pannenkoeken Assebroek / wafels Brugge"
- [x] Canonical URL, `lang="nl-BE"`, keywords, author, robots directives
- [x] Open Graph + Twitter Card tags
- [x] Geo meta tags (`geo.region`, `geo.position`, `ICBM`)
- [x] **Restaurant JSON-LD** structured data (address, geo, hours, cuisine, phone,
      VAT, founders Jan & Melina, `hasMenu` PDF, image gallery, `sameAs` Facebook,
      `acceptsReservations`) — enables rich results & Google Maps
- [x] Semantic HTML5 landmarks, single `<h1>`, logical heading order
- [x] Accessible: skip link, ARIA labels, focus-visible, `prefers-reduced-motion`,
      keyboard-navigable lightbox (Esc / arrows), descriptive image alt text
- [x] Fast: no framework, system+Google font only, optimized + lazy-loaded images,
      preloaded hero image, image sitemap

### Design
- [x] Cozy bistro identity built around the dandelion ("peerdeblomme") story
- [x] Warm palette (dandelion yellow / cream / bistro green), Fraunces + Nunito Sans
- [x] Real terrace hero, quick-info strip, specialty cards, menu panel, photo
      gallery + lightbox, hours table, contact + map
- [x] Mobile-first responsive, hamburger menu, floating call button on mobile

## To do — needs real content / assets ⏳

- [ ] **More/better photos & captions** — the gallery uses 12 of the 20 downloaded
      photos; swap or reorder to taste, and refine alt text where the subject is a
      guess (e.g. specific dishes).
- [ ] **Real favicon / app icons** — swap the emoji SVG favicon for a proper logo
      (PNG 192/512 + `favicon.ico`) and update `site.webmanifest`.
- [ ] **Verify exact GPS coordinates** for the schema, geo meta and OpenStreetMap
      marker (current values are approximate for Weidestraat 313).
- [ ] **Menu** — a `Menu` type could be added to the JSON-LD with dishes & prices if
      a structured menu is desired (currently a downloadable PDF + Facebook lunchmenu).
- [ ] **Google Business Profile** — claim/verify it and match the NAP (name, address,
      phone) exactly to the schema for local SEO.
- [ ] **Confirm hours/holidays** and add `specialOpeningHoursSpecification` for
      holidays/closures if needed.
- [ ] **Reviews** — if you collect ratings, add `aggregateRating`/`review` to schema.

## To do — technical / deploy

- [ ] Point DNS for `www.depeerdeblomme.be` (and apex) to the host; `CNAME` is set for
      GitHub Pages. Enable HTTPS.
- [ ] Submit `sitemap.xml` in Google Search Console + Bing Webmaster Tools.
- [ ] Test the Restaurant structured data in Google's Rich Results Test.
- [ ] Run Lighthouse (aim 100 SEO / Accessibility / Best Practices).
- [ ] Optional: cookie-free analytics (e.g. self-hosted Plausible) — none added yet.
- [ ] Optional: contact form (old site had one) via a static form service
      (Formspree/Netlify Forms) — currently uses direct tel/e-mail links instead.

## Notes

- Text is in Dutch (Flemish) to match the local audience. Add an English/French
  version only if there's demand — would need `hreflang` tags.
- The old site's contact page contained leftover **template placeholder data**
  (Amsterdam address, +31 phone). That was ignored — only the real Assebroek NAP is used.
