# 't Friet-uurtje Oedelem — Website TODO

Eenpagina-website (Nederlands/Vlaams) voor het fastfoodrestaurant / frituur
**'t Friet-uurtje** in Oedelem (Beernem). Focus op **lokale SEO**,
**contactgegevens** en een **mobielvriendelijke, appetijtelijke** uitstraling.

---

## Bedrijfsgegevens (bron: Facebook + Visit Beernem + OpeningsurenGids + one2three)

| Veld | Waarde | Status |
|------|--------|--------|
| Naam | 't Friet-uurtje | ✅ |
| Type | Frituur / Fastfoodrestaurant | ✅ |
| Adres | Knesselarestraat 69a, 8730 Oedelem (Beernem), België | ✅ |
| Telefoon | 0456 22 43 19 | ⚠️ verifiëren |
| E-mail | friet.uurtje.oedelem@gmail.com | ✅ |
| Website | tfrietuurtje-oedelem.be | ✅ |
| Online bestellen | one2three.app/tfrietuurtjeoedelem/menu | ✅ |
| Facebook | facebook.com/p/T-Friet-uurtje-100063503712482 | ✅ |

> ⚠️ **Telefoonnummer verifiëren.** Facebook vermeldt `0456 22 43 19`,
> OpeningsurenGids vermeldt `0496 28 43 25`. Nummer op de site (en in de
> structured data) bevestigen met de uitbater vóór livegang.

---

## ⚠️ Nog te bevestigen door de uitbater (BLOKKEREND vóór livegang)

- [ ] **Openingsuren** — op OpeningsurenGids stonden ze enkel als afbeelding
      (niet leesbaar). Huidige uren in `index.html` + JSON-LD zijn een
      **placeholder** en MOETEN nagekeken worden.
- [ ] **Correct telefoonnummer** (zie hierboven).
- [ ] **Echte foto's** van de zaak, de frietjes/snacks en het team
      (nu placeholders / CSS-illustraties).
- [ ] **Actuele prijzen** — menu-highlights zijn overgenomen van one2three
      (kan verouderd zijn).
- [ ] **Vakantie-/sluitingsdagen** en feestdagregeling.
- [ ] **Betaalmiddelen** (cash, Bancontact, Payconiq …) bevestigen.

---

## ✅ Gedaan

- [x] Projectmap `frietUurtjeOedelem/` aangemaakt in `workshop/`.
- [x] Bedrijfsinfo verzameld uit de opgegeven bronnen.
- [x] `index.html` — semantische, toegankelijke eenpagina-structuur:
      hero, USP-balk, menu-highlights, online bestellen, over ons,
      openingsuren, contact + kaart, footer.
- [x] `style.css` — mobiel-eerst, warme frituur-huisstijl (rood/goud/houtskool),
      donker/licht respecteert `prefers-color-scheme`, nette animaties.
- [x] `script.js` — mobiel menu, smooth scroll, scroll-reveal, "vandaag open"
      indicator, actief-navigatie highlight, jaar in footer.
- [x] **SEO**: unieke title/description, canonical, Open Graph + Twitter cards,
      geo-meta, `LocalBusiness`/`FastFoodRestaurant` JSON-LD met adres, geo,
      telefoon, openingsuren, menu- en bestel-URL.
- [x] Sticky "Bel ons" / "Bestel online" actieknoppen op mobiel.
- [x] `robots.txt`, `sitemap.xml`, `site.webmanifest`, `404.html`.
- [x] Toegankelijkheid: skip-link, aria-labels, focus-states, alt-teksten,
      voldoende kleurcontrast, `prefers-reduced-motion` respect.

---

## 🔜 Nog te doen (verbeteringen)

- [ ] Echte afbeeldingen toevoegen + optimaliseren (WebP/AVIF, `srcset`,
      lazy-loading) en een echte `og-image.jpg` (1200×630) genereren.
- [ ] Favicon-set + `apple-touch-icon` (nu placeholder in manifest).
- [ ] Google Business Profile aanmaken/claimen en koppelen (belangrijk voor
      lokale SEO en "in de buurt"-zoekopdrachten).
- [ ] Google Maps embed vervangen door exacte coördinaten/plaats-ID zodra
      bevestigd (huidige geo is bij benadering van Oedelem-centrum).
- [ ] Volledige menukaart als aparte sectie/pagina (nu enkel highlights).
- [ ] Reviews/testimonials-sectie (bv. van Facebook).
- [ ] Cookie-/privacyverklaring indien later analytics of embeds worden gebruikt.
- [ ] Domein `tfrietuurtje-oedelem.be` koppelen + HTTPS + CNAME.
- [ ] Lighthouse-audit (Performance/SEO/Best Practices/Accessibility ≥ 95).

---

## Bronnen

- Facebook: https://www.facebook.com/p/T-Friet-uurtje-100063503712482/?locale=nl_BE
- Visit Beernem: https://www.visitbeernem.be/item/t-friet-uurtje
- OpeningsurenGids: https://www.openingsurengids.be/t-friet-uurtje/beernem/1
- Menu (one2three): https://www.one2three.app/tfrietuurtjeoedelem/menu
