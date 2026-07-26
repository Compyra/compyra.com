/* =========================================================
   't Zwarte Veld — script.js
   Mobile nav · scroll-spy · reveal · open/closed status
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  var backdrop;

  function createBackdrop() {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.addEventListener("click", closeNav);
    document.body.appendChild(backdrop);
  }

  function openNav() {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Menu sluiten");
    document.body.classList.add("nav-open");
    if (!backdrop) createBackdrop();
    backdrop.classList.add("show");
  }

  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menu openen");
    document.body.classList.remove("nav-open");
    if (backdrop) backdrop.classList.remove("show");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? closeNav() : openNav();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Scroll-spy (active nav link) ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Open / closed status ---------- */
  // Openingsuren (24h): vr vanaf 17:00, za vanaf 11:45, zo vanaf 11:45.
  // Sluitingsuur is een redelijke inschatting; pas gerust aan.
  var schedule = {
    5: { open: 17 * 60,      close: 22 * 60 },      // vrijdag
    6: { open: 11 * 60 + 45, close: 22 * 60 },      // zaterdag
    0: { open: 11 * 60 + 45, close: 21 * 60 }       // zondag
  };

  function updateStatus() {
    var el = document.getElementById("openStatus");
    if (!el) return;

    var now = new Date();
    var day = now.getDay();
    var minutes = now.getHours() * 60 + now.getMinutes();
    var today = schedule[day];
    var isOpen = today && minutes >= today.open && minutes < today.close;

    el.classList.remove("open", "closed");
    el.classList.add(isOpen ? "open" : "closed");

    var label;
    if (isOpen) {
      label = "Nu geopend — welkom!";
    } else if (today && minutes < today.open) {
      label = "Vandaag open vanaf " + fmt(today.open);
    } else {
      label = "Nu gesloten · reserveer op 0492 68 77 40";
    }
    el.innerHTML = '<span class="dot" aria-hidden="true"></span>' + label;
  }

  function fmt(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h + "u" + (m ? (m < 10 ? "0" + m : m) : "00");
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
