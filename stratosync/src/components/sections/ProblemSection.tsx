'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const problems = [
  { icon:'📵', title:'Invisible Online', desc:'Your competitors show up on Google, Maps, and Instagram. You don\'t. Customers can\'t find what they can\'t see.', stat:'76%', statLabel:'of customers visit before buying' },
  { icon:'📞', title:'Missed Calls = Lost Revenue', desc:'Every missed call is a lead gone to your competitor. No follow-up system means money walks out the door daily.', stat:'$15K', statLabel:'avg annual lost revenue per missed call stream' },
  { icon:'⏰', title:'Manual Everything', desc:'Answering the same questions, following up by hand, posting on social — you\'re spending owner hours on $15/hr tasks.', stat:'23hrs', statLabel:'per week on manual admin tasks (avg owner)' },
  { icon:'🧱', title:'Outdated Website', desc:'A slow, ugly, or non-existent website tells every visitor you\'re not the premium choice — before they even read a word.', stat:'0.05s', statLabel:'is how long visitors take to judge your site' },
];

export default function ProblemSection() {
  const { ref, inView } = useInView({ once: true });
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
      {/* Red accent orb */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#ef4444', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#ef4444' }}>The Problem</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Your business is losing money<br />every single day you wait
          </h2>
          <p style={{ fontSize:'clamp(16px,1.5vw,18px)', color:'var(--text-secondary)', maxWidth:560, margin:'0 auto' }}>
            Most small businesses have 4 critical gaps destroying their growth. Sound familiar?
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:24 }}>
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1 * i, ease:'easeOut' as const }}
              style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:32, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg, #ef4444, #f97316)' }} />
              <div style={{ fontSize:36, marginBottom:16 }}>{p.icon}</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:12 }}>{p.title}</h3>
              <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.7, marginBottom:24 }}>{p.desc}</p>
              <div style={{ borderTop:'1px solid var(--border)', paddingTop:16 }}>
                <div style={{ fontSize:28, fontWeight:800, color:'#ef4444' }}>{p.stat}</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>{p.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.5, ease:'easeOut' as const }}
          style={{ textAlign:'center', marginTop:64 }}>
          <p style={{ fontSize:20, fontWeight:600, color:'var(--text-primary)' }}>
            The good news? <span className="gradient-text">We fix all 4 in one engagement.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
