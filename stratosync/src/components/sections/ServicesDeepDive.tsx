'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useInView from '@/hooks/useInView';

const tabs = [
  {
    id: 'web',
    label: '🌐 Websites',
    headline: 'Not just a website. A revenue machine.',
    desc: 'Every site we build is engineered to rank on Google, load in under 2 seconds, and convert visitors into paying customers. We obsess over conversion rate optimization so you don\'t have to.',
    details: [
      { title:'Custom Design System', icon:'🎨', desc:'Every pixel designed specifically for your brand. No templates, no Wix, no shortcuts.' },
      { title:'Performance-First Build', icon:'⚡', desc:'99+ PageSpeed score. Lightning-fast on mobile. Under 2-second load time guaranteed.' },
      { title:'SEO Architecture', icon:'🔍', desc:'Schema markup, meta optimization, Core Web Vitals, local SEO setup — all included.' },
      { title:'Conversion Engineering', icon:'📊', desc:'CTA placement tested on 500+ sites. Booking flows, contact forms, lead capture optimized.' },
    ],
    color:'#3B7BF8',
  },
  {
    id: 'auto',
    label: '⚡ Automations',
    headline: 'Every lead captured. Every customer followed up.',
    desc: 'We map your entire customer journey and automate the parts that eat your time. Missed calls turn into booked appointments. Happy customers leave 5-star reviews automatically.',
    details: [
      { title:'Missed Call → Booking', icon:'📞', desc:'Instant SMS response to missed calls with personalized booking link. Never lose a lead again.' },
      { title:'Lead Nurturing', icon:'🎯', desc:'Multi-step email + SMS sequences that warm up cold leads and push fence-sitters to convert.' },
      { title:'Review Automation', icon:'⭐', desc:'Automated review requests 2 hours after job completion. Average: +1.8 star rating increase.' },
      { title:'CRM Pipeline', icon:'🗂️', desc:'Every lead automatically tagged, scored, and dropped into the right pipeline stage.' },
    ],
    color:'#8B5CF6',
  },
  {
    id: 'social',
    label: '📱 Social Media',
    headline: 'Premium brand presence without the agency price tag.',
    desc: 'We build content strategies that position you as the obvious choice in your market. Every post, caption, and story is crafted to build trust, drive engagement, and convert followers into customers.',
    details: [
      { title:'Monthly Content Calendar', icon:'📅', desc:'Full 30-day content plan. You approve once. We execute everything — no back and forth.' },
      { title:'Professional Graphic Design', icon:'🖼️', desc:'Custom branded graphics and video edits that make you look like a $50K/yr brand.' },
      { title:'Reels & Short-Form Video', icon:'🎬', desc:'3 original Reels per month. Trending audio, hooks, and CTAs baked in.' },
      { title:'Analytics & Reporting', icon:'📈', desc:'Monthly performance report: reach, engagement, follower growth, top content breakdown.' },
    ],
    color:'#0D9488',
  },
];

export default function ServicesDeepDive() {
  const [active, setActive] = useState('web');
  const { ref, inView } = useInView({ once: true });
  const tab = tabs.find(t => t.id === active)!;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            <span className="gradient-text">Deep inside</span> our services.
          </h2>
        </motion.div>

        {/* Tab bar */}
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:48, flexWrap:'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              style={{ padding:'12px 28px', borderRadius:100, border:`2px solid ${active===t.id ? t.color : 'var(--border)'}`, background: active===t.id ? t.color+'18' : 'transparent', color: active===t.id ? t.color : 'var(--text-secondary)', fontSize:15, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.35, ease:'easeOut' as const }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
              <div>
                <h3 style={{ fontSize:'clamp(24px,3vw,36px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.2, marginBottom:20 }}>{tab.headline}</h3>
                <p style={{ fontSize:'clamp(15px,1.3vw,18px)', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:40 }}>{tab.desc}</p>
                <button style={{ display:'inline-flex', alignItems:'center', gap:10, background:tab.color, color:'#fff', border:'none', borderRadius:10, padding:'14px 28px', fontSize:15, fontWeight:600, cursor:'pointer' }}>
                  Get a free quote
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {tab.details.map((d, i) => (
                  <div key={i} style={{ background:'var(--bg-card)', border:`1px solid ${tab.color}22`, borderRadius:16, padding:24 }}>
                    <div style={{ fontSize:28, marginBottom:12 }}>{d.icon}</div>
                    <h4 style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)', marginBottom:8 }}>{d.title}</h4>
                    <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
