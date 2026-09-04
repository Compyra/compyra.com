/* ==========================================================================
   Compyra.com · main script (shared by every page)
   i18n, theme, mobile menu, clipboard, contact form, scroll-reveal,
   sticky header, count-up, typed hero subtitle.
   ========================================================================== */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   Translations (hoisted once, not rebuilt per call)
   -------------------------------------------------------------------------- */
const TRANSLATIONS = {
    en: {
        'a11y.skip': 'Skip to main content',
        'brand.sub': 'IT Security & Consulting',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.certifications': 'Certifications',
        'nav.projects': 'Projects',
        'nav.aboutus': 'About Us',
        'nav.contact': 'Contact',
        'nav.support': 'Support',

        'hero.eyebrow': 'Cybersecurity · Consulting · Development',
        'hero.title1': 'IT Security',
        'hero.title2': '& Consulting',
        'hero.subtitle': 'Professional cybersecurity solutions for businesses',
        'hero.services': 'Our Services',
        'hero.contact': 'Get in Touch',

        'home.note': 'Hands-on and personal: the person you talk to is the person who does the work.',
        'home.note.link': 'Meet the people behind Compyra',
        'home.meta.since': 'In IT since 2014',
        'home.meta.certs': '10 industry certifications',
        'home.explore.title': 'Explore Compyra',
        'home.explore.lead': 'Everything has its own page: pick where you want to start.',
        'home.services.desc': 'Security consultation, penetration testing, incident response, web development and IT consulting.',
        'home.certifications.desc': 'Ten security, vendor and networking certifications, plus awards that back up the work.',
        'home.projects.desc': 'Our own software: portable Windows tools, Android apps and free web apps.',
        'home.about.desc': 'Who we are, where we come from and what we have achieved along the way.',
        'home.more': 'Learn more',

        'home.exp.title': 'Experience from the field',
        'home.exp.lead': 'A picture of the incidents and projects we have handled over the years.',
        'home.exp.ir.title': 'External attack investigations',
        'home.exp.ir.desc': 'Investigated real attacks from the outside: how the intruder got in, what was touched and how to close the door for good.',
        'home.exp.insider.title': 'Insider threats',
        'home.exp.insider.desc': 'Handled investigations where the threat came from inside the organisation, with the discretion they demand.',
        'home.exp.logs.title': 'Log analysis & timelines',
        'home.exp.logs.desc': 'Went through the logs to reconstruct what happened and built timelines that make the incident clear to management.',
        'home.exp.pentest.title': 'Penetration tests',
        'home.exp.pentest.desc': 'Tested systems the way an attacker would and reported the way a partner should: findings, proof and fixes.',
        'home.exp.guidance.title': 'Long-term guidance',
        'home.exp.guidance.desc': 'Guided organisations over extended periods, raising their cyber resilience step by step at a pace that lasts.',
        'home.exp.awareness.title': 'Cyber awareness',
        'home.exp.awareness.desc': 'Gave countless awareness sessions in plain language, because humans remain the most important factor in any company.',
        'home.exp.note': 'The honest part: I simply love being a consultant, and it shows in the work.',

        'services.title': 'Services',
        'services.lead': 'From a first security assessment to long-term guidance: hands-on help, delivered by the people you actually talk to.',
        'services.certlink': 'See our certifications',
        'services.security.title': 'Security Consultation',
        'services.security.description': 'Security assessments and consultation to protect your business, from a one-off review to a full improvement plan.',
        'services.security.d1': 'Security and risk assessments with prioritised, practical advice',
        'services.security.d2': 'Hardening plans your team can actually execute',
        'services.security.d3': 'Vendor-neutral recommendations that fit your size and budget',
        'services.pentesting.title': 'Penetration Testing',
        'services.pentesting.description': 'Identifying vulnerabilities in your systems before the bad actors do, and showing you exactly how to close them.',
        'services.pentesting.d1': 'Realistic attack scenarios against your applications and infrastructure',
        'services.pentesting.d2': 'Findings with evidence and business impact, readable by management',
        'services.pentesting.d3': 'Retesting after the fixes, so you know the door is really closed',
        'services.ir.title': 'Incident Response & Forensics',
        'services.ir.description': 'When something has happened, from an outside attack to an insider threat: investigate, contain and explain.',
        'services.ir.d1': 'Investigation of external attacks and insider threats',
        'services.ir.d2': 'Log analysis and timeline reconstruction of the incident',
        'services.ir.d3': 'Clear reporting that tells management exactly what happened',
        'services.awareness.title': 'Cyber Awareness',
        'services.awareness.description': 'Humans remain the most important factor in any company. We make security land with every team, in plain language.',
        'services.awareness.d1': 'Awareness sessions from the shop floor to the boardroom',
        'services.awareness.d2': "Practical do's and don'ts people actually remember",
        'services.awareness.d3': 'Given in English, Dutch or French, tailored to your organisation',
        'services.development.title': 'Web Development',
        'services.development.description': 'Creating secure, responsive and modern websites for your business needs, secure by design from the first line.',
        'services.development.d1': 'Built secure by design and hardened before launch',
        'services.development.d2': 'Fast, responsive and readable on every device',
        'services.development.d3': 'Maintained and kept up to date after delivery',
        'services.it.title': 'IT Consulting',
        'services.it.description': 'Expert advice on IT infrastructure, optimisation and security improvements, from quick wins to a long-term roadmap.',
        'services.it.d1': 'Independent review of your infrastructure and tooling',
        'services.it.d2': 'Pragmatic improvements with visible impact',
        'services.it.d3': 'A trusted sounding board for IT decisions',

        'certifications.title': 'Certifications',
        'certifications.lead': 'Credentials we hold across security, vendor platforms and networking: earned, maintained and put to work on real engagements.',
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

        'certs.awards.title': 'Achievements & awards',
        'certs.awards.lead': 'Certificates show what we studied. These show how we perform under pressure: CTF podiums, hacking-challenge wins and recognition from Apple.',
        'awards.apple.title': 'Security recognition from Apple',
        'awards.apple.note': "Credited in Apple's security advisories for iOS 12.3, watchOS 5.2.1, macOS Mojave 10.14.5 and tvOS 12.3 after a responsible disclosure.",
        'awards.brucon.note': "Capture the Flag at BruCON, Belgium's security conference",
        'awards.nsahack.note': 'CTF competition of the University of Skövde and Howest University',
        'awards.deloitte.be.note': 'Hacking challenge at Infosecurity Belgium',
        'awards.deloitte.nl.note': 'Hacking challenge at Infosecurity Netherlands, Utrecht',
        'awards.csc.finals.note': 'National finals at the Royal Military Academy in Brussels, with team Zero-Width Space',
        'awards.csc.note': 'National student hacking competition of Belgium',
        'awards.kinepolis.note': "Winner of the Kinepolis 'To hack or not to hack' challenge",
        'awards.date.oct19': 'Oct 2019',
        'awards.date.may19': 'May 2019',
        'awards.date.mar19': 'Mar 2019',
        'awards.date.nov18': 'Nov 2018',
        'awards.date.sep18': 'Sep 2018',
        'awards.date.mar18': 'Mar 2018',
        'awards.date.may17': 'May 2017',
        'awards.date.mar17': 'Mar 2017',
        'certs.awards.student': 'And here is the fun part: all of the above was achieved while Rami was still a student. Imagine what he has been doing since. ;)',
        'certs.events.title': 'Where you can meet us',
        'certs.events.desc': 'You can often find us at hacking events, learning and seeing how the cutting-edge IT, development, security and hacking community works, teaches and helps each other. We have been to these, and you can meet us there in person or online:',
        'certs.events.more': '... and many more',
        'certs.events.htg': 'Extra proud moment: we took part in Hack the Government, the first ethical hacking event organised by the Belgian Federal Government through the Centre for Cybersecurity Belgium (CCB), and we were there for its very first edition in 2024.',

        'about.title': 'About Compyra',
        'about.lead': 'A small, hands-on shop: the person you talk to is the person who does the work. Here is who we are and where we come from.',
        'about.team.title': 'The team',
        'about.years': 'Years of Experience',
        'about.description1': 'Compyra provides expert IT security and consulting services to businesses of all sizes. With extensive experience in cybersecurity, penetration testing, and web development, we offer comprehensive solutions to protect your digital assets.',
        'about.description2': "Security isn't just a profession, it's our passion. We stay at the forefront of security trends and technologies to ensure our clients receive the most effective protection against evolving threats.",
        'about.experience': "Starting in 2014, we've built a reputation for excellence in the IT security industry, combining technical expertise with practical business solutions.",
        'about.rl.role': 'Founder, IT Security & Consulting',
        'about.rl.p1': 'I started in IT in 2014 on the network side, Cisco routing and switching, and moved steadily toward the part of the job I care about most: security. Today I split my time between consulting for businesses and building software of my own.',
        'about.rl.p2': "Along the way I earned CompTIA Security+, Certified Ethical Hacker and Microsoft's Security Operations Analyst certification, plus vendor certifications from SentinelOne, Keeper Security and Zscaler. I work in English, Dutch and French.",
        'about.rl.p3': 'Security is the profession; building is the hobby that got out of hand. I publish Android apps on Google Play, run a portal of web apps on labidi.eu, and ship portable Windows tools written in Go. Everything I release follows the same rules: private by default, no tracking, and no install where a single portable file will do.',
        'about.chip.certs': '10 certifications',
        'about.tba.title': 'To be announced',
        'about.tba.role': 'This seat is reserved',
        'about.tba.desc': 'Compyra is becoming a two-person story. We will introduce our plus one here soon, watch this space.',
        'about.journey.title': 'The journey so far',
        'about.j1.title': '2014: first steps in IT',
        'about.j1.desc': 'Professional start on the infrastructure side: networks, routing and switching, backed by three Cisco networking courses.',
        'about.j2.title': 'Specialising in security',
        'about.j2.desc': 'The move from keeping systems running to keeping them safe: CompTIA Security+, Certified Ethical Hacker and Microsoft Security Operations Analyst, with hands-on vendor work around SentinelOne, Keeper Security and Zscaler.',
        'about.j3.desc': 'Consulting under our own flag: security assessments, penetration testing, incident response, IT consulting and web development for businesses, delivered in three languages.',
        'about.j4.title': 'Today: consulting and creating',
        'about.j4.desc': 'Next to client work we design and ship our own software: Android apps on Google Play, a portal of web apps, and portable Windows tools.',
        'about.j4.link': 'See the projects page for the full picture.',
        'about.numbers.title': 'In numbers',
        'about.stat.years': 'Years in IT',
        'about.stat.certs': 'Certifications',
        'about.stat.apps': 'Apps & tools shipped',
        'about.stat.langs': 'Working languages',
        'about.certnote': 'Certifications: CompTIA Security+ · Certified Ethical Hacker (EC-Council) · Microsoft Security Operations Analyst · SentinelOne Paladin · SentinelOne Incident Responder · Keeper Security · Zscaler Certified Sales Engineer · Cisco Routing & Switching · Cisco Scaling Networks · Cisco Connecting Networks',
        'about.cta.title': 'Curious what we build?',
        'about.cta.desc': 'Browse our software, apps and creations, or talk to us about your project.',

        'projects.title': 'Projects & Software',
        'projects.lead': 'Everything here is designed and built in-house, and follows the same rules: private by default, no tracking, no accounts unless essential, and portable wherever possible.',
        'projects.tools.title': 'Portable Windows tools',
        'projects.apps.title': 'Apps & sites',
        'projects.kind.win': 'Windows · single portable .exe',
        'projects.kind.android': 'Android app',
        'projects.kind.web': 'Free web tool',
        'projects.kind.portal': 'Web-app portal',
        'projects.kind.dev': 'Developer page',
        'projects.da.desc': 'Answers two questions about a disk: where did the space go, and what changed since? Scan a drive and rank folders by size, biggest and most recent files, then snapshot the disk and diff it later to see exactly what an installer or a week of use changed.',
        'projects.da.f1': 'One static binary, no installer, no dependencies, no admin required',
        'projects.da.f2': 'No trace: no registry, no AppData, no network',
        'projects.da.f3': 'Console and full graphical mode from the same file',
        'projects.ls.desc': 'A network scanner for the engineer standing in a comms room with a laptop and no install rights. Run it with no arguments and in seconds you know every device on the subnet: IP, MAC, vendor, hostname and which ports answer.',
        'projects.ls.f1': 'Device discovery, port scan, DHCP check, connection troubleshooting, Wake-on-LAN',
        'projects.ls.f2': 'Table, CSV, JSON or plain-text output, or double-click for a full window',
        'projects.ls.f3': 'Runs from a USB stick; works without admin rights',
        'projects.lf.desc': 'Reads back what a Windows machine remembers about its own past: every device ever attached, wireless networks joined, programs run, files opened or deleted, sign-ins. Every run ends by saying plainly what it could not read.',
        'projects.lf.f1': 'Devices, Wi-Fi history, program and file activity, sign-ins, all in one report',
        'projects.lf.f2': 'Honest by design: reads, never manufactures, and reports what it could not see',
        'projects.lf.f3': 'Stick-first and dead-box ready; no installer, no admin, no network code',
        'projects.gt.desc': 'A Bluetooth scanner that helps you spot trackers and surveillance devices around you: scan, identify manufacturers, and get alerted about devices that follow you. Built with a curated, verifiable device registry.',
        'projects.hk.desc': 'A free, private house-inspection checklist for Belgium: 230 checks with plain-language explanations of why each one matters, Belgian deadlines (EPC, asbestos, electrical inspection) and verified links to official sources.',
        'projects.le.desc': 'Our lab: a portal of 17+ web apps and experiments, from PDF Studio and Markdown Studio to the survival guide O.A.S.I.S. Everything runs in your browser, free and without accounts.',
        'projects.play.desc': 'The full collection of our published Android apps, GhostTooth and the rest of the family, on our Google Play developer page.',
        'projects.principles': 'Built by a security consultancy, so the rules are non-negotiable: private by default, no tracking, no ads, and nothing phones home. Portable tools write only what you explicitly ask for.',
        'projects.cta.title': 'Need something custom?',
        'projects.cta.desc': 'We build secure web apps and tools for clients too. Tell us what you need.',

        'apps.heading': 'Android apps on Google Play',
        'apps.description': 'Next to client work I design and publish my own Android apps. Browse the full collection on my Google Play developer page.',
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

        'footer.tagline': 'Security consulting, penetration testing and software built with care, in English, Dutch and French.',
        'footer.site': 'Site',
        'footer.more': 'More',
        'footer.made': 'Designed, built and secured by Rami Labidi.',
        'footer.rights': 'All Rights Reserved.'
    },
    nl: {
        'a11y.skip': 'Ga naar hoofdinhoud',
        'brand.sub': 'IT Beveiliging & Consultancy',
        'nav.home': 'Home',
        'nav.services': 'Diensten',
        'nav.certifications': 'Certificeringen',
        'nav.projects': 'Projecten',
        'nav.aboutus': 'Wie We Zijn',
        'nav.contact': 'Contact',
        'nav.support': 'Ondersteuning',

        'hero.eyebrow': 'Cyberbeveiliging · Consultancy · Ontwikkeling',
        'hero.title1': 'IT Beveiliging',
        'hero.title2': '& Consultancy',
        'hero.subtitle': 'Professionele cyberbeveiligingsoplossingen voor bedrijven',
        'hero.services': 'Onze Diensten',
        'hero.contact': 'Neem Contact Op',

        'home.note': 'Persoonlijk en hands-on: de persoon met wie je praat, is de persoon die het werk doet.',
        'home.note.link': 'Maak kennis met de mensen achter Compyra',
        'home.meta.since': 'In IT sinds 2014',
        'home.meta.certs': '10 professionele certificeringen',
        'home.explore.title': 'Ontdek Compyra',
        'home.explore.lead': 'Alles heeft zijn eigen pagina: kies waar je wilt beginnen.',
        'home.services.desc': 'Beveiligingsconsultatie, penetratietesten, incident response, webontwikkeling en IT-consultancy.',
        'home.certifications.desc': 'Tien beveiligings-, leveranciers- en netwerkcertificeringen, plus awards die het werk onderbouwen.',
        'home.projects.desc': 'Onze eigen software: draagbare Windows-tools, Android-apps en gratis webapps.',
        'home.about.desc': 'Wie we zijn, waar we vandaan komen en wat we onderweg hebben bereikt.',
        'home.more': 'Meer info',

        'home.exp.title': 'Ervaring uit de praktijk',
        'home.exp.lead': 'Een beeld van de incidenten en projecten die we door de jaren heen hebben aangepakt.',
        'home.exp.ir.title': 'Onderzoek naar aanvallen van buitenaf',
        'home.exp.ir.desc': 'Echte aanvallen van buitenaf onderzocht: hoe de indringer binnenkwam, wat er geraakt werd en hoe de deur definitief dichtgaat.',
        'home.exp.insider.title': 'Interne dreigingen',
        'home.exp.insider.desc': 'Onderzoeken behandeld waarbij de dreiging van binnen de organisatie kwam, met de discretie die dat vraagt.',
        'home.exp.logs.title': 'Loganalyse & tijdlijnen',
        'home.exp.logs.desc': 'Logs doorzocht om te reconstrueren wat er gebeurde, met tijdlijnen die het incident glashelder maken voor het management.',
        'home.exp.pentest.title': 'Penetratietesten',
        'home.exp.pentest.desc': 'Systemen getest zoals een aanvaller het zou doen en gerapporteerd zoals een partner het hoort te doen: bevindingen, bewijs en oplossingen.',
        'home.exp.guidance.title': 'Langdurige begeleiding',
        'home.exp.guidance.desc': 'Organisaties over langere periodes begeleid en hun cyberweerbaarheid stap voor stap verhoogd, in een tempo dat standhoudt.',
        'home.exp.awareness.title': 'Cyberbewustzijn',
        'home.exp.awareness.desc': 'Talloze awareness-sessies gegeven in klare taal, want de mens blijft de belangrijkste factor in elk bedrijf.',
        'home.exp.note': 'Eerlijk is eerlijk: ik ben gewoon dolgraag consultant, en dat zie je aan het werk.',

        'services.title': 'Diensten',
        'services.lead': 'Van een eerste beveiligingsbeoordeling tot langdurige begeleiding: hands-on hulp, geleverd door de mensen met wie je écht praat.',
        'services.certlink': 'Bekijk onze certificeringen',
        'services.security.title': 'Beveiligingsconsultatie',
        'services.security.description': 'Beveiligingsbeoordelingen en advies om uw bedrijf te beschermen, van een eenmalige doorlichting tot een volledig verbeterplan.',
        'services.security.d1': 'Beveiligings- en risicobeoordelingen met geprioriteerd, praktisch advies',
        'services.security.d2': 'Hardeningplannen die uw team echt kan uitvoeren',
        'services.security.d3': 'Leveranciersonafhankelijke aanbevelingen op maat van uw omvang en budget',
        'services.pentesting.title': 'Penetratietesten',
        'services.pentesting.description': 'Kwetsbaarheden in uw systemen opsporen voordat kwaadwillenden dat doen, en exact tonen hoe u ze sluit.',
        'services.pentesting.d1': "Realistische aanvalsscenario's op uw applicaties en infrastructuur",
        'services.pentesting.d2': 'Bevindingen met bewijs en businessimpact, leesbaar voor het management',
        'services.pentesting.d3': 'Hertest na de fixes, zodat u weet dat de deur echt dicht is',
        'services.ir.title': 'Incident Response & Forensics',
        'services.ir.description': 'Wanneer er iets gebeurd is, van een aanval van buitenaf tot een interne dreiging: onderzoeken, indammen en verklaren.',
        'services.ir.d1': 'Onderzoek van externe aanvallen en interne dreigingen',
        'services.ir.d2': 'Loganalyse en reconstructie van de tijdlijn van het incident',
        'services.ir.d3': 'Heldere rapportering die het management exact vertelt wat er gebeurd is',
        'services.awareness.title': 'Cyberbewustzijn',
        'services.awareness.description': 'De mens blijft de belangrijkste factor in elk bedrijf. Wij laten security landen bij elk team, in klare taal.',
        'services.awareness.d1': 'Awareness-sessies van de werkvloer tot de directiekamer',
        'services.awareness.d2': "Praktische do's-and-don'ts die mensen echt onthouden",
        'services.awareness.d3': 'In het Nederlands, Frans of Engels, op maat van uw organisatie',
        'services.development.title': 'Webontwikkeling',
        'services.development.description': 'Veilige, responsieve en moderne websites voor uw bedrijfsbehoeften, secure by design vanaf de eerste regel.',
        'services.development.d1': 'Secure by design gebouwd en gehard vóór de lancering',
        'services.development.d2': 'Snel, responsief en leesbaar op elk toestel',
        'services.development.d3': 'Onderhouden en up-to-date gehouden na oplevering',
        'services.it.title': 'IT Consultancy',
        'services.it.description': 'Deskundig advies over IT-infrastructuur, optimalisatie en beveiligingsverbeteringen, van quick wins tot een langetermijnroadmap.',
        'services.it.d1': 'Onafhankelijke doorlichting van uw infrastructuur en tooling',
        'services.it.d2': 'Pragmatische verbeteringen met zichtbare impact',
        'services.it.d3': 'Een vertrouwd klankbord voor IT-beslissingen',

        'certifications.title': 'Certificeringen',
        'certifications.lead': 'Certificeringen in beveiliging, leveranciersplatformen en netwerken: behaald, onderhouden en ingezet in echte opdrachten.',
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

        'certs.awards.title': 'Prestaties & awards',
        'certs.awards.lead': 'Certificaten tonen wat we geleerd hebben. Dit toont hoe we presteren onder druk: CTF-podiumplaatsen, gewonnen hackingwedstrijden en erkenning van Apple.',
        'awards.apple.title': 'Beveiligingserkenning van Apple',
        'awards.apple.note': 'Vermeld in de beveiligingsadviezen van Apple voor iOS 12.3, watchOS 5.2.1, macOS Mojave 10.14.5 en tvOS 12.3 na een responsible disclosure.',
        'awards.brucon.note': 'Capture the Flag op BruCON, dé Belgische securityconferentie',
        'awards.nsahack.note': 'CTF-wedstrijd van de universiteit van Skövde en Howest',
        'awards.deloitte.be.note': 'Hackingwedstrijd op Infosecurity Belgium',
        'awards.deloitte.nl.note': 'Hackingwedstrijd op Infosecurity Nederland, Utrecht',
        'awards.csc.finals.note': 'Nationale finale in de Koninklijke Militaire School in Brussel, met team Zero-Width Space',
        'awards.csc.note': 'Nationale Belgische hackingcompetitie voor studenten',
        'awards.kinepolis.note': "Winnaar van de Kinepolis-challenge 'To hack or not to hack'",
        'awards.date.oct19': 'okt 2019',
        'awards.date.may19': 'mei 2019',
        'awards.date.mar19': 'mrt 2019',
        'awards.date.nov18': 'nov 2018',
        'awards.date.sep18': 'sep 2018',
        'awards.date.mar18': 'mrt 2018',
        'awards.date.may17': 'mei 2017',
        'awards.date.mar17': 'mrt 2017',
        'certs.awards.student': 'En nu het leuke: dit alles behaalde Rami toen hij nog student was. Beeld je in wat hij sindsdien allemaal doet. ;)',
        'certs.events.title': 'Waar je ons kunt ontmoeten',
        'certs.events.desc': 'Je vindt ons vaak op hackingevents, waar we leren en zien hoe de IT-, development-, security- en hackingcommunity aan de frontlinie werkt, lesgeeft en elkaar helpt. We waren er al bij, en je kunt ons er persoonlijk of online ontmoeten:',
        'certs.events.more': '... en nog veel meer',
        'certs.events.htg': 'Waar we extra trots op zijn: we namen deel aan Hack the Government, het eerste ethische hackingevent van de Belgische federale overheid, georganiseerd door het Centrum voor Cybersecurity België (CCB), en dat al vanaf de allereerste editie in 2024.',

        'about.title': 'Over Compyra',
        'about.lead': 'Een kleine, hands-on zaak: de persoon met wie je praat, is de persoon die het werk doet. Dit is wie we zijn en waar we vandaan komen.',
        'about.team.title': 'Het team',
        'about.years': 'Jaren Ervaring',
        'about.description1': 'Compyra biedt expert IT-beveiligings- en consultancydiensten aan bedrijven van alle groottes. Met uitgebreide ervaring in cyberbeveiliging, penetratietesten en webontwikkeling bieden wij uitgebreide oplossingen om uw digitale activa te beschermen.',
        'about.description2': 'Beveiliging is niet alleen een beroep, het is onze passie. We blijven voorop lopen in beveiligingstrends en -technologieën om ervoor te zorgen dat onze klanten de meest effectieve bescherming krijgen tegen evoluerende bedreigingen.',
        'about.experience': 'Sinds 2014 hebben we een reputatie opgebouwd voor uitmuntendheid in de IT-beveiligingsindustrie, door technische expertise te combineren met praktische bedrijfsoplossingen.',
        'about.rl.role': 'Oprichter, IT Beveiliging & Consultancy',
        'about.rl.p1': 'Ik begon in 2014 in IT aan de netwerkkant, Cisco routing en switching, en schoof gestaag op richting het deel van het vak waar mijn hart ligt: security. Vandaag verdeel ik mijn tijd tussen consultancy voor bedrijven en het bouwen van eigen software.',
        'about.rl.p2': 'Onderweg behaalde ik CompTIA Security+, Certified Ethical Hacker en Microsofts Security Operations Analyst-certificering, plus leverancierscertificeringen van SentinelOne, Keeper Security en Zscaler. Ik werk in het Nederlands, Frans en Engels.',
        'about.rl.p3': 'Security is het beroep; bouwen is de hobby die uit de hand liep. Ik publiceer Android-apps op Google Play, beheer een portaal met webapps op labidi.eu en breng draagbare Windows-tools uit, geschreven in Go. Alles wat ik uitbreng volgt dezelfde regels: standaard privé, geen tracking, en geen installatie waar één draagbaar bestand volstaat.',
        'about.chip.certs': '10 certificeringen',
        'about.tba.title': 'Binnenkort bekend',
        'about.tba.role': 'Deze plek is voorbehouden',
        'about.tba.desc': 'Compyra wordt een verhaal van twee. Binnenkort stellen we hier onze plus one voor, hou deze plek in de gaten.',
        'about.journey.title': 'Het parcours tot nu toe',
        'about.j1.title': '2014: eerste stappen in IT',
        'about.j1.desc': 'Professionele start aan de infrastructuurkant: netwerken, routing en switching, onderbouwd met drie Cisco-netwerkopleidingen.',
        'about.j2.title': 'Specialisatie in security',
        'about.j2.desc': 'De stap van systemen draaiende houden naar systemen veilig houden: CompTIA Security+, Certified Ethical Hacker en Microsoft Security Operations Analyst, met hands-on leverancierswerk rond SentinelOne, Keeper Security en Zscaler.',
        'about.j3.desc': 'Consultancy onder eigen vlag: beveiligingsbeoordelingen, penetratietesten, incident response, IT-consultancy en webontwikkeling voor bedrijven, geleverd in drie talen.',
        'about.j4.title': 'Vandaag: consultancy en creaties',
        'about.j4.desc': 'Naast klantenwerk ontwerpen en lanceren we onze eigen software: Android-apps op Google Play, een portaal met webapps en draagbare Windows-tools.',
        'about.j4.link': 'Bekijk de projectpagina voor het volledige plaatje.',
        'about.numbers.title': 'In cijfers',
        'about.stat.years': 'Jaar in IT',
        'about.stat.certs': 'Certificeringen',
        'about.stat.apps': 'Apps & tools uitgebracht',
        'about.stat.langs': 'Werktalen',
        'about.certnote': 'Certificeringen: CompTIA Security+ · Certified Ethical Hacker (EC-Council) · Microsoft Security Operations Analyst · SentinelOne Paladin · SentinelOne Incident Responder · Keeper Security · Zscaler Certified Sales Engineer · Cisco Routing & Switching · Cisco Scaling Networks · Cisco Connecting Networks',
        'about.cta.title': 'Benieuwd wat we bouwen?',
        'about.cta.desc': 'Bekijk onze software, apps en creaties, of praat met ons over uw project.',

        'projects.title': 'Projecten & Software',
        'projects.lead': 'Alles hier is in eigen huis ontworpen en gebouwd, volgens dezelfde regels: standaard privé, geen tracking, geen accounts tenzij essentieel, en draagbaar waar mogelijk.',
        'projects.tools.title': 'Draagbare Windows-tools',
        'projects.apps.title': 'Apps & sites',
        'projects.kind.win': 'Windows · één draagbaar .exe-bestand',
        'projects.kind.android': 'Android-app',
        'projects.kind.web': 'Gratis webtool',
        'projects.kind.portal': 'Webapp-portaal',
        'projects.kind.dev': 'Ontwikkelaarspagina',
        'projects.da.desc': 'Beantwoordt twee vragen over een schijf: waar ging de ruimte naartoe, en wat is er sindsdien veranderd? Scan een schijf en rangschik mappen op grootte, grootste en recentste bestanden, maak daarna een snapshot en vergelijk die later om exact te zien wat een installatie of een week gebruik veranderde.',
        'projects.da.f1': 'Eén statisch bestand, geen installatie, geen afhankelijkheden, geen admin nodig',
        'projects.da.f2': 'Geen sporen: geen register, geen AppData, geen netwerk',
        'projects.da.f3': 'Console- en volledige grafische modus vanuit hetzelfde bestand',
        'projects.ls.desc': 'Een netwerkscanner voor de engineer die met een laptop en zonder installatierechten in een serverlokaal staat. Voer hem zonder argumenten uit en binnen enkele seconden ken je elk toestel op het subnet: IP, MAC, fabrikant, hostnaam en welke poorten antwoorden.',
        'projects.ls.f1': 'Apparaatdetectie, poortscan, DHCP-controle, verbindingsdiagnose, Wake-on-LAN',
        'projects.ls.f2': 'Uitvoer als tabel, CSV, JSON of platte tekst, of dubbelklik voor een volwaardig venster',
        'projects.ls.f3': 'Werkt vanaf een usb-stick, ook zonder adminrechten',
        'projects.lf.desc': 'Leest terug wat een Windows-machine zich over zijn eigen verleden herinnert: elk ooit aangesloten apparaat, verbonden wifinetwerken, uitgevoerde programma\'s, geopende of verwijderde bestanden, aanmeldingen. Elke run eindigt met een eerlijk overzicht van wat niet gelezen kon worden.',
        'projects.lf.f1': 'Apparaten, wifigeschiedenis, programma- en bestandsactiviteit, aanmeldingen, alles in één rapport',
        'projects.lf.f2': 'Eerlijk door ontwerp: leest, verzint nooit, en meldt wat het niet kon zien',
        'projects.lf.f3': 'Werkt vanaf een usb-stick, ook op een dead-box machine; geen installatie, geen admin, geen netwerkcode',
        'projects.gt.desc': 'Een bluetoothscanner die trackers en surveillanceapparaten rond je helpt opsporen: scan, identificeer fabrikanten en krijg meldingen over toestellen die je volgen. Gebouwd op een gecureerd, verifieerbaar apparatenregister.',
        'projects.hk.desc': 'Een gratis, privacyvriendelijke checklist voor huisbezichtigingen in België: 230 controlepunten met uitleg in klare taal, Belgische deadlines (EPC, asbest, elektrische keuring) en geverifieerde links naar officiële bronnen.',
        'projects.le.desc': 'Ons lab: een portaal met 17+ webapps en experimenten, van PDF Studio en Markdown Studio tot overlevingsgids O.A.S.I.S. Alles draait in je browser, gratis en zonder account.',
        'projects.play.desc': 'De volledige collectie van onze gepubliceerde Android-apps, GhostTooth en de rest van de familie, op onze Google Play-ontwikkelaarspagina.',
        'projects.principles': 'Gebouwd door een securityconsultancy, dus over de regels valt niet te onderhandelen: standaard privé, geen tracking, geen reclame, en niets belt naar huis. Draagbare tools schrijven alleen wat je er expliciet om vraagt.',
        'projects.cta.title': 'Iets op maat nodig?',
        'projects.cta.desc': 'We bouwen ook veilige webapps en tools voor klanten. Vertel ons wat u nodig hebt.',

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

        'footer.tagline': 'Beveiligingsconsultancy, penetratietesten en met zorg gebouwde software, in het Engels, Nederlands en Frans.',
        'footer.site': 'Site',
        'footer.more': 'Meer',
        'footer.made': 'Ontworpen, gebouwd en beveiligd door Rami Labidi.',
        'footer.rights': 'Alle Rechten Voorbehouden.'
    },
    fr: {
        'a11y.skip': 'Aller au contenu principal',
        'brand.sub': 'Sécurité & Conseil IT',
        'nav.home': 'Accueil',
        'nav.services': 'Services',
        'nav.certifications': 'Certifications',
        'nav.projects': 'Projets',
        'nav.aboutus': 'Qui Sommes-Nous',
        'nav.contact': 'Contact',
        'nav.support': 'Assistance',

        'hero.eyebrow': 'Cybersécurité · Conseil · Développement',
        'hero.title1': 'Sécurité IT',
        'hero.title2': '& Conseil',
        'hero.subtitle': 'Solutions professionnelles de cybersécurité pour les entreprises',
        'hero.services': 'Nos Services',
        'hero.contact': 'Contactez-nous',

        'home.note': 'Personnel et concret : la personne à qui vous parlez est celle qui fait le travail.',
        'home.note.link': 'Rencontrez les personnes derrière Compyra',
        'home.meta.since': "Dans l'IT depuis 2014",
        'home.meta.certs': '10 certifications professionnelles',
        'home.explore.title': 'Découvrez Compyra',
        'home.explore.lead': 'Chaque sujet a sa propre page : choisissez par où commencer.',
        'home.services.desc': 'Consultation en sécurité, tests de pénétration, réponse aux incidents, développement web et conseil informatique.',
        'home.certifications.desc': 'Dix certifications sécurité, éditeurs et réseau, plus des distinctions qui appuient le travail.',
        'home.projects.desc': 'Nos propres logiciels : outils Windows portables, applications Android et applications web gratuites.',
        'home.about.desc': "Qui nous sommes, d'où nous venons et ce que nous avons accompli en chemin.",
        'home.more': 'En savoir plus',

        'home.exp.title': "L'expérience du terrain",
        'home.exp.lead': 'Un aperçu des incidents et des projets que nous avons traités au fil des années.',
        'home.exp.ir.title': 'Enquêtes sur des attaques externes',
        'home.exp.ir.desc': "Enquêtes sur de vraies attaques venues de l'extérieur : comment l'intrus est entré, ce qui a été touché et comment fermer la porte pour de bon.",
        'home.exp.insider.title': 'Menaces internes',
        'home.exp.insider.desc': "Des enquêtes où la menace venait de l'intérieur de l'organisation, menées avec la discrétion qu'elles exigent.",
        'home.exp.logs.title': 'Analyse de journaux & chronologies',
        'home.exp.logs.desc': "Analyse des journaux pour reconstituer les faits et construire des chronologies qui rendent l'incident limpide pour la direction.",
        'home.exp.pentest.title': 'Tests de pénétration',
        'home.exp.pentest.desc': "Des systèmes testés comme le ferait un attaquant et des rapports dignes d'un partenaire : constats, preuves et corrections.",
        'home.exp.guidance.title': 'Accompagnement sur la durée',
        'home.exp.guidance.desc': 'Accompagné des organisations sur de longues périodes, en renforçant leur cyber-résilience pas à pas, à un rythme durable.',
        'home.exp.awareness.title': 'Sensibilisation cyber',
        'home.exp.awareness.desc': "D'innombrables sessions de sensibilisation en langage clair, car l'humain reste le facteur le plus important de toute entreprise.",
        'home.exp.note': "En toute honnêteté : j'adore être consultant, et cela se voit dans le travail.",

        'services.title': 'Services',
        'services.lead': "De la première évaluation de sécurité à l'accompagnement sur la durée : une aide concrète, fournie par les personnes à qui vous parlez réellement.",
        'services.certlink': 'Voir nos certifications',
        'services.security.title': 'Consultation en Sécurité',
        'services.security.description': "Évaluations de sécurité et conseil pour protéger votre entreprise, de l'audit ponctuel au plan d'amélioration complet.",
        'services.security.d1': 'Évaluations de sécurité et de risques avec des conseils pratiques et priorisés',
        'services.security.d2': 'Des plans de durcissement que votre équipe peut réellement exécuter',
        'services.security.d3': 'Des recommandations neutres, adaptées à votre taille et à votre budget',
        'services.pentesting.title': 'Tests de Pénétration',
        'services.pentesting.description': 'Identifier les vulnérabilités de vos systèmes avant les acteurs malveillants, et vous montrer exactement comment les corriger.',
        'services.pentesting.d1': "Des scénarios d'attaque réalistes contre vos applications et votre infrastructure",
        'services.pentesting.d2': 'Des constats avec preuves et impact métier, lisibles par la direction',
        'services.pentesting.d3': 'Un nouveau test après correction, pour savoir que la porte est vraiment fermée',
        'services.ir.title': 'Réponse aux Incidents & Forensique',
        'services.ir.description': "Quand quelque chose s'est produit, d'une attaque externe à une menace interne : enquêter, contenir et expliquer.",
        'services.ir.d1': 'Enquête sur les attaques externes et les menaces internes',
        'services.ir.d2': "Analyse des journaux et reconstitution de la chronologie de l'incident",
        'services.ir.d3': "Un rapport clair qui dit à la direction exactement ce qui s'est passé",
        'services.awareness.title': 'Sensibilisation Cyber',
        'services.awareness.description': "L'humain reste le facteur le plus important de toute entreprise. Nous faisons passer la sécurité auprès de chaque équipe, en langage clair.",
        'services.awareness.d1': "Des sessions de sensibilisation, de l'atelier à la salle du conseil",
        'services.awareness.d2': 'Des réflexes concrets que les gens retiennent vraiment',
        'services.awareness.d3': 'En français, néerlandais ou anglais, adaptées à votre organisation',
        'services.development.title': 'Développement Web',
        'services.development.description': 'Des sites web sécurisés, réactifs et modernes pour votre entreprise, sécurisés dès la conception.',
        'services.development.d1': 'Conçus de manière sécurisée et durcis avant le lancement',
        'services.development.d2': 'Rapides, réactifs et lisibles sur chaque appareil',
        'services.development.d3': 'Maintenus et tenus à jour après la livraison',
        'services.it.title': 'Conseil Informatique',
        'services.it.description': "Des conseils d'expert sur l'infrastructure IT, l'optimisation et les améliorations de sécurité, des gains rapides à la feuille de route long terme.",
        'services.it.d1': 'Un examen indépendant de votre infrastructure et de vos outils',
        'services.it.d2': "Des améliorations pragmatiques à l'impact visible",
        'services.it.d3': 'Un interlocuteur de confiance pour vos décisions IT',

        'certifications.title': 'Certifications',
        'certifications.lead': "Nos certifications en sécurité, plateformes d'éditeurs et réseaux : obtenues, entretenues et mises en pratique sur de vraies missions.",
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

        'certs.awards.title': 'Distinctions & récompenses',
        'certs.awards.lead': "Les certificats montrent ce que nous avons étudié. Ceci montre comment nous performons sous pression : podiums CTF, victoires en hacking challenges et reconnaissance d'Apple.",
        'awards.apple.title': "Reconnaissance de sécurité d'Apple",
        'awards.apple.note': "Crédité dans les bulletins de sécurité d'Apple pour iOS 12.3, watchOS 5.2.1, macOS Mojave 10.14.5 et tvOS 12.3 après une divulgation responsable.",
        'awards.brucon.note': 'Capture the Flag à BruCON, la conférence sécurité belge',
        'awards.nsahack.note': "Compétition CTF de l'université de Skövde et de la Howest",
        'awards.deloitte.be.note': 'Hacking challenge à Infosecurity Belgium',
        'awards.deloitte.nl.note': 'Hacking challenge à Infosecurity Pays-Bas, Utrecht',
        'awards.csc.finals.note': "Finale nationale à l'École royale militaire de Bruxelles, avec l'équipe Zero-Width Space",
        'awards.csc.note': 'Compétition nationale belge de hacking pour étudiants',
        'awards.kinepolis.note': 'Vainqueur du challenge Kinepolis « To hack or not to hack »',
        'awards.date.oct19': 'oct. 2019',
        'awards.date.may19': 'mai 2019',
        'awards.date.mar19': 'mars 2019',
        'awards.date.nov18': 'nov. 2018',
        'awards.date.sep18': 'sept. 2018',
        'awards.date.mar18': 'mars 2018',
        'awards.date.may17': 'mai 2017',
        'awards.date.mar17': 'mars 2017',
        'certs.awards.student': "Et le plus amusant : tout cela, Rami l'a accompli quand il était encore étudiant. Imaginez ce qu'il fait depuis. ;)",
        'certs.events.title': 'Où nous rencontrer',
        'certs.events.desc': "Vous nous trouverez souvent dans des événements de hacking, où nous apprenons et observons comment la communauté IT, développement, sécurité et hacking à la pointe travaille, enseigne et s'entraide. Nous y étions déjà, et vous pouvez nous y rencontrer en personne ou en ligne :",
        'certs.events.more': "... et bien d'autres",
        'certs.events.htg': "Un moment de fierté : nous avons participé à Hack the Government, le premier événement de hacking éthique du gouvernement fédéral belge, organisé par le Centre pour la Cybersécurité Belgique (CCB), et ce dès la toute première édition en 2024.",

        'about.title': 'À Propos de Compyra',
        'about.lead': "Une petite structure où tout se fait à la main : la personne à qui vous parlez est celle qui fait le travail. Voici qui nous sommes et d'où nous venons.",
        'about.team.title': "L'équipe",
        'about.years': "Années d'Expérience",
        'about.description1': "Compyra fournit des services d'experts en sécurité informatique et en conseil aux entreprises de toutes tailles. Avec une vaste expérience en cybersécurité, tests de pénétration et développement web, nous offrons des solutions complètes pour protéger vos actifs numériques.",
        'about.description2': "La sécurité n'est pas seulement une profession, c'est notre passion. Nous restons à la pointe des tendances et technologies de sécurité pour garantir à nos clients la protection la plus efficace contre les menaces évolutives.",
        'about.experience': "Depuis 2014, nous avons bâti une réputation d'excellence dans l'industrie de la sécurité informatique, combinant expertise technique et solutions commerciales pratiques.",
        'about.rl.role': 'Fondateur, Sécurité & Conseil IT',
        'about.rl.p1': "J'ai commencé dans l'IT en 2014 côté réseau, routage et commutation Cisco, puis j'ai évolué vers la partie du métier qui me tient le plus à cœur : la sécurité. Aujourd'hui, je partage mon temps entre le conseil aux entreprises et la création de mes propres logiciels.",
        'about.rl.p2': "En chemin, j'ai obtenu CompTIA Security+, Certified Ethical Hacker et la certification Security Operations Analyst de Microsoft, ainsi que des certifications SentinelOne, Keeper Security et Zscaler. Je travaille en français, néerlandais et anglais.",
        'about.rl.p3': "La sécurité est le métier ; créer est le passe-temps qui a pris de l'ampleur. Je publie des applications Android sur Google Play, je gère un portail d'applications web sur labidi.eu et je diffuse des outils Windows portables écrits en Go. Tout ce que je publie suit les mêmes règles : privé par défaut, sans pistage, et sans installation quand un seul fichier portable suffit.",
        'about.chip.certs': '10 certifications',
        'about.tba.title': 'Bientôt annoncé',
        'about.tba.role': 'Cette place est réservée',
        'about.tba.desc': "Compyra devient une histoire à deux. Nous présenterons bientôt notre binôme ici, restez à l'écoute.",
        'about.journey.title': "Le parcours jusqu'ici",
        'about.j1.title': "2014 : premiers pas dans l'IT",
        'about.j1.desc': 'Débuts professionnels côté infrastructure : réseaux, routage et commutation, appuyés par trois formations réseau Cisco.',
        'about.j2.title': 'Spécialisation en sécurité',
        'about.j2.desc': 'Le passage de faire tourner les systèmes à les protéger : CompTIA Security+, Certified Ethical Hacker et Microsoft Security Operations Analyst, avec un travail concret autour de SentinelOne, Keeper Security et Zscaler.',
        'about.j3.desc': 'Le conseil sous notre propre bannière : évaluations de sécurité, tests de pénétration, réponse aux incidents, conseil IT et développement web pour les entreprises, en trois langues.',
        'about.j4.title': "Aujourd'hui : conseil et créations",
        'about.j4.desc': 'En plus des missions clients, nous concevons et publions nos propres logiciels : applications Android sur Google Play, un portail d\'applications web et des outils Windows portables.',
        'about.j4.link': "Voir la page projets pour une vue d'ensemble.",
        'about.numbers.title': 'En chiffres',
        'about.stat.years': "Années dans l'IT",
        'about.stat.certs': 'Certifications',
        'about.stat.apps': 'Apps & outils publiés',
        'about.stat.langs': 'Langues de travail',
        'about.certnote': 'Certifications : CompTIA Security+ · Certified Ethical Hacker (EC-Council) · Microsoft Security Operations Analyst · SentinelOne Paladin · SentinelOne Incident Responder · Keeper Security · Zscaler Certified Sales Engineer · Cisco Routing & Switching · Cisco Scaling Networks · Cisco Connecting Networks',
        'about.cta.title': 'Curieux de voir ce que nous créons ?',
        'about.cta.desc': 'Parcourez nos logiciels, applications et créations, ou parlez-nous de votre projet.',

        'projects.title': 'Projets & Logiciels',
        'projects.lead': 'Tout ici est conçu et développé en interne, selon les mêmes règles : privé par défaut, sans pistage, sans compte sauf nécessité, et portable autant que possible.',
        'projects.tools.title': 'Outils Windows portables',
        'projects.apps.title': 'Applications & sites',
        'projects.kind.win': 'Windows · un seul .exe portable',
        'projects.kind.android': 'Application Android',
        'projects.kind.web': 'Outil web gratuit',
        'projects.kind.portal': "Portail d'applications web",
        'projects.kind.dev': 'Page développeur',
        'projects.da.desc': "Répond à deux questions sur un disque : où est passé l'espace, et qu'est-ce qui a changé depuis ? Analysez un disque et classez les dossiers par taille, fichiers les plus gros et les plus récents, puis prenez un instantané et comparez-le plus tard pour voir exactement ce qu'une installation ou une semaine d'utilisation a changé.",
        'projects.da.f1': 'Un seul binaire statique, sans installation, sans dépendances, sans droits admin',
        'projects.da.f2': 'Aucune trace : ni registre, ni AppData, ni réseau',
        'projects.da.f3': 'Mode console et mode graphique complet depuis le même fichier',
        'projects.ls.desc': "Un scanner réseau pour l'ingénieur debout dans un local technique avec un portable et sans droits d'installation. Lancez-le sans arguments et en quelques secondes vous connaissez chaque appareil du sous-réseau : IP, MAC, fabricant, nom d'hôte et ports qui répondent.",
        'projects.ls.f1': "Découverte d'appareils, scan de ports, contrôle DHCP, diagnostic de connexion, Wake-on-LAN",
        'projects.ls.f2': 'Sortie en tableau, CSV, JSON ou texte brut, ou double-clic pour une fenêtre complète',
        'projects.ls.f3': 'Fonctionne depuis une clé USB, même sans droits admin',
        'projects.lf.desc': "Relit ce qu'une machine Windows retient de son propre passé : chaque appareil jamais branché, les réseaux Wi-Fi rejoints, les programmes exécutés, les fichiers ouverts ou supprimés, les connexions. Chaque exécution se termine en disant clairement ce qui n'a pas pu être lu.",
        'projects.lf.f1': "Appareils, historique Wi-Fi, activité des programmes et fichiers, connexions, le tout dans un seul rapport",
        'projects.lf.f2': "Honnête par conception : il lit, n'invente jamais, et signale ce qu'il n'a pas pu voir",
        'projects.lf.f3': 'Fonctionne depuis une clé USB, même sur une machine hors ligne ; sans installation, sans admin, sans code réseau',
        'projects.gt.desc': 'Un scanner Bluetooth qui aide à repérer les traceurs et appareils de surveillance autour de vous : scannez, identifiez les fabricants et soyez alerté des appareils qui vous suivent. Construit sur un registre d\'appareils vérifiable et soigné.',
        'projects.hk.desc': 'Une check-list gratuite et privée pour visiter une maison en Belgique : 230 points de contrôle expliqués en langage clair, les échéances belges (PEB, amiante, contrôle électrique) et des liens vérifiés vers les sources officielles.',
        'projects.le.desc': 'Notre labo : un portail de 17+ applications web et expériences, de PDF Studio et Markdown Studio au guide de survie O.A.S.I.S. Tout tourne dans votre navigateur, gratuitement et sans compte.',
        'projects.play.desc': 'La collection complète de nos applications Android publiées, GhostTooth et le reste de la famille, sur notre page développeur Google Play.',
        'projects.principles': 'Conçu par un cabinet de sécurité, donc les règles ne se négocient pas : privé par défaut, sans pistage, sans publicité, et rien ne téléphone à la maison. Les outils portables n\'écrivent que ce que vous demandez explicitement.',
        'projects.cta.title': 'Besoin de sur-mesure ?',
        'projects.cta.desc': "Nous créons aussi des applications web et des outils sécurisés pour nos clients. Dites-nous ce qu'il vous faut.",

        'apps.heading': 'Applications Android sur Google Play',
        'apps.description': "En plus des missions clients, je conçois et publie mes propres applications Android. Découvrez la collection complète sur ma page développeur Google Play.",
        'apps.note': 'Développeur : Rami Labidi',
        'apps.cta': 'Voir mes applications sur Google Play',

        'contact.title': 'Contactez-nous',
        'contact.description': 'Prêt à sécuriser votre entreprise ou besoin de conseil informatique? Contactez-nous dès aujourd\'hui.',
        'contact.button': 'Contact par Email',
        'contact.copied': 'Copié!',
        'contact.form.title': 'Contactez-moi sur WhatsApp',
        'contact.form.name': 'Nom',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.send': 'Envoyer',
        'contact.form.success': 'Merci de votre message ! Ouverture de WhatsApp pour poursuivre la conversation.',
        'contact.form.error.name': 'Veuillez saisir votre nom.',
        'contact.form.error.email': 'Veuillez saisir une adresse email valide.',
        'contact.form.error.message': 'Veuillez saisir un message.',

        'footer.tagline': 'Conseil en sécurité, tests de pénétration et logiciels conçus avec soin, en anglais, néerlandais et français.',
        'footer.site': 'Site',
        'footer.more': 'Plus',
        'footer.made': 'Conçu, développé et sécurisé par Rami Labidi.',
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

    try { localStorage.setItem('preferredLanguage', lang); } catch (e) {}
    document.documentElement.lang = lang;

    typeHeroSubtitle(t('hero.subtitle'));
}

function determineLanguage() {
    // Explicit ?lang= (used when a /nl/ or /fr/ page forwards a human here).
    try {
        const params = new URLSearchParams(location.search);
        const q = params.get('lang');
        if (q && TRANSLATIONS[q]) {
            try { localStorage.setItem('preferredLanguage', q); } catch (e) {}
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

    let saved = null;
    try { saved = localStorage.getItem('preferredLanguage'); } catch (e) {}
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
   Theme (dark by default; the pre-paint script in <head> applies it early)
   -------------------------------------------------------------------------- */
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

    function iconMarkup(isDark) {
        return `<svg class="icon" aria-hidden="true"><use href="#${isDark ? 'i-sun' : 'i-moon'}"></use></svg>`;
    }

    function setTheme(theme, persist) {
        const isDark = theme === 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        if (persist) {
            try { localStorage.setItem('theme', theme); } catch (e) {}
        }

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
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch (e) {}
        if (saved === 'dark' || saved === 'light') return saved;
        return prefersLight.matches ? 'light' : 'dark';
    }

    setTheme(determineTheme(), false);

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark', true);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggle);

    document.addEventListener('click', e => {
        if (e.target.closest('#mobileThemeToggle')) toggle();
    });

    prefersLight.addEventListener('change', e => {
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch (err) {}
        if (!saved) setTheme(e.matches ? 'light' : 'dark', false);
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
                <li><a href="/" data-i18n="nav.home">Home</a></li>
                <li><a href="/services/" data-i18n="nav.services">Services</a></li>
                <li><a href="/certifications/" data-i18n="nav.certifications">Certifications</a></li>
                <li><a href="/projects/" data-i18n="nav.projects">Projects</a></li>
                <li><a href="/about/" data-i18n="nav.aboutus">About Us</a></li>
                <li><a href="/contact/" data-i18n="nav.contact">Contact</a></li>
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

    // Mark the current page in the injected nav (locale pages live under /nl/ or /fr/).
    const path = location.pathname.replace(/^\/(nl|fr)(?=\/)/, '');
    overlay.querySelectorAll('ul a').forEach(link => {
        if (link.getAttribute('href') === (path === '' ? '/' : path)) {
            link.setAttribute('aria-current', 'page');
        }
    });

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

    // The injected nodes are translated by init's applyLanguage(determineLanguage()),
    // which runs after this. Calling applyLanguage(currentLang) here would persist
    // the default 'en' and wipe the visitor's saved language on every page load.
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
    // Users are unaffected; the wa.me link is built only on form submit.
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
   Experience badge count-up
   -------------------------------------------------------------------------- */
function setupExperienceCountUp() {
    const el = document.getElementById('yearsOfExperience');
    const target = new Date().getFullYear() - 2014;

    // Non-animated mirrors of the same number (e.g. the stats grid)
    document.querySelectorAll('[data-years]').forEach(n => { n.textContent = target + '+'; });

    if (!el) return;
    const suffix = el.getAttribute('data-count-suffix') || '';

    // Correct value by default; the count-up below is enhancement only, so the
    // badge is never left mid-count in environments where rAF/IO are throttled.
    el.textContent = target + suffix;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            obs.disconnect();
            const duration = 1400;
            let start = null;
            function tick(now) {
                if (start === null) start = now;
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
    setupExperienceCountUp();

    applyLanguage(determineLanguage());
});
