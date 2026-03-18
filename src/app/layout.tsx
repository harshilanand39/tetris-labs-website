import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tetris Labs | Turn How Your Team Works Into AI-Powered Systems",
  description:
    "We map your operational chaos, identify every bottleneck, and build custom AI-powered internal tools and agentic workflows — so your team can focus on what actually moves the needle.",
  icons: {
    icon: "/images/tetris-logo.png",
  },
  openGraph: {
    title: "Tetris Labs | Turn How Your Team Works Into AI-Powered Systems",
    description:
      "We map your operational chaos, identify every bottleneck, and build custom AI-powered internal tools and agentic workflows — so your team can focus on what actually moves the needle.",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tetris Labs',
  description:
    'AI automation and operations consultancy that builds custom AI-powered internal tools and agentic workflows for fast-moving teams.',
  url: 'https://www.tetrislabs.co',
  knowsAbout: [
    'AI Automation',
    'Agentic Workflows',
    'Custom CRM',
    'Workflow Automation',
    'Internal Tools',
    'Venture Capital Operations',
    'Recruiting Systems',
    'Knowledge Management',
  ],
  serviceType: [
    'Agentic Workflow Development',
    'AI-Powered Internal Tools',
    'Knowledge & Intelligence Systems',
    'Workspace Design & Audit',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
