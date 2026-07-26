/* Café Oud Stuivenberge — main.js
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
  // Open Thu(4)–Sun(0), 10:00–23:00. Closed Mon(1), Tue(2), Wed(3).
  // NOTE: update these together with the table in index.html and the JSON-LD.
  var OPEN_DAYS = { 4: true, 5: true, 6: true, 0: true };
  var OPEN_MIN = 10 * 60, CLOSE_MIN = 23 * 60;

  var now = new Date();
  var day = now.getDay();
  var minutes = now.getHours() * 60 + now.getMinutes();

  var todayRow = document.querySelector('.hours-table tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add("today");

  var isOpen = OPEN_DAYS[day] && minutes >= OPEN_MIN && minutes < CLOSE_MIN;

  function setStatus(el, dotEl) {
    if (!el) return;
    if (isOpen) {
      el.textContent = "Nu open · tot 23u00";
      if (dotEl) dotEl.classList.remove("closed");
    } else {
      el.textContent = "Nu gesloten";
      if (dotEl) dotEl.classList.add("closed");
    }
  }

  var statusText = document.getElementById("statusText");
  var statusBadge = document.getElementById("statusBadge");
  setStatus(statusText, statusBadge ? statusBadge.querySelector(".dot") : null);

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
})();
