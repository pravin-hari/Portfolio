const $ = (s, r = document) => r.querySelector(s);
const D = portfolioData;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const links = (cls) => Object.entries(D.socialLinks).map(([n, u]) => `<li><a class="${cls}" href="${u}" target="_blank" rel="noopener" aria-label="${n}">${cls === 'sq' ? n.slice(0, 2) : n}</a></li>`).join('');

function renderContent() {
  const stat = (index, fallback = {}) => D.statistics?.[index] || fallback;
  const stat0 = stat(0, { value: D.experience?.length || 0, label: 'Internships' });
  const stat1 = stat(1, { value: D.projects?.length || 0, label: 'Projects built' });
  const bind = {
    name: D.name,
    nameUp: String(D.name || '').toUpperCase(),
    role: D.role,
    location: D.location,
    stat0v: `${stat0.value ?? ''}${stat0.suffix || ''}`,
    stat0l: stat0.label || '',
    stat1v: `${stat1.value ?? ''}${stat1.suffix || ''}`,
    stat1l: stat1.label || ''
  };

  document.querySelectorAll('[data-bind]').forEach(el => {
    const value = bind[el.dataset.bind];
    el.textContent = value == null ? '' : value;
  });

  const cv = $('#cvBtn');
  if (D.resume) cv.href = D.resume;
  else cv.removeAttribute('href');

  $('#navSocial').innerHTML = links('sq');
  $('#menuSocial').innerHTML = links('');
  $('#introText').innerHTML = String(D.intro || '').split(' ').map(w => `<span class="w">${esc(w)}</span>`).join(' ');
  $('#aboutText').innerHTML = (D.about || []).map(p => `<p>${esc(p)}</p>`).join('');
  $('#statsList').innerHTML = (D.statistics || []).map(s => `<li><b data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || '')}">0</b><span>${esc(s.label || '')}</span></li>`).join('');

  const internshipCount = $('#internshipCount');
  if (internshipCount) {
    const internships = Number(stat0.value) || D.experience?.length || 0;
    internshipCount.dataset.count = internships;
    internshipCount.textContent = '0';
  }

  $('#timeline').innerHTML = (D.experience || []).map(e => `<li><h3>${esc(e.org)}</h3><p class="muted">${esc(e.role)} · ${esc(e.place)}</p><p>${esc(e.text)}</p></li>`).join('');
  $('#svcMarquee').innerHTML = Array(4).fill('<span>Services</span><i>/</i>').join('');
  $('#svcList').innerHTML = (D.services || []).map((s, i) => `<li class="svc"><div class="svc__n">${String(i + 1).padStart(2, '0')}</div><div class="svc__body"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><div class="tags">${(s.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</div></div><span class="svc__arrow" aria-hidden="true">↗</span></li>`).join('');
  $('#worksGrid').innerHTML = (D.projects || []).map((p, i) => `<button type="button" class="proj proj--${esc(p.size || 'm')}" data-i="${i}" aria-label="Open ${esc(p.title)}"><div class="proj__vis"><span class="proj__ghost" aria-hidden="true">${esc(p.title.split(' ')[0])}</span></div><div class="proj__info"><span>${esc(p.category)} · ${esc(p.year)}</span><h3>${esc(p.title)}</h3><em>${(p.stack || []).map(esc).join(', ')}</em></div><b class="proj__arrow" aria-hidden="true">↗</b></button>`).join('');

  const row = (D.skills || []).map(s => `<span>${esc(s)}</span>`).join('');
  $('#skillMarquee').innerHTML = row + row;

  const c = [
    ['Email', D.email, D.email ? `mailto:${D.email}` : ''],
    ['Phone', D.phone, D.phone ? `tel:${D.phone.replace(/\s/g, '')}` : ''],
    ['Location', D.location, ''],
    ...Object.entries(D.socialLinks || {}).map(([n, u]) => [n, String(u).replace('https://www.', '').replace('https://', ''), u])
  ];
  $('#contactList').innerHTML = c.map(([k, v, h]) => `<li><span>${esc(k)}</span>${h ? `<a href="${esc(h)}" ${String(h).startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(v)}</a>` : esc(v)}</li>`).join('');
}

function initNavigation() {
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('nav--scrolled', scrollY > 10), { passive: true });
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault();
    t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
}

function initMobileMenu() {
  const btn = $('#menuBtn'), menu = $('#menu');
  const set = open => {
    if (open) menu.hidden = false;
    requestAnimationFrame(() => menu.classList.toggle('open', open));
    btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('no-scroll', open);
    if (!open) setTimeout(() => { if (!menu.classList.contains('open')) menu.hidden = true; }, 600);
  };
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a[href^="#"]')) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); btn.focus(); } });
}

function initPortfolio() {
  const modal = $('#modal');
  let last;

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
    last?.focus();
  };

  $('#worksGrid').addEventListener('click', e => {
    const b = e.target.closest('.proj');
    if (!b) return;
    const p = D.projects?.[Number(b.dataset.i)];
    if (!p) return;
    last = b;
    modal.innerHTML = `<div class="modal__panel"><button type="button" class="icon-btn modal__x" aria-label="Close project">✕</button>
      <span class="muted">${esc(p.category)} · ${esc(p.year)}</span><h2 id="mTitle">${esc(p.title)}</h2><p class="lead">${esc(p.description)}</p>
      <div class="modal__cols"><div><h3>Problem</h3><p>${esc(p.problem)}</p></div><div><h3>Solution</h3><p>${esc(p.solution)}</p></div></div>
      <h3>Features</h3><ul>${(p.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      <h3>Technologies</h3><div class="tags">${(p.stack || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="modal__links"><a class="btn btn--dark" href="${esc(p.github || '#')}" target="_blank" rel="noopener">GitHub</a>${p.demo ? `<a class="btn btn--lime" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>` : ''}</div></div>`;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    $('.modal__x', modal).focus();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('.modal__x')) close();
  });

  addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}


function initContactForm() {
    const f = $('#form');
    const status = $('#formStatus');

    if (!f) {
        console.warn('Contact form #form not found.');
        return;
    }

    const submit = f.querySelector('button[type="submit"]');

    const rules = {
        name: value =>
            value.trim()
                ? ''
                : 'Enter your name.',

        email: value =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                ? ''
                : 'Enter a valid email address.',

        message: value =>
            value.trim()
                ? ''
                : 'Write a short message.'
    };

    let sending = false;

    const validateField = (name) => {
        const el = f.elements[name];

        if (!el || !rules[name]) {
            return true;
        }

        const err = el.parentElement?.querySelector('.err');

        const message = rules[name](el.value);

        if (err) {
            err.textContent = message;
        }

        el.setAttribute(
            'aria-invalid',
            String(Boolean(message))
        );

        return !message;
    };

    // Live validation
    Object.keys(rules).forEach((name) => {
        const field = f.elements[name];

        if (!field) return;

        field.addEventListener('input', () => {
            validateField(name);

            if (status) {
                status.textContent = '';
            }
        });
    });

    // Use endpoint from data.js
    f.action = D.formEndpoint || '';

    f.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (sending) return;

        // Validate all fields
        const valid = Object.keys(rules)
            .map(validateField)
            .every(Boolean);

        if (!valid) {
            status.textContent =
                'Please fix the highlighted fields.';

            f.querySelector('[aria-invalid="true"]')?.focus();

            return;
        }

        // Make sure endpoint exists
        if (!D.formEndpoint) {
            status.textContent =
                `Contact form is not configured. Please email ${D.email}.`;

            return;
        }

        const formData = new FormData(f);

        // FormSubmit settings
        formData.set(
            '_subject',
            D.formSubject ||
            `New portfolio contact from ${D.name || 'your website'}`
        );

        formData.set(
            '_replyto',
            formData.get('email')
        );

        formData.set('_template', 'table');

        sending = true;

        if (submit) {
            submit.disabled = true;
            submit.textContent = 'Sending…';
        }

        status.textContent = 'Sending your message…';

        try {
            const response = await fetch(D.formEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            let result = null;

            try {
                result = await response.json();
            } catch {
                // Response wasn't JSON
            }

            console.log('FormSubmit response:', result);

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    `Request failed with status ${response.status}`
                );
            }

            if (result?.success === false) {
                throw new Error(
                    result.message ||
                    'FormSubmit rejected the submission.'
                );
            }

            // SUCCESS
            status.textContent =
                'Message sent successfully. I’ll get back to you soon.';

            f.reset();

            Object.keys(rules).forEach((name) => {
                const el = f.elements[name];

                if (!el) return;

                el.removeAttribute('aria-invalid');

                const err =
                    el.parentElement?.querySelector('.err');

                if (err) {
                    err.textContent = '';
                }
            });

        } catch (error) {
            console.error(
                'Contact form submission failed:',
                error
            );

            status.textContent =
                `Could not send the message. Please email ${D.email} instead.`;

        } finally {
            sending = false;

            if (submit) {
                submit.disabled = false;
                submit.textContent = 'Send message';
            }
        }
    });
}

function initBackToTop() {
  const b = $('#toTop'), go = () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  addEventListener('scroll', () => b.classList.toggle('show', scrollY > 500), { passive: true });
  document.querySelectorAll('[data-top]').forEach(x => x.addEventListener('click', go)); b.addEventListener('click', go);
}

function runLoader() {
  const pct = $('#pct'), t0 = performance.now(), min = reduceMotion ? 0 : 900;
  let loaded = document.readyState === 'complete';
  addEventListener('load', () => loaded = true);
  const tick = t => {
    const p = Math.min((t - t0) / min || 1, 1), shown = loaded ? p : Math.min(p, .9);
    pct.textContent = String(Math.round(shown * 100)).padStart(2, '0') + '%';
    if (loaded && p >= 1) { $('#loader').classList.add('done'); document.body.classList.remove('is-loading'); setTimeout(() => $('#loader').remove(), 1000); }
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
  renderContent(); initNavigation(); initMobileMenu(); initAnimations(); initScrollWords();
  initCounters(document.getElementById('statsList')); initParallax(); initPortfolio(); initContactForm(); initBackToTop(); runLoader();
});
