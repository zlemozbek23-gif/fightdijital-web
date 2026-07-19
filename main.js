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

  // ── Web3Forms Submit ───────────────────────────────────────────────────────
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Buton durumu
      submitBtn.textContent = 'GÖNDERİLİYOR...';
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const object   = Object.fromEntries(formData);
      const json     = JSON.stringify(object);

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    json
        });
        const data = await res.json();

        if (data.success) {
          successMsg.style.display = 'block';
          errorMsg.style.display   = 'none';
          form.reset();
          submitBtn.textContent = 'SAVAŞ PLANINI AL';
          submitBtn.disabled    = false;
        } else {
          throw new Error(data.message || 'Hata');
        }
      } catch (err) {
        errorMsg.style.display   = 'block';
        successMsg.style.display = 'none';
        submitBtn.textContent = 'SAVAŞ PLANINI AL';
        submitBtn.disabled    = false;
      }
    });
  }

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
