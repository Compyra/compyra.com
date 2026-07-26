/* 't Friet-uurtje Oedelem — kleine, dependency-vrije interacties */
(function () {
  "use strict";

  var doc = document;

  /* ---- Jaar in footer ---- */
  var yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Mobiel menu ---- */
  var nav = doc.getElementById("mainNav");
  var toggle = doc.getElementById("navToggle");
  var closeBtn = doc.getElementById("navClose");

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle) toggle.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---- Openingsuren: markeer vandaag + "nu open" indicator ---- */
  // Uren per weekdag (0 = zondag). Elk item is een lijst [openMin, closeMin]-blokken.
  // ⚠️ Placeholder-uren — bevestigen met de uitbater (zie todo.md).
  var HOURS = {
    0: [[690, 810], [1020, 1260]], // zo 11:30-13:30 · 17:00-21:00
    1: [],                          // ma gesloten
    2: [],                          // di gesloten
    3: [[690, 810], [1020, 1260]],
    4: [[690, 810], [1020, 1260]],
    5: [[690, 810], [1020, 1260]],
    6: [[690, 810], [1020, 1260]]
  };

  var now = new Date();
  var day = now.getDay();
  var minutes = now.getHours() * 60 + now.getMinutes();

  var todayRow = doc.querySelector('#hoursTable tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add("today");

  var isOpen = (HOURS[day] || []).some(function (b) {
    return minutes >= b[0] && minutes < b[1];
  });

  var openNowEl = doc.getElementById("openNow");
  if (openNowEl) {
    openNowEl.textContent = isOpen ? "Nu geopend" : "Nu gesloten";
    openNowEl.style.fontWeight = "700";
    openNowEl.style.color = isOpen ? "#1a8f3c" : "var(--red)";
  }

  /* ---- Actieve navigatie highlight bij scrollen ---- */
  var sections = Array.prototype.slice.call(doc.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.main-nav a[href^="#"]'));

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---- Scroll-reveal ---- */
  var reveals = Array.prototype.slice.call(doc.querySelectorAll(".reveal"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revObserver.observe(el); });
  }
})();
