# 't Zwarte Veld — Website Redesign TODO

A modern, fast, mobile-first redesign of the **Restaurant · Tearoom · Feestzaal 't Zwarte Veld** website (Oedelem, België).
Original site: https://www.zwarteveld.eu/

---

## ✅ Business facts (gathered from the live site)

- **Name:** 't Zwarte Veld — Restaurant · Tearoom · Feestzaal
- **Owners:** Sylvie & Angelo (+ Tiamo, Ilany & team)
- **Address:** Knesselarestraat 180, 8730 Oedelem (Beernem), West-Vlaanderen, België
- **Phone:** 0492 68 77 40 (oude lijn: 050 54 44 46)
- **E-mail:** info@zwarteveld.eu · sylvie@zwarteveld.eu
- **Openingsuren:**
  - Vrijdag: vanaf 17u00
  - Zaterdag: vanaf 11u45
  - Zondag: vanaf 11u45
  - Andere dagen: open voor groepen, feesten & rouwmaaltijden (op reservatie)
- **Sinds:** 19 december 2003
- **Kindvriendelijk:** speelhoek, speeltuin, springkasteel, trampoline, kindermenu's.
  In 2009 verkozen tot één van de 60 kindvriendelijke restaurants van Vlaanderen.
- **Terras:** april t.e.m. september
- **Diensten:** restaurant, tearoom (pannenkoeken, wafels, ijscoupes), feestzaal,
  afhaalmaaltijden (20% korting), communie/lentefeest, rouwmaaltijden, dansavonden
- **Socials:** Facebook

---

## 🎯 Goals

- [x] Modern, warm, appetising design (mobile-first, works on all devices)
- [x] Excellent technical SEO (semantic HTML, meta tags, Open Graph, JSON-LD)
- [x] Fast: no heavy frameworks, vanilla HTML/CSS/JS, lazy-loaded images
- [x] Accessible (WCAG): landmarks, alt text, focus states, reduced-motion support
- [x] Dutch language content (nl-BE)
- [x] Reuse the **authentic text** from the old site (story, hours, route, actie)
- [x] Reuse the **original images** from the old site

---

## 📦 Files created

- [x] `index.html` — one-page site with all sections + JSON-LD structured data
- [x] `style.css` — responsive design system, dark-friendly palette
- [x] `script.js` — mobile nav, smooth scroll, scroll-spy, reveal animations, open/closed badge
- [x] `robots.txt` — crawler rules
- [x] `sitemap.xml` — sitemap
- [x] `site.webmanifest` — PWA manifest
- [x] `todo.md` — this file

---

## 🖼️ Assets

Reused directly from the original site (downloaded into `/img`):

- [x] `img/fotobouw.jpg` — panoramic exterior (used as hero background + feestzaal photo)
- [x] `img/11.jpg` — terrace photo (used in "Over ons")

Still nice to add from the owner (higher-res / more variety):

- [ ] `logo.svg` / `logo.png` — real restaurant logo (currently a styled "ZV" monogram)
- [ ] Plated-dish photos for a small gallery
- [ ] Interior / feestzaal / speelhoek photos
- [ ] `og-image.jpg` 1200×630 (currently points to the live `fotobouw.jpg`)
- [ ] `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
- [ ] Note: `1 maart 2025.jpg` (dansavond) was referenced on the old site but returns 404 — ask owner for it

> Menu PDFs are linked live from zwarteveld.eu on the Menu section.

---

## 🔧 Follow-ups / nice-to-haves

- [ ] Replace the placeholder Google Maps embed key/coords if a business account is used
- [ ] Wire the contact form to a backend (Formspree / Netlify Forms / mail script)
- [ ] Add real photos and compress them (WebP/AVIF) for performance
- [ ] Register domain + set CNAME, add analytics (privacy-friendly, e.g. Plausible)
- [ ] Verify NAP (name/address/phone) consistency with Google Business Profile
- [ ] Add reviews/testimonials section once collected
