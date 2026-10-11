import { useEffect } from 'react';

export default function usePageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const blocks = [...document.querySelectorAll('main > section:not(#accueil) > div')];
    // Only animate blocks when they enter the viewport. No hidden content if JS fails.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!reduced.matches) entry.target.classList.add('motion-enter');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    // Individual reveals keep the lower-page text moving when it actually becomes visible.
    const details = [...document.querySelectorAll('[data-motion]')];
    const detailObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!reduced.matches) entry.target.classList.add('motion-play');
          detailObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -35px 0px' });
    const generalBlocks = blocks.filter((block) => !block.closest('[data-motion-section]'));
    generalBlocks.forEach((block) => observer.observe(block));
    details.forEach((element) => detailObserver.observe(element));

    const cards = [...document.querySelectorAll('#priorites article, #actions article')];
    cards.forEach((card) => card.classList.add('depth-card'));
    function tilt(event) {
      if (reduced.matches || !finePointer.matches) return;
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 7}deg`);
      card.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 7}deg`);
    }
    function reset(event) {
      event.currentTarget.style.setProperty('--tilt-x', '0deg');
      event.currentTarget.style.setProperty('--tilt-y', '0deg');
    }
    cards.forEach((card) => {
      card.addEventListener('pointermove', tilt);
      card.addEventListener('pointerleave', reset);
    });
    return () => {
      observer.disconnect();
      detailObserver.disconnect();
      blocks.forEach((block) => block.classList.remove('motion-enter'));
      details.forEach((element) => element.classList.remove('motion-play'));
      cards.forEach((card) => {
        card.removeEventListener('pointermove', tilt);
        card.removeEventListener('pointerleave', reset);
      });
    };
  }, []);
}
