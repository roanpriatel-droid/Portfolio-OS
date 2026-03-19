'use client';
import { useEffect } from 'react';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const init = async () => {
      const { default: Lenis } = await import('lenis');
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.4 });
      lenis.on('scroll', ScrollTrigger.update);
      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => { lenis.destroy(); gsap.ticker.remove(ticker); };
    };
    init();
    return () => cleanup?.();
  }, []);
  return <>{children}</>;
}
