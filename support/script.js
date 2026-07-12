/* ==========================================================================
   Compyra — Browser & Device Information (support diagnostics)
   Gathers browser / device / system details, renders them, and lets the
   visitor copy any value or all of them to send to support.
   ========================================================================== */

'use strict';

const unknown = '—';
const yesNo = v => (v ? 'Yes' : 'No');

/* ---- Detection helpers --------------------------------------------------- */
function detectBrowser(ua) {
    if (navigator.userAgentData && navigator.userAgentData.brands) {
        const b = navigator.userAgentData.brands.find(x => !/Not.?A.?Brand/i.test(x.brand));
        if (b) return `${b.brand} ${b.version}`;
    }
    const tests = [
        [/Edg\/([\d.]+)/, 'Microsoft Edge'],
        [/OPR\/([\d.]+)/, 'Opera'],
        [/SamsungBrowser\/([\d.]+)/, 'Samsung Internet'],
        [/Firefox\/([\d.]+)/, 'Firefox'],
        [/Chrome\/([\d.]+)/, 'Chrome'],
        [/Version\/([\d.]+).*Safari/, 'Safari'],
    ];
    for (const [re, name] of tests) {
        const m = ua.match(re);
        if (m) return `${name} ${m[1]}`;
    }
    return unknown;
}

function detectEngine(ua) {
    if (/Gecko\/|Firefox/.test(ua) && !/like Gecko/.test(ua)) return 'Gecko';
    if (/AppleWebKit/.test(ua) && /Chrome|Chromium|Edg|OPR/.test(ua)) return 'Blink';
    if (/AppleWebKit/.test(ua)) return 'WebKit';
    return unknown;
}

function detectOS() {
    const ua = navigator.userAgent;
    const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    if (/Windows NT 10/.test(ua)) return 'Windows 10 / 11';
    if (/Windows NT 6.3/.test(ua)) return 'Windows 8.1';
    if (/Windows/.test(ua)) return 'Windows';
    if (/Android ([\d.]+)/.test(ua)) return 'Android ' + ua.match(/Android ([\d.]+)/)[1];
    if (/(iPhone|iPad|iPod)/.test(ua)) {
        const m = ua.match(/OS ([\d_]+)/);
        return 'iOS' + (m ? ' ' + m[1].replace(/_/g, '.') : '');
    }
    if (/Mac OS X ([\d_]+)/.test(ua)) return 'macOS ' + ua.match(/Mac OS X ([\d_]+)/)[1].replace(/_/g, '.');
    if (/Linux/.test(ua)) return 'Linux';
    return p || unknown;
}

// Best-effort desktop / laptop / tablet / phone classification.
function detectDeviceType() {
    const ua = navigator.userAgent;
    const uaData = navigator.userAgentData;
    // iPadOS 13+ reports as "Macintosh" but exposes touch points.
    if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'Tablet';
    if (/Android/.test(ua) && !/Mobile/.test(ua)) return 'Tablet';
    if ((uaData && uaData.mobile) || /Mobi|iPhone|iPod|Windows Phone/.test(ua)) return 'Phone';
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse && navigator.maxTouchPoints > 0) return 'Touch device';
    return 'Desktop or laptop';
}

function orientation() {
    if (screen.orientation && screen.orientation.type) return screen.orientation.type.replace('-primary', '').replace('-secondary', ' (flipped)');
    return window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';
}

// Gather WebGL / graphics info once.
function getGraphics() {
    try {
        const canvas = document.createElement('canvas');
        const gl2 = canvas.getContext('webgl2');
        const gl = gl2 || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return { renderer: 'Not supported', vendor: unknown, version: 'Not supported', maxTex: unknown };
        const dbg = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = (dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) || unknown;
        const vendor = (dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR)) || unknown;
        return {
            renderer,
            vendor,
            version: gl2 ? 'WebGL 2.0' : 'WebGL 1.0',
            maxTex: gl.getParameter(gl.MAX_TEXTURE_SIZE) + ' px',
        };
    } catch (e) {
        return { renderer: 'Error', vendor: unknown, version: 'Error', maxTex: unknown };
    }
}

function colorGamut() {
    if (window.matchMedia('(color-gamut: rec2020)').matches) return 'Rec. 2020 (wide)';
    if (window.matchMedia('(color-gamut: p3)').matches) return 'DCI-P3 (wide)';
    if (window.matchMedia('(color-gamut: srgb)').matches) return 'sRGB (standard)';
    return unknown;
}

function getConnection() {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return null;
    const parts = [];
    if (c.effectiveType) parts.push(c.effectiveType.toUpperCase());
    if (c.downlink) parts.push(`≈${c.downlink} Mbps`);
    if (typeof c.rtt === 'number') parts.push(`${c.rtt} ms RTT`);
    return parts.length ? parts.join(' · ') : null;
}

/* ---- Live clock ---------------------------------------------------------- */
function formatClock(d) {
    return d.toLocaleString(undefined, {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

/* ---- Build the data model ------------------------------------------------ */
function buildData() {
    const ua = navigator.userAgent;
    const now = new Date();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || unknown;
    const offsetMin = -now.getTimezoneOffset();
    const offset = `UTC${offsetMin >= 0 ? '+' : '-'}${String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, '0')}:${String(Math.abs(offsetMin) % 60).padStart(2, '0')}`;
    const conn = getConnection();
    const scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Reduced' : 'No preference';
    const mem = navigator.deviceMemory ? `${navigator.deviceMemory} GB (approx.)` : unknown;
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} threads` : unknown;
    const touch = (navigator.maxTouchPoints || 0) > 0 ? `Yes (${navigator.maxTouchPoints} points)` : 'No';
    const g = getGraphics();
    const has = (obj, key) => (key in obj ? 'Supported' : 'Not supported');

    return [
        {
            title: 'System', icon: 'i-clock', items: [
                { label: 'Local date & time', value: formatClock(now), live: 'clock' },
                { label: 'Time zone', value: tz },
                { label: 'UTC offset', value: offset },
                { label: 'ISO timestamp', value: now.toISOString(), live: 'iso' },
            ]
        },
        {
            title: 'Browser', icon: 'i-globe', items: [
                { label: 'Browser', value: detectBrowser(ua) },
                { label: 'Rendering engine', value: detectEngine(ua) },
                { label: 'Language', value: navigator.language || unknown },
                { label: 'All languages', value: (navigator.languages || []).join(', ') || unknown },
                { label: 'Cookies enabled', value: yesNo(navigator.cookieEnabled) },
                { label: 'Do Not Track', value: navigator.doNotTrack === '1' ? 'On' : 'Off' },
                { label: 'Secure context', value: window.isSecureContext ? 'Yes (HTTPS)' : 'No' },
                { label: 'User agent', value: ua },
            ]
        },
        {
            title: 'Device & hardware', icon: 'i-cpu', items: [
                { label: 'Device type', value: detectDeviceType() },
                { label: 'Operating system', value: detectOS() },
                { label: 'Platform', value: (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || unknown },
                { label: 'CPU', value: cores },
                { label: 'Device memory', value: mem },
                { label: 'Battery', value: 'Checking…', live: 'battery' },
                { label: 'Touch screen', value: touch },
                { label: 'Vibration', value: ('vibrate' in navigator) ? 'Supported' : 'Not supported' },
            ]
        },
        {
            title: 'Display', icon: 'i-monitor', items: [
                { label: 'Screen resolution', value: `${screen.width} × ${screen.height}` },
                { label: 'Available screen', value: `${screen.availWidth} × ${screen.availHeight}` },
                { label: 'Window (viewport)', value: `${window.innerWidth} × ${window.innerHeight}`, live: 'viewport' },
                { label: 'Orientation', value: orientation(), live: 'orientation' },
                { label: 'Pixel ratio', value: `${window.devicePixelRatio || 1}×` },
                { label: 'Color depth', value: `${screen.colorDepth}-bit` },
                { label: 'Color scheme', value: scheme },
                { label: 'Motion preference', value: reduced },
            ]
        },
        {
            title: 'Graphics & media', icon: 'i-image', items: [
                { label: 'GPU (renderer)', value: g.renderer },
                { label: 'GPU vendor', value: g.vendor },
                { label: 'WebGL', value: g.version },
                { label: 'Max texture size', value: g.maxTex },
                { label: 'Canvas 2D', value: !!document.createElement('canvas').getContext ? 'Supported' : 'Not supported' },
                { label: 'Web Audio', value: (('AudioContext' in window) || ('webkitAudioContext' in window)) ? 'Supported' : 'Not supported' },
                { label: 'Color gamut', value: colorGamut() },
                { label: 'Dynamic range', value: window.matchMedia('(dynamic-range: high)').matches ? 'HDR' : 'SDR' },
            ]
        },
        {
            title: 'Network & page', icon: 'i-wifi', items: [
                { label: 'Online status', value: navigator.onLine ? 'Online' : 'Offline', live: 'online' },
                { label: 'Connection', value: conn || 'Not available' },
                { label: 'Protocol', value: location.protocol },
                { label: 'Page URL', value: location.href },
                { label: 'Referrer', value: document.referrer || 'None' },
            ]
        },
        {
            title: 'Capabilities & storage', icon: 'i-database', items: [
                { label: 'Local storage', value: has(window, 'localStorage') },
                { label: 'Session storage', value: has(window, 'sessionStorage') },
                { label: 'IndexedDB', value: has(window, 'indexedDB') },
                { label: 'Cache API', value: has(window, 'caches') },
                { label: 'Storage in use', value: 'Checking…', live: 'storage' },
                { label: 'Service Worker', value: has(navigator, 'serviceWorker') },
                { label: 'WebRTC', value: has(window, 'RTCPeerConnection') },
                { label: 'Web Bluetooth', value: has(navigator, 'bluetooth') },
                { label: 'Web USB', value: has(navigator, 'usb') },
                { label: 'Notifications', value: has(window, 'Notification') },
            ]
        },
        {
            title: 'Location', icon: 'i-pin', button: { label: 'Get my location', id: 'getLocation' }, items: [
                { label: 'Coordinates', value: 'Not requested (needs your permission)', live: 'location' },
            ]
        },
    ];
}

/* ---- Icons --------------------------------------------------------------- */
function icon(id) {
    return `<svg class="icon" aria-hidden="true"><use href="#${id}"></use></svg>`;
}

/* ---- Render -------------------------------------------------------------- */
let liveRefs = {};

function render(data) {
    const grid = document.getElementById('infoGrid');
    grid.innerHTML = '';
    liveRefs = {};

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
            value.className = 'row-value' + (item.live === 'clock' ? ' mono-clock' : '');
            value.textContent = item.value;
            if (item.live) liveRefs[item.live] = value;

            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', `Copy ${item.label}`);
            btn.innerHTML = icon('i-copy');
            btn.addEventListener('click', () => {
                copyText(value.textContent, `${item.label} copied`);
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

        if (section.button) {
            const action = document.createElement('button');
            action.className = 'card-action';
            action.type = 'button';
            action.id = section.button.id;
            action.innerHTML = `${icon('i-pin')}<span>${section.button.label}</span>`;
            card.appendChild(action);
        }

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
        showToast('Copy failed — please copy manually');
    }
}

// Build the "copy all" text from the rendered DOM so async values
// (battery, storage, location) reflect their resolved state.
function collectAllText() {
    const lines = ['Compyra — Browser & Device Information', '='.repeat(40), ''];
    document.querySelectorAll('#infoGrid .card').forEach(card => {
        lines.push(`[${card.querySelector('h2').textContent}]`);
        card.querySelectorAll('.row').forEach(row => {
            lines.push(`${row.querySelector('.row-label').textContent}: ${row.querySelector('.row-value').textContent}`);
        });
        lines.push('');
    });
    lines.push(`Generated: ${new Date().toString()}`);
    lines.push('created at compyra.com/support');
    return lines.join('\n');
}

/* ---- Async values (battery, storage, location) --------------------------- */
function bindDynamic() {
    // Battery
    if (liveRefs.battery) {
        if (navigator.getBattery) {
            navigator.getBattery().then(b => {
                const paint = () => {
                    const pct = Math.round(b.level * 100);
                    liveRefs.battery.textContent = `${pct}% · ${b.charging ? 'Charging' : 'On battery'}`;
                };
                paint();
                b.addEventListener('levelchange', paint);
                b.addEventListener('chargingchange', paint);
            }).catch(() => { liveRefs.battery.textContent = 'Not available'; });
        } else {
            liveRefs.battery.textContent = 'Not exposed by this browser';
        }
    }

    // Storage estimate
    if (liveRefs.storage) {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(e => {
                const fmt = bytes => {
                    const mb = bytes / 1048576;
                    return mb >= 1024 ? (mb / 1024).toFixed(1) + ' GB' : Math.round(mb) + ' MB';
                };
                liveRefs.storage.textContent = `${fmt(e.usage || 0)} used of ${fmt(e.quota || 0)}`;
            }).catch(() => { liveRefs.storage.textContent = 'Not available'; });
        } else {
            liveRefs.storage.textContent = 'Not supported';
        }
    }

    // Location (permission-gated, on demand)
    const locBtn = document.getElementById('getLocation');
    if (locBtn && liveRefs.location) {
        locBtn.addEventListener('click', () => {
            if (!navigator.geolocation) {
                liveRefs.location.textContent = 'Geolocation not supported';
                return;
            }
            liveRefs.location.textContent = 'Requesting permission…';
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude, accuracy } = pos.coords;
                    liveRefs.location.textContent = `${latitude.toFixed(5)}, ${longitude.toFixed(5)} (±${Math.round(accuracy)} m)`;
                    showToast('Location detected');
                },
                err => { liveRefs.location.textContent = `Unavailable: ${err.message}`; },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        });
    }
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

/* ---- Live updates -------------------------------------------------------- */
function startLiveUpdates() {
    setInterval(() => {
        const now = new Date();
        if (liveRefs.clock) liveRefs.clock.textContent = formatClock(now);
        if (liveRefs.iso) liveRefs.iso.textContent = now.toISOString();
    }, 1000);

    window.addEventListener('resize', () => {
        if (liveRefs.viewport) liveRefs.viewport.textContent = `${window.innerWidth} × ${window.innerHeight}`;
        if (liveRefs.orientation) liveRefs.orientation.textContent = orientation();
    });

    const syncOnline = () => {
        if (liveRefs.online) liveRefs.online.textContent = navigator.onLine ? 'Online' : 'Offline';
    };
    window.addEventListener('online', syncOnline);
    window.addEventListener('offline', syncOnline);
}

/* ---- Draw + init --------------------------------------------------------- */
function draw() {
    render(buildData());
    bindDynamic();
}

document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    draw();
    startLiveUpdates();

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    document.getElementById('copyAll').addEventListener('click', () => {
        copyText(collectAllText(), 'All information copied');
    });

    document.getElementById('emailSupport').addEventListener('click', () => {
        const body = encodeURIComponent(collectAllText());
        const subject = encodeURIComponent('Browser & Device Information — support request');
        window.location.href = `mailto:support@compyra.com?subject=${subject}&body=${body}`;
    });

    document.getElementById('refreshBtn').addEventListener('click', () => {
        draw();
        showToast('Information refreshed');
    });
});
