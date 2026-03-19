import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'StratoSync Solutions — Premium Websites, AI Automations & Social Media',
  description: 'Premium websites, AI automations, and social media management for small businesses. Results in 30 days.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
