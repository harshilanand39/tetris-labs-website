'use client';

import { useEffect, useState, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';
import { Tweet } from 'react-tweet';
import { CASE_STUDIES, TESTIMONIALS, getCaseStudy, type CaseStudy } from '../data';

/* ─── Animation ─── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */

function CaseNav({ scrollProgress }: { scrollProgress: number }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[110]"
      style={{
        background: 'rgba(124,58,237,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: 'clamp(0.875rem,2vh,1.5rem) clamp(1rem,2.5vw,2rem)' }}
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
            style={{ minHeight: '2.75rem', fontSize: '0.875rem' }}
            data-cal-namespace="discovery-call"
            data-cal-link="harshil-tetris/discovery-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            book a strategy call
          </button>
        </div>
      </div>

      <div className="progress-bar" style={{ borderRadius: 0 }}>
        <div
          className="progress-bar-fill"
          style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function CaseHero({ cs, index }: { cs: CaseStudy; index: number }) {
  const cardNum = String(index + 1).padStart(2, '0');

  return (
    <section
      style={{
        background: '#7C3AED',
        minHeight: '60vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '8rem',
        padding: '8rem clamp(1.25rem,6vw,8rem) 0',
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
          maxWidth: '880px',
          margin: '0 auto',
          paddingBottom: '4rem',
        }}
      >
        <motion.span
          className="label"
          style={{ color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '1rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
        >
          case study — {cardNum}
        </motion.span>

        {cs.logo && (
          <motion.div
            style={{ marginBottom: '1.25rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cs.logo} alt={cs.client} style={{ height: 52, width: 'auto', borderRadius: '0.5rem' }} />
          </motion.div>
        )}

        <motion.h1
          className="heading h1"
          style={{ color: 'white', marginBottom: '1.5rem', maxWidth: '800px', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
        >
          {cs.comingSoon ? cs.client : cs.title}
        </motion.h1>

        {!cs.comingSoon && (
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
          >
            {[cs.industry].filter(Boolean).map(chip => (
              <span
                key={chip}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '0.25rem',
                  textTransform: 'lowercase',
                }}
              >
                {chip}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BODY
   ═══════════════════════════════════════════ */

function CaseBody({ cs }: { cs: CaseStudy }) {
  const testimonial = cs.testimonialIndex !== null ? TESTIMONIALS[cs.testimonialIndex] : null;
  const rc = cs.richContent;

  return (
    <section style={{ background: 'white', padding: '4rem clamp(1.25rem,6vw,8rem)' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Stats Row */}
        {cs.stats.length > 0 && (
          <div className="rc-stats-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.stats.length}, 1fr)`, background: 'rgba(124,58,237,0.03)', borderBottom: '1.5px solid rgba(26,11,46,0.08)' }}>
            {cs.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '2rem', color: '#22D3EE', display: 'block', lineHeight: 1.2 }}>{stat.value}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'rgba(26,11,46,0.5)', textTransform: 'lowercase', letterSpacing: '0.02em' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── About ── */}
        {rc?.about && (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>about the client</span>
            <p className="paragraph" style={{ color: 'rgba(26,11,46,0.65)' }}>{rc.about}</p>
          </div>
        )}

        {/* ── Clients ── */}
        {rc?.clientsImage && (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '1rem' }}>clients they're building with</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rc.clientsImage}
              alt="Clients Up Top Search works with"
              style={{ width: '100%', borderRadius: '0.5rem', border: '1.5px solid rgba(26,11,46,0.08)' }}
            />
          </div>
        )}

        {/* ── RICH: Discovery ── */}
        {rc?.discovery ? (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>how we mapped their world</span>
            <h3 className="heading h3" style={{ color: '#1A0B2E', marginBottom: '1rem' }}>{rc.discovery.heading}</h3>
            <p className="paragraph" style={{ color: 'rgba(26,11,46,0.65)', marginBottom: '2rem' }}>{rc.discovery.intro}</p>

            <div className="rc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(26,11,46,0.08)', marginBottom: '2rem' }}>
              {rc.discovery.cards.map((card, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'rgba(26,11,46,0.45)', marginBottom: '0.75rem' }}>{card.role}</div>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(26,11,46,0.65)', lineHeight: 1.7 }}>{card.description}</p>
                </div>
              ))}
            </div>

            <div style={{ borderLeft: '2px solid rgba(34,211,238,0.4)', padding: '1.25rem 1.5rem', background: 'rgba(34,211,238,0.04)', marginBottom: '1.5rem' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1rem', color: '#1A0B2E', lineHeight: 1.6, marginBottom: '0.5rem' }}>{rc.discovery.quote}</p>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,11,46,0.4)' }}>{rc.discovery.quoteAttribution}</span>
            </div>

            {rc.discovery.bodyCopy.map((para, i) => (
              <p key={i} className="paragraph" style={{ color: 'rgba(26,11,46,0.65)', marginBottom: i < rc.discovery!.bodyCopy.length - 1 ? '1rem' : 0 }}>{para}</p>
            ))}
          </div>
        ) : cs.challenge ? (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>the challenge</span>
            <h3 className="heading h3" style={{ color: '#1A0B2E', marginBottom: '1rem' }}>{cs.title}</h3>
            <p className="paragraph" style={{ color: '#1A0B2E' }}>{cs.challenge}</p>
          </div>
        ) : null}

        {/* ── RICH: Findings ── */}
        {rc?.findings && (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>what we found</span>
            <h3 className="heading h3" style={{ color: '#1A0B2E', marginBottom: '1rem' }}>{rc.findings.heading}</h3>
            <p className="paragraph" style={{ color: 'rgba(26,11,46,0.65)', marginBottom: '2rem' }}>{rc.findings.intro}</p>

            <div className="rc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {rc.findings.pillars.map((pillar, i) => (
                <div key={i} style={{ border: '1.5px solid rgba(26,11,46,0.08)', borderRadius: '0.25rem', padding: '1.5rem' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6875rem', color: 'rgba(124,58,237,0.55)', letterSpacing: '0.12em', display: 'block', marginBottom: '0.625rem' }}>{pillar.area}</span>
                  <h4 style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: '#1A0B2E', marginBottom: '0.625rem', lineHeight: 1.4 }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(26,11,46,0.6)', lineHeight: 1.7, marginBottom: '1rem' }}>{pillar.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {pillar.frictionPoints.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', color: 'rgba(26,11,46,0.42)' }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(124,58,237,0.4)', flexShrink: 0 }}>—</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RICH: Solution Clusters ── */}
        {rc?.solutionClusters ? (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>what we built</span>
            <h3 className="heading h3" style={{ color: '#1A0B2E', marginBottom: '1rem' }}>{rc.solutionClusters.heading}</h3>
            <p className="paragraph" style={{ color: 'rgba(26,11,46,0.65)', marginBottom: '1.5rem' }}>{rc.solutionClusters.intro}</p>

            <div style={{ border: '1.5px solid rgba(26,11,46,0.08)', background: 'rgba(124,58,237,0.03)', padding: '1.25rem 1.5rem', borderRadius: '0.25rem', marginBottom: '2.5rem' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1rem', color: '#1A0B2E', lineHeight: 1.6 }}>{rc.solutionClusters.methodCallout}</p>
            </div>

            {rc.solutionClusters.clusters.map((cluster, ci) => (
              <div key={ci} style={{ marginBottom: ci < rc.solutionClusters!.clusters.length - 1 ? '2.5rem' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1px', paddingBottom: '1rem', borderBottom: '1.5px solid rgba(26,11,46,0.08)' }}>
                  <div style={{ width: 32, height: 32, border: '1.5px solid rgba(26,11,46,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', flexShrink: 0, color: '#7C3AED', borderRadius: '0.125rem' }}>{cluster.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: '#1A0B2E' }}>{cluster.title}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,11,46,0.4)' }}>{cluster.subtitle}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(26,11,46,0.06)' }}>
                  {cluster.items.map((item, ii) => (
                    <div key={ii} className="rc-workflow-item" style={{ background: 'white', padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                      <div>
                        <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 500, fontSize: '0.875rem', color: '#1A0B2E', lineHeight: 1.4 }}>{item.name}</div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(26,11,46,0.6)', lineHeight: 1.65 }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : cs.solution.length > 0 ? (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>what we built</span>
            {cs.solution.map((para, i) => (
              <p key={i} className="paragraph" style={{ color: '#1A0B2E', marginBottom: i < cs.solution.length - 1 ? '1rem' : 0 }}>{para}</p>
            ))}
          </div>
        ) : null}

        {/* Deliverables (simple only) */}
        {!rc && cs.deliverables.length > 0 && (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '1rem' }}>what was delivered</span>
            <div style={{ border: '1.5px solid rgba(26,11,46,0.12)', background: 'rgba(124,58,237,0.04)', borderRadius: '0.25rem', padding: '1.75rem' }}>
              <ul className="station-list">
                {cs.deliverables.map((item, i) => (
                  <li key={i} className="station-list-item" style={{ color: 'rgba(26,11,46,0.7)' }}>
                    <svg className="bullet" viewBox="0 0 14 14" fill="none" style={{ color: '#7C3AED' }}>
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── RICH: Outcomes ── */}
        {rc?.outcomes ? (
          <div>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.5rem' }}>what changed</span>
            <h3 className="heading h3" style={{ color: '#1A0B2E', marginBottom: '1rem' }}>{rc.outcomes.heading}</h3>
            <p className="paragraph" style={{ color: 'rgba(26,11,46,0.65)', marginBottom: '2rem' }}>{rc.outcomes.intro}</p>

            <div className="rc-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(26,11,46,0.08)', marginBottom: '2rem' }}>
              {rc.outcomes.metrics.map((m, i) => (
                <div key={i} style={{ background: 'rgba(124,58,237,0.03)', padding: '1.5rem' }}>
                  <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '1.75rem', color: '#22D3EE', lineHeight: 1.1, marginBottom: '0.5rem' }}>{m.value}</div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(26,11,46,0.6)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{m.label}</div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(26,11,46,0.3)' }}>{m.note}</span>
                </div>
              ))}
            </div>

            {rc.outcomes.textItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: i < rc.outcomes!.textItems.length - 1 ? '1px solid rgba(26,11,46,0.08)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, background: '#22D3EE', borderRadius: '50%', marginTop: '0.625rem', flexShrink: 0 }} />
                <p style={{ fontSize: '0.9375rem', color: '#1A0B2E', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            {rc.tweetIds && rc.tweetIds.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '1.25rem' }}>in their own words</span>
                <div style={{ display: 'grid', gridTemplateColumns: rc.tweetIds.length > 1 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', gap: '1rem', alignItems: 'start' }}>
                  {rc.tweetIds.map(id => (
                    <Suspense key={id} fallback={<div style={{ height: 200, background: 'rgba(26,11,46,0.03)', borderRadius: '0.75rem' }} />}>
                      <Tweet id={id} />
                    </Suspense>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : cs.outcome ? (
          <div style={{ background: '#1A0B2E', borderLeft: '3px solid #22D3EE', padding: '1.5rem 1.75rem', borderRadius: '0 0.25rem 0.25rem 0' }}>
            <span className="label" style={{ color: '#22D3EE', display: 'block', marginBottom: '0.75rem' }}>the result</span>
            <p style={{ fontSize: '1rem', lineHeight: '170%', color: 'rgba(255,255,255,0.75)' }}>{cs.outcome}</p>
          </div>
        ) : null}

        {/* Testimonial */}
        {testimonial && (
          <div style={{ border: '1.5px solid rgba(26,11,46,0.1)', borderRadius: '0.25rem', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: '#7C3AED', lineHeight: 1, marginBottom: '0.75rem' }}>&ldquo;</div>
            <p style={{ fontSize: '0.9375rem', lineHeight: '170%', color: 'rgba(26,11,46,0.7)', marginBottom: '1.25rem' }}>{testimonial.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testimonial.photo} alt={testimonial.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(124,58,237,0.3)' }} />
              <div>
                <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#1A0B2E', display: 'block' }}>{testimonial.name}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6875rem', textTransform: 'lowercase', color: 'rgba(26,11,46,0.5)' }}>{testimonial.title}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   COMING SOON BODY
   ═══════════════════════════════════════════ */

function ComingSoonBody() {
  return (
    <section
      style={{
        background: 'white',
        padding: '6rem clamp(1.25rem,6vw,8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35, marginBottom: '1.25rem' }}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '1rem', color: 'rgba(26,11,46,0.5)', textTransform: 'lowercase', marginBottom: '0.5rem' }}>
        case study coming soon
      </p>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.8125rem', color: 'rgba(26,11,46,0.35)', textTransform: 'lowercase', marginBottom: '2.5rem' }}>
        we&apos;re still writing this one up. check back soon.
      </p>
      <a href="/case-studies" className="nav-link">
        ← back to case studies
      </a>
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
            <a key={link} href="#" style={{ fontFamily: "'DM Mono', monospace", textTransform: 'lowercase', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', textDecoration: 'none' }}>{link}</a>
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
   CLIENT PAGE
   ═══════════════════════════════════════════ */

export default function CaseStudyClient({ slug }: { slug: string }) {
  const cs = getCaseStudy(slug);
  const csIndex = CASE_STUDIES.findIndex(c => c.slug === slug);

  if (!cs) notFound();

  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .cs-nav-center { display: block; }
        @media (max-width: 767px) {
          .cs-nav-center { display: none !important; }
          .rc-grid-2 { grid-template-columns: 1fr !important; }
          .rc-grid-3 { grid-template-columns: 1fr !important; }
          .rc-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .rc-workflow-item { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ background: 'white', minHeight: '100vh' }}>
        <CaseNav scrollProgress={scrollProgress} />
        <CaseHero cs={cs} index={csIndex} />
        {cs.comingSoon ? <ComingSoonBody /> : <CaseBody cs={cs} />}
        <SiteFooter />
      </div>
    </>
  );
}
