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

  // ── Ticker: clone items for seamless loop ─────────────────────────────────
  const tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    const tickerClone = tickerTrack.cloneNode(true);
    tickerClone.setAttribute('aria-hidden', 'true');
    tickerTrack.parentElement.appendChild(tickerClone);
  }

  // ── Roadmap Marquee: clone for seamless loop ──────────────────────────────
  const roadmapTrack = document.getElementById('roadmap-track');
  if (roadmapTrack) {
    const roadmapClone = roadmapTrack.cloneNode(true);
    roadmapClone.setAttribute('aria-hidden', 'true');
    roadmapTrack.parentElement.appendChild(roadmapClone);
  }

  // ── Counter Animation ──────────────────────────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-val').forEach(el => counterObserver.observe(el));

  // ── Infinite Marquee ───────────────────────────────────────────────────────
  const track = document.getElementById('testimonial-track');
  if (track) {
    // Clone all slides and append them to the track for seamless looping
    const slides = Array.from(track.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); // Accessibility: hide clones from screen readers
      track.appendChild(clone);
    });
  }

  // ── ROI Calculator ──────────────────────────────────────────────────────────
  const membersInput = document.getElementById('newMembers');
  const feeInput = document.getElementById('avgFee');
  const membersValDisp = document.getElementById('membersVal');
  const monthlyDisp = document.getElementById('monthlyRevenue');
  const yearlyDisp = document.getElementById('yearlyRevenue');

  function calculateROI() {
    if (!membersInput || !feeInput || !monthlyDisp || !yearlyDisp) return;
    
    const members = parseInt(membersInput.value) || 0;
    const fee = parseInt(feeInput.value) || 0;
    
    const monthly = members * fee;
    const yearly = monthly * 12;

    membersValDisp.textContent = members;
    
    // Format to Turkish Lira currency standard
    monthlyDisp.textContent = new Intl.NumberFormat('tr-TR').format(monthly) + ' TL';
    yearlyDisp.textContent = new Intl.NumberFormat('tr-TR').format(yearly) + ' TL';
  }

  if (membersInput && feeInput) {
    membersInput.addEventListener('input', calculateROI);
    feeInput.addEventListener('input', calculateROI);
    calculateROI(); // Initial calc
  }

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
