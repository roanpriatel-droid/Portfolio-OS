import React from 'react';
interface Props { color:'blue'|'purple'; size?:number; opacity?:number; className?:string; animate?:boolean; style?: React.CSSProperties; }
export default function GradientOrb({ color, size=700, opacity=0.18, className='', animate=true, style }: Props) {
  const c = color==='blue' ? `rgba(59,123,248,${opacity})` : `rgba(139,92,246,${opacity})`;
  const animClass = animate ? (color==='blue' ? 'animate-orb' : 'animate-orb-r') : '';
  return <div className={`absolute rounded-full pointer-events-none ${animClass} ${className}`} style={{ width:size, height:size, background:`radial-gradient(circle, ${c} 0%, transparent 70%)`, willChange:'transform', ...style }} />;
}
