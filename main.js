/* ================================================
   AUA & Associates — main.js  v4.1
   auaandassociates.co.in
   Hamburger | Form | Animations | UX
   Class-based global init — works on ALL pages
   FIXED: double-toggle bug (touchstart + click)
   ================================================ */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.from(document.querySelectorAll(sel)); };

  document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════
       1. NAVBAR SCROLL SHADOW
    ════════════════════════════════ */
    var navbar = $('.nav-primary') || $('#navbar');
    function onScroll() {
      if (!navbar) return;
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ════════════════════════════════
       2. HAMBURGER — bulletproof
       Uses a touchHandled flag to
       prevent the ghost click that
       fires after touchstart on iOS/Android,
       which was causing double-toggle.
    ════════════════════════════════ */
    var hamburger = $('.nav-hamburger');
    var navMenu   = $('.nav-menu');
    var menuOpen  = false;
    var touchHandled = false; /* prevents ghost click after touch */

    function openMenu() {
      if (!hamburger || !navMenu) return;
      menuOpen = true;
      navMenu.classList.add('open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!hamburger || !navMenu) return;
      menuOpen = false;
      navMenu.classList.remove('open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    /* touchstart on hamburger → toggle, set flag to block ghost click */
    document.addEventListener('touchstart', function (e) {
      if (!e.target.closest('.nav-hamburger')) return;
      e.preventDefault(); /* stop ghost click */
      touchHandled = true;
      menuOpen ? closeMenu() : openMenu();
    }, { passive: false });

    /* click on hamburger → only runs if NOT already handled by touch */
    document.addEventListener('click', function (e) {
      if (e.target.closest('.nav-hamburger')) {
        if (touchHandled) { touchHandled = false; return; } /* skip ghost click */
        menuOpen ? closeMenu() : openMenu();
        return;
      }
      /* Close on outside click */
      if (menuOpen && !e.target.closest('.nav-menu')) {
        closeMenu();
      }
    });

    /* Close nav links on tap (mobile) */
    $$('.nav-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 900) closeMenu();
      });
    });

    /* Mobile Services dropdown accordion */
    $$('.nav-dropdown > a').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (window.innerWidth >= 900) return;
        e.preventDefault();
        e.stopPropagation();
        var parent  = el.parentElement;
        var wasOpen = parent.classList.contains('open');
        $$('.nav-dropdown').forEach(function (d) { d.classList.remove('open'); });
        if (!wasOpen) parent.classList.add('open');
      });
    });

    /* Close menu on resize to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeMenu();
    });

    /* ════════════════════════════════
       3. ACTIVE NAV HIGHLIGHT
    ════════════════════════════════ */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav-menu > li > a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
    });

    /* ════════════════════════════════
       4. SMOOTH SCROLL
    ════════════════════════════════ */
    $$('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = $(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        var offset = (navbar ? navbar.offsetHeight : 72) + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      });
    });

    /* ════════════════════════════════
       5. BACK TO TOP
    ════════════════════════════════ */
    var topBtn = $('#back-to-top');
    if (topBtn) {
      window.addEventListener('scroll', function () {
        topBtn.classList.toggle('visible', window.scrollY > 500);
      }, { passive: true });
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ════════════════════════════════
       6. FAQ ACCORDION
    ════════════════════════════════ */
    $$('.faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var answer = btn.nextElementSibling;
        var isOpen = btn.classList.contains('open');
        $$('.faq-q').forEach(function (b) {
          b.classList.remove('open');
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) b.nextElementSibling.classList.remove('show');
        });
        if (!isOpen) {
          btn.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          if (answer) answer.classList.add('show');
        }
      });
    });

    /* ════════════════════════════════
       7. CONTACT FORM
       Primary  → WhatsApp (instant)
       Secondary → mailto  (backup)
       Routes to correct office based
       on 'office' select field
    ════════════════════════════════ */
    var form = $('#contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var fields = { name: $('#name'), phone: $('#phone'), service: $('#service') };
        var valid  = true;

        Object.values(fields).forEach(function (el) {
          if (!el) return;
          var bad = !el.value.trim() ||
                    (el === fields.phone && el.value.replace(/\D/g,'').length < 10);
          el.style.borderColor = bad ? '#dc2626' : '';
          el.style.background  = bad ? '#fef2f2' : '';
          if (bad) {
            valid = false;
            el.addEventListener('input', function () {
              el.style.borderColor = '';
              el.style.background  = '';
            }, { once: true });
          }
        });

        if (!valid) {
          var first = form.querySelector('[style*="dc2626"]');
          if (first) first.focus();
          return;
        }

        var name    = fields.name.value.trim();
        var phone   = fields.phone.value.trim();
        var service = fields.service.value.trim();
        var email   = $('#email')   ? $('#email').value.trim()   : '';
        var city    = $('#city')    ? $('#city').value.trim()    : '';
        var message = $('#message') ? $('#message').value.trim() : '';
        var office  = $('#office')  ? $('#office').value.trim()  : 'Chandigarh';

        var btn = form.querySelector('.form-submit');
        btn.disabled    = true;
        btn.textContent = 'Sending…';

        var waNum  = (office === 'Bareilly') ? '918938825555' : '916283153211';
        var mailTo = (office === 'Bareilly') ? 'auaandassociates.up@gmail.com' : 'auaandassociatestricity@gmail.com';

        var wa = 'Hello%20AUA%20%26%20Associates%2C%0A%0A' +
          '*New%20Website%20Enquiry*%0A' +
          'Name%20%20%20%20%3A%20'   + encodeURIComponent(name)                   + '%0A' +
          'Phone%20%20%20%3A%20'     + encodeURIComponent(phone)                  + '%0A' +
          'Email%20%20%20%3A%20'     + encodeURIComponent(email   || 'Not given')  + '%0A' +
          'Service%20%3A%20'         + encodeURIComponent(service)                 + '%0A' +
          'City%20%20%20%20%3A%20'   + encodeURIComponent(city    || 'Not given')  + '%0A' +
          'Office%20%20%3A%20'       + encodeURIComponent(office)                  + '%0A%0A' +
          'Message%20%3A%20'         + encodeURIComponent(message  || 'None');
        window.open('https://wa.me/' + waNum + '?text=' + wa, '_blank');

        var subj = encodeURIComponent('Enquiry from ' + name + ' — AUA & Associates');
        var body = encodeURIComponent(
          'New Enquiry\n========================================\n' +
          'Name    : ' + name    + '\nPhone   : ' + phone   + '\n' +
          'Email   : ' + (email   || 'Not given') + '\nService : ' + service + '\n' +
          'City    : ' + (city    || 'Not given') + '\nOffice  : ' + office  + '\n\n' +
          'Message :\n' + (message || 'None') + '\n\nSource: auaandassociates.co.in'
        );
        setTimeout(function () {
          window.location.href = 'mailto:' + mailTo + '?subject=' + subj + '&body=' + body;
        }, 1800);

        form.reset();
        btn.textContent      = '✓ Message sent! WhatsApp opened.';
        btn.style.background = '#16a34a';
        btn.disabled         = false;
        setTimeout(function () {
          btn.textContent      = 'Send Enquiry';
          btn.style.background = '';
        }, 8000);
      });
    }

    /* ════════════════════════════════
       8. SCROLL ANIMATIONS
    ════════════════════════════════ */
    if ('IntersectionObserver' in window) {
      var fadeObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('visible'); fadeObs.unobserve(en.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

      $$('.service-card,.value-card,.team-card,.why-box,.process-step,.faq-item,.contact-item,.info-card,.pricing-card,.footer-links,.office-card,.city-chip')
        .forEach(function (el, i) {
          el.classList.add('fade-up');
          el.style.transitionDelay = (i % 5) * 60 + 'ms';
          fadeObs.observe(el);
        });

      var secObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('revealed'); secObs.unobserve(en.target); }
        });
      }, { threshold: 0.05 });

      $$('.section-header,.why-content,.content-text,.contact-info')
        .forEach(function (el) { el.classList.add('slide-up'); secObs.observe(el); });
    }

  }); /* end DOMContentLoaded */

}());
