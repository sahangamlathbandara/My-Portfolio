/* script.js
   Navigation toggle, scroll-based active link, reveal-on-scroll, and contact form handling.
   - Replace FORMSPREE_ENDPOINT with your Formspree endpoint (or integrate EmailJS)
   - Accessible, polite defaults and reduced-motion respect
*/

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Mobile nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });

  // Close nav when a link is clicked (mobile)
  document.querySelectorAll('.primary-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Active nav item on scroll ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
      }
    });
  }, { root: null, threshold: 0.55 });

  sections.forEach(s => io.observe(s));

  // --- Reveal on scroll for elements with .reveal ---
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
  }

  // --- Contact form handling (Formspree example) ---
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = '';

      if (!form.checkValidity()) {
        statusEl.textContent = 'Please fill out the form correctly.';
        return;
      }

      const data = new FormData(form);

      // TODO: replace this with your actual Formspree endpoint
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/yourFormId';

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST', body: data, headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl.textContent = 'Thanks — your message has been sent.';
          form.reset();
        } else {
          const json = await res.json().catch(() => ({}));
          statusEl.textContent = json?.error || 'There was a problem sending your message.';
        }
      } catch (err) {
        console.error('Form submit error', err);
        statusEl.textContent = 'Network error. Please try again later.';
      }
    });
  }

// Horizontal background carousel for Hero
const heroTrack = document.querySelector('.hero-carousel .carousel-track');
const heroSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
let heroIndex = 0;
const heroTotal = heroSlides.length;

function showNextHeroSlide() {
  heroIndex = (heroIndex + 1) % heroTotal;
  const offset = -heroIndex * 100;
  heroTrack.style.transform = `translateX(${offset}%)`;
}

// Auto-slide every 4 seconds
setInterval(showNextHeroSlide, 4000);



});
