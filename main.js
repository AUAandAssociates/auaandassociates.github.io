/* ================================================
   AUA & Associates — main.js  v4.0
   auaandassociates.co.in
   Hamburger | Form | Animations | UX
   Class-based global init — works on ALL pages
   ================================================ */
(function () {
  'use strict';

  /* ── helpers ── */
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.from(document.querySelectorAll(sel)); };

  /* ════════════════════════════════════════════════
     INIT — runs immediately on DOMContentLoaded
     Works regardless of page or directory depth
  ════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════
       1. NAVBAR SCROLL SHADOW
    ════════════════════════════════ */
    var navbar = $('.nav-primary');
    function onScroll() {
      if (!navbar) return;
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ════════════════════════════════
       2. HAMBURGER — Class-based
       Delegated to document so it
       initialises on EVERY page load.
    ════════════════════════════════ */
    var hamburger = $('.nav-hamburger');
    var navLinks  = $('.nav-menu');
    var menuOpen  = false;

    function openMenu() {
      if (!hamburger || !navLinks) return;
      menuOpen = true;
      navLinks.classList.add('open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!hamburger || !navLinks) return;
      menuOpen = false;
      navLinks.classList.remove('open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      menuOpen ? closeMenu() : openMenu();
    }

    /* Delegate to document — catches ALL pages */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.nav-hamburger');
      if (btn) { toggleMenu(e); return; }
      /* Close on outside click */
      if (menuOpen && !e.target.closest('.nav-menu') && !e.target.closest('.nav-hamburger')) {
        closeMenu();
      }
    });

    /* Also handle touchstart for iOS */
    document.addEventListener('touchstart', function (e) {
      var btn = e.target.closest('.nav-hamburger');
      if (btn) { toggleMenu(e); }
    }, { passive: false });

    /* Close on nav link tap (mobile) */
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
    ════════════════════════════════ */
    var form = $('#contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var fields  = { name: $('#name'), phone: $('#phone'), service: $('#service') };
        var valid   = true;

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

        var name    = fields.name    ? fields.name.value.trim()    : '';
        var phone   = fields.phone   ? fields.phone.value.trim()   : '';
        var service = fields.service ? fields.service.value.trim() : '';
        var email   = $('#email')   ? $('#email').value.trim()   : '';
        var city    = $('#city')    ? $('#city').value.trim()    : '';
        var message = $('#message') ? $('#message').value.trim() : '';
        var office  = $('#office')  ? $('#office').value.trim()  : 'Chandigarh';

        var btn = form.querySelector('.form-submit');
        btn.disabled    = true;
        btn.textContent = 'Sending…';

        /* Route to correct WhatsApp number based on office */
        var waNum = (office === 'Bareilly') ? '918938825555' : '916283153211';

        var wa = 'Hello%20AUA%20%26%20Associates%2C%0A%0A' +
          '*New%20Website%20Enquiry*%0A' +
          '--------------------------------%0A' +
          'Name%20%20%20%20%3A%20' + encodeURIComponent(name)    + '%0A' +
          'Phone%20%20%20%3A%20'   + encodeURIComponent(phone)   + '%0A' +
          'Email%20%20%20%3A%20'   + encodeURIComponent(email   || 'Not provided') + '%0A' +
          'Service%20%3A%20'       + encodeURIComponent(service)  + '%0A' +
          'City%20%20%20%20%3A%20' + encodeURIComponent(city    || 'Not provided') + '%0A' +
          'Office%20%20%3A%20'     + encodeURIComponent(office)   + '%0A%0A' +
          'Message%20%3A%20'       + encodeURIComponent(message  || 'No message');
        window.open('https://wa.me/' + waNum + '?text=' + wa, '_blank');

        /* mailto — secondary */
        var subj = encodeURIComponent('Enquiry from ' + name + ' — AUA & Associates');
        var body = encodeURIComponent(
          'New Enquiry — AUA & Associates Website\n' +
          '========================================\n\n' +
          'Name    : ' + name                       + '\n' +
          'Phone   : ' + phone                      + '\n' +
          'Email   : ' + (email   || 'Not provided') + '\n' +
          'Service : ' + service                    + '\n' +
          'City    : ' + (city    || 'Not provided') + '\n' +
          'Office  : ' + office                     + '\n\n' +
          'Message :\n' + (message || 'No message')  + '\n\n' +
          '========================================\n' +
          'Source: auaandassociates.co.in'
        );
        var mailTo = (office === 'Bareilly') ? 'auaandassociates.up@gmail.com' : 'auaandassociatestricity@gmail.com';
        setTimeout(function () {
          window.location.href = 'mailto:' + mailTo + '?subject=' + subj + '&body=' + body;
        }, 1800);

        form.reset();
        btn.textContent      = '✓ Sent! WhatsApp & Email opened.';
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
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            fadeObs.unobserve(en.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

      $$('.service-card,.value-card,.team-card,.why-box,.process-step,.faq-item,.contact-item,.info-card,.pricing-card,.footer-links,.office-card')
        .forEach(function (el, i) {
          el.classList.add('fade-up');
          el.style.transitionDelay = (i % 5) * 60 + 'ms';
          fadeObs.observe(el);
        });

      var secObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('revealed');
            secObs.unobserve(en.target);
          }
        });
      }, { threshold: 0.05 });

      $$('.section-header,.why-content,.content-text,.contact-info')
        .forEach(function (el) {
          el.classList.add('slide-up');
          secObs.observe(el);
        });
    }

  }); /* end DOMContentLoaded */

}());
