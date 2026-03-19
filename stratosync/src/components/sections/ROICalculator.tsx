'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

export default function ROICalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(30);
  const [closeRate, setCloseRate] = useState(20);
  const [avgDeal, setAvgDeal] = useState(500);
  const [investment, setInvestment] = useState(2400);
  const { ref, inView } = useInView({ once: true });

  const results = useMemo(() => {
    const currentRevenue = monthlyLeads * (closeRate/100) * avgDeal;
    const improvedLeads = monthlyLeads * 2.5; // avg 150% increase
    const improvedRevenue = improvedLeads * (closeRate/100) * avgDeal * 1.2; // +20% close rate from automation
    const monthlyGain = improvedRevenue - currentRevenue;
    const roi = investment > 0 ? ((monthlyGain * 12 - investment) / investment * 100) : 0;
    const paybackDays = monthlyGain > 0 ? Math.round(investment / (monthlyGain / 30)) : 0;
    return { currentRevenue, improvedRevenue, monthlyGain, roi, paybackDays };
  }, [monthlyLeads, closeRate, avgDeal, investment]);

  const SliderInput = ({ label, value, min, max, step, onChange, prefix = '', suffix = '' }: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; prefix?: string; suffix?: string;
  }) => (
    <div style={{ marginBottom:24 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
        <span style={{ fontSize:14, color:'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)' }}>{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width:'100%', accentColor:'var(--accent-blue)', height:4, cursor:'pointer' }} />
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
        <span style={{ fontSize:11, color:'var(--text-muted)' }}>{prefix}{min.toLocaleString()}{suffix}</span>
        <span style={{ fontSize:11, color:'var(--text-muted)' }}>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#22c55e' }}>ROI Calculator</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Calculate your<br />
            <span className="gradient-text">exact return on investment.</span>
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:480, margin:'0 auto' }}>
            Based on average results across 500+ clients. Adjust the sliders for your business.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>
          {/* Inputs */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.2, ease:'easeOut' as const }}
            style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:20, padding:40 }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:32 }}>Your Current Numbers</h3>
            <SliderInput label="Monthly leads/inquiries" value={monthlyLeads} min={5} max={200} step={5} onChange={setMonthlyLeads} />
            <SliderInput label="Current close rate" value={closeRate} min={5} max={80} step={5} onChange={setCloseRate} suffix="%" />
            <SliderInput label="Average deal / job value" value={avgDeal} min={100} max={10000} step={100} onChange={setAvgDeal} prefix="$" />
            <SliderInput label="StratoSync investment" value={investment} min={800} max={6000} step={200} onChange={setInvestment} prefix="$" />
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.3, ease:'easeOut' as const }}
            style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:20, padding:32 }}>
              <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:8 }}>Current monthly revenue (estimated)</div>
              <div style={{ fontSize:36, fontWeight:800, color:'var(--text-primary)' }}>${results.currentRevenue.toLocaleString()}</div>
            </div>
            <div style={{ background:'linear-gradient(135deg, rgba(59,123,248,0.12), rgba(139,92,246,0.12))', border:'1px solid rgba(59,123,248,0.2)', borderRadius:20, padding:32 }}>
              <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:8 }}>Projected monthly revenue after StratoSync</div>
              <div style={{ fontSize:36, fontWeight:800, color:'#22c55e' }}>${Math.round(results.improvedRevenue).toLocaleString()}</div>
              <div style={{ fontSize:14, color:'var(--text-secondary)', marginTop:8 }}>+${Math.round(results.monthlyGain).toLocaleString()}/mo additional revenue</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:24, textAlign:'center' }}>
                <div style={{ fontSize:28, fontWeight:800, color:'#22c55e' }}>{Math.round(results.roi)}%</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>Annual ROI</div>
              </div>
              <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:24, textAlign:'center' }}>
                <div style={{ fontSize:28, fontWeight:800, color:'var(--accent-blue)' }}>{results.paybackDays} days</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>Payback period</div>
              </div>
            </div>
            <button style={{ width:'100%', background:'linear-gradient(135deg,#3B7BF8,#8B5CF6)', color:'#fff', border:'none', borderRadius:12, padding:'16px', fontSize:16, fontWeight:700, cursor:'pointer' }}>
              Lock in this ROI — Book free audit →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
