'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useInView from '@/hooks/useInView';
import { FAQS } from '@/lib/constants';

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useInView({ once: true });

  return (
    <section id="faq" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>FAQ</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Everything you want to know<br />
            <span className="gradient-text">before you say yes.</span>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }}>
          {/* Left column: FAQ accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.4, delay:0.05*i, ease:'easeOut' as const }}
                style={{ borderBottom:'1px solid var(--border)' }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 0', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:16 }}>
                  <span style={{ fontSize:15, fontWeight:600, color:'var(--text-primary)' }}>{faq.q}</span>
                  <span style={{ width:28, height:28, borderRadius:'50%', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'transform 0.2s, background 0.2s', transform: open===i ? 'rotate(45deg)' : 'none', background: open===i ? 'var(--accent-blue)' : 'transparent' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke={open===i ? '#fff' : 'var(--text-secondary)'} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25, ease:'easeOut' as const }}
                      style={{ overflow:'hidden' }}>
                      <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.7, paddingBottom:20 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right column: CTA card */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.3, ease:'easeOut' as const }}
            style={{ position:'sticky', top:120, alignSelf:'start', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:20, padding:40, overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'var(--gradient)' }} />
            <div style={{ fontSize:40, marginBottom:20 }}>💬</div>
            <h3 style={{ fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:12 }}>Still have questions?</h3>
            <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.7, marginBottom:32 }}>
              Book a free 30-minute audit call. We&apos;ll answer every question, review your current digital presence, and give you a custom growth roadmap — no strings attached.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <button style={{ background:'var(--gradient)', color:'#fff', border:'none', borderRadius:12, padding:'14px', fontSize:15, fontWeight:700, cursor:'pointer' }}>
                Book free audit call
              </button>
              <button style={{ background:'transparent', color:'var(--text-secondary)', border:'1px solid var(--border)', borderRadius:12, padding:'14px', fontSize:15, fontWeight:500, cursor:'pointer' }}>
                Send us a message
              </button>
            </div>
            <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:10, padding:16, background:'var(--bg)', borderRadius:12 }}>
              <div style={{ fontSize:20 }}>⚡</div>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>
                <strong style={{ color:'var(--text-primary)' }}>Fast response guarantee:</strong> We reply to all inquiries within 2 business hours.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
