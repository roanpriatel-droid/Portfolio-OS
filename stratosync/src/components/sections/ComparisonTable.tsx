'use client';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import { COMPARISON_ROWS } from '@/lib/constants';

export default function ComparisonTable() {
  const { ref, inView } = useInView({ once: true });

  const checkColor = (val: string) => {
    if (val === '✓') return '#22c55e';
    if (val === '✗') return '#ef4444';
    if (val.startsWith('⚠')) return '#F59E0B';
    return 'var(--text-secondary)';
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }} style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Comparison</span>
          </div>
          <h2 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:20 }}>
            Why choose StratoSync<br />
            <span className="gradient-text">over the alternatives?</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.2, ease:'easeOut' as const }}
          style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:0 }}>
            <thead>
              <tr>
                {['Feature', 'StratoSync', 'Freelancer', 'Agency', 'DIY (Wix/Squarespace)'].map((col, i) => (
                  <th key={i} style={{ padding:'16px 20px', textAlign: i===0 ? 'left' : 'center', fontSize:13, fontWeight:700, color: i===1 ? '#fff' : 'var(--text-muted)', letterSpacing:'0.05em', background: i===1 ? 'var(--accent-blue)' : 'var(--bg-secondary)', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap', borderRadius: i===1 ? '12px 12px 0 0' : i===0 ? '12px 0 0 0' : i===4 ? '0 12px 0 0' : 0 }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} style={{ background: i%2===0 ? 'var(--bg-card)' : 'var(--bg)' }}>
                  <td style={{ padding:'14px 20px', fontSize:14, fontWeight:500, color:'var(--text-primary)', borderBottom:'1px solid var(--border)' }}>{row.feature}</td>
                  {[row.strato, row.freelancer, row.agency, row.diy].map((val, j) => (
                    <td key={j} style={{ padding:'14px 20px', textAlign:'center', fontSize:14, color:j===0 ? '#fff' : checkColor(val), fontWeight: j===0 ? 600 : val==='✓'||val==='✗' ? 700 : 400, background: j===0 ? 'rgba(59,123,248,0.12)' : 'transparent', borderBottom:'1px solid var(--border)', borderLeft: j===0 ? '1px solid var(--accent-blue)' : 'none', borderRight: j===0 ? '1px solid var(--accent-blue)' : 'none' }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.6, delay:0.5 }}
          style={{ textAlign:'center', marginTop:48 }}>
          <a href="#pricing" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'var(--gradient)', color:'#fff', borderRadius:12, padding:'16px 32px', fontSize:16, fontWeight:600, textDecoration:'none' }}>
            Get StratoSync for your business →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
