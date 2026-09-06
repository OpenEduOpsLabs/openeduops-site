/* OpenEduOps — progressive enhancement only.
   Every page is complete without this file. It adds:
     · the collapsed mobile menu and the Platforms disclosure,
     · the sticky-header background state,
     · optional section reveals.

   Rule for the reveals: an element is only ever hidden after this script has
   already committed to showing it again. Nothing is hidden by the stylesheet
   on its own, so a failed, blocked, or skipped enhancement cannot hide content.
*/

(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');
  var mobile = window.matchMedia('(max-width: 860px)');

  /* ------------------------------------------------------- mobile menu -- */
  function closeNav(refocus) {
    if (!header || !toggle) return;
    if (!header.classList.contains('nav-open')) return;
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (refocus) toggle.focus();
  }

  if (toggle && nav && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Following a link inside the panel closes it, but leaves focus with the
    // destination rather than yanking it back to the button.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav(true);
    });

    // Focus leaving the header entirely closes the panel; focus is never trapped.
    document.addEventListener('focusin', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) {
        closeNav(false);
      }
    });

    mobile.addEventListener('change', function () { closeNav(false); });
  }

  /* ------------------------------------------- Platforms disclosure ----- */
  var disclosures = document.querySelectorAll('[data-disclosure]');

  Array.prototype.forEach.call(disclosures, function (button) {
    var group = button.closest('.nav-group');
    if (!group) return;

    button.addEventListener('click', function () {
      var open = group.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });

    button.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && group.classList.contains('is-open')) {
        group.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });
  });

  // A click or focus outside an open submenu closes it. On mobile the submenu
  // is always expanded by CSS, so this is a no-op there.
  function closeDisclosures(target) {
    Array.prototype.forEach.call(document.querySelectorAll('.nav-group.is-open'), function (group) {
      if (target && group.contains(target)) return;
      group.classList.remove('is-open');
      var button = group.querySelector('[data-disclosure]');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', function (e) { closeDisclosures(e.target); });
  document.addEventListener('focusin', function (e) { closeDisclosures(e.target); });

  /* ------------------------------------------------------ sticky header - */
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------- section reveals -
     `reveal-pending` is the only thing that hides an element, and it is added
     here rather than in the stylesheet. Two ways back to visible:
       · reveal()      — drop the hiding class, let the transition fade it in.
       · revealNow()   — drop the transition too, so it appears instantly.
     Every failsafe uses revealNow, because a transition that never runs (a
     background tab, a throttled renderer, a print) must not be able to hold
     content at zero opacity. */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealables = document.querySelectorAll('.reveal');

  function reveal(el) {
    el.classList.remove('reveal-pending');
  }

  function revealNow(el) {
    el.classList.remove('reveal-motion');
    el.classList.remove('reveal-pending');
  }

  // Skip the enhancement entirely when it cannot be shown safely: reduced
  // motion, no observer, or a document that is not currently being rendered.
  if (revealables.length && !reduced.matches && 'IntersectionObserver' in window && !document.hidden) {
    var pending = [];

    var revealAllNow = function () {
      pending.forEach(revealNow);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealables, function (el) {
      // Anything already on screen — or already scrolled past — is never
      // hidden in the first place.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      el.classList.add('reveal-pending', 'reveal-motion');
      pending.push(el);
      io.observe(el);
    });

    // Last resort: anything still hidden after a few seconds appears instantly.
    window.setTimeout(revealAllNow, 4000);

    // A hidden tab freezes transitions. Do not leave anything mid-fade there.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) revealAllNow();
    });

    // Printing must never omit a section.
    window.addEventListener('beforeprint', revealAllNow);
  }
})();
