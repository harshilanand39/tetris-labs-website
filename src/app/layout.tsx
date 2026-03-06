import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tetris Labs — Turn How Your Team Works Into AI-Powered Systems",
  description:
    "We map your operational chaos, identify every bottleneck, and build custom AI-powered internal tools and agentic workflows — so your team can focus on what actually moves the needle.",
  openGraph: {
    title: "Tetris Labs — Turn How Your Team Works Into AI-Powered Systems",
    description:
      "We map your operational chaos, identify every bottleneck, and build custom AI-powered internal tools and agentic workflows — so your team can focus on what actually moves the needle.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
