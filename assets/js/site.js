/* Shared site scripts: year + theme toggle + mobile nav + current nav */
(function () {
  'use strict';

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function initYearStamp() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function initThemeToggle() {
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');
    if (!toggle || !icon) return;

    var stored = safeGet('theme');
    var prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;

    var theme = stored || (prefersLight ? 'light' : 'dark');

    function applyTheme() {
      root.setAttribute('data-theme', theme);
      icon.textContent = theme === 'light' ? '☀' : '☾';
    }

    applyTheme();

    toggle.addEventListener('click', function () {
      theme = theme === 'light' ? 'dark' : 'light';
      safeSet('theme', theme);
      applyTheme();
    });
  }

  function setCurrentNav() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length) return;

    var path = window.location.pathname.split('/').pop();
    if (!path) path = 'index.html';

    var isCasePage = path === 'case-studies.html' || path.indexOf('case-') === 0;

    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('is-current');
      links[i].removeAttribute('aria-current');
    }

    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute('href') || '';
      var normalized = href.split('#')[0].split('?')[0];

      if (isCasePage && normalized === 'case-studies.html') {
        links[j].classList.add('is-current');
        links[j].setAttribute('aria-current','page');
        return;
      }

      if (normalized && normalized === path) {
        links[j].classList.add('is-current');
        links[j].setAttribute('aria-current','page');
        return;
      }
    }
  }

  function initMobileNav() {
    var headerNav = document.querySelector('header .nav');
    var navLinks = document.querySelector('header .nav-links');
    var navActions = document.querySelector('header .nav-actions');
    if (!headerNav || !navLinks || !navActions) return;

    if (!navLinks.id) navLinks.id = 'primaryNav';

    // Avoid duplicates if a page includes a hard-coded toggle in the future.
    if (document.getElementById('mobileNavToggle')) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.id = 'mobileNavToggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-controls', navLinks.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';

    navActions.insertBefore(toggle, navActions.firstChild);

    function closeMenu() {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.tagName === 'A') closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!headerNav.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  initYearStamp();
  initThemeToggle();
  initMobileNav();
  setCurrentNav();
})();
