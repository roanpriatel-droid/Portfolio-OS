export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span style={{ display:'block', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--accent-blue)', marginBottom:16 }}>{children}</span>;
}
