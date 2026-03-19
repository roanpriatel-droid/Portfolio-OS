'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import GradientOrb from '@/components/ui/GradientOrb';

export default function FinalCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, inView } = useInView({ once: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,123,248,${dot.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} style={{ padding:'160px 0', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
      <GradientOrb color="blue" size={800} opacity={0.12} style={{ position:'absolute', top:'50%', left:'30%', transform:'translate(-50%,-50%)' }} />
      <GradientOrb color="purple" size={600} opacity={0.1} style={{ position:'absolute', top:'40%', left:'70%', transform:'translate(-50%,-50%)' }} />

      <div className="container-main" style={{ position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.8, ease:'easeOut' as const }}
          style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          {/* Social proof */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:12, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:100, padding:'8px 20px', marginBottom:40 }}>
            <div style={{ display:'flex' }}>
              {['MT','JK','SL','DM','PS'].map((init, i) => (
                <div key={i} style={{ width:28, height:28, borderRadius:'50%', background:`hsl(${220+i*30},80%,60%)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#fff', marginLeft: i===0?0:-8, border:'2px solid var(--bg)' }}>{init}</div>
              ))}
            </div>
            <span style={{ fontSize:14, color:'#22c55e', fontWeight:600 }}>500+ businesses growing with StratoSync</span>
          </div>

          <h2 style={{ fontSize:'clamp(40px,5vw,72px)', fontWeight:800, color:'var(--text-primary)', lineHeight:1.05, marginBottom:24 }}>
            Your competition is<br />already online.<br />
            <span className="gradient-text">Are you?</span>
          </h2>

          <p style={{ fontSize:'clamp(18px,2vw,22px)', color:'var(--text-secondary)', lineHeight:1.6, marginBottom:48, maxWidth:600, margin:'0 auto 48px' }}>
            Book a free 30-minute audit. We&apos;ll show you exactly what&apos;s holding your business back online — and give you the roadmap to fix it. Zero cost. Zero commitment.
          </p>

          {/* CTA buttons */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
            <a href="#" style={{ display:'inline-flex', alignItems:'center', gap:12, background:'linear-gradient(135deg,#3B7BF8,#8B5CF6)', color:'#fff', borderRadius:14, padding:'20px 48px', fontSize:18, fontWeight:700, textDecoration:'none', boxShadow:'0 0 60px rgba(59,123,248,0.3)' }}>
              Get my free audit →
            </a>
            <p style={{ fontSize:14, color:'var(--text-muted)' }}>Takes 30 seconds to book. No credit card.</p>
          </div>

          {/* Trust signals */}
          <div style={{ display:'flex', justifyContent:'center', gap:40, marginTop:64, flexWrap:'wrap' }}>
            {[
              { icon:'⚡', text:'48-hr delivery' },
              { icon:'🔒', text:'No long contracts' },
              { icon:'✅', text:'Results guarantee' },
              { icon:'🆓', text:'Free audit call' },
            ].map((t, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:14, color:'var(--text-muted)' }}>
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
