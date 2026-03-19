'use client';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const { ref, inView } = useInView({ once: true });

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPosition(x);
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-purple-dim)', border:'1px solid rgba(139,92,246,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-purple)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-purple)' }}>Transformation</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Before StratoSync.<br />
            <span className="gradient-text">After StratoSync.</span>
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:480, margin:'0 auto' }}>
            Drag the slider to see the difference we make.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, scale:0.97 }} animate={inView ? { opacity:1, scale:1 } : {}} transition={{ duration:0.8, ease:'easeOut' as const }}>
          <div ref={containerRef} style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'ew-resize', userSelect:'none', height:480, border:'1px solid var(--border)' }}
            onMouseDown={(e) => { dragging.current=true; updatePosition(e.clientX); }}
            onMouseMove={(e) => { if(dragging.current) updatePosition(e.clientX); }}
            onMouseUp={() => { dragging.current=false; }}
            onMouseLeave={() => { dragging.current=false; }}
            onTouchStart={(e) => { dragging.current=true; updatePosition(e.touches[0].clientX); }}
            onTouchMove={(e) => { if(dragging.current) updatePosition(e.touches[0].clientX); }}
            onTouchEnd={() => { dragging.current=false; }}>

            {/* BEFORE panel */}
            <div style={{ position:'absolute', inset:0, background:'#111', display:'flex', alignItems:'center', justifyContent:'center', padding:40 }}>
              <div style={{ width:'100%' }}>
                <div style={{ background:'#1a1a1a', borderRadius:12, padding:24, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:'#555', fontFamily:'monospace', marginBottom:12 }}>JimsbarbershopNY.wixsite.com/home</div>
                  <div style={{ height:20, background:'#2a2a2a', borderRadius:4, marginBottom:8, width:'60%' }} />
                  <div style={{ height:12, background:'#222', borderRadius:4, marginBottom:6, width:'90%' }} />
                  <div style={{ height:12, background:'#222', borderRadius:4, marginBottom:6, width:'75%' }} />
                  <div style={{ height:12, background:'#222', borderRadius:4, width:'85%' }} />
                </div>
                <div style={{ display:'flex', gap:12 }}>
                  {[1,2,3].map(k => (
                    <div key={k} style={{ flex:1, height:80, background:'#1a1a1a', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:11, color:'#444' }}>Page {k}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position:'absolute', top:20, left:20, background:'rgba(239,68,68,0.9)', borderRadius:8, padding:'6px 14px', fontSize:13, fontWeight:600, color:'#fff' }}>BEFORE</div>
            </div>

            {/* AFTER panel (clipped) */}
            <div style={{ position:'absolute', inset:0, clipPath:`inset(0 ${100-position}% 0 0)`, background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:40 }}>
              <div style={{ width:'100%' }}>
                <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:24, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'monospace', marginBottom:12 }}>ironcut.com</div>
                  <div style={{ height:20, background:'linear-gradient(90deg, #3B7BF8, #8B5CF6)', borderRadius:4, marginBottom:8, width:'60%' }} />
                  <div style={{ height:12, background:'var(--bg-secondary)', borderRadius:4, marginBottom:6, width:'90%' }} />
                  <div style={{ height:12, background:'var(--bg-secondary)', borderRadius:4, marginBottom:6, width:'75%' }} />
                  <div style={{ height:12, background:'var(--bg-secondary)', borderRadius:4, width:'85%' }} />
                </div>
                <div style={{ display:'flex', gap:12 }}>
                  {['📅 Book', '⭐ Reviews', '📍 Map'].map((label, k) => (
                    <div key={k} style={{ flex:1, height:80, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position:'absolute', top:20, left:20, background:'var(--accent-blue)', borderRadius:8, padding:'6px 14px', fontSize:13, fontWeight:600, color:'#fff' }}>AFTER</div>
            </div>

            {/* Divider line */}
            <div style={{ position:'absolute', top:0, bottom:0, left:`${position}%`, width:2, background:'#fff', transform:'translateX(-50%)', pointerEvents:'none' }}>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:40, height:40, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:16, marginTop:32 }}>
          {[
            { before:'1.2s/mo visits', after:'4,800+ visits', label:'Website Traffic' },
            { before:'0 leads/mo', after:'47 leads/mo', label:'Monthly Leads' },
            { before:'2.1★ Google', after:'4.8★ Google', label:'Review Rating' },
            { before:'$0 auto revenue', after:'$3,200+/mo', label:'Automated Revenue' },
          ].map((m, i) => (
            <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:20, textAlign:'center' }}>
              <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>{m.label}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
                <span style={{ fontSize:13, color:'#ef4444', textDecoration:'line-through' }}>{m.before}</span>
                <span style={{ color:'var(--text-muted)' }}>→</span>
                <span style={{ fontSize:14, fontWeight:700, color:'#22c55e' }}>{m.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
