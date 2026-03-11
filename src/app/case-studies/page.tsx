'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';
import { CASE_STUDIES, type CaseStudy } from './data';

/* ─── Animation ─── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */

function PageNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-between"
      style={{
        padding: 'clamp(0.875rem,2vh,1.5rem) clamp(1rem,2.5vw,2rem)',
        background: 'rgba(124,58,237,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: '1.25rem',
          color: 'white',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        Tetris Labs
      </a>

      <div className="hidden md:flex items-center gap-6">
        <button
          className="button"
          data-cal-namespace="discovery-call"
          data-cal-link="harshil-tetris/discovery-call"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          style={{ minHeight: '2.75rem', fontSize: '0.875rem' }}
        >
          book a strategy call
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   INDEX HERO
   ═══════════════════════════════════════════ */

function IndexHero() {
  return (
    <section
      style={{
        background: '#7C3AED',
        minHeight: '40vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      <div
        className="bg-tile-pattern"
        style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem,6vw,8rem)',
        }}
      >
        <motion.span
          className="label"
          style={{ color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '1rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
        >
          client results
        </motion.span>

        <motion.h1
          className="heading h1"
          style={{ color: 'white', marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
        >
          Real systems. Real results.
        </motion.h1>

        <motion.p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '540px',
            lineHeight: '160%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
        >
          Three years. Dozens of teams. Here&apos;s what we&apos;ve actually built.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CASE GRID
   ═══════════════════════════════════════════ */

function GridCard({ cs }: { cs: CaseStudy }) {
  const cardInner = cs.comingSoon ? (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
      }}
      style={{
        border: '1.5px solid rgba(26,11,46,0.1)',
        borderRadius: '0.25rem',
        padding: '2.5rem 2rem',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '220px',
        justifyContent: 'space-between',
      }}
    >
      {/* Spacer + coming soon message */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flex: 1, justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.875rem', color: 'rgba(26,11,46,0.4)', textTransform: 'lowercase' }}>
          case study coming soon
        </span>
      </div>

      {/* Bottom: company identity */}
      {cs.client && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(26,11,46,0.08)' }}>
          <div style={{ width: 24, height: 24, borderRadius: '0.25rem', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.6875rem', color: 'white' }}>
            {cs.client.charAt(0)}
          </div>
          <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500, fontSize: '0.875rem', color: 'rgba(26,11,46,0.5)' }}>
            {cs.client}
          </span>
        </div>
      )}
    </motion.div>
  ) : (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
      }}
      whileHover={{ boxShadow: '0 8px 32px rgba(124,58,237,0.08)' }}
      style={{
        border: '1.5px solid rgba(26,11,46,0.1)',
        borderRadius: '0.25rem',
        padding: '2rem 2rem 1.75rem',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Industry label */}
      {cs.industry && (
        <span className="label" style={{ color: '#22D3EE' }}>
          {cs.industry}
        </span>
      )}

      {/* Title — the hero */}
      <h2
        className="heading h3"
        style={{ color: '#1A0B2E', flex: 1 }}
      >
        {cs.title}
      </h2>

      {/* Bottom row: company identity + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid rgba(26,11,46,0.08)', flexWrap: 'wrap', gap: '0.75rem' }}>
        {cs.client && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            {cs.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cs.logo} alt={`${cs.client} logo`} style={{ width: 24, height: 24, borderRadius: '0.25rem', objectFit: 'contain', background: '#7C3AED', padding: '3px', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 24, height: 24, borderRadius: '0.25rem', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.6875rem', color: 'white' }}>
                {cs.client.charAt(0)}
              </div>
            )}
            <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500, fontSize: '0.875rem', color: 'rgba(26,11,46,0.5)' }}>
              {cs.client}
            </span>
          </div>
        )}

        <a href={`/case-studies/${cs.slug}`} className="cs-card-link" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.875rem', color: '#7C3AED', textDecoration: 'none' }}>
          view case study →
        </a>
      </div>
    </motion.div>
  );

  return cardInner;
}

function CaseGrid() {
  return (
    <section style={{ background: 'white', padding: '4rem clamp(1.25rem,6vw,8rem)' }}>
      <motion.div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
        }}
        className="cs-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {CASE_STUDIES.map(cs => (
          <GridCard key={cs.slug} cs={cs} />
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════ */

function SiteFooter() {
  return (
    <footer style={{ background: '#7C3AED', padding: '6rem clamp(1.25rem,6vw,8rem) 3rem', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-tile-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2.5rem' }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: 'white', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Tetris Labs
          </span>
          <p style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(255,255,255,0.5)', textTransform: 'lowercase', fontSize: '1rem' }}>
            We build AI-powered systems that let great teams scale
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="button"
            style={{ fontSize: '1rem', minHeight: '3.25rem', padding: '0 2rem' }}
            data-cal-namespace="discovery-call"
            data-cal-link="harshil-tetris/discovery-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            book a strategy call
          </button>
          <button className="button" style={{ background: 'white', color: '#1A0B2E', fontSize: '1rem', minHeight: '3.25rem', padding: '0 2rem' }}>
            request a deck
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {['x', 'linkedin', 'telegram'].map(link => (
            <a key={link} href="#" style={{ fontFamily: "'DM Mono', monospace", textTransform: 'lowercase', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', textDecoration: 'none' }}
              className="hover:text-white transition-colors"
            >{link}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '32rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
            &copy;2026 tetris labs
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ fontFamily: "'DM Mono', monospace", textTransform: 'lowercase', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            back to top
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function CaseStudiesPage() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.cursor = 'default';
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor = '';
    };
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'discovery-call' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <>
      <style>{`
        .cs-nav-center { display: block; }
        .cs-card-link:hover { text-decoration: underline; }
        @media (max-width: 767px) {
          .cs-nav-center { display: none !important; }
          .cs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ background: 'white', minHeight: '100vh' }}>
        <PageNav />
        <IndexHero />
        <CaseGrid />
        <SiteFooter />
      </div>
    </>
  );
}
