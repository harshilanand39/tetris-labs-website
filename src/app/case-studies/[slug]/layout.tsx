import type { Metadata } from 'next';
import { getCaseStudy } from '../data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return {
    title: cs?.client ? `${cs.client} Case Study — Tetris Labs` : 'Case Study — Tetris Labs',
    description: cs?.challenge?.slice(0, 160) ?? 'See how Tetris Labs built systems that helped teams scale without adding headcount.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
