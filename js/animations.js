const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitChars(el) {
  const t = el.textContent; el.textContent = '';
  [...t].forEach((c, i) => {
    const s = document.createElement('span'); s.className = 'ch'; s.textContent = c;
    s.style.transitionDelay = `${i * 45}ms`; el.appendChild(s);
  });
}

function initAnimations() {
  splitChars(document.getElementById('heroTitle'));
  const targets = document.querySelectorAll('[data-reveal], .clip-img, .split, .intro__text .w, .ring, .svc, .proj, .timeline li');
  if (reduceMotion || !('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.classList.contains('ring')) initCounters(e.target);
  }), { threshold: .2 });
  targets.forEach(t => io.observe(t));
}

function initCounters(scope = document) {
  scope.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
}

function initParallax() {
  const hero = document.getElementById('home');
  if (reduceMotion || matchMedia('(pointer: coarse)').matches) return;
  const items = hero.querySelectorAll('[data-depth]');
  let latestX = 0;
  let latestY = 0;
  let ticking = false;

  const render = () => {
    items.forEach(item => {
      const amount = Number(item.dataset.depth) || 0;
      item.style.setProperty('--parallax-x', `${latestX * amount}px`);
      item.style.setProperty('--parallax-y', `${latestY * amount}px`);
      if (!item.classList.contains('hero__photo')) item.style.translate = `${latestX * amount}px ${latestY * amount}px`;
    });
    ticking = false;
  };

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    latestX = (e.clientX - r.left) / r.width - .5;
    latestY = (e.clientY - r.top) / r.height - .5;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  });

  hero.addEventListener('mouseleave', () => {
    latestX = 0;
    latestY = 0;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  });
}

// Word-by-word scroll highlight for the intro statement
function initScrollWords() {
  const p = document.getElementById('introText'), words = p.querySelectorAll('.w');
  if (reduceMotion) { words.forEach(w => w.classList.add('lit')); return; }
  let ticking = false;
  const update = () => {
    const r = p.getBoundingClientRect(), vh = innerHeight;
    const prog = Math.min(Math.max((vh * .85 - r.top) / (r.height + vh * .3), 0), 1);
    const n = Math.round(prog * words.length);
    words.forEach((w, i) => w.classList.toggle('lit', i < n)); ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
