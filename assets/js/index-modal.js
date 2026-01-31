/* Home page: estimate form modal */
(function () {
  'use strict';

  function init() {
    var modal = document.getElementById('estimateModal');
    if (!modal) return;

    var openBtn = document.getElementById('openEstimateForm');
    var openHeading = document.getElementById('openEstimateFormHeading');
    var closeBtn = document.getElementById('closeEstimateModal');
    var backdrop = modal.querySelector('.modal-backdrop');

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (openHeading) {
      openHeading.style.cursor = 'pointer';
      openHeading.addEventListener('click', openModal);
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (modal.classList.contains('is-open')) closeModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
