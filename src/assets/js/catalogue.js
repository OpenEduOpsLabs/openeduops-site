/* OpenEduOps — catalogue filters.

   Enhancement only. The complete catalogue is server-rendered; this script
   hides cards that do not match the current selection and keeps an accessible
   count in sync. Without it the filter bar is never shown (see 10-catalogue.css)
   and every tutorial stays visible and linked.
*/

(function () {
  'use strict';

  var root = document.getElementById('catalogue');
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll('[data-platform]'));
  var count = document.getElementById('catalogue-count');
  var empty = document.getElementById('catalogue-empty');
  var clears = document.querySelectorAll('[data-filter-clear]');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  if (!cards.length || !buttons.length) return;

  var state = { platform: 'all', responsibility: [] };

  /* ------------------------------------------------------------- reading - */
  function readUrl() {
    var params = new URLSearchParams(window.location.search);

    var platform = (params.get('platform') || 'all').toLowerCase();
    if (buttons.some(function (b) {
      return b.dataset.filter === 'platform' && b.dataset.value === platform;
    })) {
      state.platform = platform;
    }

    var responsibility = params.getAll('responsibility').join(',').toLowerCase();
    state.responsibility = responsibility
      .split(',')
      .map(function (v) { return v.trim(); })
      .filter(function (v) {
        return v && buttons.some(function (b) {
          return b.dataset.filter === 'responsibility' && b.dataset.value === v;
        });
      });
  }

  function writeUrl() {
    if (!window.history || !window.history.replaceState) return;
    var params = new URLSearchParams();
    if (state.platform !== 'all') params.set('platform', state.platform);
    state.responsibility.forEach(function (v) { params.append('responsibility', v); });
    var query = params.toString();
    window.history.replaceState(
      null,
      '',
      window.location.pathname + (query ? '?' + query : '') + window.location.hash
    );
  }

  /* ------------------------------------------------------------ applying - */
  function matches(card) {
    if (state.platform !== 'all' && card.dataset.platform !== state.platform) return false;
    if (state.responsibility.length &&
        state.responsibility.indexOf(card.dataset.responsibility) === -1) return false;
    return true;
  }

  function apply() {
    var shown = 0;

    cards.forEach(function (card) {
      var ok = matches(card);
      card.hidden = !ok;
      if (ok) shown += 1;
    });

    buttons.forEach(function (button) {
      var pressed = button.dataset.filter === 'platform'
        ? state.platform === button.dataset.value
        : state.responsibility.indexOf(button.dataset.value) !== -1;
      button.setAttribute('aria-pressed', String(pressed));
    });

    var filtered = state.platform !== 'all' || state.responsibility.length > 0;

    if (count) {
      count.textContent = filtered
        ? 'Showing ' + shown + ' of ' + cards.length + ' tutorials.'
        : 'Showing all ' + cards.length + ' tutorials.';
    }
    if (empty) empty.hidden = shown !== 0;

    clears.forEach(function (button) { button.disabled = !filtered; });
  }

  /* ------------------------------------------------------------- events -- */
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.value;

      if (button.dataset.filter === 'platform') {
        state.platform = value;
      } else {
        var at = state.responsibility.indexOf(value);
        if (at === -1) state.responsibility.push(value);
        else state.responsibility.splice(at, 1);
      }

      apply();
      writeUrl();
    });
  });

  clears.forEach(function (button) {
    button.addEventListener('click', function () {
      state.platform = 'all';
      state.responsibility = [];
      apply();
      writeUrl();
      var first = document.querySelector('[data-filter="platform"]');
      if (first) first.focus();
    });
  });

  readUrl();
  apply();
})();
