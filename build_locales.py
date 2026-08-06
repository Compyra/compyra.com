"""Generator for /nl/ and /fr/ localized pages from the English index.html.
Produces static, crawler-visible localized HTML with correct canonical/hreflang/locale.
Also refreshes the CSP inline-code hashes of index.html and 404.html in place,
so rerun this script after editing any inline <script> or <style>.
"""
import base64
import hashlib
import re
import html
from pathlib import Path

ROOT = Path(__file__).parent


def _hashes(snippets):
    """CSP sha256 sources for inline code. The repo stores LF but Windows worktrees
    are CRLF, so hash both forms: production serves LF, local previews serve CRLF."""
    out = []
    for text in snippets:
        for variant in {text, text.replace("\r\n", "\n")}:
            h = base64.b64encode(hashlib.sha256(variant.encode("utf-8")).digest()).decode()
            src_ = f"'sha256-{h}'"
            if src_ not in out:
                out.append(src_)
    return out


def refresh_csp(page):
    """Rewrite the script-src/style-src hash lists in the page's CSP meta tag.
    Only plain <script>/<style> count: src= scripts and JSON-LD are not executed inline."""
    m = re.search(r'(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")', page)
    if not m:
        return page
    policy = m.group(2)
    live = re.sub(r"<!--.*?-->", "", page, flags=re.S)
    scripts = re.findall(r"<script>(.*?)</script>", live, re.S)
    styles = re.findall(r"<style>(.*?)</style>", live, re.S)
    policy = re.sub(r"script-src [^;]*",
                    " ".join(["script-src 'self'"] + _hashes(scripts)), policy)
    policy = re.sub(r"style-src [^;]*",
                    " ".join(["style-src 'self'"] + _hashes(styles)), policy)
    return page[:m.start(2)] + policy + page[m.end(2):]


def refresh_csp_file(name):
    path = ROOT / name
    with path.open(encoding="utf-8", newline="") as f:
        text = f.read()
    new = refresh_csp(text)
    if new != text:
        with path.open("w", encoding="utf-8", newline="") as f:
            f.write(new)
        print("csp refreshed", name)


refresh_csp_file("index.html")
refresh_csp_file("404.html")

src = (ROOT / "index.html").read_text(encoding="utf-8")

NL = {
    "a11y.skip": "Ga naar hoofdinhoud",
    "nav.home": "Home", "nav.services": "Diensten", "nav.certifications": "Certificeringen",
    "nav.about": "Over Ons", "nav.contact": "Contact", "nav.support": "Ondersteuning",
    "nav.apps": "Apps",
    "hero.eyebrow": "Cyberbeveiliging · Consultancy · Ontwikkeling",
    "hero.title": "IT Beveiliging & Consultancy",
    "hero.subtitle": "Professionele cyberbeveiligingsoplossingen voor bedrijven",
    "hero.services": "Onze Diensten", "hero.contact": "Neem Contact Op",
    "services.title": "Diensten",
    "services.security.title": "Beveiligingsconsultatie",
    "services.security.description": "Uitgebreide beveiligingsbeoordeling en consultatie om uw bedrijfsmiddelen te beschermen.",
    "services.pentesting.title": "Penetratietesten",
    "services.pentesting.description": "Kwetsbaarheden in uw systemen identificeren voordat kwaadwillenden dat doen.",
    "services.development.title": "Webontwikkeling",
    "services.development.description": "Creëren van veilige, responsieve en moderne websites voor uw bedrijfsbehoeften.",
    "services.it.title": "IT Consultancy",
    "services.it.description": "Deskundig advies over IT-infrastructuur, optimalisatie en beveiligingsverbeteringen.",
    "certifications.title": "Certificeringen",
    "certifications.security.title": "Beveiligingscertificeringen",
    "certifications.security.comptia": "CompTIA Security+",
    "certifications.security.ceh": "Certified Ethical Hacker (EC-Council)",
    "certifications.security.ms": "Microsoft Certified: Security Operations Analyst",
    "certifications.vendor.title": "Leverancierscertificeringen",
    "certifications.vendor.s1paladin": "SentinelOne Paladin",
    "certifications.vendor.s1incident": "SentinelOne Incident Responder",
    "certifications.vendor.keeper": "Keeper Security Certificering",
    "certifications.vendor.zscaler": "Zscaler Certified Sales Engineer",
    "certifications.network.title": "Netwerkcertificeringen",
    "certifications.network.routing": "Routing and Switching (Cisco)",
    "certifications.network.scaling": "Scaling Networks (Cisco)",
    "certifications.network.connecting": "Connecting Networks (Cisco)",
    "about.title": "Over Compyra",
    "about.years": "Jaren Ervaring",
    "about.description1": "Compyra biedt deskundige IT-beveiligings- en consultancydiensten aan bedrijven van alle groottes. Met uitgebreide ervaring in cyberbeveiliging, penetratietesten en webontwikkeling bieden wij complete oplossingen om uw digitale activa te beschermen.",
    "about.description2": "Beveiliging is niet alleen een beroep, het is onze passie. We blijven voorop lopen in beveiligingstrends en -technologieën om ervoor te zorgen dat onze klanten de meest effectieve bescherming krijgen tegen evoluerende bedreigingen.",
    "about.experience": "Sinds 2014 hebben we een reputatie opgebouwd voor uitmuntendheid in de IT-beveiligingsindustrie, door technische expertise te combineren met praktische bedrijfsoplossingen.",
    "about.projects.title": "Benieuwd wat ik bouw?",
    "about.projects.desc": "Ontdek mijn persoonlijke projecten op labidi.eu.",
    "apps.title": "Apps",
    "apps.heading": "Android-apps op Google Play",
    "apps.description": "Naast klantenwerk ontwerp en publiceer ik ook mijn eigen Android-apps. Bekijk de volledige collectie op mijn Google Play-ontwikkelaarspagina.",
    "apps.note": "Ontwikkelaar: Rami Labidi",
    "apps.cta": "Bekijk mijn apps op Google Play",
    "contact.title": "Neem Contact Op",
    "contact.description": "Klaar om uw bedrijf te beveiligen of heeft u IT-consultancy nodig? Neem vandaag nog contact met ons op.",
    "contact.button": "Contact via E-mail",
    "contact.copied": "Gekopieerd!",
    "contact.form.title": "Stuur mij een bericht op WhatsApp",
    "contact.form.name": "Naam", "contact.form.email": "E-mail", "contact.form.message": "Bericht",
    "contact.form.send": "Versturen",
    "contact.form.success": "Bedankt voor uw bericht! WhatsApp wordt geopend zodat we het gesprek kunnen voortzetten.",
    "footer.rights": "Alle Rechten Voorbehouden.",
}

FR = {
    "a11y.skip": "Aller au contenu principal",
    "nav.home": "Accueil", "nav.services": "Services", "nav.certifications": "Certifications",
    "nav.about": "À Propos", "nav.contact": "Contact", "nav.support": "Assistance",
    "nav.apps": "Applications",
    "hero.eyebrow": "Cybersécurité · Conseil · Développement",
    "hero.title": "Sécurité & Conseil IT",
    "hero.subtitle": "Solutions professionnelles de cybersécurité pour les entreprises",
    "hero.services": "Nos Services", "hero.contact": "Contactez-nous",
    "services.title": "Services",
    "services.security.title": "Consultation en Sécurité",
    "services.security.description": "Évaluation et consultation complètes en matière de sécurité pour protéger les actifs de votre entreprise.",
    "services.pentesting.title": "Tests de Pénétration",
    "services.pentesting.description": "Identification des vulnérabilités de vos systèmes avant que les acteurs malveillants ne le fassent.",
    "services.development.title": "Développement Web",
    "services.development.description": "Création de sites web sécurisés, réactifs et modernes pour les besoins de votre entreprise.",
    "services.it.title": "Conseil Informatique",
    "services.it.description": "Conseils d'experts sur l'infrastructure informatique, l'optimisation et les améliorations de sécurité.",
    "certifications.title": "Certifications",
    "certifications.security.title": "Certifications de Sécurité",
    "certifications.security.comptia": "CompTIA Security+",
    "certifications.security.ceh": "Certified Ethical Hacker (EC-Council)",
    "certifications.security.ms": "Microsoft Certified: Security Operations Analyst",
    "certifications.vendor.title": "Certifications Fournisseurs",
    "certifications.vendor.s1paladin": "SentinelOne Paladin",
    "certifications.vendor.s1incident": "SentinelOne Incident Responder",
    "certifications.vendor.keeper": "Certification Keeper Security",
    "certifications.vendor.zscaler": "Zscaler Certified Sales Engineer",
    "certifications.network.title": "Certifications Réseau",
    "certifications.network.routing": "Routing and Switching (Cisco)",
    "certifications.network.scaling": "Scaling Networks (Cisco)",
    "certifications.network.connecting": "Connecting Networks (Cisco)",
    "about.title": "À Propos de Compyra",
    "about.years": "Années d'Expérience",
    "about.description1": "Compyra fournit des services d'experts en sécurité informatique et en conseil aux entreprises de toutes tailles. Avec une vaste expérience en cybersécurité, tests de pénétration et développement web, nous offrons des solutions complètes pour protéger vos actifs numériques.",
    "about.description2": "La sécurité n'est pas seulement une profession, c'est notre passion. Nous restons à la pointe des tendances et technologies de sécurité pour garantir à nos clients la protection la plus efficace contre les menaces évolutives.",
    "about.experience": "Depuis 2014, nous avons bâti une réputation d'excellence dans l'industrie de la sécurité informatique, combinant expertise technique et solutions commerciales pratiques.",
    "about.projects.title": "Curieux de voir mes projets ?",
    "about.projects.desc": "Découvrez mes projets personnels sur labidi.eu.",
    "apps.title": "Applications",
    "apps.heading": "Applications Android sur Google Play",
    "apps.description": "En plus des missions clients, je conçois et publie mes propres applications Android. Découvrez la collection complète sur ma page développeur Google Play.",
    "apps.note": "Développeur : Rami Labidi",
    "apps.cta": "Voir mes applications sur Google Play",
    "contact.title": "Contactez-nous",
    "contact.description": "Prêt à sécuriser votre entreprise ou besoin de conseil informatique ? Contactez-nous dès aujourd'hui.",
    "contact.button": "Contact par Email",
    "contact.copied": "Copié !",
    "contact.form.title": "Contactez-moi sur WhatsApp",
    "contact.form.name": "Nom", "contact.form.email": "Email", "contact.form.message": "Message",
    "contact.form.send": "Envoyer",
    "contact.form.success": "Merci de votre message ! Ouverture de WhatsApp pour poursuivre la conversation.",
    "footer.rights": "Tous Droits Réservés.",
}

META = {
    "nl": {
        "lang": "nl",
        "title": "Compyra - IT Beveiliging & Consultancy",
        "desc": "Professionele cyberbeveiligingsoplossingen, penetratietesten, IT-consultancy en webontwikkeling in het Engels, Nederlands en Frans.",
        "social_desc": "Professionele cyberbeveiligingsoplossingen, penetratietesten, IT-consultancy en webontwikkeling.",
        "locale": "nl_NL",
    },
    "fr": {
        "lang": "fr",
        "title": "Compyra - Sécurité & Conseil IT",
        "desc": "Solutions professionnelles de cybersécurité, tests de pénétration, conseil informatique et développement web en anglais, néerlandais et français.",
        "social_desc": "Solutions professionnelles de cybersécurité, tests de pénétration, conseil informatique et développement web.",
        "locale": "fr_FR",
    },
}


def build(lang, tr, meta):
    out = src

    # 1) Replace visible text of every text-only element carrying data-i18n
    for key, val in tr.items():
        esc = html.escape(val, quote=False)
        pattern = re.compile(r'(data-i18n="' + re.escape(key) + r'"[^>]*>)[^<]*')
        out = pattern.sub(lambda m: m.group(1) + esc, out)

    # 2) <html lang>
    out = out.replace('<html lang="en">', f'<html lang="{meta["lang"]}">', 1)

    # 3) Title + description
    out = out.replace("<title>Compyra - IT Security & Consulting</title>",
                      f"<title>{html.escape(meta['title'], quote=False)}</title>", 1)
    out = out.replace(
        'content="Professional cybersecurity solutions, penetration testing, IT consulting, and web development services in English, Dutch, and French.">',
        f'content="{html.escape(meta["desc"])}">', 1)

    # 3b) Localize the short social title + social description (og/twitter)
    out = out.replace('content="Compyra - IT Security & Consulting"',
                      f'content="{meta["title"]}"')
    out = out.replace(
        'content="Professional cybersecurity solutions, penetration testing, IT consulting, and web development services.">',
        f'content="{meta["social_desc"]}">')

    # 4) Canonical + social URLs -> /lang/
    langurl = f"https://compyra.com/{meta['lang']}/"
    out = out.replace('<link rel="canonical" href="https://compyra.com/">',
                      f'<link rel="canonical" href="{langurl}">', 1)
    out = out.replace('<meta property="og:url" content="https://compyra.com/">',
                      f'<meta property="og:url" content="{langurl}">', 1)
    out = out.replace('<meta property="twitter:url" content="https://compyra.com/">',
                      f'<meta property="twitter:url" content="{langurl}">', 1)

    # 5) Locale: make this language primary, English an alternate
    out = out.replace('<meta property="og:locale" content="en_US">',
                      f'<meta property="og:locale" content="{meta["locale"]}">', 1)
    out = out.replace(f'<meta property="og:locale:alternate" content="{meta["locale"]}">',
                      '<meta property="og:locale:alternate" content="en_US">', 1)

    # 6) Root-absolute asset paths (pages live in a sub-directory)
    out = out.replace('href="style.css"', 'href="/style.css"', 1)
    out = out.replace('src="BL.svg"', 'src="/BL.svg"', 1)
    out = out.replace('src="WL.png"', 'src="/WL.png"', 1)

    # 7) Declare the locale for the shared script, then load it (absolute path)
    out = out.replace(
        '<script src="javascript.js"></script>',
        f"<script>window.COMPYRA_LOCALE = '{meta['lang']}';</script>\n    <script src=\"/javascript.js\"></script>",
        1)

    # 8) Forward human visitors to the single-page site in this language.
    #    Bots are left on this page so the localized content stays indexable (SEO).
    redirect = (
        "<script>/* Humans -> single-page site in " + meta["lang"] +
        "; crawlers keep this localized page for SEO. */\n"
        "(function(){var u=navigator.userAgent||'';"
        "if(/bot|crawl|spider|slurp|bingpreview|googlebot|facebookexternalhit|embedly|"
        "pinterest|vkshare|w3c_validator|lighthouse|headless/i.test(u))return;"
        "try{localStorage.setItem('preferredLanguage','" + meta["lang"] + "');}catch(e){}"
        "location.replace('/?lang=" + meta["lang"] + "');})();</script>"
    )
    out = out.replace('<meta charset="UTF-8">',
                      '<meta charset="UTF-8">\n    ' + redirect, 1)

    # 9) Mark this locale as the active language button in the static markup
    out = out.replace('data-lang="en" class="language-btn active" aria-pressed="true"',
                      'data-lang="en" class="language-btn" aria-pressed="false"', 1)
    out = out.replace(f'data-lang="{meta["lang"]}" class="language-btn" aria-pressed="false"',
                      f'data-lang="{meta["lang"]}" class="language-btn active" aria-pressed="true"', 1)

    target = ROOT / meta["lang"] / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(out, encoding="utf-8")
    # Hash the bytes actually on disk (write_text may have converted line endings).
    refresh_csp_file(f"{meta['lang']}/index.html")
    return target


for lang, tr in (("nl", NL), ("fr", FR)):
    p = build(lang, tr, META[lang])
    print("wrote", p)
