'use client';
import { useRef } from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface Props {
  end: number;
  start?: boolean;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ end, start = false, prefix = '', suffix = '', duration = 2000 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useAnimatedCounter(end, duration, start);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
