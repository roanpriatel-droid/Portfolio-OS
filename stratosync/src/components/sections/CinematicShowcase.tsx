'use client';
import { useEffect, useRef } from 'react';

const slides = [
  { label:'01 — Website', headline:'48-Hour Website Delivery', sub:'Premium custom sites, live before your competitors finish their intake form.', color:'#3B7BF8' },
  { label:'02 — Automation', headline:'24/7 Lead Capture Engine', sub:'Never miss a call, a form, or a message again. Automations work while you sleep.', color:'#8B5CF6' },
  { label:'03 — Social Media', headline:'Brand That Commands Attention', sub:'Content that makes you look like you have a $50K/yr in-house creative team.', color:'#0D9488' },
];

export default function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import('gsap').default;
    let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'];
    const init = async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      gsap = gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const panels = containerRef.current?.querySelectorAll<HTMLElement>('.showcase-panel');
      if (!panels || !stickyRef.current) return;

      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.fromTo(panel, { yPercent: 100 }, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${(i / slides.length) * 100}% top`,
            end: `${((i + 1) / slides.length) * 100}% top`,
            scrub: true,
          },
        });
      });
    };
    init();
    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => ST.getAll().forEach(t => t.kill()));
    };
  }, []);

  return (
    <section style={{ height:`${slides.length * 100}vh`, position:'relative' }} ref={containerRef}>
      <div ref={stickyRef} style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
        {slides.map((slide, i) => (
          <div key={i} className="showcase-panel" style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
            {/* BG gradient */}
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 50%, ${slide.color}14 0%, transparent 70%)` }} />
            <div className="dot-grid" style={{ position:'absolute', inset:0, opacity:0.5 }} />

            <div className="container-main" style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
              <div>
                <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:slide.color, marginBottom:24 }}>{slide.label}</div>
                <h2 style={{ fontSize:'clamp(36px,4.5vw,64px)', fontWeight:800, color:'var(--text-primary)', lineHeight:1.1, marginBottom:24 }}>{slide.headline}</h2>
                <p style={{ fontSize:'clamp(16px,1.5vw,20px)', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:40 }}>{slide.sub}</p>
                <button style={{ display:'inline-flex', alignItems:'center', gap:10, background:slide.color, color:'#fff', border:'none', borderRadius:10, padding:'14px 28px', fontSize:16, fontWeight:600, cursor:'pointer' }}>
                  See how it works
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              {/* Visual panel */}
              <div style={{ background:'var(--bg-card)', border:`1px solid ${slide.color}33`, borderRadius:20, height:420, display:'flex', flexDirection:'column', overflow:'hidden' }}>
                {/* Mock browser bar */}
                <div style={{ padding:'12px 16px', borderBottom:`1px solid ${slide.color}22`, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:'#ff5f57', display:'block' }} />
                  <span style={{ width:10, height:10, borderRadius:'50%', background:'#febc2e', display:'block' }} />
                  <span style={{ width:10, height:10, borderRadius:'50%', background:'#28c840', display:'block' }} />
                  <div style={{ flex:1, height:24, background:'var(--bg)', borderRadius:6, marginLeft:8, display:'flex', alignItems:'center', paddingLeft:12 }}>
                    <span style={{ fontSize:11, color:'var(--text-muted)' }}>stratosync.io</span>
                  </div>
                </div>
                {/* Content area */}
                <div style={{ flex:1, padding:24, display:'flex', flexDirection:'column', gap:16 }}>
                  {[0,1,2,3].map(j => (
                    <div key={j} style={{ height:j===0?80:40, background:`${slide.color}0d`, borderRadius:8, border:`1px solid ${slide.color}18` }} />
                  ))}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:'auto' }}>
                    {[0,1].map(k => (
                      <div key={k} style={{ height:60, background:`${slide.color}18`, borderRadius:8, border:`1px solid ${slide.color}28`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ fontSize:22, fontWeight:700, color:slide.color }}>+{(k+1)*47}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
