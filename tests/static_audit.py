"""Static integrity audit for compyra.com: links, i18n keys, icon sprites, sitemap."""
import ast
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
problems = []

EN_PAGES = ["index.html", "services/index.html", "certifications/index.html",
            "projects/index.html", "about/index.html", "contact/index.html"]
UTIL_PAGES = ["support/index.html", "info/index.html", "404.html"]
LOCALE_PAGES = [f"{lang}/{p}" for lang in ("nl", "fr") for p in EN_PAGES]
ALL_PAGES = EN_PAGES + UTIL_PAGES + LOCALE_PAGES


def load_translations():
    js = (ROOT / "javascript.js").read_text(encoding="utf-8")
    m = re.search(r"const TRANSLATIONS = (\{.*?\n\});", js, re.S)
    block = re.sub(r"^(\s*)(en|nl|fr):", r"\1'\2':", m.group(1), flags=re.M)
    return ast.literal_eval(block)


TR = load_translations()

# --- 1) i18n keys: every data-i18n in sources exists in all languages -------
used_keys = set()
for page in EN_PAGES:
    html = (ROOT / page).read_text(encoding="utf-8")
    used_keys.update(re.findall(r'data-i18n="([^"]+)"', html))
# keys used by injected mobile menu markup in javascript.js
js_src = (ROOT / "javascript.js").read_text(encoding="utf-8")
used_keys.update(re.findall(r'data-i18n="([^"]+)"', js_src))

for lang in ("en", "nl", "fr"):
    missing = sorted(used_keys - set(TR[lang]))
    if missing:
        problems.append(f"i18n: keys missing in '{lang}': {missing}")
unused = sorted(set(TR["en"]) - used_keys - {k for k in TR["en"] if f"t('{k}')" in js_src})
if unused:
    print(f"note: unused translation keys: {unused}")

# --- 2) internal links + assets resolve on disk ------------------------------
def resolve(href):
    href = href.split("#")[0].split("?")[0]
    if not href or href.startswith(("http://", "https://", "mailto:", "tel:", "data:")):
        return None
    p = (ROOT / href.lstrip("/")) if href.startswith("/") else None
    if p is None:
        return "RELATIVE"
    if p.is_dir() or href.endswith("/"):
        p = p / "index.html" if not p.name.endswith(".html") else p
    return p


for page in ALL_PAGES:
    html = (ROOT / page).read_text(encoding="utf-8")
    for attr in ("href", "src"):
        for url in re.findall(rf'{attr}="([^"]+)"', html):
            if url.startswith("#") or url.startswith(("http", "mailto:", "data:")):
                continue
            r = resolve(url)
            if r == "RELATIVE":
                # relative refs are only OK inside support/ and info/ (own css/js)
                if page.startswith(("support/", "info/")):
                    if not (ROOT / Path(page).parent / url.split("#")[0].split("?")[0]).exists():
                        problems.append(f"link: {page}: relative {url} missing")
                else:
                    problems.append(f"link: {page}: unexpected relative URL {url}")
            elif r is not None and not r.exists():
                problems.append(f"link: {page}: {url} -> {r} missing")

# --- 3) icon sprite completeness per page ------------------------------------
for page in ALL_PAGES:
    html = (ROOT / page).read_text(encoding="utf-8")
    symbols = set(re.findall(r'<symbol id="([^"]+)"', html))
    uses = set(re.findall(r'<use href="#([^"]+)"', html))
    missing = uses - symbols
    if missing:
        problems.append(f"icons: {page}: <use> without symbol: {sorted(missing)}")

# JS-injected icons must exist on every EN+locale page (mobile menu, toggles)
js_uses = {u for u in re.findall(r'<use href="#([^"]+)"', js_src) if "$" not in u}
js_uses.update({"i-sun", "i-moon"})  # iconMarkup() swaps between these at runtime
for page in EN_PAGES + LOCALE_PAGES:
    html = (ROOT / page).read_text(encoding="utf-8")
    symbols = set(re.findall(r'<symbol id="([^"]+)"', html))
    missing = js_uses - symbols
    if missing:
        problems.append(f"icons: {page}: JS needs missing symbols: {sorted(missing)}")

# --- 4) sitemap URLs exist ----------------------------------------------------
sm = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
for loc in re.findall(r"<loc>https://compyra\.com(/[^<]*)</loc>", sm):
    p = ROOT / loc.lstrip("/") / "index.html" if loc.endswith("/") else ROOT / loc.lstrip("/")
    if loc == "/":
        p = ROOT / "index.html"
    if not p.exists():
        problems.append(f"sitemap: {loc} -> {p} missing")

# --- 5) hreflang clusters consistent on EN pages ------------------------------
for page in EN_PAGES:
    sub = page.replace("index.html", "")
    html = (ROOT / page).read_text(encoding="utf-8")
    expect = {
        "en": f"https://compyra.com/{sub}",
        "nl": f"https://compyra.com/nl/{sub}",
        "fr": f"https://compyra.com/fr/{sub}",
        "x-default": f"https://compyra.com/{sub}",
    }
    found = dict(re.findall(r'hreflang="([^"]+)" href="([^"]+)"', html))
    if found != expect:
        problems.append(f"hreflang: {page}: {found} != expected")

# --- 6) locale pages: canonical/COMPYRA_LOCALE/redirect present ----------------
for page in LOCALE_PAGES:
    lang, sub = page.split("/", 1)
    sub = sub.replace("index.html", "")
    html = (ROOT / page).read_text(encoding="utf-8")
    if f'<link rel="canonical" href="https://compyra.com/{lang}/{sub}">' not in html:
        problems.append(f"locale: {page}: wrong canonical")
    if f"window.COMPYRA_LOCALE = '{lang}'" not in html:
        problems.append(f"locale: {page}: missing COMPYRA_LOCALE")
    if f"location.replace('/{sub}?lang={lang}')" not in html:
        problems.append(f"locale: {page}: missing human redirect")
    if f'<html lang="{lang}"' not in html:
        problems.append(f"locale: {page}: wrong <html lang>")

print("\n".join(problems) if problems else "ALL STATIC CHECKS PASS")
sys.exit(1 if problems else 0)

