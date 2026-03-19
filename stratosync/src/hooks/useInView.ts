'use client';
import { useState, useEffect, useRef } from 'react';

export function useInView(options?: { threshold?: number; once?: boolean }) {
  const { threshold = 0.15, once = true } = options ?? {};
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); if (once) obs.disconnect(); }
      else if (!once) setInView(false);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

export default useInView;
