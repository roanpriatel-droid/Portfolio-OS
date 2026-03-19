'use client';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const posts = [
  {
    tag:'Lead Generation',
    title:'The Missed Call Problem: How Small Businesses Lose $15K+ Per Year',
    excerpt:'Most service businesses have no idea how many leads slip through the cracks every day. Here\'s the data — and how to fix it in 24 hours.',
    readTime:'5 min read',
    date:'Mar 8, 2025',
    emoji:'📞',
    color:'#3B7BF8',
  },
  {
    tag:'SEO',
    title:'Why Your Website Isn\'t Showing Up on Google (And 3 Fixes That Work)',
    excerpt:'Technical SEO mistakes that cost service businesses thousands in missed organic traffic. Checklist included.',
    readTime:'8 min read',
    date:'Feb 28, 2025',
    emoji:'🔍',
    color:'#8B5CF6',
  },
  {
    tag:'Social Media',
    title:'The 20-Post Formula: What We Post for Every Small Business Client',
    excerpt:'After managing social for 500+ businesses, we\'ve cracked the content formula. Steal it for free.',
    readTime:'6 min read',
    date:'Feb 14, 2025',
    emoji:'📱',
    color:'#0D9488',
  },
];

export default function BlogPreview() {
  const { ref, inView } = useInView({ once: true });

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ padding:'120px 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:'easeOut' as const }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:64, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--accent-blue-dim)', border:'1px solid rgba(59,123,248,0.2)', borderRadius:100, padding:'6px 16px', marginBottom:24 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-blue)', display:'block' }} />
              <span style={{ fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent-blue)' }}>Resources</span>
            </div>
            <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15 }}>
              Free growth<br />
              <span className="gradient-text">playbooks.</span>
            </h2>
          </div>
          <a href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'var(--accent-blue)', fontSize:15, fontWeight:600, textDecoration:'none' }}>
            View all articles →
          </a>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
          {posts.map((post, i) => (
            <motion.article key={i} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1*i, ease:'easeOut' as const }}
              style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = post.color+'44'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              {/* Thumbnail */}
              <div style={{ height:180, background:`linear-gradient(135deg, ${post.color}22, ${post.color}08)`, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:64 }}>{post.emoji}</span>
              </div>
              {/* Content */}
              <div style={{ padding:28 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:post.color, background:post.color+'18', borderRadius:100, padding:'4px 12px', letterSpacing:'0.05em' }}>{post.tag}</span>
                  <span style={{ fontSize:12, color:'var(--text-muted)' }}>{post.date}</span>
                </div>
                <h3 style={{ fontSize:17, fontWeight:700, color:'var(--text-primary)', lineHeight:1.4, marginBottom:12 }}>{post.title}</h3>
                <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.6, marginBottom:20 }}>{post.excerpt}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:12, color:'var(--text-muted)' }}>{post.readTime}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:post.color }}>Read article →</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
