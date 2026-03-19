'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const plans = [
  {
    name: 'Launch',
    price: { monthly: 800, annual: 700 },
    oneTime: true,
    desc: 'Everything you need to go live fast and start getting found online.',
    features: ['Custom website (5 pages)', 'Mobile-first design', 'Basic SEO setup', 'Google Analytics', 'Contact form + CRM', '30-day email support', 'Delivered in 48–72 hours'],
    cta: 'Get started',
    color: '#3B7BF8',
    popular: false,
  },
  {
    name: 'Growth',
    price: { monthly: 2400, annual: 2100 },
    oneTime: true,
    desc: 'Website + automations that work 24/7 to capture and convert every lead.',
    features: ['Everything in Launch', 'Missed-call SMS auto-reply', 'Lead capture + CRM pipeline', 'Email drip sequence (5 emails)', 'Review request automation', 'Appointment reminders', 'Monthly analytics report', 'Priority support 90 days'],
    cta: 'Most popular',
    color: '#8B5CF6',
    popular: true,
  },
  {
    name: 'Dominate',
    price: { monthly: 4800, annual: 4200 },
    oneTime: true,
    desc: 'Full digital presence: website, automation suite, and social media management.',
    features: ['Everything in Growth', 'Full social media management', 'IG + FB + TikTok content', '3 custom Reels/mo', 'Ad campaign setup', 'Competitor SEO analysis', 'Bi-weekly strategy calls', 'Dedicated account manager'],
    cta: 'Go all-in',
    color: '#0D9488',
    popular: false,
  },
  {
    name: 'Retainer',
    price: { monthly: 1200, annual: 1000 },
    oneTime: false,
    desc: 'Ongoing growth partner — social, automation, and continuous optimization.',
    features: ['Monthly social content (20 posts)', 'New automation each quarter', 'SEO content (2 articles/mo)', 'Google Ads management', 'Monthly performance review', 'Unlimited minor edits', '24-hour response SLA'],
    cta: 'Let\'s talk',
    color: '#F59E0B',
    popular: false,
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<'monthly'|'annual'>('monthly');
  const { ref, inView } = useInView({ once: true });

  return (
    <section id="pricing" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Pricing</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Transparent pricing.<br />
            <span className="gradient-text">No surprises.</span>
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:480, margin:'0 auto 32px' }}>
            No long-term contracts. No hidden fees. Results in 30 days or we work for free.
          </p>
          {/* Toggle */}
          <div style={{ display:'inline-flex', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:100, padding:4 }}>
            {(['monthly','annual'] as const).map(b => (
              <button key={b} onClick={() => setBilling(b)}
                style={{ padding:'8px 24px', borderRadius:100, border:'none', fontSize:14, fontWeight:600, cursor:'pointer', background: billing===b ? 'var(--accent-blue)' : 'transparent', color: billing===b ? '#fff' : 'var(--text-secondary)', transition:'all 0.2s' }}>
                {b === 'monthly' ? 'One-time' : 'Bundle (save 12%)'}
              </button>
            ))}
          </div>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20 }}>
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1*i, ease:'easeOut' as const }}
              style={{ background:'var(--bg-card)', border:`2px solid ${plan.popular ? plan.color : 'var(--border)'}`, borderRadius:20, padding:32, position:'relative', transform: plan.popular ? 'scale(1.03)' : 'none' }}>
              {plan.popular && (
                <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background:plan.color, color:'#fff', borderRadius:100, padding:'4px 16px', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
                  Most Popular
                </div>
              )}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:plan.color, borderRadius:'20px 20px 0 0' }} />
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:11, fontWeight:700, color:plan.color, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>{plan.name}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                  <span style={{ fontSize:42, fontWeight:800, color:'var(--text-primary)' }}>
                    ${(billing==='annual' ? plan.price.annual : plan.price.monthly).toLocaleString()}
                  </span>
                  <span style={{ fontSize:14, color:'var(--text-muted)' }}>{plan.oneTime ? ' one-time' : '/mo'}</span>
                </div>
                {billing==='annual' && <div style={{ fontSize:12, color:'#22c55e', marginTop:4 }}>Save ${(plan.price.monthly - plan.price.annual) * (plan.oneTime ? 1 : 12)}</div>}
              </div>
              <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.6, marginBottom:24 }}>{plan.desc}</p>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10, marginBottom:32 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'var(--text-secondary)' }}>
                    <span style={{ width:18, height:18, borderRadius:'50%', background:plan.color+'22', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button style={{ width:'100%', background: plan.popular ? plan.color : 'transparent', border:`2px solid ${plan.color}`, color: plan.popular ? '#fff' : plan.color, borderRadius:12, padding:'14px', fontSize:15, fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.6, delay:0.6 }}
          style={{ textAlign:'center', marginTop:48, padding:32, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16 }}>
          <p style={{ fontSize:16, color:'var(--text-secondary)', marginBottom:8 }}>
            Not sure which plan is right for you?
          </p>
          <p style={{ fontSize:14, color:'var(--text-muted)' }}>
            Book a free 30-minute audit. We&apos;ll tell you exactly what you need — and what you don&apos;t.{' '}
            <a href="#contact" style={{ color:'var(--accent-blue)', fontWeight:600, textDecoration:'none' }}>Book now →</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
