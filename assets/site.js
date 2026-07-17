(function () {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const stage = document.querySelector('[data-stage]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stage && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const frame = stage.querySelector('.hero-frame');
      if (frame) frame.style.transform = `rotateX(${4 - y * 8}deg) rotateY(${-12 + x * 10}deg) rotateZ(${5 - x * 3}deg) translateZ(0)`;
    });
    stage.addEventListener('pointerleave', () => {
      const frame = stage.querySelector('.hero-frame');
      if (frame) frame.style.transform = '';
    });
  }
}());
