'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useInView from '@/hooks/useInView';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref, inView } = useInView({ once: true });

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay]);

  return (
    <section id="results" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:800, height:800, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div className="container-main" style={{ position:'relative' }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-purple-dim)', border:'1px solid rgba(139,92,246,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-purple)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-purple)' }}>Client Results</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Real businesses.<br />
            <span className="gradient-text">Real revenue.</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <div style={{ maxWidth:760, margin:'0 auto', marginBottom:48 }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4, ease:'easeOut' as const }}
              style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:24, padding:48, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg, #3B7BF8, #8B5CF6)' }} />
              {/* Stars */}
              <div style={{ display:'flex', gap:4, marginBottom:24 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="#F59E0B"><path d="M9 1l2.25 4.56L16.5 6.4l-3.75 3.65.885 5.16L9 12.7l-4.635 2.51L5.25 10.05 1.5 6.4l5.25-.84L9 1z"/></svg>
                ))}
              </div>
              <blockquote style={{ fontSize:'clamp(18px,2vw,22px)', color:'var(--text-primary)', lineHeight:1.6, fontStyle:'italic', marginBottom:32, quotes:'"\u201C""\u201D"' }}>
                &ldquo;{TESTIMONIALS[active].quote}&rdquo;
              </blockquote>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#3B7BF8,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700, color:'#fff' }}>
                    {TESTIMONIALS[active].initials}
                  </div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>{TESTIMONIALS[active].name}</div>
                    <div style={{ fontSize:13, color:'var(--text-muted)' }}>{TESTIMONIALS[active].title}, {TESTIMONIALS[active].business}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{TESTIMONIALS[active].city}</div>
                  </div>
                </div>
                <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, padding:'10px 20px', textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:800, color:'#22c55e' }}>{TESTIMONIALS[active].metric}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>Verified result</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        <div style={{ display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap' }}
          onMouseEnter={() => setAutoplay(false)} onMouseLeave={() => setAutoplay(true)}>
          {TESTIMONIALS.map((t, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ background: active===i ? 'var(--accent-blue)' : 'var(--bg-card)', border:`1px solid ${active===i ? 'var(--accent-blue)' : 'var(--border)'}`, borderRadius:12, padding:'10px 16px', cursor:'pointer', transition:'all 0.2s' }}>
              <div style={{ fontSize:13, fontWeight:600, color: active===i ? '#fff' : 'var(--text-secondary)', whiteSpace:'nowrap' }}>{t.name}</div>
              <div style={{ fontSize:11, color: active===i ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop:2 }}>{t.metric}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
