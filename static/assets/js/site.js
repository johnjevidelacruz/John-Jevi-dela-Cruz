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
      updateStatus('Your enquiry could not be sent just now. Your details are still in the form—please try again or use the direct email link.', 'error');
    } finally {
      submit.disabled = false;
      submit.innerHTML = initialButton;
      form.removeAttribute('aria-busy');
    }
  });
})();
