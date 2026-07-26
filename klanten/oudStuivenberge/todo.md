# Café Oud Stuivenberge — website todo

Statische, snelle en toegankelijke één-paginawebsite voor **Café Oud Stuivenberge**,
een gezellig volkscafé waar je ook kan eten, in Oostkamp. Extra aandacht voor een
**gebruiksvriendelijke ervaring voor de oudere bezoeker**: grote letters, hoog
contrast, duidelijke knoppen en eenvoudige navigatie.

## Basisgegevens (bron)

- **Naam:** Café Oud Stuivenberge
- **Adres:** Stuivenbergstraat 40, 8020 Oostkamp
- **Coördinaten:** 51.1495368, 3.2646383
- **Facebook:** https://www.facebook.com/p/Café-Oud-Stuivenberge-100063550634855/
- **UiTinVlaanderen:** https://www.uitinvlaanderen.be/agenda/l/cafe-oud-stuivenberge/0d306ea2-f789-4341-8968-bb4af7900d80
- **Type:** café / eetcafé (drankgelegenheid met kleine keuken)

---

## ✅ Gedaan

- [x] Projectmap `oudStuivenberge/` aangemaakt in de workshop
- [x] `index.html` — volledige één-paginasite met semantische structuur
- [x] Sterke on-page SEO
  - [x] Title, meta description, keywords, author, robots
  - [x] Canonical URL
  - [x] Open Graph + Twitter Cards
  - [x] Geo-tags (region, placename, position, ICBM)
  - [x] JSON-LD structured data (`@type: CafeOrCoffeeShop`) met adres, geo, openingsuren, faciliteiten
- [x] `css/style.css` — warm café-kleurenpalet (hout, amber, crème), mobile-first, dark-mode aware
- [x] **Toegankelijkheid voor senioren**
  - [x] Grotere basis-lettergrootte (17px) en ruime regelafstand
  - [x] Hoog contrast, duidelijke focus-outlines
  - [x] Grote tap-/klikdoelen en knoppen
  - [x] Skip-link, ARIA-labels, semantische landmarks
  - [x] Zwevende "Bel ons"-knop op mobiel
- [x] `js/main.js` — progressieve verbeteringen (werkt ook zonder JS)
  - [x] Mobiele navigatie
  - [x] Live "nu open / gesloten"-status + markering van vandaag
  - [x] Menu-categorieën in-/uitklapbaar
- [x] Ssectie **Over ons**, **Wat we bieden**, **Menukaart**, **Openingsuren**, **Contact**
- [x] OpenStreetMap-kaart met marker op het adres
- [x] `robots.txt`, `sitemap.xml`, `site.webmanifest`
- [x] `404.html` foutpagina
- [x] `privacy/index.html` privacybeleid
- [x] Geen externe tracking / cookievrij

---

## ⏳ Te doen / te bevestigen met de zaak

> Onderstaande gegevens zijn **placeholders** en moeten door de uitbater
> bevestigd worden vóór livegang. Ze zijn duidelijk aangeduid in de code.

- [ ] **Telefoonnummer** bevestigen (nu placeholder `050 00 00 00`)
- [ ] **E-mailadres** bevestigen of aanmaken (nu `info@oudstuivenberge.be`)
- [ ] **Officiële openingsuren** opvragen en aanpassen in:
  - `index.html` → sectie Openingsuren (`<table class="hours-table">`)
  - `index.html` → JSON-LD `openingHoursSpecification`
  - `js/main.js` → `OPEN_DAYS` en open/sluit-uren
- [ ] **Echte menukaart & prijzen** aanleveren (huidige kaart is een representatief voorbeeld)
- [ ] **Foto's** aanleveren (interieur, terras, gerechten, dranken) → optionele fotogalerij toevoegen
- [ ] **Logo** aanleveren → vervangt de ☕ emoji-mark en favicon
- [ ] **Domeinnaam** kiezen/registreren en alle absolute URL's aanpassen
      (nu `https://www.oudstuivenberge.be/`)
- [ ] **Sociale links** aanvullen (Instagram?) en Facebook-URL definitief maken
- [ ] Voorzieningen bevestigen: rolstoeltoegankelijkheid, parking, terras, honden toegelaten, betaalmethodes (Payconiq/Bancontact/cash)
- [ ] BTW-nummer / ondernemingsnummer voor de footer (indien gewenst)

## 🔮 Optioneel / later

- [ ] Fotogalerij met lightbox (zoals in andere workshopprojecten) zodra beeldmateriaal beschikbaar is
- [ ] Evenementenkalender (kaarttoernooi, teerfeest, optredens) — eventueel via UiTinVlaanderen
- [ ] Meertalig (NL/FR/EN) indien gewenst
- [ ] Menukaart als downloadbare PDF
- [ ] Google Business Profile koppelen voor reviews
