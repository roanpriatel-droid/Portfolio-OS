'use client';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  return (
    <footer style={{ background:'var(--bg-secondary)' }}>
      <div style={{ height:1, background:'linear-gradient(90deg,#3B7BF8,#8B5CF6,transparent)' }}/>
      <div className="container-main py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <a href="#" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', marginBottom:16 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <defs><linearGradient id="flg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B7BF8"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient></defs>
                <rect x="1" y="1" width="14" height="14" rx="3" fill="url(#flg)" opacity="0.9"/>
                <rect x="9" y="9" width="14" height="14" rx="3" fill="url(#flg)" opacity="0.7"/>
              </svg>
              <span style={{ fontSize:18, fontWeight:800, color:'#fff', letterSpacing:'-0.03em' }}>Strato<span className="gradient-text">Sync</span></span>
            </a>
            <p style={{ color:'var(--text-muted)', fontSize:14, lineHeight:1.6, maxWidth:240 }}>The last agency your business will ever need.</p>
          </div>
          <div>
            <ColHead>Services</ColHead>
            {['Premium Websites','AI Automations','Social Media','Bundles','Pricing'].map(t => <FooterLink key={t}>{t}</FooterLink>)}
          </div>
          <div>
            <ColHead>Company</ColHead>
            {['About','How It Works','Case Studies','Blog','Contact'].map(t => <FooterLink key={t}>{t}</FooterLink>)}
          </div>
          <div>
            <ColHead>Stay Updated</ColHead>
            <div style={{ display:'flex', gap:8, marginBottom:12 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex:1, padding:'9px 12px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, color:'#fff', fontSize:14, outline:'none' }}/>
              <button style={{ padding:'9px 16px', background:'var(--gradient)', border:'none', borderRadius:8, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>Subscribe</button>
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:13 }}>info@stratosync.io</p>
            <p style={{ color:'var(--text-muted)', fontSize:12, marginTop:4 }}>US &amp; Canada · Mon–Fri 9am–6pm EST</p>
          </div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid var(--border)' }}>
        <div className="container-main py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ color:'var(--text-muted)', fontSize:13 }}>© 2025 StratoSync Solutions. All rights reserved.</p>
          <div style={{ display:'flex', gap:24 }}>
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(t => (
              <a key={t} href="#" style={{ color:'var(--text-muted)', fontSize:13, textDecoration:'none' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color='var(--text-muted)')}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ColHead({ children }: { children: React.ReactNode }) {
  return <h4 style={{ color:'var(--text-muted)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16 }}>{children}</h4>;
}
function FooterLink({ children }: { children: React.ReactNode }) {
  return <a href="#" style={{ display:'block', color:'var(--text-secondary)', fontSize:14, textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
    onMouseEnter={e => (e.currentTarget.style.color='#fff')}
    onMouseLeave={e => (e.currentTarget.style.color='var(--text-secondary)')}>{children}</a>;
}
