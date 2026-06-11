import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tetris Talent | Old Website',
  description: 'Legacy Tetris Talent website.',
};

export default function OldWebsitePage() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        background: '#05030b',
      }}
    >
      <iframe
        src="/old/index.html"
        title="Tetris Talent old website"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </main>
  );
}
