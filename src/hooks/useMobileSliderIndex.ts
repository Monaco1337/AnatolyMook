import { type RefObject, useEffect, useState } from 'react';

/**
 * Mobile-only horizontal slider — ermittelt anhand der Scroll-Position des Containers,
 * welches Kind-Element aktuell am nächsten zur Mitte ist (Pagination-Dots).
 * Auf Viewports ≥ maxViewport wird nicht gescrollt / nicht gemessen (Desktop-Grid).
 */
export function useMobileSliderIndex(
  ref: RefObject<HTMLElement | null>,
  count: number,
  /** z. B. 768 (= md): Slider nur unterhalb */
  maxViewport: number = 768
): number {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el || count <= 0) return;

    let raf = 0;
    let active = window.innerWidth < maxViewport;

    const compute = () => {
      raf = 0;
      const containerRect = el.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < children.length; i++) {
        const r = children[i].getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setIdx(best);
    };

    const onScroll = () => {
      if (!active) return;
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    const onResize = () => {
      active = window.innerWidth < maxViewport;
      if (active) compute();
    };

    compute();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [ref, count, maxViewport]);

  return idx;
}
