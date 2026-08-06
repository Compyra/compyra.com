/* ==========================================================================
   Compyra.com — main script
   Single init. i18n, theme, mobile menu, clipboard, contact form,
   scroll-reveal, scroll-spy, sticky header, count-up, typed hero subtitle.
   ========================================================================== */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// localStorage throws in private mode / when storage is blocked; never let that abort init.
const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignored */ } }
};

/* --------------------------------------------------------------------------
   Translations (hoisted once, not rebuilt per call)
   -------------------------------------------------------------------------- */
const TRANSLATIONS = {
    en: {
        'a11y.skip': 'Skip to main content',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.certifications': 'Certifications',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.support': 'Support',
        'nav.apps': 'Apps',

        'hero.eyebrow': 'Cybersecurity · Consulting · Development',
        'hero.title': 'IT Security & Consulting',
        'hero.subtitle': 'Professional cybersecurity solutions for businesses',
        'hero.services': 'Our Services',
        'hero.contact': 'Get in Touch',

        'services.title': 'Services',
        'services.security.title': 'Security Consultation',
        'services.security.description': 'Comprehensive security assessment and consultation to protect your business assets.',
        'services.pentesting.title': 'Penetration Testing',
        'services.pentesting.description': 'Identifying vulnerabilities in your systems before the bad actors do.',
        'services.development.title': 'Web Development',
        'services.development.description': 'Creating secure, responsive, and modern websites for your business needs.',
        'services.it.title': 'IT Consulting',
        'services.it.description': 'Expert advice on IT infrastructure, optimization, and security improvements.',

        'certifications.title': 'Certifications',
        'certifications.security.title': 'Security Certifications',
        'certifications.security.comptia': 'CompTIA Security+',
        'certifications.security.ceh': 'Certified Ethical Hacker (EC-Council)',
        'certifications.security.ms': 'Microsoft Certified: Security Operations Analyst',
        'certifications.vendor.title': 'Vendor Certifications',
        'certifications.vendor.s1paladin': 'SentinelOne Paladin',
        'certifications.vendor.s1incident': 'SentinelOne Incident Responder',
        'certifications.vendor.keeper': 'Keeper Security Certification',
        'certifications.vendor.zscaler': 'Zscaler Certified Sales Engineer',
        'certifications.network.title': 'Networking Certifications',
        'certifications.network.routing': 'Routing and Switching (Cisco)',
        'certifications.network.scaling': 'Scaling Networks (Cisco)',
        'certifications.network.connecting': 'Connecting Networks (Cisco)',

        'about.title': 'About Compyra',
        'about.years': 'Years of Experience',
        'about.description1': 'Compyra provides expert IT security and consulting services to businesses of all sizes. With extensive experience in cybersecurity, penetration testing, and web development, we offer comprehensive solutions to protect your digital assets.',
        'about.description2': "Security isn't just a profession, it's our passion. We stay at the forefront of security trends and technologies to ensure our clients receive the most effective protection against evolving threats.",
        'about.experience': "Starting in 2014, we've built a reputation for excellence in the IT security industry, combining technical expertise with practical business solutions.",
        'about.projects.title': 'Curious what I build?',
        'about.projects.desc': 'Explore my personal side projects on labidi.eu.',

        'apps.title': 'Apps',
        'apps.heading': 'Android apps on Google Play',
        'apps.description': 'Alongside client work, I design and publish my own Android apps. Browse the full collection on my Google Play developer page.',
        'apps.note': 'Developer: Rami Labidi',
        'apps.cta': 'View my apps on Google Play',

        'contact.title': 'Contact Us',
        'contact.description': 'Ready to secure your business or need IT consulting? Get in touch with us today.',
        'contact.button': 'Contact via Email',
        'contact.copied': 'Copied!',
        'contact.form.title': 'Message me on WhatsApp',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send',
        'contact.form.success': 'Thanks for reaching out! Opening WhatsApp so we can continue the conversation.',
        'contact.form.error.name': 'Please enter your name.',
        'contact.form.error.email': 'Please enter a valid email address.',
        'contact.form.error.message': 'Please enter a message.',

        'footer.rights': 'All Rights Reserved.'
    },
    nl: {
        'a11y.skip': 'Ga naar hoofdinhoud',
        'nav.home': 'Home',
        'nav.services': 'Diensten',
        'nav.certifications': 'Certificeringen',
        'nav.about': 'Over Ons',
        'nav.contact': 'Contact',
        'nav.support': 'Ondersteuning',
        'nav.apps': 'Apps',

        'hero.eyebrow': 'Cyberbeveiliging · Consultancy · Ontwikkeling',
        'hero.title': 'IT Beveiliging & Consultancy',
        'hero.subtitle': 'Professionele cyberbeveiligingsoplossingen voor bedrijven',
        'hero.services': 'Onze Diensten',
        'hero.contact': 'Neem Contact Op',

        'services.title': 'Diensten',
        'services.security.title': 'Beveiligingsconsultatie',
        'services.security.description': 'Uitgebreide beveiligingsbeoordeling en consultatie om uw bedrijfsmiddelen te beschermen.',
        'services.pentesting.title': 'Penetratietesten',
        'services.pentesting.description': 'Kwetsbaarheden in uw systemen identificeren voordat kwaadwillenden dat doen.',
        'services.development.title': 'Webontwikkeling',
        'services.development.description': 'Creëren van veilige, responsieve en moderne websites voor uw bedrijfsbehoeften.',
        'services.it.title': 'IT Consultancy',
        'services.it.description': 'Deskundig advies over IT-infrastructuur, optimalisatie en beveiligingsverbeteringen.',

        'certifications.title': 'Certificeringen',
        'certifications.security.title': 'Beveiligingscertificeringen',
        'certifications.security.comptia': 'CompTIA Security+',
        'certifications.security.ceh': 'Certified Ethical Hacker (EC-Council)',
        'certifications.security.ms': 'Microsoft Certified: Security Operations Analyst',
        'certifications.vendor.title': 'Leverancierscertificeringen',
        'certifications.vendor.s1paladin': 'SentinelOne Paladin',
        'certifications.vendor.s1incident': 'SentinelOne Incident Responder',
        'certifications.vendor.keeper': 'Keeper Security Certificering',
        'certifications.vendor.zscaler': 'Zscaler Certified Sales Engineer',
        'certifications.network.title': 'Netwerkcertificeringen',
        'certifications.network.routing': 'Routing and Switching (Cisco)',
        'certifications.network.scaling': 'Scaling Networks (Cisco)',
        'certifications.network.connecting': 'Connecting Networks (Cisco)',

        'about.title': 'Over Compyra',
        'about.years': 'Jaren Ervaring',
        'about.description1': 'Compyra biedt deskundige IT-beveiligings- en consultancydiensten aan bedrijven van alle groottes. Met uitgebreide ervaring in cyberbeveiliging, penetratietesten en webontwikkeling bieden wij complete oplossingen om uw digitale activa te beschermen.',
        'about.description2': 'Beveiliging is niet alleen een beroep, het is onze passie. We blijven voorop lopen in beveiligingstrends en -technologieën om ervoor te zorgen dat onze klanten de meest effectieve bescherming krijgen tegen evoluerende bedreigingen.',
        'about.experience': 'Sinds 2014 hebben we een reputatie opgebouwd voor uitmuntendheid in de IT-beveiligingsindustrie, door technische expertise te combineren met praktische bedrijfsoplossingen.',
        'about.projects.title': 'Benieuwd wat ik bouw?',
        'about.projects.desc': 'Ontdek mijn persoonlijke projecten op labidi.eu.',

        'apps.title': 'Apps',
        'apps.heading': 'Android-apps op Google Play',
        'apps.description': 'Naast klantenwerk ontwerp en publiceer ik ook mijn eigen Android-apps. Bekijk de volledige collectie op mijn Google Play-ontwikkelaarspagina.',
        'apps.note': 'Ontwikkelaar: Rami Labidi',
        'apps.cta': 'Bekijk mijn apps op Google Play',

        'contact.title': 'Neem Contact Op',
        'contact.description': 'Klaar om uw bedrijf te beveiligen of heeft u IT-consultancy nodig? Neem vandaag nog contact met ons op.',
        'contact.button': 'Contact via E-mail',
        'contact.copied': 'Gekopieerd!',
        'contact.form.title': 'Stuur mij een bericht op WhatsApp',
        'contact.form.name': 'Naam',
        'contact.form.email': 'E-mail',
        'contact.form.message': 'Bericht',
        'contact.form.send': 'Versturen',
        'contact.form.success': 'Bedankt voor uw bericht! WhatsApp wordt geopend zodat we het gesprek kunnen voortzetten.',
        'contact.form.error.name': 'Voer uw naam in.',
        'contact.form.error.email': 'Voer een geldig e-mailadres in.',
        'contact.form.error.message': 'Voer een bericht in.',

        'footer.rights': 'Alle Rechten Voorbehouden.'
    },
    fr: {
        'a11y.skip': 'Aller au contenu principal',
        'nav.home': 'Accueil',
        'nav.services': 'Services',
        'nav.certifications': 'Certifications',
        'nav.about': 'À Propos',
        'nav.contact': 'Contact',
        'nav.support': 'Assistance',
        'nav.apps': 'Applications',

        'hero.eyebrow': 'Cybersécurité · Conseil · Développement',
        'hero.title': 'Sécurité & Conseil IT',
        'hero.subtitle': 'Solutions professionnelles de cybersécurité pour les entreprises',
        'hero.services': 'Nos Services',
        'hero.contact': 'Contactez-nous',

        'services.title': 'Services',
        'services.security.title': 'Consultation en Sécurité',
        'services.security.description': 'Évaluation et consultation complètes en matière de sécurité pour protéger les actifs de votre entreprise.',
        'services.pentesting.title': 'Tests de Pénétration',
        'services.pentesting.description': 'Identification des vulnérabilités de vos systèmes avant que les acteurs malveillants ne le fassent.',
        'services.development.title': 'Développement Web',
        'services.development.description': 'Création de sites web sécurisés, réactifs et modernes pour les besoins de votre entreprise.',
        'services.it.title': 'Conseil Informatique',
        'services.it.description': "Conseils d'experts sur l'infrastructure informatique, l'optimisation et les améliorations de sécurité.",

        'certifications.title': 'Certifications',
        'certifications.security.title': 'Certifications de Sécurité',
        'certifications.security.comptia': 'CompTIA Security+',
        'certifications.security.ceh': 'Certified Ethical Hacker (EC-Council)',
        'certifications.security.ms': 'Microsoft Certified: Security Operations Analyst',
        'certifications.vendor.title': 'Certifications Fournisseurs',
        'certifications.vendor.s1paladin': 'SentinelOne Paladin',
        'certifications.vendor.s1incident': 'SentinelOne Incident Responder',
        'certifications.vendor.keeper': 'Certification Keeper Security',
        'certifications.vendor.zscaler': 'Zscaler Certified Sales Engineer',
        'certifications.network.title': 'Certifications Réseau',
        'certifications.network.routing': 'Routing and Switching (Cisco)',
        'certifications.network.scaling': 'Scaling Networks (Cisco)',
        'certifications.network.connecting': 'Connecting Networks (Cisco)',

        'about.title': 'À Propos de Compyra',
        'about.years': "Années d'Expérience",
        'about.description1': "Compyra fournit des services d'experts en sécurité informatique et en conseil aux entreprises de toutes tailles. Avec une vaste expérience en cybersécurité, tests de pénétration et développement web, nous offrons des solutions complètes pour protéger vos actifs numériques.",
        'about.description2': "La sécurité n'est pas seulement une profession, c'est notre passion. Nous restons à la pointe des tendances et technologies de sécurité pour garantir à nos clients la protection la plus efficace contre les menaces évolutives.",
        'about.experience': "Depuis 2014, nous avons bâti une réputation d'excellence dans l'industrie de la sécurité informatique, combinant expertise technique et solutions commerciales pratiques.",
        'about.projects.title': 'Curieux de voir mes projets ?',
        'about.projects.desc': 'Découvrez mes projets personnels sur labidi.eu.',
        'apps.title': 'Applications',
        'apps.heading': 'Applications Android sur Google Play',
        'apps.description': "En plus des missions clients, je conçois et publie mes propres applications Android. Découvrez la collection complète sur ma page développeur Google Play.",
        'apps.note': 'Développeur : Rami Labidi',
        'apps.cta': 'Voir mes applications sur Google Play',
        'contact.title': 'Contactez-nous',
        'contact.description': 'Prêt à sécuriser votre entreprise ou besoin de conseil informatique ? Contactez-nous dès aujourd\'hui.',
        'contact.button': 'Contact par Email',
        'contact.copied': 'Copié !',
        'contact.form.title': 'Contactez-moi sur WhatsApp',
        'contact.form.name': 'Nom',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.send': 'Envoyer',
        'contact.form.success': 'Merci de votre message ! Ouverture de WhatsApp pour poursuivre la conversation.',
        'contact.form.error.name': 'Veuillez saisir votre nom.',
        'contact.form.error.email': 'Veuillez saisir une adresse email valide.',
        'contact.form.error.message': 'Veuillez saisir un message.',

        'footer.rights': 'Tous Droits Réservés.'
    }
};

let currentLang = 'en';

/* --------------------------------------------------------------------------
   i18n
   -------------------------------------------------------------------------- */
function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = TRANSLATIONS[lang][key];
        if (value === undefined) return;
        // Hero subtitle is handled by the typing effect.
        if (key === 'hero.subtitle') return;
        el.textContent = value;
    });

    // Reflect active state on all language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });

    store.set('preferredLanguage', lang);
    document.documentElement.lang = lang;

    typeHeroSubtitle(t('hero.subtitle'));
}

function determineLanguage() {
    // Explicit ?lang= (used when a /nl/ or /fr/ page forwards a human here).
    try {
        const params = new URLSearchParams(location.search);
        const q = params.get('lang');
        if (q && TRANSLATIONS[q]) {
            store.set('preferredLanguage', q);
            if (history.replaceState) {
                history.replaceState(null, '', location.pathname + location.hash);
            }
            return q;
        }
    } catch (e) {}

    // Locale pages (/nl/, /fr/) declare their language explicitly.
    if (window.COMPYRA_LOCALE && TRANSLATIONS[window.COMPYRA_LOCALE]) {
        return window.COMPYRA_LOCALE;
    }

    const saved = store.get('preferredLanguage');
    if (saved && TRANSLATIONS[saved]) return saved;

    const browserLang = (navigator.language || 'en').toLowerCase();
    if (browserLang.startsWith('nl')) return 'nl';
    if (browserLang.startsWith('fr')) return 'fr';
    return 'en';
}

function setupLanguageButtons() {
    document.addEventListener('click', e => {
        const btn = e.target.closest('.language-btn');
        if (!btn) return;
        applyLanguage(btn.dataset.lang);
    });
}

/* --------------------------------------------------------------------------
   Typed hero subtitle (respects reduced motion)
   -------------------------------------------------------------------------- */
let typeTimer = null;
function typeHeroSubtitle(text) {
    const el = document.querySelector('.hero-subtitle');
    if (!el) return;

    if (typeTimer) clearInterval(typeTimer);

    if (prefersReducedMotion) {
        el.textContent = text;
        return;
    }

    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    el.appendChild(cursor);

    let i = 0;
    typeTimer = setInterval(() => {
        if (i >= text.length) {
            clearInterval(typeTimer);
            setTimeout(() => cursor.remove(), 1200);
            return;
        }
        cursor.insertAdjacentText('beforebegin', text.charAt(i));
        i += 1;
    }, 38);
}

/* --------------------------------------------------------------------------
   Theme
   -------------------------------------------------------------------------- */
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function iconMarkup(isDark) {
        return `<svg class="icon" aria-hidden="true"><use href="#${isDark ? 'i-sun' : 'i-moon'}"></use></svg>`;
    }

    function setTheme(theme) {
        const isDark = theme === 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        store.set('theme', theme);

        if (themeToggle) {
            themeToggle.innerHTML = iconMarkup(isDark);
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggle.setAttribute('aria-pressed', String(isDark));
        }

        const mobileToggle = document.getElementById('mobileThemeToggle');
        if (mobileToggle) {
            const label = isDark ? 'Light Mode' : 'Dark Mode';
            mobileToggle.innerHTML = `${iconMarkup(isDark)}<span>${label}</span>`;
            mobileToggle.setAttribute('aria-pressed', String(isDark));
        }
    }

    function determineTheme() {
        const saved = store.get('theme');
        if (saved) return saved;
        const hour = new Date().getHours();
        if (hour >= 20 || hour < 7 || prefersDark.matches) return 'dark';
        return 'light';
    }

    setTheme(determineTheme());

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    }

    if (themeToggle) themeToggle.addEventListener('click', toggle);

    document.addEventListener('click', e => {
        if (e.target.closest('#mobileThemeToggle')) toggle();
    });

    prefersDark.addEventListener('change', e => {
        if (!store.get('theme')) setTheme(e.matches ? 'dark' : 'light');
    });
}

/* --------------------------------------------------------------------------
   Mobile menu (accessible: focusable button, Esc, focus restore)
   -------------------------------------------------------------------------- */
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    if (!menuBtn) return;

    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.id = 'mobileNav';
    overlay.innerHTML = `
        <div class="mobile-nav-content">
            <button class="close-btn" aria-label="Close menu">
                <svg class="icon" aria-hidden="true"><use href="#i-close"></use></svg>
            </button>
            <ul>
                <li><a href="#home" data-i18n="nav.home">Home</a></li>
                <li><a href="#services" data-i18n="nav.services">Services</a></li>
                <li><a href="#certifications" data-i18n="nav.certifications">Certifications</a></li>
                <li><a href="#about" data-i18n="nav.about">About</a></li>
                <li><a href="#apps" data-i18n="nav.apps">Apps</a></li>
                <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
            </ul>
            <div class="mobile-language-selector" role="group" aria-label="Language">
                <button type="button" data-lang="en" class="language-btn">EN</button>
                <button type="button" data-lang="nl" class="language-btn">NL</button>
                <button type="button" data-lang="fr" class="language-btn">FR</button>
            </div>
            <div class="mobile-theme-toggle">
                <button id="mobileThemeToggle" aria-label="Toggle dark mode">
                    <svg class="icon" aria-hidden="true"><use href="#i-moon"></use></svg><span>Dark Mode</span>
                </button>
            </div>
        </div>`;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.close-btn');

    function openMenu() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuBtn.setAttribute('aria-expanded', 'true');
        closeBtn.focus();
    }

    function closeMenu() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeMenu();
    });

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeMenu();
    });

    // Sync i18n on the freshly injected nodes
    applyLanguage(currentLang);
}

/* --------------------------------------------------------------------------
   Clipboard (modern API + execCommand fallback)
   -------------------------------------------------------------------------- */
function setupEmailCopy() {
    const copyBtn = document.getElementById('copyEmail');
    const emailDisplay = document.getElementById('emailDisplay');
    const notification = document.getElementById('copyNotification');
    if (!copyBtn || !emailDisplay) return;

    function showCopied() {
        if (!notification) return;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 2000);
    }

    copyBtn.addEventListener('click', async () => {
        const text = emailDisplay.textContent.trim();
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const tmp = document.createElement('textarea');
                tmp.value = text;
                tmp.style.position = 'fixed';
                tmp.style.opacity = '0';
                document.body.appendChild(tmp);
                tmp.select();
                document.execCommand('copy');
                document.body.removeChild(tmp);
            }
            showCopied();
        } catch (err) {
            console.error('Copy failed:', err);
        }
    });
}

/* --------------------------------------------------------------------------
   Contact button (mailto)
   -------------------------------------------------------------------------- */
function setupContactButton() {
    const btn = document.getElementById('contactButton');
    const emailDisplay = document.getElementById('emailDisplay');
    if (!btn || !emailDisplay) return;
    btn.addEventListener('click', () => {
        window.location.href = `mailto:${emailDisplay.textContent.trim()}`;
    });
}

/* --------------------------------------------------------------------------
   Contact form -> validate -> WhatsApp (single handler, honeypot, i18n)
   -------------------------------------------------------------------------- */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameEl = form.querySelector('#name');
    const emailEl = form.querySelector('#email');
    const messageEl = form.querySelector('#message');
    const honeypot = form.querySelector('#company');
    const errorEl = document.getElementById('formError');
    const success = document.getElementById('whatsappOption');

    // Real WhatsApp number, assembled at runtime from char codes so it is not
    // present as a plain string in the source for scrapers/crawlers to harvest.
    // Users are unaffected — the wa.me link is built only on form submit.
    const getWhatsAppNumber = () =>
        String.fromCharCode(51, 50, 52, 57, 52, 53, 54, 49, 50, 51, 52);

    function showError(msg, field) {
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.hidden = false;
        }
        if (field) {
            field.setAttribute('aria-invalid', 'true');
            field.focus();
        }
    }

    function clearErrors() {
        if (errorEl) {
            errorEl.hidden = true;
            errorEl.textContent = '';
        }
        [nameEl, emailEl, messageEl].forEach(f => f && f.removeAttribute('aria-invalid'));
    }

    const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    form.addEventListener('submit', e => {
        e.preventDefault();
        clearErrors();

        // Honeypot: real users leave it empty.
        if (honeypot && honeypot.value.trim() !== '') return;

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const message = messageEl.value.trim();

        if (!name) return showError(t('contact.form.error.name'), nameEl);
        if (!isValidEmail(email)) return showError(t('contact.form.error.email'), emailEl);
        if (!message) return showError(t('contact.form.error.message'), messageEl);

        const text = encodeURIComponent(`Hello, my name is ${name}. My email is ${email}. ${message}`);
        const url = `https://wa.me/${getWhatsAppNumber()}?text=${text}`;

        form.hidden = true;
        if (success) success.hidden = false;

        window.open(url, '_blank', 'noopener');
    });
}

/* --------------------------------------------------------------------------
   Sticky condensing header
   -------------------------------------------------------------------------- */
function setupStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let ticking = false;
    function update() {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
}

/* --------------------------------------------------------------------------
   Scroll-reveal
   -------------------------------------------------------------------------- */
function setupScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    document.documentElement.setAttribute('data-reveal-ready', '');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Scroll-spy (active nav + aria-current)
   -------------------------------------------------------------------------- */
function setupScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                const active = link.getAttribute('href') === `#${id}`;
                if (active) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
}

/* --------------------------------------------------------------------------
   Experience badge count-up
   -------------------------------------------------------------------------- */
function setupExperienceCountUp() {
    const el = document.getElementById('yearsOfExperience');
    if (!el) return;

    const target = new Date().getFullYear() - 2014;
    const suffix = el.getAttribute('data-count-suffix') || '';

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        el.textContent = target + suffix;
        return;
    }

    el.textContent = '0' + suffix;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            obs.disconnect();
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(eased * target) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.4 });

    observer.observe(document.getElementById('experienceBadge') || el);
}

/* --------------------------------------------------------------------------
   Init
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupLanguageButtons();
    setupTheme();
    setupMobileMenu();
    setupEmailCopy();
    setupContactButton();
    setupContactForm();
    setupStickyHeader();
    setupScrollReveal();
    setupScrollSpy();
    setupExperienceCountUp();

    applyLanguage(determineLanguage());
});
