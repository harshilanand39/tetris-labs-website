'use client';

import { useState, useCallback, useEffect, useRef, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';

/* ─── constants ─── */
const BG_TILE =
  'https://cdn.prod.website-files.com/66ffd660becd2fa4ef990307/66ffd660becd2fa4ef99031a_background-tile-05.svg';

const DEMO_VIDEO_URL = 'https://drive.google.com/file/u/2/d/1dE4VTkfbr40n_-96QjQtMXSqVWWTC3CV/view?usp=sharing';

type TrustPartner = {
  name: string;
  sources: string[];
};

const simpleIconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}/FFFFFF`;
const logoSources = (simpleIconSlug?: string) => (simpleIconSlug ? [simpleIconUrl(simpleIconSlug)] : []);

const STATIONS_META = [
  'why us',
  'testimonials',
  'how we work',
  'who we are',
];

const TRUST_PARTNERS: TrustPartner[] = [
  { name: 'Salesforce', sources: logoSources() },
  { name: 'Nike', sources: logoSources('nike') },
  { name: 'JP Morgan Chase', sources: logoSources('chase') },
  { name: "Bloomingdale's", sources: logoSources() },
  { name: 'Rolex', sources: logoSources() },
  { name: 'Shutterstock', sources: logoSources() },
  { name: 'DoubleVerify', sources: logoSources() },
  { name: 'Interactive Brokers', sources: logoSources() },
  { name: 'Stack Overflow', sources: logoSources('stackoverflow') },
  { name: 'Betterment', sources: logoSources() },
  { name: 'Venmo', sources: logoSources('venmo') },
  { name: 'Skillshare', sources: logoSources('skillshare') },
  { name: 'Trustpilot', sources: logoSources('trustpilot') },
  { name: 'Greenhouse', sources: logoSources('greenhouse') },
  { name: 'Moda Operandi', sources: logoSources() },
  { name: 'Flatiron Health', sources: logoSources() },
  { name: 'Paxos', sources: logoSources() },
  { name: 'ZocDoc', sources: logoSources() },
  { name: 'Thrive Global', sources: logoSources() },
  { name: 'Weights & Biases', sources: logoSources('weightsandbiases') },
  { name: 'Teleport', sources: logoSources() },
  { name: 'Cursor', sources: logoSources('cursor') },
  { name: 'Pika Labs', sources: logoSources() },
  { name: 'Clay', sources: logoSources() },
  { name: 'Inflection AI', sources: logoSources() },
  { name: 'Codeium', sources: logoSources('windsurf') },
  { name: 'Verkada', sources: logoSources() },
  { name: 'Exa', sources: logoSources() },
  { name: 'Cartesia', sources: logoSources() },
  { name: 'MultiOn', sources: logoSources() },
  { name: 'Runway', sources: logoSources() },
  { name: 'Vapi', sources: logoSources() },
  { name: 'Nooks', sources: logoSources() },
  { name: 'SandboxAQ', sources: logoSources() },
  { name: 'Arkham Intelligence', sources: logoSources() },
  { name: 'OnDeck', sources: logoSources() },
  { name: 'Voyage AI', sources: logoSources() },
  { name: 'LeafLink', sources: logoSources() },
  { name: 'TripleLift', sources: logoSources() },
  { name: 'HyperScience', sources: logoSources() },
  { name: 'Nanonets', sources: logoSources() },
];

function PartnerLogo({ partner }: { partner: TrustPartner }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = partner.sources[sourceIndex];

  if (!source) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={source}
      src={source}
      alt=""
      aria-hidden="true"
      style={{
        height: 'clamp(1rem, 1.75vw, 1.5rem)',
        aspectRatio: '1 / 1',
        width: 'auto',
        maxWidth: '1.5rem',
        objectFit: 'contain',
        background: 'transparent',
        filter: 'brightness(0) invert(1) grayscale(1)',
        opacity: 0.9,
        flexShrink: 0,
      }}
      onError={() => {
        setSourceIndex((current) => current + 1);
      }}
    />
  );
}

const TESTIMONIALS = [
  {
    quote: "Working with Harshil was an absolute dream. My contacts, documents and advisory services framework was literally ALL over the place. In a short period of time Harshil listened to me, made recommendations, helped me execute on said recommendations, and even built some new custom flows for me. Harshil is patient, hardworking, detail oriented and has become a pivotal partner in not only the nuts and bolts, but also the strategy of my business moving forward.",
    name: "Adam Mastrelli",
    title: "US Partner, Woodstock Fund",
    photo: "/images/adam-mastrelli.png",
  },
  {
    quote: "I've worked with Harshil for the past ~2 years on custom recruiting solutions and applicant tracking systems. Most recently, when I took over recruiting and talent at SCRIB3, Harshil helped us build out our entire recruiting solution on the backend and has been extremely helpful with tweaks and updates after going live. With the help of Harshil and the Notion he built us, we've been able to make 50 hires and double in size within the past 6 months.",
    name: "William Burleson",
    title: "Head of Talent, SCRIB3",
    photo: "/images/william-burleson.png",
  },
  {
    quote: "Of all the wins we've had at Up Top in the past year, none have been more impactful than building out this CRM with Harshil and the team. It's turned me from an unhinged sales guy who hates process, to an operator running a clean business. At this point, I can't imagine my company functioning without it. Harshil was extremely helpful in walking me through the discovery process, suggesting new features, and delivering on solutions to exactly what I needed to maximize efficiency and organization.",
    name: "Dan Eskow",
    title: "Founder, Up Top Search",
    photo: "/images/dan-eskow.png",
  },
];

const PROBLEM_PAIRS = [
  {
    problem: 'AI-Powered Talent Discovery',
    problemDesc:
      'Agencies manually search LinkedIn, wait for inbound, and recycle the same candidate pool every search.',
    solution: 'Continuous candidate intelligence',
    solutionDesc:
      "Our systems continuously scan, score, and surface top-tier candidates - before they're even looking.",
  },
  {
    problem: 'Your Team, Not Your Vendor',
    problemDesc:
      'Brief handoff, recruiter disappears, then random resumes show up weeks later with zero context.',
    solution: 'A recruiter embedded in your process',
    solutionDesc:
      'A dedicated recruiter embeds into your team. Your hiring process is our process - no handoffs, no starting from scratch.',
  },
  {
    problem: 'Speed Without Cutting Corners',
    problemDesc:
      '3-6 weeks to shortlist. Slow feedback loops. Candidates go cold while you wait.',
    solution: 'Shortlists in days',
    solutionDesc:
      'Sourcing, screening, and scoring are systemized - so speed never comes at the cost of quality.',
  },
  {
    problem: 'Invested In Your Growth',
    problemDesc:
      'Transactional. Send resumes, collect fees, move on. Zero investment in long-term hiring success.',
    solution: 'An extension of your team',
    solutionDesc:
      "Higher close rates, lower drop-off, candidates who actually fit - because we know what you need.",
  },
];

const PROCESS_STEPS = [
  {
    num: '0',
    title: 'Onboarding + Kickoff',
    timeline: 'day 0',
    desc: 'Every system, portal, and workflow set up before a single role opens.',
    agentItems: [
      'ATS, CRM & Slack auto-provisioned on contract close',
      'Client portal access configured automatically',
      'Onboarding packet generated and delivered',
      'Weekly pipeline reports auto-generated from ATS data',
    ],
    teamItems: [
      'Kickoff call - SLAs, communication norms, escalation paths',
      'Reporting cadence sign-off with client stakeholders',
    ],
  },
  {
    num: '1',
    title: 'Job Brief & Templates',
    timeline: 'day 1-3',
    desc: 'Role requirements locked, scorecards built, agency fully briefed before sourcing starts.',
    agentItems: [
      'Drafts JD, scorecard, and intake doc from role template + comp data',
      'Headcount approval auto-routed in HRIS',
      'Req auto-opens in ATS on approval',
      'Intake doc delivered to agency with confirmation tracking',
    ],
    teamItems: [
      'Briefing call with hiring manager - requirements, culture signals, non-negotiables',
      'Final JD and scorecard approval with client',
    ],
  },
  {
    num: '2',
    title: 'Sourcing & Screening',
    timeline: 'day 3+',
    desc: 'Agents run the pipeline. We stay on the phone with candidates.',
    agentItems: [
      'AI surfaces candidates via intent signals, org charts, network mapping',
      'Automated outreach sequences run in parallel',
      'Resumes pre-scored against scorecard before human review',
      'Structured feedback auto-sent to agency within SLA',
      'Candidate status updates triggered automatically',
    ],
    teamItems: [
      'Shortlist review and final approval',
      'Every candidate phone screen - motivation, comp fit, culture read. This stays human.',
    ],
  },
  {
    num: '3',
    title: 'Interviews',
    timeline: 'day 3+',
    desc: 'Zero scheduling friction. Every interviewer accountable. Debrief ready before it starts.',
    agentItems: [
      'All scheduling via Greenhouse/Calendly - no back-and-forth',
      'Assessments auto-sent, collected, and scored',
      'Scorecard reminders + Slack nudges for every missing submission',
      'Pre-debrief summary: scorecard rollup, split votes flagged',
      'Outcome notifications auto-sent to agency and candidate',
    ],
    teamItems: [
      'Debrief facilitation - hire/no-hire decision with hiring panel',
      'Agency relationship management through the process',
    ],
  },
  {
    num: '4',
    title: 'Offer & Close',
    timeline: 'by end of month 1',
    desc: 'Agents handle every document and notification. We close the candidate.',
    agentItems: [
      'Live comp benchmarks pulled automatically',
      'Approval routing in HRIS',
      'Offer letter auto-generated and sent via DocuSign',
      'On acceptance: ATS, agency, team, and HRIS all updated automatically',
    ],
    teamItems: [
      'Verbal offer call - this is a relationship moment. No agent here.',
      'Negotiation - counter language drafted by agent, delivered by us',
    ],
  },
];

const WHO_WE_ARE_STATS = [
  {
    value: '1:1',
    label: 'recruiter partnership',
    desc: 'Experienced recruiters stay close to the human details that decide whether a hire actually works.',
  },
  {
    value: '24/7',
    label: 'candidate operations',
    desc: 'Intelligent systems keep sourcing, screening, follow-ups, and pipeline hygiene moving around the clock.',
  },
  {
    value: '100s',
    label: 'of placements',
    desc: 'Our team has helped companies find the right people across technical, operational, and go-to-market roles.',
  },
  {
    value: '120+',
    label: 'companies supported',
    desc: 'We bring pattern recognition from high-growth teams, lean operators, and talent organizations that move fast.',
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Scramble Text ─── */
/* ─── Custom Cursor ─── */
function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
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
    <div
      ref={ref}
      id="custom-cursor"
      style={{ transform: 'translate(-50%,-50%)' }}
    >
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

/* ─── Accordion Item ─── */
function AccordionItem({
  title,
  content,
  children,
  defaultOpen = false,
}: {
  title: string;
  content?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-5 text-left"
      >
        <span
          className="font-semibold text-lg"
          style={{ fontFamily: "'Inter', sans-serif", color: '#22D3EE' }}
        >
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s',
            flexShrink: 0,
          }}
        >
          <path
            d="M3 5L8 10L13 5"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        style={{ overflow: 'hidden' }}
      >
        {children || (
          <p
            className="px-5 pb-5 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {content}
          </p>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Problem Selector Tabs ─── */
function ProblemSelector({
  activeProblem,
  setActiveProblem,
  timerActive,
}: {
  activeProblem: number;
  setActiveProblem: (i: number) => void;
  timerActive: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {PROBLEM_PAIRS.map((pair, i) => {
        const isActive = activeProblem === i;
        return (
          <button
            key={i}
            onClick={() => setActiveProblem(i)}
            className="flex items-center gap-3 text-left transition-all rounded-sm"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '0.875rem 1.25rem',
              border: isActive
                ? '1.5px solid #22D3EE'
                : '1.5px solid rgba(255,255,255,0.15)',
              background: isActive ? 'rgba(34,211,238,0.1)' : 'transparent',
              borderRadius: '0.25rem',
            }}
          >
            <span
              className="flex-shrink-0 w-7 h-7 rounded-sm flex items-center justify-center text-[11px]"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: isActive ? '#22D3EE' : 'transparent',
                border: isActive
                  ? '1.5px solid #22D3EE'
                  : '1.5px solid rgba(255,255,255,0.25)',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <span
                className="font-semibold text-sm"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: isActive ? '#22D3EE' : 'rgba(255,255,255,0.7)',
                  transition: 'color 0.3s ease',
                }}
              >
                {pair.problem}
              </span>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                flexShrink: 0,
                opacity: isActive ? 1 : 0.3,
                transition: 'opacity 0.3s',
              }}
            >
              <path
                d="M9 18l6-6-6-6"
                stroke={isActive ? '#22D3EE' : 'white'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isActive && timerActive && (
              <div
                key={activeProblem}
                className="problem-timer-bar"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Problem Detail Card ─── */
function ProblemDetailCard({ pair }: { pair: (typeof PROBLEM_PAIRS)[0] }) {
  return (
    <div className="station-card" style={{ overflow: 'hidden' }}>
      {/* The Reality - top section */}
      <div
        style={{
          padding: '1.75rem 1.5rem',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-2.5" style={{ marginBottom: '1.25rem' }}>
          <span
            className="flex items-center justify-center"
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.625rem',
              lineHeight: 1,
            }}
          >
            &#x2715;
          </span>
          <span
            className="text-xs font-medium uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
            }}
          >
            the reality
          </span>
        </div>
        <h4
          className="font-semibold mb-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '130%',
          }}
        >
          {pair.problem}
        </h4>
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: '170%',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {pair.problemDesc}
        </p>
      </div>

      {/* Arrow divider */}
      <div
        className="flex items-center justify-center"
        style={{
          padding: '0.5rem 0',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(34,211,238,0.06) 100%)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M19 12l-7 7-7-7"
            stroke="#22D3EE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* With Tetris Labs - bottom section */}
      <div
        style={{
          padding: '1.75rem 1.5rem',
          background: 'rgba(34,211,238,0.06)',
        }}
      >
        <div className="flex items-center gap-2.5" style={{ marginBottom: '1.25rem' }}>
          <span
            className="flex items-center justify-center"
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              background: 'rgba(34,211,238,0.2)',
              color: '#22D3EE',
              fontSize: '0.6875rem',
              lineHeight: 1,
            }}
          >
            &#x2713;
          </span>
          <span
            className="text-xs font-medium uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: '#22D3EE',
              letterSpacing: '0.1em',
            }}
          >
            tetris talent
          </span>
        </div>
        <h4
          className="font-semibold mb-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.125rem',
            color: 'white',
            lineHeight: '130%',
          }}
        >
          {pair.solution}
        </h4>
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: '170%',
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {pair.solutionDesc}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  useEffect(() => {
    (async function () {
      const strategyCal = await getCalApi({ namespace: 'strategy-call' });
      strategyCal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [loading, setLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [station, setStation] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoError, setDemoError] = useState('');
  const [activeProblem, setActiveProblem] = useState(0);

  /* auto-advance problem selector on station 1 */
  useEffect(() => {
    if (station !== 1) return;
    const id = setInterval(() => {
      setActiveProblem((prev) => (prev + 1) % PROBLEM_PAIRS.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeProblem]);

  const [activeStep, setActiveStep] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDir, setTestimonialDir] = useState(1);

  /* auto-advance station 2: Testimonials */
  useEffect(() => {
    if (station !== 2) return;
    const id = setInterval(() => {
      setTestimonialDir(1);
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeTestimonial]);

  /* auto-advance station 3: How We Work */
  useEffect(() => {
    if (station !== 3) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeStep]);

  const lastScrollTime = useRef(0);
  const stationRef = useRef(0);
  const navLocked = useRef(false);
  const stationScrollRef = useRef<HTMLDivElement>(null);

  /* preloader */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  /* go to station */
  const goStation = useCallback((s: number) => {
    if (s < 0) s = 0;
    if (s > 5) s = 5;
    stationRef.current = s;
    setStation(s);
    setHeroVisible(s === 0);
    setNavVisible(s > 0 && s < 5);
    setFooterVisible(s === 5);
    setSelectorOpen(false);
    if (s === 1) setActiveProblem(0);
    if (s === 2) setActiveTestimonial(0);
    if (s === 3) setActiveStep(0);
  }, []);

  const openDemoModal = () => {
    setDemoError('');
    setDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    if (demoSubmitting) return;
    setDemoModalOpen(false);
  };

  const submitDemoRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDemoSubmitting(true);
    setDemoError('');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail }),
      });

      if (!response.ok) {
        throw new Error('Unable to submit email.');
      }

      setDemoModalOpen(false);
      window.open(DEMO_VIDEO_URL, '_blank', 'noopener,noreferrer');
    } catch {
      setDemoError('Something went wrong. Please try again.');
    } finally {
      setDemoSubmitting(false);
    }
  };

  /* scroll / key / touch navigation — registered once, reads station via ref */
  useEffect(() => {
    if (loading) return;

    let quietTimer: ReturnType<typeof setTimeout> | null = null;

    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Ignore tiny deltas from trackpad momentum residuals
      if (Math.abs(e.deltaY) < 3) return;

      // Navigate only on the first event of a gesture (when not locked)
      if (!navLocked.current) {
        navLocked.current = true;
        goStation(stationRef.current + (e.deltaY > 0 ? 1 : -1));
      }
      // Keep resetting the timer on every event (including momentum),
      // so the lock only releases after scrolling has fully stopped.
      if (quietTimer) clearTimeout(quietTimer);
      quietTimer = setTimeout(() => {
        navLocked.current = false;
        quietTimer = null;
      }, 400);
    };

    const navigate = (dir: 1 | -1) => {
      if (navLocked.current) return;
      navLocked.current = true;
      goStation(stationRef.current + dir);
      setTimeout(() => { navLocked.current = false; }, 900);
    };

    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
      }
    };

    let ty = 0;
    let startScrollTop = 0;
    const ts = (e: TouchEvent) => {
      ty = e.touches[0].clientY;
      startScrollTop = stationScrollRef.current?.scrollTop ?? 0;
    };
    const te = (e: TouchEvent) => {
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) < 50) return;

      const isMobileNow = window.innerWidth < 768;
      if (isMobileNow && stationScrollRef.current) {
        const el = stationScrollRef.current;
        const isScrollable = el.scrollHeight > el.clientHeight + 5;

        if (isScrollable) {
          const atTop = el.scrollTop <= 5 && startScrollTop <= 5;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
          // Only navigate when truly at boundary
          if (d > 0 && !atBottom) return;
          if (d < 0 && !atTop) return;
        }
      }

      navigate(d > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', wheel, { passive: false, capture: true });
    window.addEventListener('keydown', key);
    window.addEventListener('touchstart', ts, { passive: true });
    window.addEventListener('touchend', te, { passive: true });
    return () => {
      window.removeEventListener('wheel', wheel, { capture: true });
      window.removeEventListener('keydown', key);
      window.removeEventListener('touchstart', ts);
      window.removeEventListener('touchend', te);
      if (quietTimer) clearTimeout(quietTimer);
    };
  }, [loading, goStation]);

  /* animation variants */
  const boxVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: EASE_OUT },
    }),
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#7C3AED', overscrollBehavior: 'none' }}
    >
      {/* ── Background tile pattern ── */}
      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${BG_TILE})`, backgroundSize: '1rem 1rem' }}
      />

      {/* ── Gradient overlay ── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.3) 0%, transparent 70%)',
        }}
      />

      {/* ── Custom Cursor ── */}
      <CustomCursor />

      {/* ── Preloader ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            style={{ background: '#7C3AED' }}
          >
            <div style={{ position: 'relative', width: 89, height: 66 }}>

              {/* I-piece (cyan) — flies in from top */}
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0 }}
                animate={{ y: [-80, 0, 0, -80] }}
                transition={{ duration: 2.4, times: [0, 0.35, 0.65, 1], repeat: Infinity, ease: 'easeInOut' }}
              >
                <div style={{ display: 'flex', gap: 3 }}>
                  {[0, 1, 2, 3].map(c => (
                    <div key={c} style={{ width: 20, height: 20, backgroundColor: '#22D3EE', boxShadow: 'inset 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 0 rgba(0,0,0,0.3)' }} />
                  ))}
                </div>
              </motion.div>

              {/* L-piece — flies in from bottom-left */}
              <motion.div
                style={{ position: 'absolute', top: 23, left: 0, display: 'flex', flexDirection: 'column', gap: 3 }}
                animate={{ x: [-70, 0, 0, -70], y: [55, 0, 0, 55] }}
                transition={{ duration: 2.4, times: [0, 0.35, 0.65, 1], repeat: Infinity, ease: 'easeInOut' }}
              >
                {[[1, 0, 0], [1, 1, 1]].map((row, r) => (
                  <div key={r} style={{ display: 'flex', gap: 3 }}>
                    {row.map((cell, c) => (
                      <div key={c} style={{ width: 20, height: 20, backgroundColor: cell ? '#22D3EE' : 'transparent', boxShadow: cell ? 'inset 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 0 rgba(0,0,0,0.3)' : 'none' }} />
                    ))}
                  </div>
                ))}
              </motion.div>

              {/* J-piece — flies in from bottom-right */}
              <motion.div
                style={{ position: 'absolute', top: 23, left: 23, display: 'flex', flexDirection: 'column', gap: 3 }}
                animate={{ x: [70, 0, 0, 70], y: [55, 0, 0, 55] }}
                transition={{ duration: 2.4, times: [0, 0.35, 0.65, 1], repeat: Infinity, ease: 'easeInOut' }}
              >
                {[[1, 1, 1], [0, 0, 1]].map((row, r) => (
                  <div key={r} style={{ display: 'flex', gap: 3 }}>
                    {row.map((cell, c) => (
                      <div key={c} style={{ width: 20, height: 20, backgroundColor: cell ? '#22D3EE' : 'transparent', boxShadow: cell ? 'inset 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 0 rgba(0,0,0,0.3)' : 'none' }} />
                    ))}
                  </div>
                ))}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav Bar ── */}
      <AnimatePresence>
        {navVisible && !loading && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-between"
            style={{
              padding: 'clamp(1rem, 2vh, 1.5rem) clamp(1rem, 2vw, 1.5rem)',
              ...(isMobile ? { background: '#7C3AED', borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}),
            }}
          >
            <a
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                goStation(0);
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Tetris Labs
              </span>
            </a>
            {/* Mobile: station selector in nav */}
            {isMobile && (
              <div className="relative">
                <button
                  onClick={() => setSelectorOpen(!selectorOpen)}
                  className="flex items-center gap-2 text-left text-sm"
                  style={{
                    border: '1px dashed white',
                    borderRadius: '0.25rem',
                    padding: '0.375rem 0.625rem',
                    background: 'transparent',
                    color: 'white',
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'lowercase',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-sm flex items-center justify-center text-[10px]"
                    style={{
                      border: '1px solid rgba(255,255,255,0.4)',
                      flexShrink: 0,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {String(station).padStart(2, '0')}
                  </span>
                  <span>{STATIONS_META[station - 1]}</span>
                  <svg
                    width="12" height="12" viewBox="0 0 16 16" fill="none"
                    style={{ transform: selectorOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}
                  >
                    <path d="M3 5L8 10L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AnimatePresence>
                  {selectorOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="absolute right-0 flex flex-col gap-2"
                      style={{ top: '100%', marginTop: '0.5rem', zIndex: 130 }}
                    >
                      {STATIONS_META.map((label, i) => (
                        <button
                          key={i}
                          onClick={() => goStation(i + 1)}
                          className="flex items-center gap-3 text-left text-sm transition-all"
                          style={{
                            border: '1px dashed white',
                            borderRadius: '0.25rem',
                            padding: '0.5rem 0.875rem',
                            background: station === i + 1 ? 'white' : '#7C3AED',
                            color: station === i + 1 ? '#1A0B2E' : 'white',
                            fontFamily: "'DM Mono', monospace",
                            textTransform: 'lowercase',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span
                            className="w-5 h-5 rounded-sm flex items-center justify-center text-[10px]"
                            style={{
                              border: `1px solid ${station === i + 1 ? '#1A0B2E' : 'rgba(255,255,255,0.4)'}`,
                              flexShrink: 0,
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <div className="hidden md:flex items-center" style={{ gap: '0.75rem' }}>
              <a
                href="#"
                className="button"
                style={{
                  minHeight: '2.5rem',
                  padding: '0 1rem',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                }}
                data-cal-namespace="strategy-call"
                data-cal-link="neil-gadhok-zcm5vm/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >
                book a strategy call
              </a>
              <button
                type="button"
                onClick={openDemoModal}
                className="button"
                style={{
                  minHeight: '2.5rem',
                  padding: '0 1rem',
                  fontSize: '0.875rem',
                  background: 'transparent',
                  color: 'white',
                  borderColor: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                request demo
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Border container ── */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ padding: '0.75rem' }}
      >
        <div className="w-full h-full border-white-thin opacity-30" />
      </div>

      {/* ═══ HERO ═══ */}
      <AnimatePresence mode="wait">
        {!loading && heroVisible && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="fixed inset-0 z-10 flex"
            style={{ padding: '0.75rem' }}
          >
            {/* left: hero content */}
            <div className="flex-1 flex flex-col justify-center" style={{ padding: 'clamp(2rem, 4vh, 4rem) clamp(1.25rem, 4vw, 4rem) clamp(2rem, 4vh, 4rem) clamp(1.25rem, 5vw, 5vw)', minWidth: 0, overflow: 'hidden' }}>
              {/* status badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE_OUT }}
                style={{ marginBottom: 'clamp(1.5rem, 3vh, 3rem)' }}
              >
                <span
                  className="inline-block rounded-sm"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'lowercase',
                    border: '1px dashed rgba(255,255,255,0.4)',
                    color: 'white',
                    fontSize: 'clamp(0.75rem, 1vw, 1rem)',
                    padding: '0.6rem 1.25rem',
                  }}
                >
                  now onboarding q2 2026 — limited spots available
                </span>
              </motion.div>

              {/* headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT }}
                style={{
                  color: 'white',
                  maxWidth: 'min(72rem, 100%)',
                  fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: 'clamp(1.5rem, 3vh, 3rem)',
                }}
              >
                Your talent partner for the age of{' '}
                <span style={{ color: '#22D3EE' }}>intelligent hiring</span>
              </motion.h1>

              {/* subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  maxWidth: 'min(72rem, 100%)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                  lineHeight: 1.6,
                  marginBottom: 'clamp(1.5rem, 4vh, 4rem)',
                }}
              >
                We pair experienced recruiters with intelligent systems that source,
                screen, and manage candidates around the clock. You get the people side of
                recruiting with the speed of AI.
              </motion.p>

              {/* CTAs + trust — share the same inline width */}
              <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vh, 4rem)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6, ease: EASE_OUT }}
                  className="flex flex-nowrap"
                  style={{ gap: 'clamp(0.5rem, 1.5vw, 1.25rem)' }}
                >
                  <button
                    type="button"
                    className="button"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.1vw, 1.125rem)',
                      minHeight: 'clamp(2.75rem, 4vw, 3.75rem)',
                      padding: '0 clamp(1rem, 2.5vw, 2.25rem)',
                      whiteSpace: 'nowrap',
                    }}
                    data-cal-namespace="strategy-call"
                    data-cal-link="neil-gadhok-zcm5vm/30min"
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  >
                    book a strategy call
                  </button>
                  <button
                    type="button"
                    onClick={openDemoModal}
                    className="button"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.1vw, 1.125rem)',
                      minHeight: 'clamp(2.75rem, 4vw, 3.75rem)',
                      padding: '0 clamp(1rem, 2.5vw, 2.25rem)',
                      background: 'transparent',
                      color: 'white',
                      borderColor: 'white',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    request demo
                  </button>
                </motion.div>

                {/* trust line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  style={{ maxWidth: isMobile ? '100%' : '45%' }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: 'clamp(0.7rem, 0.9vw, 0.875rem)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    20+ years of recruiting experience
                  </p>
                  {/* Marquee logos — infinite seamless loop */}
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
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
                          <PartnerLogo partner={p} />
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
                </motion.div>
              </div>
            </div>

            {/* right: station sidebar */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE_OUT }}
              className="hidden md:flex flex-col w-[30%] max-w-[320px]"
              style={{ borderLeft: '1.5px solid rgba(255,255,255,0.3)' }}
            >
              {STATIONS_META.map((label, i) => (
                <button
                  key={i}
                  onClick={() => goStation(i + 1)}
                  className="flex items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                  style={{
                    borderBottom:
                      i < STATIONS_META.length - 1
                        ? '1px solid rgba(255,255,255,0.15)'
                        : 'none',
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-sm flex items-center justify-center text-xs"
                    style={{
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: "'DM Mono', monospace",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="label" style={{ fontSize: '0.8rem' }}>{label}</span>
                </button>
              ))}
              {/* start button at bottom */}
              <div className="mt-auto">
                <button
                  onClick={() => goStation(1)}
                  className="button hero w-full rounded-none"
                  style={{
                    borderRadius: '0 0 0.25rem 0.25rem',
                    borderTop: '1.5px solid rgba(255,255,255,0.3)',
                  }}
                >
                  learn more
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ STATIONS ═══ */}
      <AnimatePresence mode="wait">
        {!loading && !heroVisible && station >= 1 && station <= 4 && (
          <motion.div
            key={`station-${station}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-10 flex items-start md:items-center"
            style={{ padding: '0.75rem' }}
          >
            {/* Station content */}
            <div
              ref={stationScrollRef}
              className={`w-full md:w-auto ${station === 4 ? 'md:max-w-[66vw]' : 'md:max-w-[50vw]'} flex flex-col gap-5 md:gap-8 hide-scrollbar`}
              style={{
                padding: 'clamp(3.5rem, 8vh, 5rem) clamp(1rem, 3vw, 2rem) clamp(3rem, 8vh, 5rem) clamp(1rem, 4vw, 4rem)',
                maxHeight: '100vh',
                overflowY: isMobile ? 'auto' : 'hidden',
              }}
            >
              {/* ── Station 1: Why Us / The Problem ── */}
              {station === 1 && (
                <>
                  <motion.div
                    custom={0}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="white-text-box"
                  >
                    <div className="label">
                      why us
                    </div>
                    <h2 className="heading h2">
                      Tetris treats recruiting
                      <br />
                      <span style={{ color: '#22D3EE' }}>like a science</span>
                    </h2>
                    <p className="body-text">
                      Traditional recruiting is slow, transactional, and forgettable.
                      We built something different.
                    </p>
                  </motion.div>

                  {/* Problem selector tabs */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ProblemSelector
                      activeProblem={activeProblem}
                      setActiveProblem={setActiveProblem}
                      timerActive={station === 1}
                    />
                  </motion.div>

                  {/* Problem detail card */}
                  <motion.div
                    custom={2}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProblem}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                      >
                        <ProblemDetailCard pair={PROBLEM_PAIRS[activeProblem]} />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </>
              )}

              {/* ── Station 3: How We Work — Vertical Timeline ── */}
              {station === 3 && (
                <>
                  <motion.div
                    custom={0}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="white-text-box"
                  >
                    <div className="label">
                      how we do it
                    </div>
                    <h2 className="heading h3">
                      One system
                    </h2>
                    <h2
                      className="heading h2"
                      style={{ color: '#22D3EE' }}
                    >
                      The output of a full team.
                    </h2>
                    <p className="body-text">
                      Every engagement runs on a coordinated workflow - agents
                      handle the volume and the waiting loops, Tetris Talent
                      handles the relationships.
                    </p>
                  </motion.div>

                  {/* Integrated step card */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="station-card"
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Step tabs — top edge of card */}
                    <div
                      className="grid grid-cols-2 md:grid-cols-5"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {PROCESS_STEPS.map((step, i) => {
                        const isActive = activeStep === i;
                        return (
                          <button
                            key={i}
                            onClick={() => setActiveStep(i)}
                            className="flex flex-col items-center gap-2 transition-all relative"
                            style={{
                              padding: '1rem 0.5rem 1.25rem',
                              background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                              borderRight: i < PROCESS_STEPS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Active indicator / timer bar */}
                            {isActive && (
                              <div
                                key={activeStep}
                                className="problem-timer-bar"
                              />
                            )}
                            <span
                              className="text-[11px] font-semibold"
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                color: isActive ? '#22D3EE' : 'rgba(255,255,255,0.4)',
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {step.num}
                            </span>
                            <span
                              className="text-xs font-medium"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {step.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ padding: '1.75rem 1.5rem' }}
                      >
                        <p
                          className="font-medium"
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            textTransform: 'lowercase',
                            fontSize: '0.8125rem',
                            color: '#22D3EE',
                            letterSpacing: '0.02em',
                            marginBottom: '1rem',
                          }}
                        >
                          {PROCESS_STEPS[activeStep].timeline}
                        </p>
                        <p
                          style={{
                            fontSize: '0.9375rem',
                            lineHeight: '170%',
                            color: 'rgba(255,255,255,0.6)',
                            marginBottom: '1.5rem',
                          }}
                        >
                          {PROCESS_STEPS[activeStep].desc}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <span className="station-card-label">
                              agent handles
                            </span>
                            <ul className="station-list">
                              {PROCESS_STEPS[activeStep].agentItems.map((item, idx) => (
                                <li key={idx} className="station-list-item">
                                  <svg className="bullet" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10M8 3l4 4-4 4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="station-card-label">
                              tetris talent handles
                            </span>
                            <ul className="station-list">
                              {PROCESS_STEPS[activeStep].teamItems.map((item, idx) => (
                                <li key={idx} className="station-list-item">
                                  <svg className="bullet" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10M8 3l4 4-4 4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </>
              )}

              {/* ── Station 4: Who We Are ── */}
              {station === 4 && (
                <>
                  <motion.div
                    custom={0}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="white-text-box"
                  >
                    <div className="label">
                      who we are
                    </div>
                    <h2 className="heading h2">
                      Recruiters who know the work.
                    </h2>
                    <h2
                      className="heading h2"
                      style={{ color: '#22D3EE' }}
                    >
                      Systems that never sleep.
                    </h2>
                    <p className="body-text">
                      Tetris Labs pairs experienced recruiting judgment with
                      intelligent hiring infrastructure, so every candidate gets
                      context, every client gets momentum, and no good match gets
                      buried in a spreadsheet.
                    </p>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {WHO_WE_ARE_STATS.map((item, i) => (
                        <div
                          key={i}
                          className="station-card"
                          style={{
                            background: 'rgba(255,255,255,0.95)',
                            borderColor: 'rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
                            minHeight: '8.75rem',
                            display: 'grid',
                            gridTemplateColumns: 'minmax(5rem, 0.65fr) 1px minmax(0, 1.35fr)',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1.25rem',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 'clamp(2.25rem, 3.8vw, 3.75rem)',
                                fontWeight: 750,
                                lineHeight: 0.95,
                                color: '#22D3EE',
                                letterSpacing: '0',
                              }}
                            >
                              {item.value}
                            </div>
                            <div
                              style={{
                                marginTop: '0.5rem',
                                fontFamily: "'DM Mono', monospace",
                                textTransform: 'lowercase',
                                fontSize: '0.75rem',
                                lineHeight: 1.25,
                                color: 'rgba(26,11,46,0.48)',
                              }}
                            >
                              {item.label}
                            </div>
                          </div>
                          <div
                            style={{
                              width: '1px',
                              minHeight: '5.25rem',
                              background: 'rgba(34,211,238,0.25)',
                            }}
                          />
                          <p
                            style={{
                              fontSize: '0.875rem',
                              lineHeight: '165%',
                              fontWeight: 600,
                              color: 'rgba(26,11,46,0.88)',
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="rounded-sm"
                    style={{
                      border: '1.5px solid #22D3EE',
                      borderRadius: '0.25rem',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '1.75rem 1.5rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '1rem',
                        lineHeight: '170%',
                        color: 'rgba(255,255,255,0.68)',
                        maxWidth: '56rem',
                      }}
                    >
                      We were built for companies that need recruiting to feel
                      sharper than a job board and more accountable than a
                      traditional agency. One team brings the human side:
                      calibration, judgment, candidate trust, and closing strategy.
                      The other side is the system layer: sourcing, screening,
                      follow-up, workflow tracking, and reporting that keeps moving
                      even when your calendar is full.
                    </p>
                  </motion.div>
                </>
              )}


              {/* ── Station 2: Testimonials ── */}
              {station === 2 && (
                <>
                  {/* Testimonials carousel */}
                  <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'center', gap: '0.625rem', flexDirection: isMobile ? 'column' : 'row' }}>
                    <motion.div
                      custom={1}
                      variants={boxVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="station-card"
                      style={{ overflow: 'hidden', flex: 1 }}
                    >
                      {/* Badge */}
                      <div style={{ padding: '1.75rem 1.5rem 0' }}>
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            textTransform: 'lowercase',
                            fontSize: '0.75rem',
                            color: '#22D3EE',
                            background: 'rgba(34,211,238,0.15)',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '0.25rem',
                            letterSpacing: '0.02em',
                            display: 'inline-block',
                          }}
                        >
                          what clients say
                        </span>
                      </div>

                      {/* Animated quote */}
                      <AnimatePresence mode="wait" custom={testimonialDir}>
                        <motion.div
                          key={activeTestimonial}
                          custom={testimonialDir}
                          variants={{
                            hidden: (dir: number) => ({ opacity: 0, y: dir * 40 }),
                            visible: { opacity: 1, y: 0 },
                            exit: (dir: number) => ({ opacity: 0, y: dir * -40 }),
                          }}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                        >
                          <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                            <span
                              style={{
                                fontSize: '2.5rem',
                                color: '#22D3EE',
                                fontFamily: 'Georgia, serif',
                                lineHeight: 1,
                                display: 'block',
                                marginBottom: '0.5rem',
                              }}
                            >
                              &ldquo;
                            </span>
                            <p
                              style={{
                                fontSize: '0.9375rem',
                                lineHeight: '170%',
                                color: 'rgba(255,255,255,0.75)',
                                marginBottom: '1.25rem',
                              }}
                            >
                              {TESTIMONIALS[activeTestimonial].quote}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img
                                src={TESTIMONIALS[activeTestimonial].photo}
                                alt={TESTIMONIALS[activeTestimonial].name}
                                style={{
                                  width: 44,
                                  height: 44,
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  flexShrink: 0,
                                  border: '2px solid rgba(34,211,238,0.4)',
                                }}
                              />
                              <div>
                                <span
                                  style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: 'white',
                                    display: 'block',
                                  }}
                                >
                                  {TESTIMONIALS[activeTestimonial].name}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: '0.6875rem',
                                    textTransform: 'lowercase',
                                    color: 'rgba(255,255,255,0.4)',
                                    letterSpacing: '0.02em',
                                  }}
                                >
                                  {TESTIMONIALS[activeTestimonial].title}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Timer bar */}
                      <div style={{ position: 'relative', height: '3px', background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          key={activeTestimonial}
                          className="problem-timer-bar"
                          style={{ position: 'absolute', top: 0 }}
                        />
                      </div>
                    </motion.div>

                    {/* Outside arrow buttons */}
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '0.5rem', justifyContent: isMobile ? 'center' : undefined }}>
                      <motion.button
                        aria-label="Previous testimonial"
                        onClick={() => {
                          setTestimonialDir(-1);
                          setActiveTestimonial(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                        }}
                        whileHover={{ backgroundColor: 'rgba(34,211,238,0.22)', borderColor: 'rgba(34,211,238,0.7)' }}
                        style={{
                          width: 32, height: 32,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(34,211,238,0.08)',
                          border: '1px solid rgba(34,211,238,0.35)',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          color: '#22D3EE',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 9L7 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.button>
                      <motion.button
                        aria-label="Next testimonial"
                        onClick={() => {
                          setTestimonialDir(1);
                          setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length);
                        }}
                        whileHover={{ backgroundColor: 'rgba(34,211,238,0.22)', borderColor: 'rgba(34,211,238,0.7)' }}
                        style={{
                          width: 32, height: 32,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(34,211,238,0.08)',
                          border: '1px solid rgba(34,211,238,0.35)',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          color: '#22D3EE',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right side: large station number watermark */}
            <div className="hidden md:flex flex-1 items-center justify-center pointer-events-none">
              <motion.span
                key={`num-${station}`}
                className="font-bold leading-none select-none"
                style={{
                  fontSize: 'clamp(8rem, 15vw, 18rem)',
                  color: 'rgba(255,255,255,0.05)',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.05em',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                {String(station).padStart(2, '0')}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ STATION SELECTOR (bottom) ═══ */}
      {!loading && !heroVisible && station >= 1 && station <= 4 && !isMobile && (
        <div className="fixed z-[120]" style={{ right: '1rem', bottom: '1rem' }}>
          {/* Dropdown menu — above button on desktop, below on mobile */}
          <AnimatePresence>
            {selectorOpen && (
              <motion.div
                initial={{ opacity: 0, y: isMobile ? -10 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isMobile ? -10 : 10 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="flex flex-col gap-2"
                style={isMobile ? { position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem' } : { marginBottom: '0.5rem' }}
              >
                {STATIONS_META.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => goStation(i + 1)}
                    className="flex items-center gap-3 text-left text-sm transition-all"
                    style={{
                      border: '1px dashed white',
                      borderRadius: '0.25rem',
                      padding: '0.5rem 0.875rem',
                      background: station === i + 1 ? 'white' : 'transparent',
                      color: station === i + 1 ? '#1A0B2E' : 'white',
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-sm flex items-center justify-center text-[10px]"
                      style={{
                        border: `1px solid ${station === i + 1 ? '#1A0B2E' : 'rgba(255,255,255,0.4)'}`,
                        flexShrink: 0,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setSelectorOpen(!selectorOpen)}
            className="flex items-center gap-3 text-left text-sm"
            style={{
              border: '1px dashed white',
              borderRadius: '0.25rem',
              padding: '0.5rem 0.875rem',
              background: 'transparent',
              color: 'white',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'lowercase',
              cursor: 'pointer',
            }}
          >
            <span
              className="w-5 h-5 rounded-sm flex items-center justify-center text-[10px]"
              style={{
                border: '1px solid rgba(255,255,255,0.4)',
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {String(station).padStart(2, '0')}
            </span>
            <span>{STATIONS_META[station - 1]}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transform: selectorOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s',
              }}
            >
              <path
                d="M3 5L8 10L13 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <AnimatePresence>
        {footerVisible && (
          <motion.div
            key="footer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] overflow-y-auto"
            style={{ background: '#7C3AED' }}
          >
            <div className="min-h-screen flex flex-col items-center px-6 md:px-6 text-center" style={{ padding: isMobile ? '0 1.5rem' : undefined }}>
              {/* Central content — vertically centered, 3 groups */}
              <div className="flex-1 flex flex-col items-center justify-center" style={{ gap: '2.5rem' }}>
                {/* Group 1: Title + Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
                  className="flex flex-col items-center"
                  style={{ gap: '1rem' }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      color: 'white',
                      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    }}
                  >
                    Tetris Talent
                  </span>
                  <p
                    className="text-white/50"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
                      fontSize: '1rem',
                    }}
                  >
                    Your talent partner for the age of intelligent hiring
                  </p>
                </motion.div>

                {/* Group 2: CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: EASE_OUT }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a
                    href="#"
                    className="button"
                    style={{ fontSize: '1rem', minHeight: '3.25rem', padding: '0 2rem' }}
                    data-cal-namespace="strategy-call"
                    data-cal-link="neil-gadhok-zcm5vm/30min"
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  >
                    book a strategy call
                  </a>
                  <button
                    type="button"
                    onClick={openDemoModal}
                    className="button"
                    style={{
                      fontSize: '1rem',
                      minHeight: '3.25rem',
                      padding: '0 2rem',
                      background: 'transparent',
                      color: 'white',
                      borderColor: 'white',
                    }}
                  >
                    request demo
                  </button>
                </motion.div>

                {/* Group 3: Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex gap-8"
                >
                  <a
                    href="https://www.linkedin.com/company/tetris-talent/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-sm hover:text-white transition-colors"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
                    >
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
                    </svg>
                    linkedin
                  </a>
                </motion.div>
              </div>

              {/* Bottom bar — pinned to bottom */}
              <div className="flex items-center justify-between w-full pb-6 pt-4" style={{ maxWidth: isMobile ? '100%' : '32rem', padding: isMobile ? '1rem 0 1.5rem' : undefined }}>
                <p
                  className="text-white/25 text-xs"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  &copy;2026 tetris labs
                </p>
                <button
                  onClick={() => goStation(0)}
                  className="text-white/40 text-xs hover:text-white transition-colors flex items-center gap-1.5"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'lowercase',
                  }}
                >
                  back to top
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {demoModalOpen && (
          <motion.div
            key="demo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            style={{ background: 'rgba(26,11,46,0.72)', padding: '1rem' }}
            onClick={closeDemoModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="relative w-full"
              style={{
                maxWidth: '28rem',
                background: 'white',
                border: '1.5px solid #22D3EE',
                borderRadius: '0.25rem',
                padding: '1.5rem',
                boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close demo request"
                onClick={closeDemoModal}
                disabled={demoSubmitting}
                style={{
                  position: 'absolute',
                  top: '0.875rem',
                  right: '0.875rem',
                  width: '2rem',
                  height: '2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(26,11,46,0.16)',
                  borderRadius: '0.25rem',
                  background: 'transparent',
                  color: '#1A0B2E',
                  cursor: demoSubmitting ? 'not-allowed' : 'pointer',
                  opacity: demoSubmitting ? 0.45 : 1,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div style={{ paddingRight: '2.5rem', marginBottom: '1.25rem' }}>
                <div
                  className="label"
                  style={{ color: '#22D3EE', marginBottom: '0.75rem' }}
                >
                  request demo
                </div>
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.75rem',
                    lineHeight: 1.1,
                    fontWeight: 750,
                    color: '#1A0B2E',
                    letterSpacing: '0',
                  }}
                >
                  Watch the demo
                </h2>
              </div>

              <form onSubmit={submitDemoRequest}>
                <label
                  htmlFor="demo-email"
                  style={{
                    display: 'block',
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'lowercase',
                    fontSize: '0.75rem',
                    color: 'rgba(26,11,46,0.58)',
                    marginBottom: '0.5rem',
                  }}
                >
                  email
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={demoSubmitting}
                  style={{
                    width: '100%',
                    minHeight: '3.25rem',
                    border: '1.5px solid rgba(26,11,46,0.18)',
                    borderRadius: '0.25rem',
                    padding: '0 1rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#1A0B2E',
                    outline: 'none',
                    marginBottom: '1rem',
                    opacity: demoSubmitting ? 0.7 : 1,
                  }}
                />
                {demoError && (
                  <p
                    role="alert"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
                      fontSize: '0.75rem',
                      color: '#B20110',
                      marginBottom: '1rem',
                    }}
                  >
                    {demoError}
                  </p>
                )}
                <button
                  type="submit"
                  className="button"
                  disabled={demoSubmitting}
                  style={{ width: '100%', minHeight: '3.25rem' }}
                >
                  {demoSubmitting ? 'submitting' : 'submit'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll hint on hero ── */}
      {!loading && heroVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
        >
          <span
            className="text-white/50 text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
