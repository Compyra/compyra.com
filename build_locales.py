"""Generate the /nl/ and /fr/ static copies of every page from the English sources.

Translations are read straight from javascript.js (TRANSLATIONS) so there is a
single source of truth. Produces crawler-visible localized HTML with correct
canonical/og URLs and locale; humans are forwarded to the EN page with ?lang=.
Rerun after editing any page or any TRANSLATIONS string.
"""
import ast
import html
import re
from pathlib import Path

ROOT = Path(__file__).parent

# Page path (folder part, "" = site root) -> localized <title> and description.
PAGES = {
    "": {
        "nl": ("Compyra - IT Beveiliging & Consultancy",
               "Professionele cyberbeveiligingsoplossingen: incident response, penetratietesten, cyberbewustzijn, IT-consultancy en webontwikkeling, in het Engels, Nederlands en Frans."),
        "fr": ("Compyra - Sécurité & Conseil IT",
               "Solutions professionnelles de cybersécurité : réponse aux incidents, tests de pénétration, sensibilisation cyber, conseil informatique et développement web, en anglais, néerlandais et français."),
    },
    "services/": {
        "nl": ("Diensten · Compyra IT Beveiliging & Consultancy",
               "Diensten van Compyra: beveiligingsconsultatie, penetratietesten, incident response en forensics, cyberbewustzijn, veilige webontwikkeling en IT-consultancy, hands-on geleverd in het Engels, Nederlands en Frans."),
        "fr": ("Services · Compyra Sécurité & Conseil IT",
               "Services de Compyra : consultation en sécurité, tests de pénétration, réponse aux incidents et forensique, sensibilisation cyber, développement web sécurisé et conseil informatique, en anglais, néerlandais et français."),
    },
    "certifications/": {
        "nl": ("Certificeringen & Prestaties · Compyra",
               "Certificeringen en prestaties van Compyra: CompTIA Security+, Certified Ethical Hacker, Microsoft Security Operations Analyst, SentinelOne, Keeper, Zscaler en Cisco-netwerken, plus CTF-podiumplaatsen, gewonnen hackingwedstrijden en erkenning van Apple."),
        "fr": ("Certifications & Distinctions · Compyra",
               "Certifications et distinctions de Compyra : CompTIA Security+, Certified Ethical Hacker, Microsoft Security Operations Analyst, SentinelOne, Keeper, Zscaler et réseaux Cisco, plus des podiums CTF, des victoires en hacking challenges et une reconnaissance d'Apple."),
    },
    "projects/": {
        "nl": ("Projecten & Software · Compyra",
               "Software van Compyra: Labidi Scanner, Labidi Disk Analyzer en LabidiForensic voor Windows, GhostTooth voor Android, huiskeuring.be, het labidi.eu-portaal en meer. Standaard privé, geen tracking."),
        "fr": ("Projets & Logiciels · Compyra",
               "Logiciels de Compyra : Labidi Scanner, Labidi Disk Analyzer et LabidiForensic pour Windows, GhostTooth pour Android, huiskeuring.be, le portail labidi.eu et plus. Privé par défaut, sans pistage."),
    },
    "about/": {
        "nl": ("Wie We Zijn · Compyra",
               "Maak kennis met de mensen achter Compyra: Rami Labidi, IT-beveiligingsconsultant en softwarebouwer. Achtergrond, certificeringen en de tools die hij uitbracht."),
        "fr": ("Qui Sommes-Nous · Compyra",
               "Rencontrez les personnes derrière Compyra : Rami Labidi, consultant en sécurité informatique et créateur de logiciels. Parcours, certifications et outils publiés."),
    },
    "contact/": {
        "nl": ("Contact · Compyra",
               "Neem contact op met Compyra voor beveiligingsconsultancy, incident response, penetratietesten, webontwikkeling of IT-advies, per e-mail of WhatsApp, in het Nederlands, Frans of Engels."),
        "fr": ("Contact · Compyra",
               "Contactez Compyra pour du conseil en sécurité, de la réponse aux incidents, des tests de pénétration, du développement web ou des conseils IT, par e-mail ou WhatsApp, en français, néerlandais ou anglais."),
    },
}

LOCALES = {"nl": "nl_NL", "fr": "fr_FR"}

BOT_REGEX = ("bot|crawl|spider|slurp|bingpreview|googlebot|facebookexternalhit|embedly|"
             "pinterest|vkshare|w3c_validator|lighthouse|headless")


def load_translations():
    """Parse TRANSLATIONS out of javascript.js (string literals are valid Python)."""
    js = (ROOT / "javascript.js").read_text(encoding="utf-8")
    m = re.search(r"const TRANSLATIONS = (\{.*?\n\});", js, re.S)
    if not m:
        raise SystemExit("TRANSLATIONS not found in javascript.js")
    block = re.sub(r"^(\s*)(en|nl|fr):", r"\1'\2':", m.group(1), flags=re.M)
    return ast.literal_eval(block)


def build(sub, lang, tr, title, desc):
    src_path = ROOT / sub / "index.html" if sub else ROOT / "index.html"
    out = src_path.read_text(encoding="utf-8")

    # 1) Replace the visible text of every text-only element carrying data-i18n
    for key, val in tr.items():
        esc = html.escape(val, quote=False)
        pattern = re.compile(r'(data-i18n="' + re.escape(key) + r'"[^>]*>)[^<]*')
        out = pattern.sub(lambda m, e=esc: m.group(1) + e, out)

    # 2) <html lang>
    out = out.replace('<html lang="en" data-theme="dark">',
                      f'<html lang="{lang}" data-theme="dark">', 1)

    # 3) Title + descriptions (head, og, twitter)
    esc_title = html.escape(title, quote=False)
    esc_desc = html.escape(desc)
    out = re.sub(r"<title>.*?</title>", f"<title>{esc_title}</title>", out, count=1, flags=re.S)
    out = re.sub(r'(<meta name="title" content=")[^"]*(">)', rf"\g<1>{esc_title}\g<2>", out, count=1)
    out = re.sub(r'(<meta name="description" content=")[^"]*(">)', rf"\g<1>{esc_desc}\g<2>", out, count=1)
    out = re.sub(r'(<meta property="og:title" content=")[^"]*(">)', rf"\g<1>{esc_title}\g<2>", out, count=1)
    out = re.sub(r'(<meta property="og:description" content=")[^"]*(">)', rf"\g<1>{esc_desc}\g<2>", out, count=1)
    out = re.sub(r'(<meta property="twitter:title" content=")[^"]*(">)', rf"\g<1>{esc_title}\g<2>", out, count=1)
    out = re.sub(r'(<meta property="twitter:description" content=")[^"]*(">)', rf"\g<1>{esc_desc}\g<2>", out, count=1)

    # 4) Canonical + social URLs -> /<lang>/<sub>
    en_url = f"https://compyra.com/{sub}"
    lang_url = f"https://compyra.com/{lang}/{sub}"
    out = out.replace(f'<link rel="canonical" href="{en_url}">',
                      f'<link rel="canonical" href="{lang_url}">', 1)
    out = out.replace(f'<meta property="og:url" content="{en_url}">',
                      f'<meta property="og:url" content="{lang_url}">', 1)
    out = out.replace(f'<meta property="twitter:url" content="{en_url}">',
                      f'<meta property="twitter:url" content="{lang_url}">', 1)

    # 5) Locale: make this language primary; if it was listed as alternate, swap to en
    locale = LOCALES[lang]
    out = out.replace('<meta property="og:locale" content="en_US">',
                      f'<meta property="og:locale" content="{locale}">', 1)
    out = out.replace(f'<meta property="og:locale:alternate" content="{locale}">',
                      '<meta property="og:locale:alternate" content="en_US">', 1)

    # 6) Language buttons: mark this language active for non-JS visitors/crawlers
    out = out.replace('data-lang="en" class="language-btn active" aria-pressed="true"',
                      'data-lang="en" class="language-btn" aria-pressed="false"')
    out = out.replace(f'data-lang="{lang}" class="language-btn" aria-pressed="false"',
                      f'data-lang="{lang}" class="language-btn active" aria-pressed="true"')

    # 7) Declare the locale for the shared script
    out = out.replace('<script src="/javascript.js"></script>',
                      f"<script>window.COMPYRA_LOCALE = '{lang}';</script>\n    "
                      '<script src="/javascript.js"></script>', 1)

    # 8) Forward human visitors to the EN page in this language; bots stay for SEO
    redirect = (
        f"<script>/* Humans -> /{sub} in {lang}; crawlers keep this localized page for SEO. */\n"
        "(function(){var u=navigator.userAgent||'';"
        f"if(/{BOT_REGEX}/i.test(u))return;"
        f"try{{localStorage.setItem('preferredLanguage','{lang}');}}catch(e){{}}"
        f"location.replace('/{sub}?lang={lang}');}})();</script>"
    )
    out = out.replace('<meta charset="UTF-8">',
                      '<meta charset="UTF-8">\n    ' + redirect, 1)

    target = ROOT / lang / sub / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(out, encoding="utf-8")
    return target


def main():
    translations = load_translations()
    for lang in ("nl", "fr"):
        tr = translations[lang]
        for sub, meta in PAGES.items():
            title, desc = meta[lang]
            print("wrote", build(sub, lang, tr, title, desc))


if __name__ == "__main__":
    main()
