'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';

/* ─── constants (same as main page) ─── */
const BG_TILE =
  'https://cdn.prod.website-files.com/66ffd660becd2fa4ef990307/66ffd660becd2fa4ef99031a_background-tile-05.svg';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const STRATEGY_CALL_CAL_LINK = 'neil-gadhok-zcm5vm/30min';
const STRATEGY_CALL_CAL_CONFIG = {
  layout: 'month_view',
} as const;

const partnerSymbol = (file: string) =>
  `/images/partner-symbols/${file.includes('.') ? file : `${file}.svg`}`;
const logoSources = (file?: string) => (file ? [partnerSymbol(file)] : []);

/* ─── Trusted Partners (marquee) ─── */
const TRUST_PARTNERS = [
  { name: 'Salesforce', sources: logoSources('salesforce') },
  { name: 'Nike', sources: logoSources('nike') },
  { name: 'JP Morgan Chase', sources: logoSources('chase') },
  { name: "Bloomingdale's", sources: logoSources('bloomingdales.png') },
  { name: 'Rolex', sources: logoSources('rolex.png') },
  { name: 'Shutterstock', sources: logoSources('shutterstock.png') },
  { name: 'DoubleVerify', sources: logoSources('doubleverify.png') },
  { name: 'Interactive Brokers', sources: logoSources('interactive-brokers.png') },
  { name: 'Stack Overflow', sources: logoSources('stackoverflow') },
  { name: 'Betterment', sources: logoSources('betterment.png') },
  { name: 'Venmo', sources: logoSources('venmo.png') },
  { name: 'Skillshare', sources: logoSources('skillshare.png') },
  { name: 'Trustpilot', sources: logoSources('trustpilot') },
  { name: 'Greenhouse', sources: logoSources('greenhouse') },
  { name: 'Moda Operandi', sources: logoSources('moda-operandi') },
  { name: 'Flatiron Health', sources: logoSources('flatiron-health.png') },
  { name: 'Paxos', sources: logoSources('paxos.png') },
  { name: 'ZocDoc', sources: logoSources('zocdoc.png') },
  { name: 'Thrive Global', sources: logoSources('thrive-global.png') },
  { name: 'Weights & Biases', sources: logoSources('weightsandbiases') },
  { name: 'Teleport', sources: logoSources('teleport.png') },
  { name: 'Cursor', sources: logoSources('cursor') },
  { name: 'Pika Labs', sources: logoSources('pika.png') },
  { name: 'Clay', sources: logoSources('clay.png') },
  { name: 'Inflection AI', sources: logoSources('inflection.png') },
  { name: 'Codeium', sources: logoSources('windsurf') },
  { name: 'Verkada', sources: logoSources('verkada.png') },
  { name: 'Exa', sources: logoSources('exa.png') },
  { name: 'Cartesia', sources: logoSources('cartesia.png') },
  { name: 'MultiOn', sources: logoSources('multion.png') },
  { name: 'Runway', sources: logoSources('runway.png') },
  { name: 'Vapi', sources: logoSources('vapi') },
  { name: 'Nooks', sources: logoSources('nooks.png') },
  { name: 'SandboxAQ', sources: logoSources('sandboxaq.png') },
  { name: 'Arkham Intelligence', sources: logoSources('arkham.png') },
  { name: 'OnDeck', sources: logoSources('ondeck.png') },
  { name: 'Voyage AI', sources: logoSources('voyage.png') },
  { name: 'LeafLink', sources: logoSources('leaflink.png') },
  { name: 'TripleLift', sources: logoSources('triplelift.png') },
  { name: 'HyperScience', sources: logoSources('hyperscience') },
  { name: 'Nanonets', sources: logoSources('nanonets') },
];

/* ─── Value Props ─── */
const VALUE_PROPS = [
  {
    title: 'AI-powered sourcing that finds who others miss',
    desc: 'Our systems scan beyond job boards - surfacing passive candidates, scoring for real fit, and delivering only the strongest talent.',
  },
  {
    title: 'A dedicated recruiter, not a helpdesk',
    desc: 'One person who learns your team, your culture, and your bar. Every search builds on the last. No handoffs, no re-explaining what "good" looks like.',
  },
  {
    title: 'Delivered straight into Breezy',
    desc: 'Candidates appear in your Breezy pipeline - scored, vetted, and ready to review. You keep using the scheduling, templates, and automations you already have. We just make sure the top of the funnel is stacked.',
  },
];

/* ─── Form field config ─── */
type DemoField = {
  name: 'email' | 'fullName' | 'hiringNeeds';
  label: string;
  type: 'email' | 'text' | 'textarea';
  required: boolean;
  placeholder: string;
};

const DEMO_FIELDS: DemoField[] = [
  { name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'Work email' },
  { name: 'fullName', label: 'Full name', type: 'text', required: true, placeholder: 'Full name' },
  { name: 'hiringNeeds', label: 'Hiring needs', type: 'textarea', required: true, placeholder: 'Hiring needs' },
];

const NEED_OPTIONS = [
  { value: 'startup', label: 'Startup' },
  { value: 'recruiting_firm', label: 'Recruiting Firm' },
];

/* ═══════════════════════════════════════════
   CUSTOM CURSOR (same as main page)
   ═══════════════════════════════════════════ */

function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    let raf: number;
    const anim = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      raf = requestAnimationFrame(anim);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(anim);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} id="custom-cursor" style={{ transform: 'translate(-50%,-50%)' }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M11.33 15.34L14.84 13.39C15.34 13.12 15.66 12.59 15.67 12.02L15.73 8C15.74 7.43 15.45 6.9 14.96 6.6L11.51 4.54C11.02 4.24 10.41 4.23 9.91 4.51L6.4 6.46C5.9 6.74 5.58 7.26 5.58 7.83L5.51 11.85C5.5 12.42 5.79 12.95 6.28 13.25L9.73 15.32C10.22 15.61 10.83 15.62 11.33 15.34Z"
          stroke="#1A0B2E"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FORM INPUT
   ═══════════════════════════════════════════ */

const inputStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '3rem',
  border: '1.5px solid rgba(255,255,255,0.12)',
  borderRadius: '0.25rem',
  padding: '0 1rem',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.9375rem',
  color: 'white',
  background: 'rgba(255,255,255,0.04)',
  outline: 'none',
  transition: 'border-color 0.3s ease, background 0.3s ease',
};

const openStrategyCallModal = async () => {
  const cal = await getCalApi({ namespace: 'strategy-call' });
  cal('modal', {
    calLink: STRATEGY_CALL_CAL_LINK,
    config: STRATEGY_CALL_CAL_CONFIG,
  });
};

function FormInput({
  field,
  value,
  onChange,
}: {
  field: DemoField;
  value: string;
  onChange: (v: string) => void;
}) {
  const focusStyle = { borderColor: '#22D3EE', background: 'rgba(34,211,238,0.04)' };
  const [focused, setFocused] = useState(false);

  if (field.type === 'textarea') {
    return (
      <textarea
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          minHeight: '4.5rem',
          paddingTop: '0.75rem',
          resize: 'vertical',
          ...(focused ? focusStyle : {}),
        }}
      />
    );
  }

  return (
    <input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle, ...(focused ? focusStyle : {}) }}
    />
  );
}

/* ═══════════════════════════════════════════
   DEMO FORM
   ═══════════════════════════════════════════ */

function DemoForm() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedNeed, setSelectedNeed] = useState('startup');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/breezy-demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email || '',
          source: 'breezy',
          type: selectedNeed,
          ...formData,
        }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmitted(true);
      await openStrategyCallModal();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: EASE_OUT }}
      style={{
        background: 'rgba(26,11,46,0.65)',
        border: '1.5px solid rgba(255,255,255,0.1)',
        borderRadius: '0.25rem',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <span
          className="label"
          style={{ color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em', fontSize: '0.75rem', textTransform: 'uppercase' }}
        >
          get a demo
        </span>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
            color: 'white',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}
        >
          Hire great talent{' '}
          <span style={{ color: '#22D3EE' }}>faster</span>
        </h2>
      </div>

      {/* Need selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.625rem',
          marginBottom: '1.25rem',
        }}
      >
        {NEED_OPTIONS.map((option) => {
          const active = selectedNeed === option.value;

          return (
          <button
            key={option.value}
            type="button"
            onClick={() => setSelectedNeed(option.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              minHeight: '3rem',
              padding: '0.75rem',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.75rem',
              textTransform: 'lowercase',
              border: active ? '1.5px solid #22D3EE' : '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: active ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)',
              color: active ? 'white' : 'rgba(255,255,255,0.55)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '0.85rem',
                height: '0.85rem',
                borderRadius: '0.15rem',
                border: active ? '1.5px solid #22D3EE' : '1.5px solid rgba(255,255,255,0.28)',
                background: active ? '#22D3EE' : 'transparent',
                boxShadow: active ? 'inset 2px 2px 0 rgba(255,255,255,0.45)' : 'none',
                flexShrink: 0,
              }}
            />
            {option.label}
          </button>
          );
        })}
      </div>

      {/* Form */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          style={{ textAlign: 'center', padding: '3rem 1rem' }}
        >
          <div
            style={{
              width: '3.5rem', height: '3.5rem', borderRadius: '50%',
              background: 'rgba(34,211,238,0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>
            Your demo request is in
          </h3>
          <p className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            book time with our head of talent next
          </p>
          <button
            type="button"
            className="button"
            onClick={() => {
              void openStrategyCallModal();
            }}
            style={{
              minHeight: '3.25rem',
              marginTop: '1.5rem',
              padding: '0 1.5rem',
              fontSize: '0.95rem',
            }}
          >
            book a strategy call
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {DEMO_FIELDS.map((field) => (
            <FormInput
              key={field.name}
              field={field}
              value={formData[field.name] || ''}
              onChange={(value) => handleChange(field.name, value)}
            />
          ))}

          {error && (
            <p style={{ fontFamily: "'DM Mono', monospace", textTransform: 'lowercase', fontSize: '0.75rem', color: '#EF4444' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="button"
            style={{
              width: '100%',
              minHeight: '3.25rem',
              marginTop: '0.25rem',
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'submitting...' : 'get a demo'}
          </button>
        </form>
      )}


    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function BreezyPage() {
  /* Restore body defaults for this page — the main page sets overflow:hidden + cursor:none */
  useEffect(() => {
    /* keep body overflow hidden so the whole page is a single viewport like the main site */
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    void getCalApi({ namespace: 'strategy-call' }).then((cal) => {
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
      cal('preload', { calLink: STRATEGY_CALL_CAL_LINK, type: 'modal' });
    });
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#7C3AED', overscrollBehavior: 'none' }}
    >
      {/* ── Background tile pattern (same as main page) ── */}
      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${BG_TILE})`, backgroundSize: '1rem 1rem' }}
      />

      {/* ── Gradient overlay (same as main page) ── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.3) 0%, transparent 70%)',
        }}
      />

      {/* ── Custom Cursor ── */}
      <CustomCursor />

      {/* ── Border container (same as main page) ── */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ padding: '0.75rem' }}
      >
        <div className="w-full h-full border-white-thin opacity-30" />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div
        className="fixed inset-0 z-10 flex items-center"
        style={{ padding: '0.75rem' }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(2rem, 5vw, 6rem)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 8rem)',
            alignItems: 'center',
          }}
          className="breezy-grid"
        >
          {/* ── LEFT: Copy ── */}
          <div>
            {/* Partnership lockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.875rem',
                marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)',
                border: '1px dashed rgba(255,255,255,0.3)',
                borderRadius: '0.25rem',
                padding: '0.625rem 1.25rem',
              }}
            >
              {/* Breezy logo + wordmark */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/breezy-logo.webp"
                  alt="Breezy HR"
                  style={{ width: '1.375rem', height: '1.375rem', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  breezy
                </span>
              </span>

              {/* × divider */}
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.875rem',
                  color: '#22D3EE',
                  lineHeight: 1,
                }}
              >
                ×
              </span>

              {/* Tetris Talent logo + wordmark */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/tetris-logo.png"
                  alt="Tetris Talent"
                  style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  tetris talent
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE_OUT }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'white',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              }}
            >
              Your hiring pipeline,{'\n'}
              <span style={{ color: '#22D3EE' }}>supercharged.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
              style={{
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                lineHeight: '170%',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '420px',
                marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
              }}
            >
    
              Tetris Talent is now natively integrated with Breezy HR - pipeline, scoring, and
              outreach all in one place.
            </motion.p>

            {/* Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE_OUT }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}
            >
              {VALUE_PROPS.map((vp, index) => (
                <div key={vp.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: 'white',
                      lineHeight: '130%',
                    }}
                  >
                    {vp.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: '170%',
                      color: 'rgba(255,255,255,0.5)',
                      maxWidth: '380px',
                    }}
                  >
                    {vp.desc}
                  </p>
                  {index < VALUE_PROPS.length - 1 && (
                    <div
                      style={{
                        borderTop: '1px dashed rgba(255,255,255,0.15)',
                        marginTop: '0.75rem',
                        marginBottom: '0.25rem',
                        maxWidth: '380px',
                      }}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Form ── */}
          <DemoForm />
        </div>

        {/* ── Trusted Partners Marquee (bottom) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '0.75rem',
            left: '0.75rem',
            right: '0.75rem',
            zIndex: 50,
            padding: '0.75rem 0',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                textTransform: 'uppercase',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.3)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                paddingLeft: 'clamp(1.25rem, 4vw, 3rem)',
              }}
            >
              trusted by teams at
            </span>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div className="marquee-logos" style={{ alignItems: 'center', gap: '2.5rem', animationDuration: '80s', width: 'max-content' }}>
                {[...TRUST_PARTNERS, ...TRUST_PARTNERS].map((p, i) => (
                  <span
                    key={i}
                    title={p.name}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flexShrink: 0,
                      color: 'white',
                      opacity: 0.62,
                      background: 'transparent',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: p.sources.length ? 'none' : 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'clamp(1rem, 1.75vw, 1.5rem)',
                        height: 'clamp(1rem, 1.75vw, 1.5rem)',
                        border: '1px solid currentColor',
                        borderRadius: '0.2rem',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        lineHeight: 1,
                        flexShrink: 0,
                        background: 'transparent',
                      }}
                    >
                      {p.name.charAt(0)}
                    </span>
                    {p.sources.length > 0 && (
                      <img
                        src={p.sources[0]}
                        alt={p.name}
                        style={{
                          width: 'clamp(1.15rem, 1.9vw, 1.65rem)',
                          height: 'clamp(1.15rem, 1.9vw, 1.65rem)',
                          objectFit: 'contain',
                          background: 'transparent',
                          filter: 'brightness(0) invert(1) grayscale(1)',
                          opacity: 0.9,
                          flexShrink: 0,
                        }}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                          const fallback = event.currentTarget.previousElementSibling;
                          if (fallback instanceof HTMLElement) {
                            fallback.style.display = 'inline-flex';
                          }
                        }}
                      />
                    )}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        height: 'clamp(1rem, 1.75vw, 1.5rem)',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                        fontWeight: 650,
                        letterSpacing: '0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .breezy-grid {
            grid-template-columns: 1fr !important;
            overflow-y: auto;
            max-height: calc(100vh - 5rem);
            align-items: start !important;
            padding-top: 2rem !important;
            padding-bottom: 6rem !important;
          }
        }
      `}</style>
    </div>
  );
}
