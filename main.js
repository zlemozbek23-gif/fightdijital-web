document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Animations ──────────────────────────────────────────────────────
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // ── Mobile Hamburger Menu ──────────────────────────────────────────────────
  const toggle   = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.textContent = isOpen ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Menüdeki linklere tıklayınca menü kapansın
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ── Smooth Scroll ──────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
