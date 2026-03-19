'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const cases = [
  {
    client: "Tony's Italian Kitchen",
    industry: 'Restaurant',
    location: 'Toronto, ON',
    challenge: 'Zero online presence. Relying on walk-ins only. Invisible on Google Maps.',
    solution: 'Full website, Google Business optimization, missed-call SMS, monthly social content.',
    results: [
      { metric: '+67%', label: 'Revenue increase' },
      { metric: '200+', label: 'Monthly online visitors' },
      { metric: '4.9★', label: 'Google rating (was 3.1)' },
      { metric: '42 days', label: 'Time to ROI' },
    ],
    color: '#3B7BF8',
    emoji: '🍽️',
  },
  {
    client: 'ProClean Services',
    industry: 'Cleaning Service',
    location: 'Austin, TX',
    challenge: 'Missing 50% of inbound calls. No follow-up system. Losing bookings daily.',
    solution: 'Missed-call SMS auto-reply, booking automation, CRM pipeline, review sequences.',
    results: [
      { metric: '+312%', label: 'Booking increase' },
      { metric: '8', label: 'New clients in week 1' },
      { metric: '0', label: 'Missed leads (automated)' },
      { metric: '28 days', label: 'Full ROI' },
    ],
    color: '#8B5CF6',
    emoji: '🧹',
  },
  {
    client: 'Apex Real Estate Group',
    industry: 'Real Estate',
    location: 'Vancouver, BC',
    challenge: 'Dated website losing leads to bigger agencies. No lead nurturing in place.',
    solution: 'Premium site redesign, lead capture form, email drip sequence, CRM integration.',
    results: [
      { metric: '+180%', label: 'Lead volume' },
      { metric: '45 days', label: 'To see results' },
      { metric: '3x', label: 'Contact form submissions' },
      { metric: '$0', label: 'Extra ad spend needed' },
    ],
    color: '#0D9488',
    emoji: '🏠',
  },
];

export default function CaseStudies() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const { ref, inView } = useInView({ once: true });

  return (
    <section id="case-studies" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Case Studies</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            The numbers don&apos;t lie.<br />
            <span className="gradient-text">Neither do our clients.</span>
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:480, margin:'0 auto' }}>
            Hover each card to see the full story.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
          {cases.map((c, i) => (
            <motion.div key={i} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1*i, ease:'easeOut' as const }}
              style={{ perspective:1000, height:420, cursor:'pointer' }}
              onMouseEnter={() => setFlipped(i)} onMouseLeave={() => setFlipped(null)}>
              <div style={{ position:'relative', width:'100%', height:'100%', transformStyle:'preserve-3d', transition:'transform 0.6s', transform: flipped===i ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front */}
                <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', background:'var(--bg-card)', border:`1px solid ${c.color}33`, borderRadius:20, padding:36, display:'flex', flexDirection:'column' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:c.color, borderRadius:'20px 20px 0 0' }} />
                  <div style={{ fontSize:48, marginBottom:16 }}>{c.emoji}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:c.color, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>{c.industry}</div>
                  <h3 style={{ fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{c.client}</h3>
                  <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:24 }}>{c.location}</p>
                  <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.6, flex:1 }}><strong style={{ color:'var(--text-primary)' }}>Challenge:</strong> {c.challenge}</p>
                  <div style={{ marginTop:20, display:'flex', alignItems:'center', gap:6, color:'var(--text-muted)', fontSize:13 }}>
                    <span>Hover for results</span>
                    <span>→</span>
                  </div>
                </div>
                {/* Back */}
                <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', background:c.color, borderRadius:20, padding:36, transform:'rotateY(180deg)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.7)', marginBottom:4 }}>{c.client}</div>
                    <h3 style={{ fontSize:18, fontWeight:700, color:'#fff', marginBottom:20 }}>What we did</h3>
                    <p style={{ fontSize:14, color:'rgba(255,255,255,0.85)', lineHeight:1.6 }}>{c.solution}</p>
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.7)', marginBottom:12, letterSpacing:'0.1em', textTransform:'uppercase' }}>Results</div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                      {c.results.map((r, j) => (
                        <div key={j} style={{ background:'rgba(255,255,255,0.15)', borderRadius:10, padding:'12px 16px' }}>
                          <div style={{ fontSize:22, fontWeight:800, color:'#fff' }}>{r.metric}</div>
                          <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', marginTop:2 }}>{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
