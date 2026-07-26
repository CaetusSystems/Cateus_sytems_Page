// reveal on scroll — conteúdo já nasce visível se JS falhar (CSS default).
(function () {
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.card, .showcase__hero, .showcase__item, .ia__panel, .caetus__card, .cta-final');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    io.observe(el);
  });

  // Parallax leve no fundo fotográfico do hero
  const bg = document.querySelector('.page-bg-photo');
  if (bg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.15, 120);
        bg.style.transform = `translateY(${y}px) scale(1.02)`;
        ticking = false;
      });
    }, { passive: true });
  }

  // Carrossel da galeria: setas + auto-scroll contínuo
  const track = document.getElementById('gallery-track');
  const carousel = document.querySelector('.gallery-carousel');
  const prevBtn = document.querySelector('.gallery-nav--prev');
  const nextBtn = document.querySelector('.gallery-nav--next');
  if (track && carousel && prevBtn && nextBtn) {
    const cardStep = () => {
      const item = track.querySelector('.gallery__item');
      return item ? item.getBoundingClientRect().width + 18 : 260;
    };
    const scrollByCard = (dir) => {
      paused = true;
      track.classList.add('is-manual-scroll');
      track.scrollBy({ left: dir * cardStep(), behavior: 'smooth' });
    };
    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));

    let paused = false;
    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { paused = false; });
    track.addEventListener('pointerdown', () => { paused = true; track.classList.add('is-manual-scroll'); });
    track.addEventListener('touchstart', () => { paused = true; track.classList.add('is-manual-scroll'); }, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      const SPEED = 26; // px por segundo
      let lastTime = null;

      const tick = (time) => {
        if (lastTime === null) lastTime = time;
        const dt = (time - lastTime) / 1000;
        lastTime = time;

        if (!paused && !track.classList.contains('is-manual-scroll')) {
          const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
          if (atEnd) {
            track.scrollLeft = 0;
          } else {
            track.scrollLeft += SPEED * dt;
          }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }
})();
