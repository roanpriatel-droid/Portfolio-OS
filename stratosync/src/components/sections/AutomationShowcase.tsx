'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const flows = [
  { id:'missed-call', label:'Missed Call Flow', color:'#3B7BF8', nodes:[
    { x:80, y:150, label:'📞 Missed Call', color:'#3B7BF8' },
    { x:260, y:100, label:'📲 SMS Sent', color:'#8B5CF6' },
    { x:260, y:200, label:'📧 Email Follow-up', color:'#0D9488' },
    { x:440, y:150, label:'📅 Booking Link', color:'#F59E0B' },
    { x:620, y:150, label:'✅ Lead Captured', color:'#22c55e' },
  ], edges:[[0,1],[0,2],[1,3],[2,3],[3,4]] },
  { id:'review', label:'Review Request Flow', color:'#8B5CF6', nodes:[
    { x:80, y:150, label:'🔧 Job Complete', color:'#3B7BF8' },
    { x:260, y:150, label:'⏱ Wait 2 Hours', color:'#8B5CF6' },
    { x:440, y:100, label:'⭐ Google Review', color:'#F59E0B' },
    { x:440, y:200, label:'📝 Feedback Form', color:'#0D9488' },
    { x:620, y:150, label:'🏆 5-Star Rating', color:'#22c55e' },
  ], edges:[[0,1],[1,2],[1,3],[2,4]] },
];

export default function AutomationShowcase() {
  const [activeFlow, setActiveFlow] = useState(0);
  const [animProgress, setAnimProgress] = useState(0);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref, inView } = useInView({ once: true });

  useEffect(() => {
    if (!inView) return;
    animRef.current = setInterval(() => {
      setAnimProgress(p => {
        if (p >= 100) {
          setActiveFlow(f => (f + 1) % flows.length);
          return 0;
        }
        return p + 2;
      });
    }, 80);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [inView]);

  const flow = flows[activeFlow];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-purple-dim)', border:'1px solid rgba(139,92,246,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-purple)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-purple)' }}>Automation Engine</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Watch your business run<br />
            <span className="gradient-text">on autopilot.</span>
          </h2>
        </motion.div>

        {/* Flow selector */}
        <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:40 }}>
          {flows.map((f, i) => (
            <button key={i} onClick={() => { setActiveFlow(i); setAnimProgress(0); }}
              style={{ padding:'10px 24px', borderRadius:100, border:`2px solid ${i===activeFlow ? f.color : 'var(--border)'}`, background: i===activeFlow ? f.color+'18' : 'transparent', color: i===activeFlow ? f.color : 'var(--text-muted)', fontSize:14, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* SVG Flow diagram */}
        <motion.div key={activeFlow} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }}
          style={{ background:'var(--bg-card)', border:`1px solid ${flow.color}33`, borderRadius:20, overflow:'hidden' }}>
          <svg viewBox="0 0 700 300" style={{ width:'100%', height:'auto', display:'block' }}>
            {/* Edges */}
            {flow.edges.map(([from, to], i) => {
              const a = flow.nodes[from];
              const b = flow.nodes[to];
              const edgeProgress = Math.max(0, Math.min(100, animProgress * flow.edges.length - i * 20));
              return (
                <g key={i}>
                  <line x1={a.x+50} y1={a.y} x2={b.x} y2={b.y} stroke="var(--border)" strokeWidth="1.5" />
                  <line x1={a.x+50} y1={a.y} x2={a.x+50 + (b.x - a.x - 50) * edgeProgress/100} y2={a.y + (b.y - a.y) * edgeProgress/100}
                    stroke={flow.color} strokeWidth="2" strokeLinecap="round" />
                  {edgeProgress > 80 && (
                    <circle cx={a.x+50 + (b.x - a.x - 50) * edgeProgress/100} cy={a.y + (b.y - a.y) * edgeProgress/100}
                      r="5" fill={flow.color} />
                  )}
                </g>
              );
            })}
            {/* Nodes */}
            {flow.nodes.map((node, i) => (
              <g key={i}>
                <rect x={node.x} y={node.y - 24} width={120} height={48} rx="10"
                  fill={node.color + '22'} stroke={node.color + '44'} strokeWidth="1.5" />
                <text x={node.x + 60} y={node.y + 6} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">{node.label}</text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Progress bar */}
        <div style={{ height:4, background:'var(--bg-card)', borderRadius:2, marginTop:16, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${animProgress}%`, background:flow.color, borderRadius:2, transition:'width 0.08s linear' }} />
        </div>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:20, marginTop:48 }}>
          {[
            { icon:'⚡', stat:'< 30 sec', label:'Response time', color:'#3B7BF8' },
            { icon:'🤖', stat:'24/7', label:'Always on', color:'#8B5CF6' },
            { icon:'💰', stat:'$2–5K', label:'Avg monthly revenue unlocked', color:'#22c55e' },
            { icon:'⏰', stat:'15 hrs', label:'Weekly time saved', color:'#F59E0B' },
          ].map((s, i) => (
            <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:24, textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.stat}</div>
              <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
