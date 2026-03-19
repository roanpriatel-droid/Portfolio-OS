'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label:'Services', href:'#services' },
  { label:'Pricing', href:'#pricing' },
  { label:'How It Works', href:'#how-it-works' },
  { label:'Case Studies', href:'#case-studies' },
  { label:'Contact', href:'#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.6, ease:'easeOut' as const }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50, height:64,
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition:'background 0.4s,border-color 0.4s',
        }}
      >
        <div className="container-main h-full flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map(l => <NavLink key={l.label} {...l} />)}
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background:'var(--gradient)' }}>
            Get free audit →
          </a>
          <button className="md:hidden text-white p-2" onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:100, background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-white p-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            {LINKS.map((l, i) => (
              <motion.a key={l.label} href={l.href}
                initial={{ x:60, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:i*0.06 }}
                onClick={() => setOpen(false)}
                style={{ fontSize:32, fontWeight:700, color:'#fff', textDecoration:'none', marginBottom:24 }}>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 no-underline">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <defs><linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B7BF8"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient></defs>
        <rect x="1" y="1" width="14" height="14" rx="3" fill="url(#lg1)" opacity="0.9"/>
        <rect x="9" y="9" width="14" height="14" rx="3" fill="url(#lg1)" opacity="0.7"/>
      </svg>
      <span style={{ fontSize:18, fontWeight:800, color:'#fff', letterSpacing:'-0.03em' }}>
        Strato<span className="gradient-text">Sync</span>
      </span>
    </a>
  );
}

function NavLink({ href, label }: { href:string; label:string }) {
  return (
    <a href={href} style={{ color:'var(--text-secondary)', fontSize:14, fontWeight:500, textDecoration:'none', transition:'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color='#fff')}
      onMouseLeave={e => (e.currentTarget.style.color='var(--text-secondary)')}>
      {label}
    </a>
  );
}
