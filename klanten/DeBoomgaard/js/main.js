/* Resto De Boomgaard — main.js
   Progressive enhancements only. The site works fully without JavaScript. */
(function () {
  "use strict";

  // Current year in footer
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header shadow on scroll
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Opening hours: highlight today + live open/closed status.
  // Open Tue(2)–Fri(5), 08:30–17:30. Closed Mon(1), Sat(6), Sun(0).
  var OPEN_DAYS = { 2: true, 3: true, 4: true, 5: true };
  var OPEN_MIN = 8 * 60 + 30, CLOSE_MIN = 17 * 60 + 30;

  var now = new Date();
  var day = now.getDay();
  var minutes = now.getHours() * 60 + now.getMinutes();

  var todayRow = document.querySelector('.hours-table tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add("today");

  var isOpen = OPEN_DAYS[day] && minutes >= OPEN_MIN && minutes < CLOSE_MIN;

  function setStatus(el, dotEl) {
    if (!el) return;
    if (isOpen) {
      el.textContent = "Nu open · tot 17u30";
      if (dotEl) dotEl.classList.remove("closed");
    } else {
      el.textContent = "Nu gesloten";
      if (dotEl) dotEl.classList.add("closed");
    }
  }

  var statusText = document.getElementById("statusText");
  var statusBadge = document.getElementById("statusBadge");
  setStatus(statusText, statusBadge ? statusBadge.querySelector(".dot") : null);

  var openStatus = document.getElementById("openStatus");
  if (openStatus && isOpen) {
    var heroDot = openStatus.parentElement.querySelector(".dot");
    openStatus.textContent = "Nu open · vandaag tot 17u30";
    if (heroDot) heroDot.classList.remove("closed");
  }

  // Menu category tabs: open the target <details> before scrolling to it.
  var tabs = document.querySelectorAll(".menu-tab");
  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var target = document.querySelector(id);
      if (target && target.tagName === "DETAILS") target.open = true;
    });
  });

  // Open a category automatically when the page is opened with a matching #hash.
  function openHashTarget() {
    if (!location.hash) return;
    var target;
    try { target = document.querySelector(location.hash); } catch (e) { return; }
    if (target && target.tagName === "DETAILS") {
      target.open = true;
      target.scrollIntoView();
    }
  }
  openHashTarget();
  window.addEventListener("hashchange", openHashTarget);

  // Lightbox gallery
  var gallery = document.getElementById("gallery");
  var lightbox = document.getElementById("lightbox");
  if (gallery && lightbox) {
    var lbImg = document.getElementById("lightboxImg");
    var items = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-item"));
    var current = 0;
    var lastFocus = null;

    function show(i) {
      current = (i + items.length) % items.length;
      var btn = items[current];
      var img = btn.querySelector("img");
      lbImg.src = btn.getAttribute("data-full");
      lbImg.alt = img ? img.alt : "";
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      document.getElementById("lightboxClose").focus();
    }
    function close() {
      lightbox.hidden = true;
      lbImg.src = "";
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (btn, i) {
      btn.addEventListener("click", function () { open(i); });
    });
    document.getElementById("lightboxClose").addEventListener("click", close);
    document.getElementById("lightboxPrev").addEventListener("click", function () { show(current - 1); });
    document.getElementById("lightboxNext").addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });
  }
})();
