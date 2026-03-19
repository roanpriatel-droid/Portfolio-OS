'use client';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import useInView from '@/hooks/useInView';

const stats = [
  { value:312, suffix:'%', label:'Average booking increase', sub:'ProClean Services, 30 days' },
  { value:48, suffix:'hrs', label:'Average website delivery', sub:'From deposit to staging link' },
  { value:94, suffix:'%', label:'Client retention rate', sub:'Month-over-month retainers' },
  { value:2400000, suffix:'+', prefix:'$', label:'Revenue generated for clients', sub:'Tracked and attributable' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ once: true });
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'80px 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <div className="container-main">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:1, background:'var(--border)' }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.4, delay:0.1*i }}
              style={{ background:'var(--bg-secondary)', padding:'40px 32px', textAlign:'center' }}>
              <div style={{ fontSize:'clamp(40px,4vw,56px)', fontWeight:800, lineHeight:1 }}>
                <span className="gradient-text">
                  <AnimatedCounter start={inView} end={s.value} duration={2000} prefix={s.prefix} suffix={s.suffix} />
                </span>
              </div>
              <div style={{ fontSize:15, fontWeight:600, color:'var(--text-primary)', marginTop:12, marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:12, color:'var(--text-muted)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
