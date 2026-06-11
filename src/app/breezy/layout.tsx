import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tetris Talent | Your Hiring Pipeline, Supercharged',
  description:
    'Tetris Talent is now natively integrated with Breezy HR — pipeline, scoring, and outreach all in one place. High-quality candidates, faster time-to-hire, and trusted results at scale.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
