/* ============================================
   AUA & Associates — main.js
   Complete UX fix: hamburger, form, WhatsApp
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── 2. HAMBURGER MENU (fully fixed) ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function openMenu() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.add('open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks && navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  /* Close menu when a nav link is tapped on mobile */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 680) closeMenu();
      });
    });
  }

  /* Close on outside tap */
  document.addEventListener('click', function (e) {
    if (navLinks && navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        hamburger && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* Mobile dropdown inside menu */
  document.querySelectorAll('.dropdown > a').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (window.innerWidth <= 680) {
        e.preventDefault();
        var parent = el.parentElement;
        var wasOpen = parent.classList.contains('open');
        document.querySelectorAll('.dropdown').forEach(function (d) {
          d.classList.remove('open');
        });
        if (!wasOpen) parent.classList.add('open');
      }
    });
  });

  /* ── 3. ACTIVE NAV LINK ── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > li > a').forEach(function (link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer  = btn.nextElementSibling;
      var isOpen  = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(function (b) {
        b.classList.remove('open');
        if (b.nextElementSibling) b.nextElementSibling.classList.remove('show');
      });
      if (!isOpen) {
        btn.classList.add('open');
        if (answer) answer.classList.add('show');
      }
    });
  });

  /* ── 5. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = (navbar ? navbar.offsetHeight : 72) + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ── 6. BACK TO TOP ── */
  var topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 7. CONTACT FORM — delivers via Email (mailto) + WhatsApp ── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* --- Validation --- */
      var nameEl    = document.getElementById('name');
      var phoneEl   = document.getElementById('phone');
      var serviceEl = document.getElementById('service');
      var valid     = true;

      [nameEl, phoneEl, serviceEl].forEach(function (el) {
        if (!el) return;
        var empty    = !el.value.trim();
        var badPhone = el === phoneEl && el.value.trim() &&
                       el.value.replace(/\D/g, '').length < 10;
        if (empty || badPhone) {
          el.style.borderColor = '#dc2626';
          el.style.background  = '#fef2f2';
          valid = false;
          el.addEventListener('input', function () {
            el.style.borderColor = '';
            el.style.background  = '';
          }, { once: true });
        }
      });

      if (!valid) {
        var firstErr = contactForm.querySelector('[style*="dc2626"]');
        if (firstErr) firstErr.focus();
        return;
      }

      /* --- Collect data --- */
      var name    = nameEl    ? nameEl.value.trim()    : '';
      var phone   = phoneEl   ? phoneEl.value.trim()   : '';
      var emailEl = document.getElementById('email');
      var email   = emailEl   ? emailEl.value.trim()   : '';
      var service = serviceEl ? serviceEl.value.trim() : '';
      var cityEl  = document.getElementById('city');
      var city    = cityEl    ? cityEl.value.trim()    : '';
      var msgEl   = document.getElementById('message');
      var message = msgEl     ? msgEl.value.trim()     : '';

      var btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled    = true;

      /* ---- PRIMARY: WhatsApp — opens instantly, 100% reliable ---- */
      var waText =
        'Hello AUA %26 Associates,%0A%0A' +
        '*New Enquiry from Website*%0A' +
        '-----------------------------%0A' +
        'Name%20%20%20%20: ' + encodeURIComponent(name)    + '%0A' +
        'Phone%20%20%20 : ' + encodeURIComponent(phone)   + '%0A' +
        'Email%20%20%20 : ' + encodeURIComponent(email   || 'Not provided') + '%0A' +
        'Service%20  : ' + encodeURIComponent(service)  + '%0A' +
        'City%20%20%20%20 : ' + encodeURIComponent(city    || 'Not provided') + '%0A%0A' +
        'Message%20 : ' + encodeURIComponent(message  || 'No message');
      window.open('https://wa.me/916283153211?text=' + waText, '_blank');

      /* ---- SECONDARY: mailto — opens email app as backup ---- */
      var subject = encodeURIComponent('New Enquiry from ' + name + ' — AUA & Associates Website');
      var body    = encodeURIComponent(
        'New Enquiry from AUA & Associates Website\n' +
        '==========================================\n\n' +
        'Name    : ' + name                   + '\n' +
        'Phone   : ' + phone                  + '\n' +
        'Email   : ' + (email   || 'Not provided') + '\n' +
        'Service : ' + service                + '\n' +
        'City    : ' + (city    || 'Not provided') + '\n\n' +
        'Message :\n' + (message || 'No message')  + '\n\n' +
        '==========================================\n' +
        'Sent from auaandassociates.github.io'
      );
      setTimeout(function () {
        window.location.href = 'mailto:auaandassociatestricity@gmail.com' +
                               '?subject=' + subject + '&body=' + body;
      }, 1800);

      /* ---- Show success ---- */
      contactForm.reset();
      btn.textContent      = '✓ Sent! WhatsApp & Email both opened.';
      btn.style.background = '#16a34a';
      btn.disabled         = false;
      setTimeout(function () {
        btn.textContent      = 'Send Enquiry';
        btn.style.background = '';
      }, 8000);
    });
  }

  /* ── 8. SCROLL FADE-IN ANIMATIONS ── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll(
      '.service-card, .value-card, .team-card, .why-box, ' +
      '.process-step, .faq-item, .contact-item, .info-card, ' +
      '.pricing-card, .footer-links'
    ).forEach(function (el, i) {
      el.classList.add('fade-up');
      el.style.transitionDelay = (i % 5) * 60 + 'ms';
      observer.observe(el);
    });

    var secObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          secObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll(
      '.section-header, .why-content, .content-text, .contact-info'
    ).forEach(function (el) {
      el.classList.add('slide-up');
      secObserver.observe(el);
    });
  }

}); /* end DOMContentLoaded */
