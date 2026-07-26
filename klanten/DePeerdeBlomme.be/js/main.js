/* Bistro De Peerdeblomme — main.js
   Small progressive enhancements only. Site works fully without JS. */
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
    // Close menu when a link is tapped
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

  // Opening hours: highlight today + live open/closed status
  // Open Wed(3)–Sun(0), 11:00–19:00. Closed Mon(1) & Tue(2).
  var OPEN_DAYS = { 0: true, 3: true, 4: true, 5: true, 6: true };
  var OPEN_HOUR = 11, CLOSE_HOUR = 19;

  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();

  var todayRow = document.querySelector('.hours-table tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add("today");

  var isOpen = OPEN_DAYS[day] && hour >= OPEN_HOUR && hour < CLOSE_HOUR;

  function setStatus(el, dotEl) {
    if (!el) return;
    if (isOpen) {
      el.textContent = "Nu open · tot 19u";
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
    openStatus.textContent = "Nu open · vandaag tot 19u";
    if (heroDot) heroDot.classList.remove("closed");
  }

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
