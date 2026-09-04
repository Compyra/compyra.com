/* ==========================================================================
   Compyra · Company Information
   Official company / billing details with per-field and "copy all" copying.
   ========================================================================== */

'use strict';

/* ---- Company data -------------------------------------------------------- */
const COMPANY = [
    {
        title: 'Company details', icon: 'i-building', items: [
            { label: 'Name', value: 'Rami Labidi' },
            { label: 'Company name', value: 'Compyra' },
            { label: 'VAT / BTW number', value: 'BE1012255376' },
            { label: 'Country', value: 'Belgium' },
        ]
    },
    {
        title: 'Contact', icon: 'i-mail', items: [
            { label: 'Email', value: 'support@compyra.com', href: 'mailto:support@compyra.com' },
            { label: 'Website', value: 'https://compyra.com', href: 'https://compyra.com' },
        ]
    },
];

/* ---- Icons --------------------------------------------------------------- */
function icon(id) {
    return `<svg class="icon" aria-hidden="true"><use href="#${id}"></use></svg>`;
}

/* ---- Render -------------------------------------------------------------- */
function render(data) {
    const grid = document.getElementById('infoGrid');
    grid.innerHTML = '';

    data.forEach(section => {
        const card = document.createElement('section');
        card.className = 'card';

        const head = document.createElement('div');
        head.className = 'card-head';
        head.innerHTML = `<span class="card-icon">${icon(section.icon)}</span><h2>${section.title}</h2>`;
        card.appendChild(head);

        section.items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'row';

            const label = document.createElement('div');
            label.className = 'row-label';
            label.textContent = item.label;

            const value = document.createElement('div');
            value.className = 'row-value';
            if (item.href) {
                const a = document.createElement('a');
                a.href = item.href;
                a.textContent = item.value;
                if (item.href.startsWith('http')) a.rel = 'noopener';
                value.appendChild(a);
            } else {
                value.textContent = item.value;
            }

            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', `Copy ${item.label}`);
            btn.innerHTML = icon('i-copy');
            btn.addEventListener('click', () => {
                copyText(item.value, `${item.label} copied`);
                btn.classList.add('copied');
                btn.innerHTML = icon('i-check');
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = icon('i-copy');
                }, 1400);
            });

            row.append(label, value, btn);
            card.appendChild(row);
        });

        grid.appendChild(card);
    });
}

/* ---- Copy + toast -------------------------------------------------------- */
let toastTimer = null;

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyText(text, message) {
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
        showToast(message || 'Copied');
    } catch (e) {
        showToast('Copy failed, please copy manually');
    }
}

function buildAllText(data) {
    const lines = ['Compyra · Company Information', '='.repeat(30), ''];
    data.forEach(section => {
        lines.push(`[${section.title}]`);
        section.items.forEach(item => lines.push(`${item.label}: ${item.value}`));
        lines.push('');
    });
    lines.push('created at compyra.com/info');
    return lines.join('\n');
}

/* ---- Theme --------------------------------------------------------------- */
function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function apply(theme) {
        const dark = theme === 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('compyra-theme', theme);
        toggle.innerHTML = icon(dark ? 'i-sun' : 'i-moon');
        toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    const saved = localStorage.getItem('compyra-theme');
    apply(saved || (prefersDark.matches ? 'dark' : 'light'));

    toggle.addEventListener('click', () => {
        apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    prefersDark.addEventListener('change', e => {
        if (!localStorage.getItem('compyra-theme')) apply(e.matches ? 'dark' : 'light');
    });
}

/* ---- Init ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    render(COMPANY);
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    document.getElementById('copyAll').addEventListener('click', () => {
        copyText(buildAllText(COMPANY), 'All information copied');
    });
});
