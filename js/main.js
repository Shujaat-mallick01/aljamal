/* =========================================================================
   Diwan Aljamal — salon template
   Vanilla JS, no build step. Everything it renders comes from site.config.js.
   ========================================================================= */
(function () {
  'use strict';

  var S = window.SITE;
  var LANGS = ['ar', 'en'];
  var lang = 'ar';
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- utilities */

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* private mode — the page works without it */ }
    return null;
  }

  // Resolve "ui.booking.title" against the config, then pick the language.
  function get(path) {
    var node = S, parts = String(path).split('.'), i;
    for (i = 0; i < parts.length; i++) {
      if (node == null) return '';
      node = node[parts[i]];
    }
    return pick(node);
  }
  function pick(node) {
    if (node == null) return '';
    if (typeof node === 'object' && (node.ar !== undefined || node.en !== undefined)) {
      return node[lang] !== undefined ? node[lang] : node.ar;
    }
    return node;
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function num(n) { return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB').format(n); }
  function money(n) { return num(n) + ' ' + pick(S.currency); }

  /* ------------------------------------------------- Riyadh time helpers */
  // Saudi Arabia is UTC+3 all year, so a fixed offset is exact and cheap.
  var RIYADH_OFFSET_MIN = 180;

  function riyadhNow() {
    var d = new Date(Date.now() + RIYADH_OFFSET_MIN * 60000);
    return {
      date: isoFromUTC(d),
      minutes: d.getUTCHours() * 60 + d.getUTCMinutes()
    };
  }
  function isoFromUTC(d) {
    return d.getUTCFullYear() + '-' + pad2(d.getUTCMonth() + 1) + '-' + pad2(d.getUTCDate());
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function toMinutes(hhmm) {
    var p = String(hhmm).split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1] || '0', 10);
  }
  function addDays(iso, days) {
    var p = iso.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    d.setUTCDate(d.getUTCDate() + days);
    return isoFromUTC(d);
  }
  function longDate(iso) {
    var p = iso.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    var loc = lang === 'ar' ? 'ar-EG-u-nu-latn-ca-gregory' : 'en-GB';
    return new Intl.DateTimeFormat(loc, {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
    }).format(d);
  }
  // 14:00 -> "2:00 م" / "2:00 PM". Slots past midnight are spelled out.
  function clockLabel(minutes, late) {
    var h24 = Math.floor(minutes / 60) % 24, m = minutes % 60;
    var h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    var t = num(h12) + ':' + (m < 10 ? '0' : '') + num(m);
    if (late) return lang === 'ar' ? t + ' ' + get('ui.booking.afterMidnight')
                                   : t + ' AM (' + get('ui.booking.afterMidnight') + ')';
    if (lang === 'ar') return t + (h24 < 12 ? ' ص' : ' م');
    return t + (h24 < 12 ? ' AM' : ' PM');
  }

  /* --------------------------------------------------------- brand setup */

  function applyTheme() {
    var root = document.documentElement, key;
    for (key in S.colors) {
      if (Object.prototype.hasOwnProperty.call(S.colors, key)) root.style.setProperty(key, S.colors[key]);
    }
    root.style.setProperty('--font-display-ar', S.fonts.displayAr);
    root.style.setProperty('--font-body-ar', S.fonts.bodyAr);
    root.style.setProperty('--font-display-en', S.fonts.displayEn);
    root.style.setProperty('--font-body-en', S.fonts.bodyEn);
    var theme = $('meta[name="theme-color"]');
    if (theme && S.colors['--bg']) theme.setAttribute('content', S.colors['--bg']);

    var logo = $('#brandLogo'), textMark = $('.brand-text');
    if (S.brand.logo) {
      logo.src = S.brand.logo;
      logo.width = S.brand.logoWidth || 1100;
      logo.height = S.brand.logoHeight || 360;
    } else {                       // no logo file — fall back to a wordmark
      logo.remove();
      textMark.hidden = false;
    }
  }

  function waLink(text) {
    return 'https://wa.me/' + S.contact.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  function applyContacts() {
    var wa = waLink(''), i;
    var waLinks = ['#fabWhats', '#closingWhats', '#visitWhats', '#footWhats', '#topWhats'];
    for (i = 0; i < waLinks.length; i++) { var n = $(waLinks[i]); if (n) n.href = wa; }

    $('#visitPhone').textContent = S.contact.whatsappDisplay;
    $('#footWhats').firstChild.textContent = S.contact.whatsappDisplay;

    var ig = S.contact.instagram || {};
    ['#visitInsta', '#footInsta', '#topInsta'].forEach(function (sel) {
      var a = $(sel);
      if (!a) return;
      if (ig.url) { a.href = ig.url; } else { a.removeAttribute('href'); }
    });
    $('#visitInstaH').textContent = ig.handle || '';
    $('#footInsta').firstChild.textContent = ig.handle || '';
    $('#topWhats').firstChild.textContent = S.contact.whatsappDisplay;
    $('#topInsta').firstChild.textContent = ig.handle || '';

    var sn = S.contact.snapchat || {};
    var snapSpan = $('#visitSnap'), footSnapLi = $('#footSnapLi');
    snapSpan.innerHTML = '';
    if (sn.handle) {
      var label = get('ui.visit.snapLabel') + ' ' + sn.handle;
      if (sn.url) {
        var a = el('a', null, label); a.href = sn.url; a.target = '_blank'; a.rel = 'noopener';
        snapSpan.appendChild(a);
      } else {
        snapSpan.textContent = label;
      }
      footSnapLi.hidden = false;
      $('#footSnap').textContent = sn.handle;
    } else {                        // handle not confirmed yet — say so, don't invent one
      snapSpan.textContent = get('ui.visit.snapLabel') + ' · ' + get('ui.visit.snapSoon');
      footSnapLi.hidden = true;
    }

    var map = $('#mapLink');
    if (S.contact.mapUrl) {
      map.href = S.contact.mapUrl;
      map.textContent = get('ui.visit.mapLink');
    } else {                        // no map link yet — say so instead of a dead link
      var span = el('span', 'maplink', get('ui.visit.mapSoon'));
      map.parentNode.replaceChild(span, map);
      span.id = 'mapLink';
    }
    $('#year').textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------ i18n ---- */

  function detectLang() {
    var qs = new URLSearchParams(window.location.search).get('lang');
    if (LANGS.indexOf(qs) > -1) return qs;
    var saved = store('diwan_lang');
    if (LANGS.indexOf(saved) > -1) return saved;
    return 'ar';
  }

  function applyLang(next) {
    lang = next;
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    store('diwan_lang', lang);

    $$('[data-i18n]').forEach(function (n) { n.textContent = get(n.dataset.i18n); });
    $$('[data-i18n-alt]').forEach(function (n) { n.alt = get(n.dataset.i18nAlt); });
    $$('[data-i18n-ph]').forEach(function (n) { n.placeholder = get(n.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach(function (n) { n.setAttribute('aria-label', get(n.dataset.i18nAria)); });

    document.title = get('seo.title');
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', get('seo.description'));
    var ogl = $('meta[property="og:locale"]');
    if (ogl) ogl.setAttribute('content', lang === 'ar' ? 'ar_SA' : 'en_US');

    var toggle = $('#langToggle');
    toggle.setAttribute('aria-label', get('ui.langSwitch'));
    $('span', toggle).textContent = get('ui.langLabel');

    renderAll();
  }

  /* ------------------------------------------------------------ nav ----- */

  function renderNav() {
    // '#navDesktop' takes bare links, '#navMobile' a fresh <ul>, '#footNav' is one already.
    [['#navDesktop', 'plain'], ['#navMobile', 'wrap'], ['#footNav', 'list']].forEach(function (pair) {
      var host = $(pair[0]);
      if (!host) return;
      host.innerHTML = '';
      var list = pair[1] === 'wrap' ? el('ul') : (pair[1] === 'list' ? host : null);
      S.ui.nav.forEach(function (item) {
        var a = el('a', null, pick(item.label));
        a.href = item.href;
        if (list) { var li = el('li'); li.appendChild(a); list.appendChild(li); }
        else host.appendChild(a);
      });
      if (list && list !== host) host.appendChild(list);
    });
  }

  function renderHeroFacts() {
    var host = $('#heroFacts');
    if (!host) return;
    host.innerHTML = '';
    (S.ui.hero.facts || []).forEach(function (f) { host.appendChild(el('li', null, pick(f))); });
  }

  /* --------------------------------------------------- hero status line - */

  function renderStatus() {
    var line = $('#statusLine');
    var now = riyadhNow();
    var open = toMinutes(S.hours.open), close = toMinutes(S.hours.close);
    var isOpen = close > open
      ? (now.minutes >= open && now.minutes < close)
      : (now.minutes >= open || now.minutes < close);   // closes after midnight
    line.className = 'status ' + (isOpen ? 'is-open' : 'is-closed');
    line.textContent = isOpen
      ? get('ui.statusOpen') + ' · ' + get('ui.statusClosesAt')
      : get('ui.statusClosed') + ' · ' + get('ui.statusOpensAt');
  }

  /* ----------------------------------------------- services (diwan menu) */

  var activeCat = null;

  function renderServices() {
    var tabs = $('#svcTabs'), panels = $('#svcPanels');
    tabs.innerHTML = ''; panels.innerHTML = '';
    if (!activeCat) activeCat = S.services[0].id;

    S.services.forEach(function (cat) {
      var on = cat.id === activeCat;

      var tab = el('button', 'tab', pick(cat.title));
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.setAttribute('aria-controls', 'panel-' + cat.id);
      tab.id = 'tab-' + cat.id;
      tab.tabIndex = on ? 0 : -1;
      tab.addEventListener('click', function () { activeCat = cat.id; renderServices(); });
      tab.addEventListener('keydown', function (e) {
        var i = S.services.map(function (c) { return c.id; }).indexOf(activeCat), n = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % S.services.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + S.services.length) % S.services.length;
        if (n === null) return;
        e.preventDefault();
        activeCat = S.services[n].id;
        renderServices();
        var next = $('#tab-' + activeCat);
        if (next) next.focus();
      });
      tabs.appendChild(tab);

      var panel = el('div', 'diwan-panel' + (on ? ' is-on' : ''));
      panel.id = 'panel-' + cat.id;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'tab-' + cat.id);

      panel.appendChild(el('h3', 'diwan-cat', pick(cat.title)));
      if (cat.note) panel.appendChild(el('p', 'diwan-note', pick(cat.note)));

      var list = el('ul', 'verses');
      cat.items.forEach(function (item) {
        var li = el('li', 'verse');

        var line = el('div', 'verse-line');
        line.appendChild(el('span', 'verse-num', (cat.items.indexOf(item) + 1 < 10 ? '0' : '') + (cat.items.indexOf(item) + 1)));
        line.appendChild(el('span', 'verse-name', pick(item.name)));
        line.appendChild(el('span', 'verse-leader'));
        var price = el('span', 'verse-price');
        price.appendChild(el('span', 'from', get('ui.services.from') + ' '));
        price.appendChild(document.createTextNode(money(item.price)));
        price.appendChild(el('sup', null, '*'));
        line.appendChild(price);
        li.appendChild(line);

        var foot = el('div', 'verse-foot');
        foot.appendChild(el('p', 'verse-desc', pick(item.desc)));
        foot.appendChild(el('span', 'verse-dur', pick(item.duration)));
        var add = el('button', 'verse-add', get('ui.services.addBtn'));
        add.type = 'button';
        add.dataset.id = item.id;
        if (selected.indexOf(item.id) > -1) {
          add.classList.add('is-on');
          add.textContent = get('ui.services.addedBtn');
        }
        add.addEventListener('click', function () {
          toggleService(item.id);
          renderServices();
          if (selected.indexOf(item.id) > -1) {
            var box = $('#booking');
            if (box) box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
          }
        });
        foot.appendChild(add);
        li.appendChild(foot);
        list.appendChild(li);
      });
      panel.appendChild(list);
      panels.appendChild(panel);
    });
    initReveal();
  }

  /* --------------------------------------------------------- brides ----- */

  function renderBrides() {
    var host = $('#packs');
    host.innerHTML = '';
    S.bridal.packages.forEach(function (p) {
      var box = el('article', 'pack');
      var head = el('div', 'pack-head');
      head.appendChild(el('h3', 'pack-name', pick(p.name)));
      var price = el('p', 'pack-price');
      price.appendChild(document.createTextNode(money(p.price)));
      price.appendChild(el('sup', null, '*'));
      head.appendChild(price);
      box.appendChild(head);
      box.appendChild(el('p', 'pack-line', pick(p.line)));
      if (p.duration) box.appendChild(el('p', 'pack-dur', pick(p.duration)));
      var ul = el('ul', 'pack-inc');
      pick(p.includes).forEach(function (t) { ul.appendChild(el('li', null, t)); });
      box.appendChild(ul);
      var pick_btn = el('button', 'pack-cta', get('ui.booking.pickPack'));
      pick_btn.type = 'button';
      pick_btn.addEventListener('click', function () { choosePackage(p.id); });
      box.appendChild(pick_btn);
      host.appendChild(box);
    });

    [['#bridesHero', 0], ['#bridesSide', 1]].forEach(function (pair) {
      var img = $(pair[0]), data = S.bridal.images[pair[1]];
      if (!img) return;
      if (!data) { img.closest('figure').hidden = true; return; }
      img.src = data.src; img.width = data.w; img.height = data.h; img.alt = pick(data.alt);
    });
  }

  /* --------------------------------------------------------- offers ----- */

  // "book this package" → bridal mode, that package selected, form in view
  function choosePackage(id) {
    var brideBtn = $('#typeSeg .seg-btn[data-type="bride"]');
    if (brideBtn && bookType !== 'bride') brideBtn.click();
    if (selectedPacks.indexOf(id) === -1) selectedPacks.push(id);
    renderPicks(); renderSummary();
    var form = $('#booking');
    if (form) form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function renderMarquee() {
    var host = $('#marquee');
    if (!host) return;
    host.innerHTML = '';
    var words = S.ui.marquee || [];
    // twice through, so the loop has no seam
    for (var pass = 0; pass < 2; pass++) {
      words.forEach(function (w) {
        host.appendChild(el('span', 'marquee-word', pick(w)));
        host.appendChild(el('span', 'marquee-dot', '·'));
      });
    }
  }

  function renderOffers() {
    var host = $('#offerList');
    host.innerHTML = '';
    S.offers.items.forEach(function (o, i) {
      var li = el('li', 'offer');
      li.appendChild(el('p', 'offer-num', String(i + 1).padStart(2, '0')));
      li.appendChild(el('h3', 'offer-title', pick(o.title)));
      li.appendChild(el('p', 'offer-detail', pick(o.detail)));
      li.appendChild(el('p', 'offer-ends', pick(o.ends)));
      host.appendChild(li);
    });
  }

  /* -------------------------------------------------------- gallery ----- */

  var galFilter = 'all';
  var galItems = [];
  var clipObservers = [];

  function renderGallery() {
    var filters = $('#galFilters'), host = $('#gallery');
    clipObservers.forEach(function (io) { io.disconnect(); });
    clipObservers = [];
    filters.innerHTML = ''; host.innerHTML = '';

    S.galleryFilters.forEach(function (f) {
      var b = el('button', 'filter', pick(f.label));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', f.id === galFilter ? 'true' : 'false');
      b.addEventListener('click', function () { galFilter = f.id; renderGallery(); });
      filters.appendChild(b);
    });

    galItems = S.gallery.filter(function (g) { return galFilter === 'all' || g.cat === galFilter; });

    galItems.forEach(function (g, i) {
      var tile = el('button', 'tile' + (g.type === 'video' ? ' tile-clip' : ''));
      tile.type = 'button';
      tile.setAttribute('aria-label', get('ui.work.open') + ' — ' + pick(g.alt));
      tile.addEventListener('click', function () { openLightbox(i); });

      if (g.type === 'video') {
        var v = document.createElement('video');
        v.src = g.src; v.poster = g.poster; v.muted = true; v.loop = true;
        v.playsInline = true; v.setAttribute('playsinline', '');
        v.setAttribute('muted', ''); v.preload = 'none';
        v.width = g.w; v.height = g.h;
        v.setAttribute('aria-label', pick(g.alt));
        tile.appendChild(v);
        watchVideo(v);
      } else {
        var img = document.createElement('img');
        img.src = g.src; img.width = g.w; img.height = g.h;
        img.loading = 'lazy'; img.decoding = 'async'; img.alt = pick(g.alt);
        tile.appendChild(img);
      }
      host.appendChild(tile);
    });
    initReveal();
  }

  // Clips only load and play while they are on screen, and never with
  // reduced motion on — the poster still carries the frame.
  function watchVideo(v) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!v.getAttribute('data-loaded')) { v.setAttribute('data-loaded', '1'); v.load(); }
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else { v.pause(); }
      });
    }, { rootMargin: '120px', threshold: 0.25 });
    io.observe(v);
    clipObservers.push(io);
  }

  /* ------------------------------------------------------- lightbox ----- */

  var lbIndex = 0, lastFocus = null;

  function openLightbox(i) {
    lbIndex = i;
    lastFocus = document.activeElement;
    paintLightbox();
    $('#lb').hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function closeLightbox() {
    $('#lb').hidden = true;
    $('#lbFig').innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function stepLightbox(d) {
    lbIndex = (lbIndex + d + galItems.length) % galItems.length;
    paintLightbox();
  }
  function paintLightbox() {
    var g = galItems[lbIndex], fig = $('#lbFig');
    fig.innerHTML = '';
    if (g.type === 'video') {
      var v = document.createElement('video');
      v.src = g.src; v.poster = g.poster; v.controls = true; v.loop = true;
      v.muted = true; v.playsInline = true; v.setAttribute('playsinline', '');
      v.setAttribute('aria-label', pick(g.alt));
      if (!reduceMotion) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      fig.appendChild(v);
    } else {
      var img = document.createElement('img');
      img.src = g.src; img.alt = pick(g.alt); img.width = g.w; img.height = g.h;
      fig.appendChild(img);
    }
  }

  /* -------------------------------------------------------- reviews ----- */

  function renderReviews() {
    var host = $('#reviewList');
    host.innerHTML = '';
    S.reviews.items.slice(0, 4).forEach(function (r) {
      var box = el('figure', 'review');
      box.appendChild(el('blockquote', 'review-text', '“' + pick(r.text) + '”'));
      var cap = el('figcaption', 'review-meta');
      cap.appendChild(el('span', 'review-name', pick(r.name)));
      cap.appendChild(document.createTextNode(pick(r.service)));
      box.appendChild(cap);
      host.appendChild(box);
    });
  }

  /* -------------------------------------------------------- booking ----- */

  var bookType = 'normal';
  var selected = [];          // service ids
  var selectedPacks = [];     // bridal package ids
  var slotMin = null;         // chosen slot, minutes from midnight of the chosen date
  var slotLate = false;

  function allServices() {
    var out = [];
    S.services.forEach(function (c) { c.items.forEach(function (i) { out.push(i); }); });
    return out;
  }
  function findService(id) {
    var list = allServices(), i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function findPack(id) {
    var i;
    for (i = 0; i < S.bridal.packages.length; i++) if (S.bridal.packages[i].id === id) return S.bridal.packages[i];
    return null;
  }
  function toggleService(id) {
    var i = selected.indexOf(id);
    if (i > -1) selected.splice(i, 1); else selected.push(id);
    renderPicks(); renderSummary();
  }
  function togglePack(id) {
    var i = selectedPacks.indexOf(id);
    if (i > -1) selectedPacks.splice(i, 1); else selectedPacks.push(id);
    renderPicks(); renderSummary();
  }

  function renderTrust() {
    var host = $('#trust');
    host.innerHTML = '';
    S.booking.trust.forEach(function (t) {
      var li = el('li');
      li.appendChild(el('b', null, pick(t.title)));
      li.appendChild(el('span', null, pick(t.body)));
      host.appendChild(li);
    });
  }

  function renderPicks() {
    var host = $('#pickGroups');
    host.innerHTML = '';

    if (bookType === 'bride') {
      var g = el('div', 'pick-group');
      g.appendChild(el('p', 'pick-title', get('ui.booking.packagesLabel')));
      var wrap = el('div', 'pick');
      S.bridal.packages.forEach(function (p) {
        wrap.appendChild(chip(p.id, pick(p.name), p.price, selectedPacks.indexOf(p.id) > -1, togglePack));
      });
      g.appendChild(wrap);
      host.appendChild(g);
    }

    S.services.forEach(function (cat) {
      var g = el('div', 'pick-group');
      g.appendChild(el('p', 'pick-title', pick(cat.title)));
      var wrap = el('div', 'pick');
      cat.items.forEach(function (item) {
        wrap.appendChild(chip(item.id, pick(item.name), item.price, selected.indexOf(item.id) > -1, toggleService));
      });
      g.appendChild(wrap);
      host.appendChild(g);
    });
  }

  function chip(id, label, price, on, onToggle) {
    var b = el('button', 'chip');
    b.type = 'button';
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.appendChild(document.createTextNode(label));
    b.appendChild(el('span', 'chip-price', money(price)));
    b.addEventListener('click', function () { onToggle(id); });
    return b;
  }

  function currentLines() {
    var lines = [];
    if (bookType === 'bride') {
      selectedPacks.forEach(function (id) {
        var p = findPack(id);
        if (p) lines.push({ name: pick(p.name), price: p.price });
      });
    }
    selected.forEach(function (id) {
      var s = findService(id);
      if (s) lines.push({ name: pick(s.name), price: s.price });
    });
    return lines;
  }

  function renderSummary() {
    var lines = currentLines();
    var total = lines.reduce(function (sum, l) { return sum + l.price; }, 0);
    countTo($('#sumTotal'), total);
    countTo($('#dockTotal'), total);
    $('#sumCur').textContent = pick(S.currency);
    $('#dockCur').textContent = pick(S.currency);
    dockCount = lines.length;
    updateDock();

    var list = $('#sumList');
    list.innerHTML = '';
    lines.forEach(function (l) {
      var li = el('li');
      li.appendChild(el('span', null, l.name));
      li.appendChild(el('span', 's-price', money(l.price)));
      list.appendChild(li);
    });
    $('#sumEmpty').hidden = lines.length > 0;
    $('#sumDeposit').hidden = bookType !== 'bride';
    $('#sumDeposit').textContent = get('ui.booking.depositNote');
  }

  // a short tween on the total reads as "something just changed"
  function countTo(node, value) {
    if (!node) return;
    var from = parseFloat(String(node.dataset.value || '0')) || 0;
    node.dataset.value = value;
    if (reduceMotion || from === value) { node.textContent = num(value); return; }
    var start = Date.now(), span = 420;
    function step() {
      if (String(node.dataset.value) !== String(value)) return;   // a newer total took over
      var t = Math.max(0, Math.min(1, (Date.now() - start) / span));
      var eased = 1 - Math.pow(1 - t, 3);
      node.textContent = num(Math.round(from + (value - from) * eased));
      if (t < 1) setTimeout(step, 16);
    }
    step();
  }

  function renderSlots() {
    var host = $('#slots');
    host.innerHTML = '';
    var dateVal = $('#fDate').value;
    var open = toMinutes(S.hours.open), close = toMinutes(S.hours.close);
    var step = S.booking.slotMinutes || 30;
    var span = close > open ? close - open : (24 * 60 - open) + close;
    var now = riyadhNow();
    var any = false;

    for (var offset = 0; offset < span; offset += step) {
      var mins = (open + offset) % (24 * 60);
      var late = open + offset >= 24 * 60;              // belongs to the next calendar day
      if (dateVal) {
        var dayDiff = daysBetween(now.date, dateVal) + (late ? 1 : 0);
        // keep a 30-minute lead time for same-day bookings
        if (dayDiff < 0 || (dayDiff === 0 && mins <= now.minutes + 30)) continue;
      }
      any = true;
      var btn = slotButton(mins, late);
      if (!reduceMotion) {
        btn.style.animation = 'slotIn .35s cubic-bezier(.22,.61,.36,1) both';
        btn.style.animationDelay = Math.min(300, host.childNodes.length * 14) + 'ms';
      }
      host.appendChild(btn);
    }

    if (dateVal && !any) {
      host.appendChild(el('p', 'hint', get('ui.booking.timeNone')));
      slotMin = null; slotLate = false;
    }
    updateMidnightHint();
  }

  function slotButton(mins, late) {
    var b = el('button', 'slot' + (late ? ' slot-late' : ''), clockLabel(mins, late));
    b.type = 'button';
    b.setAttribute('role', 'radio');
    var on = slotMin === mins && slotLate === late;
    b.setAttribute('aria-checked', on ? 'true' : 'false');
    b.addEventListener('click', function () {
      slotMin = mins; slotLate = late;
      $$('#slots .slot').forEach(function (n) { n.setAttribute('aria-checked', 'false'); });
      b.setAttribute('aria-checked', 'true');
      hide('#errTime');
      updateMidnightHint();
    });
    return b;
  }

  function updateMidnightHint() {
    var hint = $('#midnightHint');
    if (slotLate && $('#fDate').value) {
      hint.hidden = false;
      hint.textContent = get('ui.booking.afterMidnightHint') + ' ' + longDate(addDays($('#fDate').value, 1));
    } else {
      hint.hidden = true;
    }
  }

  function daysBetween(isoA, isoB) {
    var a = isoA.split('-'), b = isoB.split('-');
    var da = Date.UTC(+a[0], +a[1] - 1, +a[2]), db = Date.UTC(+b[0], +b[1] - 1, +b[2]);
    return Math.round((db - da) / 86400000);
  }

  /* ------------------------------------------------- phone + validation - */

  function normalisePhone(raw) {
    var d = String(raw || '').replace(/[^\d+]/g, '');
    if (d.indexOf('+') === 0) d = d.slice(1);
    if (d.indexOf('00') === 0) d = d.slice(2);
    if (/^9665\d{8}$/.test(d)) return d;
    if (/^05\d{8}$/.test(d)) return '966' + d.slice(1);
    if (/^5\d{8}$/.test(d)) return '966' + d;
    return null;
  }
  function show(sel, msg) {
    var n = $(sel);
    n.hidden = false;
    n.textContent = msg;
  }
  function hide(sel) { var n = $(sel); if (n) { n.hidden = true; n.textContent = ''; } }

  function validate() {
    ['#errName', '#errPhone', '#errDate', '#errTime', '#errServices', '#errWedding', '#errSummary']
      .forEach(hide);
    $$('.field input').forEach(function (n) { n.classList.remove('is-bad'); });

    var ok = true, first = null;
    var lines = currentLines();
    if (!lines.length) { show('#errServices', get('ui.booking.errServices')); ok = false; first = first || $('#pickGroups'); }

    var name = $('#fName').value.trim();
    if (name.length < 2) { show('#errName', get('ui.booking.errName')); $('#fName').classList.add('is-bad'); ok = false; first = first || $('#fName'); }

    var phone = normalisePhone($('#fPhone').value);
    if (!phone) { show('#errPhone', get('ui.booking.errPhone')); $('#fPhone').classList.add('is-bad'); ok = false; first = first || $('#fPhone'); }

    var date = $('#fDate').value;
    var today = riyadhNow().date;
    if (!date || daysBetween(today, date) < 0) { show('#errDate', get('ui.booking.errDate')); $('#fDate').classList.add('is-bad'); ok = false; first = first || $('#fDate'); }

    if (bookType === 'bride' && !$('#fWedding').value) {
      show('#errWedding', get('ui.booking.errWedding')); $('#fWedding').classList.add('is-bad'); ok = false; first = first || $('#fWedding');
    }
    if (slotMin === null) { show('#errTime', get('ui.booking.errTime')); ok = false; first = first || $('#slots'); }

    if (!ok) {
      show('#errSummary', get('ui.booking.errSummary'));
      if (first) {
        first.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(first.tagName)) first.focus({ preventScroll: true });
      }
    }
    return ok ? { name: name, phone: phone, date: date, lines: lines } : null;
  }

  function buildMessage(data) {
    var M = S.ui.msg;
    var apptDate = slotLate ? addDays(data.date, 1) : data.date;
    var lines = [];
    lines.push(pick(M.intro));
    lines.push(pick(M.type) + ': ' + (bookType === 'bride' ? get('ui.booking.typeBride') : get('ui.booking.typeNormal')));
    lines.push(pick(M.services) + ': ' + data.lines.map(function (l) { return l.name; }).join(' + '));
    lines.push(pick(M.date) + ': ' + longDate(apptDate));
    if (bookType === 'bride' && $('#fWedding').value) {
      lines.push(pick(M.wedding) + ': ' + longDate($('#fWedding').value));
    }
    lines.push(pick(M.time) + ': ' + clockLabel(slotMin, slotLate));
    lines.push(pick(M.name) + ': ' + data.name);
    lines.push(pick(M.phone) + ': ' + data.phone);
    var notes = $('#fNotes').value.trim();
    lines.push(pick(M.notes) + ': ' + (notes || pick(M.none)));
    var total = data.lines.reduce(function (s, l) { return s + l.price; }, 0);
    lines.push(pick(M.total) + ': ' + money(total) + ' ' + pick(M.approx));
    return lines.join('\n');
  }

  function bindBooking() {
    $$('#typeSeg .seg-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        bookType = b.dataset.type;
        $$('#typeSeg .seg-btn').forEach(function (n) {
          var on = n === b;
          n.classList.toggle('is-on', on);
          n.setAttribute('aria-checked', on ? 'true' : 'false');
        });
        $('#weddingField').hidden = bookType !== 'bride';
        $('#pickLegend').textContent = get('ui.booking.servicesLabel');
        renderPicks(); renderSummary();
      });
    });

    var date = $('#fDate');
    date.min = riyadhNow().date;
    date.addEventListener('change', function () { slotMin = null; slotLate = false; renderSlots(); hide('#errDate'); });

    $('#fName').addEventListener('input', function () { hide('#errName'); });
    $('#fPhone').addEventListener('input', function () { hide('#errPhone'); });

    $('#bookForm').addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#fCompany').value) return;           // honeypot: quietly ignore bots
      var data = validate();
      if (!data) return;
      var url = waLink(buildMessage(data));
      $('#doneLink').href = url;
      window.open(url, '_blank', 'noopener');
      $('#bookForm').hidden = true;
      $('#done').hidden = false;
      $('#done').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });

    $('#doneReset').addEventListener('click', function () {
      $('#done').hidden = true;
      $('#bookForm').hidden = false;
      $('#bookForm').reset();
      selected = []; selectedPacks = []; slotMin = null; slotLate = false;
      renderPicks(); renderSummary(); renderSlots(); renderServices();
      $('#bookForm').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });

    $('#brideCta').addEventListener('click', function () {
      var bride = $('#typeSeg .seg-btn[data-type="bride"]');
      if (bride && bookType !== 'bride') bride.click();
    });
  }

  /* ----------------------------------------------------------- chrome --- */

  function bindChrome() {
    var menuBtn = $('#menuToggle'), mnav = $('#mobileNav');
    menuBtn.addEventListener('click', function () {
      var open = mnav.hidden;
      mnav.hidden = !open;
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', get(open ? 'ui.closeMenu' : 'ui.openMenu'));
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mnav.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    $('#langToggle').addEventListener('click', function () {
      applyLang(lang === 'ar' ? 'en' : 'ar');
    });

    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', function () { stepLightbox(-1); });
    $('#lbNext').addEventListener('click', function () { stepLightbox(1); });
    $('#lb').addEventListener('click', function (e) { if (e.target === $('#lb')) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if ($('#lb').hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') stepLightbox(document.documentElement.dir === 'rtl' ? -1 : 1);
      if (e.key === 'ArrowLeft') stepLightbox(document.documentElement.dir === 'rtl' ? 1 : -1);
    });

    // nav highlight
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          $$('#navDesktop a').forEach(function (a) {
            a.setAttribute('aria-current', a.getAttribute('href') === '#' + entry.target.id ? 'true' : 'false');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['services', 'brides', 'offers', 'work', 'booking'].forEach(function (id) {
        var n = document.getElementById(id);
        if (n) io.observe(n);
      });
    }
  }

  /* ------------------------------------------------------------- boot --- */

  function renderAll() {
    applyContacts();
    renderNav();
    renderHeroFacts();
    renderStatus();
    renderServices();
    renderBrides();
    renderMarquee();
    renderOffers();
    renderGallery();
    renderReviews();
    renderTrust();
    renderPicks();
    renderSummary();
    renderSlots();
    $('#pickLegend').textContent = get('ui.booking.servicesLabel');
    initReveal();
  }

  /* ------------------------------------------------ motion & scroll UI -- */

  var pending = [];      // nodes waiting to be revealed
  var scrollQueued = false;

  // One reveal pass: mark and stagger. Re-run after every render.
  function initReveal() {
    if (reduceMotion) return;
    var groups = [
      '.hero-copy > *', '.services-head > *', '.services-side', '.verse',
      '.brides-copy > *', '.brides-fig2', '.pack', '.brides-foot > *',
      '.offers-head > *', '.offer', '.work-head > *', '.filters', '.tile',
      '.reviews-head > *', '.review', '.booking-head > *', '.trust li',
      '.form-main > *', '.summary', '.closing > *', '.visit-copy > *',
      '.visit-fig', '.foot-in > *'
    ];
    groups.forEach(function (sel) {
      $$(sel).forEach(function (node, i) {
        if (node.dataset.reveal !== undefined) return;
        node.dataset.reveal = '';
        node.style.setProperty('--rd', Math.min(320, i * 55) + 'ms');
        pending.push(node);
      });
    });
    scrollPass();
  }

  // Reveal everything that has reached the viewport, then drop it from the list.
  function runReveals() {
    if (!pending.length) return;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var still = [];
    for (var i = 0; i < pending.length; i++) {
      var node = pending[i];
      var box = node.getBoundingClientRect();
      var visible = box.width || box.height;   // display:none panels wait their turn
      if (visible && box.top < h * 0.94 && box.bottom > 0) node.classList.add('is-in');
      else still.push(node);
    }
    pending = still;
  }

  var headStuck = null;

  function scrollPass() {
    runReveals();

    var head = $('#head');
    var stuck = (window.scrollY || document.documentElement.scrollTop) > 8;
    if (head && stuck !== headStuck) { head.classList.toggle('is-stuck', stuck); headStuck = stuck; }

    var booking = document.getElementById('booking');
    if (booking) {
      var b = booking.getBoundingClientRect();
      var h = window.innerHeight || document.documentElement.clientHeight;
      bookingOnScreen = b.top < h * 0.85 && b.bottom > 0;
    }
    updateDock();
  }

  function onScrollOrResize() {
    if (scrollQueued) return;
    scrollQueued = true;
    setTimeout(function () { scrollQueued = false; scrollPass(); }, 60);
  }

  function bindScrollUI() {
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('orientationchange', onScrollOrResize);
    // a few passes early on, while fonts and images are still settling the layout
    [0, 120, 400, 900, 1800].forEach(function (t) { setTimeout(scrollPass, t); });
    // a slow safety tick: content must never be left invisible because a scroll
    // event went missing (embedded views, odd browsers, restored sessions)
    var ticks = 0;
    var timer = setInterval(function () {
      scrollPass();
      if (++ticks > 90 || !pending.length) {
        if (!pending.length) clearInterval(timer);
      }
      if (ticks > 90) { pending.forEach(function (n) { n.classList.add('is-in'); }); pending = []; clearInterval(timer); }
    }, 400);
  }

  /* ------------------------------------------------- mobile booking dock */

  var dockCount = 0, bookingOnScreen = false;

  function updateDock() {
    var dock = $('#dock');
    if (!dock) return;
    var show = dockCount > 0 && !bookingOnScreen && $('#done').hidden;
    dock.classList.toggle('is-up', show);
    dock.setAttribute('aria-hidden', show ? 'false' : 'true');
    var fab = $('#fabWhats');
    if (fab) fab.classList.toggle('is-raised', show);
  }

  applyTheme();
  bindChrome();
  bindBooking();
  bindScrollUI();
  applyLang(detectLang());
  setInterval(renderStatus, 60000);
})();
