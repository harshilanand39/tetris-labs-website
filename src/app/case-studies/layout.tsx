import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies — Tetris Talent',
  description:
    'See how Tetris Talent built AI-powered systems that helped teams scale revenue and operational capacity without adding headcount.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
