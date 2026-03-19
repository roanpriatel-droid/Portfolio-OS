'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const services = [
  {
    id: 'web',
    icon: '🌐',
    title: 'Premium Websites',
    tagline: 'Live in 48 hours.',
    desc: 'High-converting, blazing-fast websites built to rank on Google and turn visitors into buyers. Every site is custom-designed, mobile-perfect, and built on modern tech.',
    features: ['Custom design (no templates)', 'SEO-optimized architecture', 'Google Analytics + Search Console', 'Contact forms + CRM integration', 'Hosting included first year', 'Live in 48–72 hours'],
    price: 'From $800',
    color: '#3B7BF8',
  },
  {
    id: 'auto',
    icon: '⚡',
    title: 'AI Automations',
    tagline: 'Work while you sleep.',
    desc: 'We automate your lead capture, follow-up, booking, and review collection — so you never miss an opportunity again. Built on enterprise platforms, not duct tape.',
    features: ['Missed call → SMS auto-reply', 'Lead capture + CRM sync', 'Appointment reminders', 'Review request sequences', 'Email drip campaigns', 'Custom triggers & workflows'],
    price: 'From $600',
    color: '#8B5CF6',
  },
  {
    id: 'social',
    icon: '📱',
    title: 'Social Media Management',
    tagline: 'Look like a premium brand.',
    desc: 'We handle every post, caption, graphic, and story. You approve once a month. We make your brand look like it has a full in-house marketing team.',
    features: ['Full content calendar', 'Custom graphics & video edits', 'Caption writing & hashtags', 'Story + Reel production', 'Monthly analytics report', 'Platform: IG, FB, TikTok, LinkedIn'],
    price: 'From $500/mo',
    color: '#0D9488',
  },
];

export default function ServicesOverview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { ref, inView } = useInView({ once: true });

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)', position:'relative' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Services</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Everything your business needs.<br />
            <span className="gradient-text">Nothing it doesn&apos;t.</span>
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:560, margin:'0 auto' }}>
            Three focused services. One agency. Results you can measure.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
          {services.map((svc, i) => (
            <motion.div key={svc.id} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1*i, ease:'easeOut' as const }}
              onMouseEnter={() => setHovered(svc.id)} onMouseLeave={() => setHovered(null)}
              style={{ background:'var(--bg-card)', border:`1px solid ${hovered === svc.id ? svc.color + '44' : 'var(--border)'}`, borderRadius:20, padding:40, cursor:'pointer', transition:'all 0.3s', transform:hovered === svc.id ? 'translateY(-4px)' : 'none', boxShadow:hovered === svc.id ? `0 20px 60px ${svc.color}18` : 'none', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:svc.color, opacity: hovered === svc.id ? 1 : 0.3, transition:'opacity 0.3s' }} />
              <div style={{ fontSize:40, marginBottom:20 }}>{svc.icon}</div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:svc.color, marginBottom:8 }}>{svc.tagline}</div>
              <h3 style={{ fontSize:24, fontWeight:700, color:'var(--text-primary)', marginBottom:16 }}>{svc.title}</h3>
              <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.7, marginBottom:28 }}>{svc.desc}</p>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10, marginBottom:32 }}>
                {svc.features.map((f, j) => (
                  <li key={j} style={{ display:'flex', alignItems:'center', gap:10, fontSize:14, color:'var(--text-secondary)' }}>
                    <span style={{ width:18, height:18, borderRadius:'50%', background:svc.color + '22', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke={svc.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:20, fontWeight:700, color:'var(--text-primary)' }}>{svc.price}</span>
                <button style={{ background:svc.color, color:'#fff', border:'none', borderRadius:8, padding:'10px 20px', fontSize:14, fontWeight:600, cursor:'pointer' }}>
                  Learn more →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
