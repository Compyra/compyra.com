document.addEventListener('DOMContentLoaded', function () {
    // Years of experience calculation
    calculateExperience();

    // Current year for footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile menu toggle
    setupMobileMenu();

    // Smooth scrolling for navigation
    setupSmoothScrolling();

    // Contact button email functionality
    setupContactButton();

    // Copy email functionality
    setupEmailCopy();

    // Language switcher
    setupLanguageSwitcher();

    // Detect browser language and set default
    setDefaultLanguage();
});

// Calculate years of experience dynamically
function calculateExperience() {
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;

    document.getElementById('yearsOfExperience').textContent = yearsOfExperience + '+';
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');

    // Create mobile menu overlay if it doesn't exist
    if (!document.querySelector('.mobile-nav-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';

        const content = document.createElement('div');
        content.className = 'mobile-nav-content';

        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';

        // Clone the nav and language selector for mobile
        const nav = document.querySelector('nav ul').cloneNode(true);
        const langSelector = document.querySelector('.language-selector').cloneNode(true);
        langSelector.className = 'mobile-language-selector';

        content.appendChild(closeBtn);
        content.appendChild(nav);
        content.appendChild(langSelector);
        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Close menu when clicking on a link
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking the close button
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Handle language selection in mobile menu
        overlay.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const lang = this.id;
                changeLanguage(lang);

                // Update active state in both menus
                document.querySelectorAll('.language-btn').forEach(button => {
                    button.classList.remove('active');
                    if (button.id === lang) {
                        button.classList.add('active');
                    }
                });
            });
        });
    }

    const overlay = document.querySelector('.mobile-nav-overlay');

    // Toggle mobile menu
    // mobileMenuBtn.addEventListener('click', () => {
    //     overlay.classList.add('active');
    //     document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    // });
}

// Setup smooth scrolling for all anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup contact button to open email client
function setupContactButton() {
    const contactButton = document.getElementById('contactButton');
    contactButton.addEventListener('click', function () {
        window.location.href = 'mailto:contact@compyra.com';
    });
}

// Setup email copy functionality
function setupEmailCopy() {
    const copyBtn = document.getElementById('copyEmail');
    const emailDisplay = document.getElementById('emailDisplay');
    const notification = document.getElementById('copyNotification');

    copyBtn.addEventListener('click', function () {
        // Create temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = emailDisplay.textContent;
        document.body.appendChild(tempInput);

        // Select and copy
        tempInput.select();
        document.execCommand('copy');

        // Remove temporary element
        document.body.removeChild(tempInput);

        // Show notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
}

// Setup language switcher
function setupLanguageSwitcher() {
    const languageButtons = document.querySelectorAll('.language-btn');

    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.id;

            // Remove active class from all buttons
            languageButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Update mobile menu buttons too
            const mobileButtons = document.querySelectorAll('.mobile-language-selector .language-btn');
            mobileButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.id === lang) {
                    btn.classList.add('active');
                }
            });

            // Change language
            changeLanguage(lang);
        });
    });
}

// Set default language based on browser language
function setDefaultLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    let defaultLang = 'en';

    if (browserLang.startsWith('nl')) {
        defaultLang = 'nl';
    } else if (browserLang.startsWith('fr')) {
        defaultLang = 'fr';
    }

    // Set the default language
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === defaultLang) {
            btn.classList.add('active');
        }
    });

    changeLanguage(defaultLang);
}

// Change language implementation
function changeLanguage(lang) {
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.certifications': 'Certifications',
            'nav.about': 'About',
            'nav.contact': 'Contact',

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
            'about.description2': 'Security isn\'t just a profession, it\'s our passion. We stay at the forefront of security trends and technologies to ensure our clients receive the most effective protection against evolving threats.',
            'about.experience': 'Starting in 2014, we\'ve built a reputation for excellence in the IT security industry, combining technical expertise with practical business solutions.',

            'contact.title': 'Contact Us',
            'contact.description': 'Ready to secure your business or need IT consulting? Get in touch with us today.',
            'contact.button': 'Contact via Email',
            'contact.copied': 'Copied!',

            'footer.rights': 'All Rights Reserved.'
        },
        nl: {
            'nav.home': 'Home',
            'nav.services': 'Diensten',
            'nav.certifications': 'Certificeringen',
            'nav.about': 'Over Ons',
            'nav.contact': 'Contact',

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
            'about.description1': 'Compyra biedt expert IT-beveiligings- en consultancydiensten aan bedrijven van alle groottes. Met uitgebreide ervaring in cyberbeveiliging, penetratietesten en webontwikkeling bieden wij uitgebreide oplossingen om uw digitale activa te beschermen.',
            'about.description2': 'Beveiliging is niet alleen een beroep, het is onze passie. We blijven voorop lopen in beveiligingstrends en -technologieën om ervoor te zorgen dat onze klanten de meest effectieve bescherming krijgen tegen evoluerende bedreigingen.',
            'about.experience': 'Sinds 2014 hebben we een reputatie opgebouwd voor uitmuntendheid in de IT-beveiligingsindustrie, door technische expertise te combineren met praktische bedrijfsoplossingen.',

            'contact.title': 'Neem Contact Op',
            'contact.description': 'Klaar om uw bedrijf te beveiligen of heeft u IT-consultancy nodig? Neem vandaag nog contact met ons op.',
            'contact.button': 'Contact via E-mail',
            'contact.copied': 'Gekopieerd!',

            'footer.rights': 'Alle Rechten Voorbehouden.'
        },
        fr: {
            'nav.home': 'Accueil',
            'nav.services': 'Services',
            'nav.certifications': 'Certifications',
            'nav.about': 'À Propos',
            'nav.contact': 'Contact',

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
            'services.it.description': 'Conseils d\'experts sur l\'infrastructure informatique, l\'optimisation et les améliorations de sécurité.',

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
            'about.years': 'Années d\'Expérience',
            'about.description1': 'Compyra fournit des services d\'experts en sécurité informatique et en conseil aux entreprises de toutes tailles. Avec une vaste expérience en cybersécurité, tests de pénétration et développement web, nous offrons des solutions complètes pour protéger vos actifs numériques.',
            'about.description2': 'La sécurité n\'est pas seulement une profession, c\'est notre passion. Nous restons à la pointe des tendances et technologies de sécurité pour garantir à nos clients la protection la plus efficace contre les menaces évolutives.',
            'about.experience': 'Depuis 2014, nous avons bâti une réputation d\'excellence dans l\'industrie de la sécurité informatique, combinant expertise technique et solutions commerciales pratiques.',

            'contact.title': 'Contactez-nous',
            'contact.description': 'Prêt à sécuriser votre entreprise ou besoin de conseil informatique? Contactez-nous dès aujourd\'hui.',
            'contact.button': 'Contact par Email',
            'contact.copied': 'Copié!',

            'footer.rights': 'Tous Droits Réservés.'
        }
    };

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Sticky header on scroll -> changes background color too
// window.addEventListener('scroll', function() {
//     const header = document.querySelector('header');

//     if (window.scrollY > 50) {
//         header.style.padding = '10px 0';
//         header.style.backgroundColor = 'rgba(82, 120, 74, 0.95)';
//     } else {
//         header.style.padding = '20px 0';
//         header.style.backgroundColor = 'rgba(82, 120, 74, 0.95)';
//     }
// });

// test
document.addEventListener('DOMContentLoaded', function () {
    // Set the current year in the footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Calculate years of experience based on starting year (2014)
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;
    document.getElementById('yearsOfExperience').textContent = yearsOfExperience + '+';

    // Email copy functionality
    const copyEmailBtn = document.getElementById('copyEmail');
    const emailDisplay = document.getElementById('emailDisplay');
    const copyNotification = document.getElementById('copyNotification');

    copyEmailBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(emailDisplay.textContent)
            .then(() => {
                copyNotification.classList.add('show');
                setTimeout(() => {
                    copyNotification.classList.remove('show');
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

    // Contact button functionality
    const contactButton = document.getElementById('contactButton');
    contactButton.addEventListener('click', function () {
        window.location.href = `mailto:${emailDisplay.textContent}`;
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';

    mobileNavOverlay.innerHTML = `
        <div class="mobile-nav-content">
            <div class="close-btn"><i class="fas fa-times"></i></div>
            <ul>
                <li><a href="#home" data-i18n="nav.home">Home</a></li>
                <li><a href="#services" data-i18n="nav.services">Services</a></li>
                <li><a href="#certifications" data-i18n="nav.certifications">Certifications</a></li>
                <li><a href="#about" data-i18n="nav.about">About</a></li>
                <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
            </ul>
        <div class="mobile-language-selector">
            <button id="en" class="language-btn">EN</button>
            <button id="nl" class="language-btn">NL</button>
            <button id="fr" class="language-btn">FR</button>
        </div>
            <div class="mobile-theme-toggle">
                <button id="mobileThemeToggle" aria-label="Toggle dark mode">
                    <i class="fas fa-moon"></i>
                    <span data-i18n="theme.toggle">Dark Mode</span>
                </button>
            </div>
        </div>
    `;

    // Add this after appending the mobile menu to the body
    const mobileLangButtons = mobileNavOverlay.querySelectorAll('.mobile-language-selector .language-btn');
    mobileLangButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.id;

            // Update active status on mobile buttons
            mobileLangButtons.forEach(button => {
                button.classList.remove('active');
            });
            this.classList.add('active');

            // Update active status on desktop buttons
            const desktopButtons = document.querySelectorAll('.language-selector .language-btn');
            desktopButtons.forEach(button => {
                button.classList.remove('active');
                if (button.id === lang) {
                    button.classList.add('active');
                }
            });

            // Change language
            changeLanguage(lang);
        });
    });

    document.body.appendChild(mobileNavOverlay);

    mobileMenuBtn.addEventListener('click', function () {
        mobileNavOverlay.classList.add('active');
    });

    const closeBtn = mobileNavOverlay.querySelector('.close-btn');
    closeBtn.addEventListener('click', function () {
        mobileNavOverlay.classList.remove('active');
    });

    const mobileNavLinks = mobileNavOverlay.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileNavOverlay.classList.remove('active');
        });
    });

    // Theme Switcher Functionality
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon and text for both toggles
        const isDark = theme === 'dark';

        // Desktop toggle
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

        // Mobile toggle
        const mobileIcon = mobileThemeToggle.querySelector('i');
        const mobileText = mobileThemeToggle.querySelector('span');

        if (mobileIcon) {
            mobileIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }

        if (mobileText) {
            mobileText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
    }

    // Check for saved theme or determine by time/preferences
    function determineTheme() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            return savedTheme;
        }

        const currentHour = new Date().getHours();
        if (currentHour >= 20 || currentHour < 7 || prefersDarkScheme.matches) {
            return 'dark';
        }

        return 'light';
    }

    // Set initial theme
    setTheme(determineTheme());

    // Handle clicks on theme toggle buttons
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    mobileThemeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listen for changes in system theme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change the theme automatically if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });


});
/* Whatsapp form */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Normally you'd send the form data to your server here
    
    // Show WhatsApp option
    document.getElementById('whatsappOption').style.display = 'block';
    document.getElementById('contactForm').style.display = 'none';
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the user's message from the form
            const message = document.getElementById('message').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Obfuscated phone number (replace with your actual number)
            const p1 = "+3249";
            const p2 = "456";
            const p3 = "1234";
            const phoneNumber = p1 + p2 + p3;
            
            // Create WhatsApp URL with the message
            const encodedMessage = encodeURIComponent(`Hello, my name is ${name}. My email is ${email}. ${message}`);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });