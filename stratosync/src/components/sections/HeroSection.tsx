'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GradientOrb from '@/components/ui/GradientOrb';

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

export default function HeroSection() {
  const chartRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    const p = chartRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    setTimeout(() => { if (chartRef.current) { chartRef.current.style.transition = 'stroke-dashoffset 1.5s ease'; chartRef.current.style.strokeDashoffset = '0'; } }, 1200);
  }, []);

  return (
    <section style={{ minHeight:'100vh', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:120, paddingBottom:80 }}>
      <div style={{ position:'absolute', inset:0, background:'#000' }}/>
      <GradientOrb color="blue" size={900} opacity={0.18} style={{ top:'-200px', left:'-200px' }}/>
      <GradientOrb color="purple" size={700} opacity={0.15} style={{ bottom:'-150px', right:'-100px' }}/>
      <div className="absolute inset-0 dot-grid pointer-events-none"/>
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.03, pointerEvents:'none' }}>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)', pointerEvents:'none' }}/>

      <div className="container-main relative" style={{ zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        {/* Badge */}
        <motion.div {...up(0.1)}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:9999, border:'1px solid rgba(59,123,248,0.3)', background:'rgba(59,123,248,0.08)', marginBottom:28 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px #22c55e', display:'inline-block', flexShrink:0 }} className="animate-pulse-dot"/>
            <span style={{ fontSize:13, color:'var(--text-secondary)' }}>Trusted by 500+ businesses across North America</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom:24 }}>
          {['Your', 'Business.'].map((word, i) => (
            <motion.span key={word} initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.25 + i*0.08, ease:'easeOut' as const }}
              style={{ display:'inline-block', marginRight:'0.25em', fontSize:'clamp(56px,9vw,120px)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:0.95, color:'#fff' }}>{word}</motion.span>
          ))}
          <br/>
          <motion.span initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.41, ease:'easeOut' as const }}
            className="gradient-text" style={{ display:'inline-block', fontSize:'clamp(56px,9vw,120px)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:0.95, filter:'drop-shadow(0 0 40px rgba(59,123,248,0.4))' }}>
            Elevated.
          </motion.span>
        </div>

        {/* Sub */}
        <motion.p {...up(0.7)} style={{ maxWidth:580, fontSize:20, color:'var(--text-secondary)', lineHeight:1.65, marginBottom:36 }}>
          Premium websites, AI automations, and social media management — engineered to make small businesses outperform their competition and grow on autopilot.
        </motion.p>

        {/* CTAs */}
        <motion.div {...up(0.9)} style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
          <a href="#contact" style={{ display:'inline-flex', alignItems:'center', padding:'15px 36px', borderRadius:10, background:'var(--gradient)', color:'#fff', fontWeight:600, fontSize:16, textDecoration:'none', transition:'all 250ms ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow='0 0 50px rgba(59,123,248,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
            Get your free audit →
          </a>
          <a href="#how-it-works" style={{ display:'inline-flex', alignItems:'center', padding:'15px 36px', borderRadius:10, background:'transparent', border:'1px solid var(--border-hover)', color:'#fff', fontWeight:600, fontSize:16, textDecoration:'none', transition:'all 250ms ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor='#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-hover)'; }}>
            See how it works ↓
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div {...up(1.1)} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:64 }}>
          <div style={{ display:'flex' }}>
            {['MT','JK','SL','DM','PS'].map((init, i) => (
              <div key={init} style={{ width:40, height:40, borderRadius:'50%', background:'var(--gradient)', border:'2px solid #000', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff', marginLeft: i===0 ? 0 : -8, position:'relative', zIndex:5-i }}>{init}</div>
            ))}
          </div>
          <div>
            <p style={{ fontSize:14, color:'var(--text-muted)', margin:0 }}>500+ businesses already growing</p>
            <div style={{ display:'flex', gap:2, marginTop:2 }}>
              {[0,1,2,3,4].map(i => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
          </div>
        </motion.div>

        {/* Browser mockup */}
        <motion.div initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.8, delay:0.5, ease:'easeOut' as const }}
          style={{ position:'relative', width:'100%', maxWidth:900 }}>
          {/* Floating cards */}
          <div className="animate-float-1" style={{ position:'absolute', top:-24, left:-16, zIndex:20, padding:'14px 18px', borderRadius:12, backdropFilter:'blur(16px)', background:'rgba(255,255,255,0.05)', border:'1px solid var(--border-hover)', minWidth:160 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}><span style={{ color:'#22c55e' }}>✓</span><span style={{ fontSize:13, fontWeight:600, color:'#fff' }}>Website live</span></div>
            <p style={{ fontSize:11, color:'var(--text-muted)', margin:'0 0 6px' }}>Delivered in 47hrs</p>
            <div style={{ height:4, borderRadius:2, background:'rgba(255,255,255,0.1)' }}><div style={{ height:'100%', width:'100%', background:'var(--gradient)', borderRadius:2 }}/></div>
          </div>
          <div className="animate-float-2" style={{ position:'absolute', top:-16, right:-12, zIndex:20, padding:'14px 18px', borderRadius:12, backdropFilter:'blur(16px)', background:'rgba(255,255,255,0.05)', border:'1px solid var(--border-hover)', minWidth:150 }}>
            <div style={{ fontSize:22, fontWeight:900, color:'var(--accent-blue)', lineHeight:1 }}>12</div>
            <p style={{ fontSize:12, color:'var(--text-muted)', margin:'4px 0 4px' }}>New leads this week</p>
            <div style={{ fontSize:11, color:'#22c55e', fontWeight:600 }}>↑ 340%</div>
          </div>
          <div className="animate-float-3" style={{ position:'absolute', bottom:48, right:-12, zIndex:20, padding:'14px 18px', borderRadius:12, backdropFilter:'blur(16px)', background:'rgba(255,255,255,0.05)', border:'1px solid var(--border-hover)', minWidth:160 }}>
            <div style={{ fontSize:18, fontWeight:900, color:'var(--accent-purple)' }}>⚡ 8 missed calls</div>
            <div style={{ fontSize:11, color:'var(--accent-purple)', fontWeight:600, marginTop:4 }}>Auto-replied instantly</div>
          </div>

          {/* Browser */}
          <div style={{ borderRadius:16, border:'1px solid var(--border)', overflow:'hidden', boxShadow:'0 0 0 1px var(--border), 0 40px 120px rgba(0,0,0,0.8), inset 0 0 100px rgba(59,123,248,0.04)', background:'var(--bg-card)' }}>
            <div style={{ height:48, background:'#0a0a0a', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
              <div style={{ display:'flex', gap:6 }}>{['#FF5F57','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width:12, height:12, borderRadius:'50%', background:c }}/>)}</div>
              <div style={{ flex:1, maxWidth:300, height:28, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:6, display:'flex', alignItems:'center', padding:'0 10px', gap:6, margin:'0 auto' }}>
                <span style={{ fontSize:12, color:'var(--text-muted)' }}>🔒 app.stratosync.io/dashboard</span>
              </div>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>SS</div>
            </div>
            <div style={{ display:'flex', height:400 }}>
              {/* Sidebar */}
              <div style={{ width:180, borderRight:'1px solid var(--border)', padding:'16px 12px', flexShrink:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:20, paddingLeft:4 }}>StratoSync</div>
                {[['Dashboard',true],['Leads',false],['Automations',false],['Analytics',false]].map(([l, active]) => (
                  <div key={String(l)} style={{ padding:'8px 10px', borderRadius:6, marginBottom:2, background: active ? 'rgba(59,123,248,0.1)' : 'transparent', color: active ? 'var(--accent-blue)' : 'var(--text-muted)', fontSize:13, fontWeight: active ? 600 : 400 }}>{String(l)}</div>
                ))}
              </div>
              {/* Main */}
              <div style={{ flex:1, padding:'16px 20px', position:'relative', overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
                  {[['Revenue','$24,800','↑32%'],['Leads','142','↑18%'],['Bookings','38','↑24%'],['Reviews','4.9★','↑0.3']].map(([l,v,c]) => (
                    <div key={l} style={{ background:'var(--bg-card-hover)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 12px' }}>
                      <p style={{ fontSize:10, color:'var(--text-muted)', margin:'0 0 3px' }}>{l}</p>
                      <p style={{ fontSize:14, fontWeight:700, color:'#fff', margin:'0 0 2px' }}>{v}</p>
                      <p style={{ fontSize:10, color:'#22c55e', margin:0 }}>{c}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background:'var(--bg-card-hover)', border:'1px solid var(--border)', borderRadius:8, padding:12, height:180, overflow:'hidden', position:'relative' }}>
                  <p style={{ fontSize:11, color:'var(--text-muted)', margin:'0 0 8px', fontWeight:600 }}>Revenue Overview</p>
                  <svg width="100%" height="130" viewBox="0 0 500 130" preserveAspectRatio="none">
                    <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B7BF8" stopOpacity="0.3"/><stop offset="100%" stopColor="#3B7BF8" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0 120 L50 105 L100 110 L150 90 L200 80 L250 60 L300 50 L350 35 L400 25 L450 15 L500 8 L500 130 L0 130 Z" fill="url(#cg)"/>
                    <path ref={chartRef} d="M0 120 L50 105 L100 110 L150 90 L200 80 L250 60 L300 50 L350 35 L400 25 L450 15 L500 8" fill="none" stroke="#3B7BF8" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.5 }}
                    style={{ position:'absolute', top:8, right:8, padding:'10px 14px', borderRadius:10, backdropFilter:'blur(16px)', background:'rgba(255,255,255,0.04)', border:'1px solid var(--border-hover)' }}>
                    <div style={{ display:'flex', gap:6, alignItems:'flex-start' }}>
                      <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent-blue)', boxShadow:'0 0 6px var(--accent-blue)', flexShrink:0, marginTop:3 }} className="animate-pulse-dot"/>
                      <div>
                        <p style={{ fontSize:11, fontWeight:600, color:'#fff', margin:0 }}>New lead captured</p>
                        <p style={{ fontSize:10, color:'var(--text-muted)', margin:'1px 0 0' }}>Mike&apos;s Plumbing • just now</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }} style={{ marginTop:40, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.12em' }}>scroll to explore</span>
          <svg className="animate-bounce-down" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </motion.div>
      </div>
    </section>
  );
}
