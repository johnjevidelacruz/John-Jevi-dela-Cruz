document.documentElement.classList.add('js');

(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const header = document.querySelector('[data-header]');
  const mobile = window.matchMedia('(max-width: 68rem)');

  if (!toggle || !nav || !header) return;

  const setLabel = (open) => {
    const label = toggle.querySelector('.sr-only');
    if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
  };

  const close = ({ returnFocus = false } = {}) => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    setLabel(false);
    if (returnFocus) toggle.focus();
  };

  const open = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    setLabel(true);
    nav.querySelector('a')?.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) close({ returnFocus: true });
    else open();
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobile.matches) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close({ returnFocus: true });
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (
      mobile.matches &&
      toggle.getAttribute('aria-expanded') === 'true' &&
      !header.contains(event.target)
    ) {
      close();
    }
  });

  mobile.addEventListener('change', () => close());
})();

(() => {
  const filterBar = document.querySelector('[data-filters]');
  const status = document.querySelector('[data-filter-status]');
  const cards = [...document.querySelectorAll('[data-case-card]')];

  if (!filterBar || !status || cards.length === 0) return;

  const labels = {
    all: 'all',
    people: 'People & performance',
    process: 'Process & SOP',
    systems: 'Systems & workflow',
    finance: 'Finance operations',
    data: 'Data & reporting',
    automation: 'Automation & AI'
  };

  filterBar.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (!selected) return;

    const value = selected.dataset.filter;
    let visible = 0;

    filterBar.querySelectorAll('[data-filter]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button === selected));
    });

    cards.forEach((card) => {
      const match = value === 'all' || card.dataset.categories.split(' ').includes(value);
      card.hidden = !match;
      if (match) visible += 1;
    });

    status.textContent = value === 'all'
      ? `Showing all ${visible} case studies.`
      : `Showing ${visible} case ${visible === 1 ? 'study' : 'studies'} for ${labels[value]}.`;
  });
})();

(() => {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const viewport = carousel.querySelector('.carousel-viewport');
    const slides = [...carousel.querySelectorAll('[data-carousel-item]')];
    const indicators = [...carousel.querySelectorAll('[data-carousel-indicator]')];
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const status = carousel.querySelector('[data-carousel-status]');
    let current = 0;
    let pointerStart = null;

    if (!track || !viewport || !previous || !next || slides.length === 0) return;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.toggleAttribute('inert', !active);
      });

      indicators.forEach((indicator, indicatorIndex) => {
        const active = indicatorIndex === current;
        indicator.classList.toggle('is-active', active);
        if (active) indicator.setAttribute('aria-current', 'true');
        else indicator.removeAttribute('aria-current');
      });

      if (status) status.textContent = `Slide ${current + 1} of ${slides.length}`;
    };

    previous.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));

    indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => show(Number(indicator.dataset.slideTo)));
    });

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(current - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + 1);
      }
    });

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse') pointerStart = event.clientX;
    });

    viewport.addEventListener('pointerup', (event) => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(distance) < 50) return;
      show(current + (distance < 0 ? 1 : -1));
    });

    viewport.addEventListener('pointercancel', () => {
      pointerStart = null;
    });

    show(0);
  });
})();

(() => {
  const form = document.querySelector('[data-contact-form]');
  if (!form || !window.fetch || !window.FormData) return;

  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');
  const initialButton = submit.innerHTML;

  const updateStatus = (message, type = '') => {
    status.textContent = message;
    status.classList.toggle('is-error', type === 'error');
    status.focus({ preventScroll: false });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    submit.disabled = true;
    submit.innerHTML = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = '';
    status.classList.remove('is-error');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Form delivery returned ${response.status}`);

      form.reset();
      updateStatus('Thank you. Your enquiry has been sent, and I will respond using the email you provided.');
    } catch (error) {
      updateStatus('Your enquiry could not be sent just now. Your details are still in the form. Please try again or use the direct email link.', 'error');
    } finally {
      submit.disabled = false;
      submit.innerHTML = initialButton;
      form.removeAttribute('aria-busy');
    }
  });
})();
