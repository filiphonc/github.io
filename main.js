/* ============================================================
   PORTFOLIO — main.js  (shared across all pages)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom cursor ───────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animCursor() {
    if (cursor && ring) {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(animCursor);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-row, .interest-card, .travel-item, .preview-card, .contact-tile, .stat-item')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '20px';
        cursor.style.height = '20px';
        ring.style.width    = '60px';
        ring.style.height   = '60px';
        ring.style.opacity  = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '10px';
        cursor.style.height = '10px';
        ring.style.width    = '36px';
        ring.style.height   = '36px';
        ring.style.opacity  = '0.5';
      });
    });

  /* ── Scroll-reveal ───────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => io.observe(r));

  /* ── Skill bars (skills.html only) ──────────────────── */
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const barIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.w;
          barIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barIO.observe(b));
  }

  /* ── Active nav link ─────────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Gallery lightbox ────────────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  if (lightbox && galleryItems.length) {
    const imgs = [...galleryItems].map(el => el.querySelector('img'));
    let current = 0;

    const open = (i) => {
      current = i;
      lbImg.src = imgs[i].src;
      lbImg.alt = imgs[i].alt;
      lbCounter.textContent = (i + 1) + ' / ' + imgs.length;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    const prev = () => open((current - 1 + imgs.length) % imgs.length);
    const next = () => open((current + 1) % imgs.length);

    galleryItems.forEach((item, i) => item.addEventListener('click', () => open(i)));
    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', prev);
    lbNext.addEventListener('click', next);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

});
