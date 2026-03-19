'use client';
export default function TrustTicker() {
  const logos = [
    'Make.com','n8n','Google Analytics','Meta Ads','Stripe',
    'Zapier','HubSpot','Shopify','Twilio','OpenAI',
    'Make.com','n8n','Google Analytics','Meta Ads','Stripe',
    'Zapier','HubSpot','Shopify','Twilio','OpenAI',
  ];
  return (
    <section style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--bg-secondary)', padding:'16px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:0 }}>
        <div className="animate-ticker" style={{ display:'flex', alignItems:'center', gap:0, whiteSpace:'nowrap', flexShrink:0 }}>
          {logos.map((logo, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'0 40px', color:'var(--text-muted)', fontSize:'13px', fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'inline-block', opacity:0.5 }} />
              {logo}
            </span>
          ))}
        </div>
        <div className="animate-ticker" aria-hidden style={{ display:'flex', alignItems:'center', gap:0, whiteSpace:'nowrap', flexShrink:0 }}>
          {logos.map((logo, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'0 40px', color:'var(--text-muted)', fontSize:'13px', fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'inline-block', opacity:0.5 }} />
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
