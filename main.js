// AUA & Associates — main.js

// Sticky navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// Dropdown on mobile tap
document.querySelectorAll('.dropdown > a').forEach(el => {
  el.addEventListener('click', e => {
    if (window.innerWidth < 680) {
      e.preventDefault();
      el.parentElement.classList.toggle('open');
    }
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.classList.remove('open');
      if (b.nextElementSibling) b.nextElementSibling.classList.remove('show');
    });
    if (!isOpen) {
      btn.classList.add('open');
      answer?.classList.add('show');
    }
  });
});

// Contact form submit
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent! We\'ll contact you shortly.';
  btn.style.background = '#16a34a';
  contactForm.reset();
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 5000);
});

// Active nav link highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
