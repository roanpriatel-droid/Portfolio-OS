'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import { INDUSTRIES } from '@/lib/constants';

export default function IndustriesGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, inView } = useInView({ once: true });

  return (
    <section id="industries" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Industries</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            We specialize in<br />
            <span className="gradient-text">service businesses.</span>
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:520, margin:'0 auto' }}>
            Over 500 businesses across 10 industries. We know your competition, your customers, and what converts.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:16 }}>
          {INDUSTRIES.map((industry, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.4, delay:0.05*i, ease:'easeOut' as const }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ background:'var(--bg-card)', border:`1px solid ${hovered===i ? 'rgba(59,123,248,0.3)' : 'var(--border)'}`, borderRadius:16, padding:24, cursor:'default', transition:'all 0.2s', transform:hovered===i ? 'translateY(-2px)' : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{industry.icon}</span>
                <span style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)', background:'var(--bg)', borderRadius:100, padding:'3px 10px' }}>{industry.count}+ clients</span>
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)', marginBottom:8 }}>{industry.name}</h3>
              <p style={{ fontSize:13, color:'var(--accent-blue)', marginBottom:12, fontWeight:500 }}>{industry.benefit}</p>
              <div style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.5, borderTop:'1px solid var(--border)', paddingTop:12 }}>
                <span style={{ color:'#22c55e' }}>✓</span> {industry.caseStudy}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginTop:48 }}>
          <p style={{ fontSize:16, color:'var(--text-secondary)' }}>
            Don&apos;t see your industry?{' '}
            <a href="#contact" style={{ color:'var(--accent-blue)', fontWeight:600, textDecoration:'none' }}>Let&apos;s talk →</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
