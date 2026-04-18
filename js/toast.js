// ============================================================
// toast.js — global toast notification system
// Usage: toast.success('Saved!') / toast.error('Failed') / toast.info('...')
// ============================================================

const toast = (() => {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(message, type = 'success', duration = 3500) {
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const c     = getContainer();
    const el    = document.createElement('div');

    el.className = `toast toast-${type}`;
    el.innerHTML = `
      <span class="toast-icon">${icons[type] || '●'}</span>
      <span>${message}</span>
    `;

    el.addEventListener('click', () => dismiss(el));
    c.appendChild(el);

    setTimeout(() => dismiss(el), duration);
    return el;
  }

  function dismiss(el) {
    if (!el || el.classList.contains('hiding')) return;
    el.classList.add('hiding');
    setTimeout(() => el.remove(), 300);
  }

  return {
    success: (msg, dur) => show(msg, 'success', dur),
    error:   (msg, dur) => show(msg, 'error',   dur),
    info:    (msg, dur) => show(msg, 'info',    dur),
  };
})();