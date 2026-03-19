'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const steps = [
  { num:'01', icon:'🔍', title:'Free Audit Call', desc:'We review your online presence, identify your 3 biggest revenue leaks, and build you a custom growth roadmap — zero cost, zero commitment.', duration:'30 min call', color:'#3B7BF8' },
  { num:'02', icon:'📋', title:'Strategy & Proposal', desc:'You receive a detailed proposal with exact deliverables, timeline, and pricing. No vague "packages" — you know exactly what you\'re getting.', duration:'24 hours', color:'#8B5CF6' },
  { num:'03', icon:'🚀', title:'Build & Launch', desc:'We build everything while you run your business. Website, automations, social content — you get a staging link to review before anything goes live.', duration:'48hrs–7 days', color:'#0D9488' },
  { num:'04', icon:'📈', title:'Results & Iterate', desc:'We track every metric that matters. Monthly reporting, A/B testing, and continuous improvement. You see ROI or we work for free until you do.', duration:'Ongoing', color:'#F59E0B' },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ once: true });

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const cards = containerRef.current?.querySelectorAll<HTMLElement>('.step-card');
      cards?.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, x: i % 2 === 0 ? -40 : 40,
          scrollTrigger: { trigger: card, start:'top 85%', toggleActions:'play none none none' },
          duration: 0.6, delay: 0.1, ease:'power2.out',
        });
      });
    };
    init();
  }, []);

  return (
    <section id="how-it-works" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:80 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Process</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            From audit to revenue in<br />
            <span className="gradient-text">under 7 days.</span>
          </h2>
        </motion.div>

        <div ref={containerRef} style={{ position:'relative' }}>
          {/* Connecting line */}
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:2, background:'var(--border)', transform:'translateX(-50%)', zIndex:0 }} />

          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {steps.map((step, i) => (
              <div key={i} className="step-card" style={{ display:'grid', gridTemplateColumns:'1fr 80px 1fr', gap:0, alignItems:'center', marginBottom:64 }}>
                {/* Left content */}
                <div style={{ paddingRight:48, ...(i%2!==0 ? { visibility:'hidden' } : {}) }}>
                  {i%2===0 && (
                    <div style={{ background:'var(--bg-card)', border:`1px solid ${step.color}33`, borderRadius:20, padding:32, marginLeft:'auto', maxWidth:440 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                        <span style={{ fontSize:32 }}>{step.icon}</span>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, color:step.color, letterSpacing:'0.1em', textTransform:'uppercase' }}>Step {step.num}</div>
                          <div style={{ fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>{step.title}</div>
                        </div>
                      </div>
                      <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.7 }}>{step.desc}</p>
                      <div style={{ marginTop:16, display:'inline-flex', alignItems:'center', gap:8, background:step.color+'18', borderRadius:100, padding:'6px 14px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke={step.color} strokeWidth="1.2"/><path d="M6 3.5v2.8l1.8 1.2" stroke={step.color} strokeWidth="1.2" strokeLinecap="round"/></svg>
                        <span style={{ fontSize:12, fontWeight:600, color:step.color }}>{step.duration}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:step.color, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 0 8px ${step.color}22` }}>
                    <span style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{step.num}</span>
                  </div>
                </div>

                {/* Right content */}
                <div style={{ paddingLeft:48, ...(i%2===0 ? { visibility:'hidden' } : {}) }}>
                  {i%2!==0 && (
                    <div style={{ background:'var(--bg-card)', border:`1px solid ${step.color}33`, borderRadius:20, padding:32, maxWidth:440 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                        <span style={{ fontSize:32 }}>{step.icon}</span>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, color:step.color, letterSpacing:'0.1em', textTransform:'uppercase' }}>Step {step.num}</div>
                          <div style={{ fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>{step.title}</div>
                        </div>
                      </div>
                      <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.7 }}>{step.desc}</p>
                      <div style={{ marginTop:16, display:'inline-flex', alignItems:'center', gap:8, background:step.color+'18', borderRadius:100, padding:'6px 14px' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke={step.color} strokeWidth="1.2"/><path d="M6 3.5v2.8l1.8 1.2" stroke={step.color} strokeWidth="1.2" strokeLinecap="round"/></svg>
                        <span style={{ fontSize:12, fontWeight:600, color:step.color }}>{step.duration}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
