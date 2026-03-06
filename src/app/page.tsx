'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ─── constants ─── */
const BG_TILE =
  'https://cdn.prod.website-files.com/66ffd660becd2fa4ef990307/66ffd660becd2fa4ef99031a_background-tile-05.svg';

const STATIONS_META = [
  'why us',
  'what we build',
  'who we serve',
  'results',
  'how we work',
  'our edge',
  'get started',
];

const TRUST_PARTNERS = ['Up Top', 'Woodstock', 'Corn'];

const PROBLEM_PAIRS = [
  {
    problem: 'Manual Ops Overload',
    problemDesc:
      'Your team is burning 20+ hours a week on work that should run automatically — status updates, reporting, tracking, chasing people for information. It\u2019s not what you hired them for.',
    solution: 'Agentic Automation',
    solutionDesc:
      'We identify every repetitive workflow and replace it with AI-powered systems that run 24/7. Your team reclaims hours every week to focus on the work that actually requires them.',
  },
  {
    problem: 'Fragmented Tool Stack',
    problemDesc:
      'Your ops live across five different tools and nothing talks to anything else. Context gets lost between handoffs. Decisions get missed. Your best people spend too much time just staying in sync.',
    solution: 'A Unified Intelligence Layer',
    solutionDesc:
      'We build a single, AI-powered workspace that connects your tools, surfaces the right information at the right time, and mirrors how your team actually thinks and works.',
  },
  {
    problem: 'Knowledge Locked in People\u2019s Heads',
    problemDesc:
      'Your processes, frameworks, and institutional knowledge live in the minds of two or three key people. If they\u2019re sick, busy, or gone — that knowledge goes with them.',
    solution: 'Systems That Think Like Your Team',
    solutionDesc:
      'We encode your team\u2019s decision-making patterns, workflows, and company ethos directly into AI-powered systems — so your knowledge compounds instead of walking out the door.',
  },
  {
    problem: 'No Time for Strategic Work',
    problemDesc:
      'You\u2019re brilliant at what you do. But every week, your best hours go to ops, reporting, onboarding, and coordination. You\u2019re running the business instead of building it.',
    solution: 'Strategic Focus, Finally',
    solutionDesc:
      'With your ops running on autopilot through AI, your team gets the headspace to focus on the work that actually creates value — and the decisions that actually move the needle.',
  },
];

const BUILD_CATEGORIES = [
  {
    num: '01',
    title: 'Agentic Workflows',
    desc: 'Repetitive processes that run autonomously \u2014 without anyone pushing a button.',
    items: [
      'Client and candidate status updates that send themselves',
      'Intake and routing flows that qualify and assign work automatically',
      'Automated reporting (weekly digests, KPI summaries, pipeline reports)',
      'Cross-tool sync agents (CRM \u2194 Notion \u2194 Email \u2194 Slack)',
      'Follow-up sequences and nurture flows that run on logic, not memory',
    ],
  },
  {
    num: '02',
    title: 'AI-Powered Internal Tools',
    desc: 'Custom-built command centres, dashboards, and intelligence systems tailored to how your team actually works.',
    items: [
      'Pipeline and deal flow command centres',
      'Candidate and talent tracking systems',
      'Client and project management hubs',
      'OKR and milestone dashboards',
      'Custom CRMs built on Notion or Airtable with AI layers on top',
    ],
  },
  {
    num: '03',
    title: 'Knowledge & Intelligence Systems',
    desc: 'Your team\u2019s institutional knowledge, encoded and made accessible \u2014 not buried in docs no one reads.',
    items: [
      'Company wiki with AI-powered search and navigation',
      'Decision frameworks and operational playbooks',
      'Onboarding systems that encode your culture and process',
      'AI-powered meeting notes and action item tracking',
      'Process documentation that actually stays up to date',
    ],
  },
  {
    num: '04',
    title: 'Workspace Design & Audit',
    desc: 'We start every engagement here. Map your current state, find the gaps, and design a blueprint before we build anything.',
    items: [
      'Operational landscape mapping',
      'Bottleneck and AI-acceleration audit',
      'Tool stack rationalization (stop paying for what you don\u2019t use)',
      "Workspace architecture blueprint (the 'StoryMap')",
      'Team workflow and behaviour pattern analysis',
    ],
  },
];

const AUDIENCES = [
  {
    name: 'Fast-Moving Operators',
    desc: "You\u2019re building something serious with a lean team. Everyone is in execution mode, and nobody has time to build the systems that would make execution easier. We do that part.",
    items: [
      'Automated coordination and status tracking across your team',
      'Project and client management systems that scale with you',
      'Weekly reporting that writes itself',
      'Onboarding systems that work even when you\u2019re too busy to babysit them',
    ],
  },
  {
    name: 'Investment & Deal Teams',
    desc: "You\u2019re running a portfolio or a pipeline with a lean team. Deal flow is messy, reporting is manual, and due diligence takes too long. We build the command centre that fixes all three.",
    items: [
      'AI-powered deal flow intake, scoring, and routing',
      'Portfolio monitoring dashboards with automated alerts',
      'LP and stakeholder reporting automation',
      'Due diligence knowledge bases with AI-powered research layers',
    ],
  },
  {
    name: 'Recruiting & Talent Teams',
    desc: "You\u2019re placing candidates, managing clients, and tracking a hundred moving pieces at once — across spreadsheets, emails, and tools that don\u2019t talk to each other. We build the system that ties it all together.",
    items: [
      'Custom ATS with AI-powered candidate tracking and matching',
      'Client pipeline CRM with automated updates and follow-ups',
      'Automated candidate status communications',
      'Billing and placement tracking dashboards',
      'Onboarding flows for new consultants that encode your methodology',
    ],
  },
  {
    name: 'BD & Growth Teams',
    desc: "Your pipeline lives in DMs and spreadsheets. Follow-ups get missed. Project visibility is low. We build a BD engine that tracks, surfaces, and automates the right actions at the right time.",
    items: [
      'Partnership and prospect pipeline with AI prioritization',
      'Automated follow-up and nurture sequences',
      'Project and deliverable tracking with cross-team visibility',
      'Lead-to-close reporting and win/loss analysis',
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Map',
    subtitle: 'Understand before we build anything.',
    desc: "We sit with your team \u2014 leadership, the people actually doing the work \u2014 and map your complete operational landscape. We identify every bottleneck, every manual process, every place where AI can accelerate or automate. Nothing gets built until we\u2019ve seen the full picture.",
    items: [
      'Operational landscape sessions with your team',
      'Current process mapping and visualization',
      'AI-acceleration opportunity audit',
      'Bottleneck prioritization by impact and effort',
    ],
  },
  {
    num: '02',
    title: 'Design',
    subtitle: 'Blueprint before we build.',
    desc: "We translate everything we learned in the Map phase into a concrete system design \u2014 your StoryMap. This is a detailed blueprint of every tool, workflow, and automation we\u2019ll build, mapped to how your team actually works. You approve it before we write a single line of code.",
    items: [
      'StoryMap: your custom system architecture',
      'Workflow diagrams and tool integration plans',
      'Automation specifications with clear scope',
      'Phased build roadmap with deliverables and timelines',
    ],
  },
  {
    num: '03',
    title: 'Build',
    subtitle: 'We build fast. You see progress every week.',
    desc: "This is where our proprietary AI-powered delivery system comes in. Three years of frameworks, patterns, and hard-won knowledge \u2014 systematized. You get weekly progress updates and a working system in weeks, not months. Faster delivery. Lower cost. No surprises.",
    items: [
      'Agentic workflow development',
      'Custom internal tool builds',
      'System integrations and automations',
      'Weekly progress updates and working demos',
    ],
  },
  {
    num: '04',
    title: 'Embed',
    subtitle: "We don\u2019t just hand it over. We make it stick.",
    desc: "A system is only as good as the team using it. We train your team on everything we\u2019ve built, create documentation your people will actually use, and provide 30 days of post-launch support to make sure everything runs the way it should.",
    items: [
      'Team training and onboarding sessions',
      'Documentation and knowledge base creation',
      '30-day post-launch support',
      "Full system handoff \u2014 it\u2019s yours, completely",
    ],
  },
];

const EDGE_ITEMS = [
  {
    title: 'Faster delivery',
    desc: "Weeks, not months. Our systems allow us to move at a pace traditional agencies simply can\u2019t match.",
  },
  {
    title: 'Lower cost',
    desc: 'Same quality, lower price. We pass on the efficiency gains from our approach directly to our clients.',
  },
  {
    title: 'Institutional knowledge that compounds',
    desc: "Every client makes us sharper. Our frameworks improve with every engagement \u2014 and you benefit from everything we\u2019ve learned.",
  },
  {
    title: 'Deep operational expertise',
    desc: "We\u2019ve built systems for some of the most complex, fast-moving, high-stakes teams in tech. Whatever your team is dealing with, we\u2019ve seen harder.",
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Scramble Text ─── */
function ScrambleText({
  text,
  active,
  className = '',
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const start = Date.now();
    const dur = 700;
    const step = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      const n = Math.floor(e * text.length);
      let r = '';
      for (let i = 0; i < text.length; i++) {
        if (i < n) r += text[i];
        else if (text[i] === ' ') r += ' ';
        else r += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(r);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setDisplay(text);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, text]);

  return <span className={className}>{display}</span>;
}

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
}: {
  activeProblem: number;
  setActiveProblem: (i: number) => void;
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
            with tetris labs
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
  const [loading, setLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [station, setStation] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [activeAudience, setActiveAudience] = useState(0);
  const [activeProblem, setActiveProblem] = useState(0);
  const [activeBuild, setActiveBuild] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const lastScrollTime = useRef(0);
  const stationRef = useRef(0);
  const navLocked = useRef(false);

  /* preloader */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  /* go to station */
  const goStation = useCallback((s: number) => {
    if (s < 0) s = 0;
    if (s > 8) s = 8;
    stationRef.current = s;
    setStation(s);
    setHeroVisible(s === 0);
    setNavVisible(s > 0 && s < 8);
    setFooterVisible(s === 8);
    setSelectorOpen(false);
    if (s === 1) setActiveProblem(0);
    if (s === 2) setActiveBuild(0);
    if (s === 3) setActiveAudience(0);
    if (s === 5) setActiveStep(0);
  }, []);

  /* scroll / key / touch navigation — registered once, reads station via ref */
  useEffect(() => {
    if (loading) return;

    const navigate = (dir: 1 | -1) => {
      if (navLocked.current) return;
      navLocked.current = true;
      goStation(stationRef.current + dir);
      setTimeout(() => { navLocked.current = false; }, 900);
    };

    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
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
    const ts = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const te = (e: TouchEvent) => {
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) > 50) navigate(d > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', key);
    window.addEventListener('touchstart', ts, { passive: true });
    window.addEventListener('touchend', te, { passive: true });
    return () => {
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', key);
      window.removeEventListener('touchstart', ts);
      window.removeEventListener('touchend', te);
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
      style={{ background: '#7C3AED' }}
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
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
            style={{ background: '#7C3AED' }}
          >
            <div className="flex items-end gap-2">
              {[
                { h: 'h-14', bg: '#22D3EE' },
                { h: 'h-10', bg: '#1A0B2E' },
                { h: 'h-16', bg: 'white' },
                { h: 'h-12', bg: '#22D3EE' },
              ].map((block, i) => (
                <div
                  key={i}
                  className={`preloader-image w-10 ${block.h} rounded-sm`}
                  style={{ backgroundColor: block.bg, opacity: 0.9 }}
                />
              ))}
            </div>
            <div className="mt-8 w-48">
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />
              </div>
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
            style={{ padding: '1.5rem 2rem' }}
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
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="nav-link text-white"
                onClick={(e) => {
                  e.preventDefault();
                  goStation(1);
                }}
              >
                why us
              </a>
              <a
                href="#"
                className="nav-link text-white"
                onClick={(e) => {
                  e.preventDefault();
                  goStation(4);
                }}
              >
                results
              </a>
              <a
                href="#"
                className="nav-link text-white"
                onClick={(e) => {
                  e.preventDefault();
                  goStation(5);
                }}
              >
                how we work
              </a>
              <a
                href="#"
                className="nav-link text-white"
                onClick={(e) => {
                  e.preventDefault();
                  goStation(2);
                }}
              >
                what we build
              </a>
              <a
                href="#"
                className="button"
                style={{ minHeight: '2.75rem', fontSize: '0.875rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  goStation(7);
                }}
              >
                book a strategy call
              </a>
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
            <div className="flex-1 flex flex-col justify-center" style={{ padding: 'clamp(2rem, 4vh, 4rem) clamp(1.25rem, 4vw, 4rem) clamp(2rem, 4vh, 4rem) clamp(1.25rem, 5vw, 5vw)' }}>
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
                  maxWidth: 'min(50vw, 100%)',
                  fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: 'clamp(1.5rem, 3vh, 3rem)',
                }}
              >
                Turn how your team works into{' '}
                <span style={{ color: '#22D3EE' }}>
                  <ScrambleText text="AI-powered systems." active={heroVisible} />
                </span>
              </motion.h1>

              {/* subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  maxWidth: 'min(50vw, 100%)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                  lineHeight: 1.6,
                  marginBottom: 'clamp(1.5rem, 4vh, 4rem)',
                }}
              >
                We map your operational chaos, identify every bottleneck, and build
                custom AI-powered internal tools and agentic workflows so
                your team can focus on what actually moves the needle.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: EASE_OUT }}
                className="flex flex-wrap"
                style={{ gap: 'clamp(0.75rem, 1.5vw, 1.25rem)', marginBottom: 'clamp(2.5rem, 5vh, 5rem)' }}
              >
                <button
                  onClick={() => goStation(7)}
                  className="button"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                    minHeight: 'clamp(3rem, 4vw, 3.75rem)',
                    padding: '0 clamp(1.5rem, 2.5vw, 2.25rem)',
                  }}
                >
                  book a strategy call
                </button>
                <button
                  onClick={() => goStation(4)}
                  className="button"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                    minHeight: 'clamp(3rem, 4vw, 3.75rem)',
                    padding: '0 clamp(1.5rem, 2.5vw, 2.25rem)',
                    background: 'transparent',
                    color: 'white',
                    borderColor: 'white',
                  }}
                >
                  see our work
                </button>
              </motion.div>

              {/* trust line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
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
                  trusted by high-velocity teams who can&apos;t afford to slow down
                </p>
                <div className="flex items-center" style={{ gap: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                  {TRUST_PARTNERS.map((p) => (
                    <span
                      key={p}
                      className="font-semibold"
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
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
                  start exploring
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ STATIONS ═══ */}
      <AnimatePresence mode="wait">
        {!loading && !heroVisible && station >= 1 && station <= 7 && (
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
              className="w-full md:w-auto md:max-w-[50vw] flex flex-col gap-5 md:gap-8 hide-scrollbar"
              style={{
                padding: 'clamp(4rem, 8vh, 5rem) clamp(1rem, 3vw, 2rem) clamp(5rem, 10vh, 3rem) clamp(1.25rem, 4vw, 4rem)',
                maxHeight: '100vh',
                overflowY: 'auto',
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
                      <ScrambleText
                        text="From Operational Chaos to Strategic Momentum."
                        active={station === 1}
                      />
                    </h2>
                    <p className="body-text">
                      We guide your shift from fighting daily fires to building
                      the systems that let your team actually scale.
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

              {/* ── Station 2: What We Build ── */}
              {station === 2 && (
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
                      our approach
                    </div>
                    <h2 className="heading h2">
                      We don&apos;t just build tools.
                    </h2>
                    <h2
                      className="heading h2"
                      style={{ color: '#22D3EE' }}
                    >
                      <ScrambleText
                        text="We encode your team into AI."
                        active={station === 2}
                      />
                    </h2>
                    <p className="body-text">
                      We&apos;re product experts and AI architects who specialize
                      in one thing: taking how your team thinks, works, and
                      decides — and turning that into AI-powered systems that run
                      without you.
                    </p>
                  </motion.div>

                  {/* Build category selector — horizontal numbered pills */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-2 gap-2"
                  >
                    {BUILD_CATEGORIES.map((cat, i) => {
                      const isActive = activeBuild === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveBuild(i)}
                          className="flex items-center gap-3 text-left transition-all rounded-sm"
                          style={{
                            padding: '0.875rem 1rem',
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
                            {cat.num}
                          </span>
                          <span
                            className="font-medium text-sm leading-tight"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {cat.title}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>

                  {/* Build category detail */}
                  <motion.div
                    custom={2}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeBuild}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="station-card"
                      >
                        <div style={{ padding: '1.75rem 1.5rem' }}>
                          <h3
                            className="font-semibold mb-3"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '1.25rem',
                              color: '#22D3EE',
                              lineHeight: '130%',
                            }}
                          >
                            {BUILD_CATEGORIES[activeBuild].title}
                          </h3>
                          <p
                            style={{
                              fontSize: '0.9375rem',
                              lineHeight: '170%',
                              color: 'rgba(255,255,255,0.6)',
                              marginBottom: '1.5rem',
                            }}
                          >
                            {BUILD_CATEGORIES[activeBuild].desc}
                          </p>
                          <ul className="station-list">
                            {BUILD_CATEGORIES[activeBuild].items.map((item, idx) => (
                              <li key={idx} className="station-list-item">
                                <span className="bullet" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </>
              )}

              {/* ── Station 3: Who We Serve ── */}
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
                      built for teams that move fast
                    </div>
                    <h2 className="heading h2">
                      <ScrambleText
                        text="For the teams that can't afford ops debt."
                        active={station === 3}
                      />
                    </h2>
                    <p className="body-text">
                      Whether you&apos;re running a recruiting agency, a deal team,
                      or a high-growth operation — if you&apos;re a small,
                      high-velocity team with serious complexity and no dedicated
                      ops infrastructure, we built this for you.
                    </p>
                  </motion.div>

                  {/* Audience selector — vertical stacked buttons */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-1.5"
                  >
                    {AUDIENCES.map((aud, i) => {
                      const isActive = activeAudience === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveAudience(i)}
                          className="flex items-center gap-3 text-left transition-all rounded-sm"
                          style={{
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
                          <span
                            className="font-medium text-sm"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {aud.name}
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="ml-auto"
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
                        </button>
                      );
                    })}
                  </motion.div>

                  {/* Audience detail card */}
                  <motion.div
                    custom={2}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeAudience}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="station-card"
                      >
                        <div style={{ padding: '1.75rem 1.5rem' }}>
                          <h3
                            className="font-semibold mb-3"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '1.25rem',
                              color: '#22D3EE',
                              lineHeight: '130%',
                            }}
                          >
                            {AUDIENCES[activeAudience].name}
                          </h3>
                          <p
                            style={{
                              fontSize: '0.9375rem',
                              lineHeight: '170%',
                              color: 'rgba(255,255,255,0.6)',
                              marginBottom: '1.5rem',
                            }}
                          >
                            {AUDIENCES[activeAudience].desc}
                          </p>
                          <ul className="station-list">
                            {AUDIENCES[activeAudience].items.map((item, idx) => (
                              <li key={idx} className="station-list-item">
                                <span className="bullet" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </>
              )}

              {/* ── Station 4: Results ── */}
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
                      results
                    </div>
                    <h2 className="heading h2">
                      <ScrambleText
                        text="Results that speak for themselves."
                        active={station === 4}
                      />
                    </h2>
                    <p className="body-text">
                      Three years. Dozens of teams. Here&apos;s what
                      we&apos;ve actually built.
                    </p>
                  </motion.div>

                  {/* Featured case study — Up Top */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="station-card"
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Badge + header */}
                    <div
                      style={{
                        padding: '1.75rem 1.5rem 0',
                      }}
                    >
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
                        featured case study
                      </span>
                    </div>

                    {/* Stat highlights */}
                    <div
                      className="grid grid-cols-3 gap-px"
                      style={{
                        margin: '1.25rem 1.5rem',
                        borderRadius: '0.25rem',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.08)',
                      }}
                    >
                      {[
                        { value: '$3M+', label: 'revenue' },
                        { value: '400+', label: 'clients' },
                        { value: '0', label: 'headcount added' },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center text-center"
                          style={{
                            padding: '1.25rem 0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                          }}
                        >
                          <span
                            className="font-bold"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '1.5rem',
                              color: '#22D3EE',
                              lineHeight: 1.1,
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {stat.value}
                          </span>
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              textTransform: 'lowercase',
                              fontSize: '0.6875rem',
                              color: 'rgba(255,255,255,0.45)',
                              marginTop: '0.375rem',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                      <h3
                        className="font-semibold mb-3"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '1.125rem',
                          color: 'white',
                          lineHeight: '140%',
                        }}
                      >
                        Systems that helped Up Top scale without adding headcount
                      </h3>
                      <p
                        style={{
                          fontSize: '0.9375rem',
                          lineHeight: '170%',
                          color: 'rgba(255,255,255,0.55)',
                          marginBottom: '1.25rem',
                        }}
                      >
                        What we built: Automated talent pipeline, client tracking
                        system, custom ATS, cross-tool workflow integrations, and
                        an onboarding engine that scaled without adding headcount.
                      </p>
                      {/* Deliverables list */}
                      <div className="flex flex-wrap gap-2">
                        {['Talent Pipeline', 'Custom ATS', 'Client CRM', 'Workflow Automations', 'Onboarding Engine'].map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              textTransform: 'lowercase',
                              fontSize: '0.6875rem',
                              color: 'rgba(255,255,255,0.5)',
                              border: '1px solid rgba(255,255,255,0.12)',
                              padding: '0.375rem 0.75rem',
                              borderRadius: '0.25rem',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="#"
                      className="button w-full"
                      style={{
                        borderRadius: 0,
                        margin: 0,
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: 0,
                      }}
                    >
                      read case study
                    </a>
                  </motion.div>

                  {/* More case studies placeholder */}
                  <motion.div
                    custom={2}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="rounded"
                    style={{
                      borderRadius: '0.25rem',
                      border: '1.5px dashed rgba(255,255,255,0.25)',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        textTransform: 'lowercase',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.8125rem',
                      }}
                    >
                      more case studies coming soon
                    </p>
                  </motion.div>
                </>
              )}

              {/* ── Station 5: How We Work — Vertical Timeline ── */}
              {station === 5 && (
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
                      process
                    </div>
                    <h2 className="heading h3">
                      How we make it happen:
                    </h2>
                    <h2
                      className="heading h2"
                      style={{ color: '#22D3EE' }}
                    >
                      <ScrambleText
                        text="The Ops Blueprint."
                        active={station === 5}
                      />
                    </h2>
                    <p className="body-text">
                      Every engagement follows the same four-phase process.
                      Comprehensive, fast, and tailored — because the teams
                      we work with don&apos;t want a generic ops consultant.
                      They want a partner who can move as fast as they do.
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
                      className="grid grid-cols-4"
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
                              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            }}
                          >
                            {/* Active indicator bar */}
                            {isActive && (
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: '2px',
                                  background: '#22D3EE',
                                }}
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
                          {PROCESS_STEPS[activeStep].subtitle}
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
                        <ul className="station-list">
                          {PROCESS_STEPS[activeStep].items.map((item, idx) => (
                            <li key={idx} className="station-list-item">
                              <span className="bullet" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </>
              )}

              {/* ── Station 6: Our Edge ── */}
              {station === 6 && (
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
                      our edge
                    </div>
                    <h2 className="heading h2">
                      <ScrambleText
                        text="We're not a traditional agency."
                        active={station === 6}
                      />
                    </h2>
                    <p className="body-text">
                      And if you&apos;ve worked with one, you&apos;ll feel the
                      difference immediately.
                    </p>
                  </motion.div>

                  {/* Origin Story — accent left border card */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="rounded-sm"
                    style={{
                      borderLeft: '3px solid #22D3EE',
                      borderRadius: '0.25rem',
                      background: 'rgba(255,255,255,0.03)',
                      padding: '1.5rem 1.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        textTransform: 'lowercase',
                        fontSize: '0.75rem',
                        color: '#22D3EE',
                        letterSpacing: '0.08em',
                        display: 'block',
                        marginBottom: '1rem',
                      }}
                    >
                      the origin story
                    </span>
                    <div className="flex flex-col gap-3">
                      <p style={{ fontSize: '0.875rem', lineHeight: '170%', color: 'rgba(255,255,255,0.6)' }}>
                        We spent three years building operational systems for some
                        of the most demanding teams in crypto — protocols moving
                        tens of millions in treasury, VC firms managing 50+
                        portfolio companies, talent teams scaling at startup speed
                        with no playbook to follow. That environment built something in us.
                      </p>
                      <p style={{ fontSize: '0.875rem', lineHeight: '170%', color: 'rgba(255,255,255,0.6)' }}>
                        We took everything we&apos;d learned and rebuilt how we
                        work from the ground up — encoding our processes, playbooks,
                        and delivery methods into a proprietary AI-powered system.
                      </p>
                    </div>
                    <p
                      className="font-semibold"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.9375rem',
                        color: '#22D3EE',
                        lineHeight: '160%',
                        marginTop: '1rem',
                      }}
                    >
                      That system is now what every client gets. Not just crypto
                      teams. Everyone.
                    </p>
                  </motion.div>

                  {/* What This Means for You — 2-column grid */}
                  <motion.div
                    custom={2}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        textTransform: 'lowercase',
                        fontSize: '0.75rem',
                        color: '#22D3EE',
                        letterSpacing: '0.08em',
                        display: 'block',
                        marginBottom: '0.75rem',
                      }}
                    >
                      what this means for you:
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {EDGE_ITEMS.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-sm"
                          style={{
                            padding: '1rem 1.25rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '0.25rem',
                          }}
                        >
                          <h4
                            className="font-semibold mb-1.5"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '0.875rem',
                              color: 'white',
                              lineHeight: '130%',
                            }}
                          >
                            {item.title}
                          </h4>
                          <p
                            style={{
                              fontSize: '0.8125rem',
                              lineHeight: '160%',
                              color: 'rgba(255,255,255,0.45)',
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}

              {/* ── Station 7: Final CTA ── */}
              {station === 7 && (
                <>
                  <motion.div
                    custom={0}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="white-text-box"
                  >
                    <h2 className="heading h2">
                      <ScrambleText
                        text="Ready to stop running your ops and start building your business?"
                        active={station === 7}
                      />
                    </h2>
                    <p className="body-text">
                      We take on a limited number of new clients each quarter. If
                      you&apos;re serious about transforming how your team
                      operates, let&apos;s talk.
                    </p>
                  </motion.div>

                  {/* Unified CTA card */}
                  <motion.div
                    custom={1}
                    variants={boxVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="station-card"
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Primary CTA */}
                    <div
                      style={{
                        padding: '2rem 1.5rem',
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
                            background: '#22D3EE',
                            flexShrink: 0,
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5v14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span
                          className="text-xs font-medium uppercase"
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            color: '#22D3EE',
                            letterSpacing: '0.1em',
                          }}
                        >
                          start here
                        </span>
                      </div>
                      <h3
                        className="font-semibold mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '1.25rem',
                          color: 'white',
                          lineHeight: '130%',
                        }}
                      >
                        Book a Strategy Call
                      </h3>
                      <p
                        style={{
                          fontSize: '0.9375rem',
                          lineHeight: '170%',
                          color: 'rgba(255,255,255,0.6)',
                          marginBottom: '1.5rem',
                        }}
                      >
                        No-commitment 30-minute call. We&apos;ll audit your
                        current ops and tell you exactly where AI can make the
                        biggest difference.
                      </p>
                      <a
                        href="#"
                        className="button"
                        style={{
                          fontSize: '0.9375rem',
                          minHeight: '3.25rem',
                          width: '100%',
                        }}
                      >
                        book a strategy call
                      </a>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.08)',
                      }}
                    />

                    {/* Secondary CTA */}
                    <div style={{ padding: '1.5rem' }}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h4
                            className="font-semibold mb-1"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '1rem',
                              color: 'rgba(255,255,255,0.8)',
                              lineHeight: '130%',
                            }}
                          >
                            Request a Deck
                          </h4>
                          <p
                            style={{
                              fontSize: '0.8125rem',
                              color: 'rgba(255,255,255,0.45)',
                              lineHeight: '160%',
                            }}
                          >
                            Want to share with your team first? We&apos;ll send
                            over our full capabilities deck.
                          </p>
                        </div>
                        <a
                          href="#"
                          className="flex-shrink-0 flex items-center justify-center rounded-sm transition-all"
                          style={{
                            width: '2.75rem',
                            height: '2.75rem',
                            border: '1.5px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.25rem',
                            color: 'rgba(255,255,255,0.6)',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M7 17L17 7M17 7H7M17 7v10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
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
      {!loading && !heroVisible && station >= 1 && station <= 7 && (
        <div className="fixed bottom-4 right-4 z-[120]">
          <AnimatePresence>
            {selectorOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mb-2 flex flex-col gap-1"
              >
                {STATIONS_META.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => goStation(i + 1)}
                    className="flex items-center gap-3 px-4 py-2 rounded text-left text-sm transition-all"
                    style={{
                      border: '1px dashed white',
                      borderRadius: '0.25rem',
                      background:
                        station === i + 1 ? 'white' : 'transparent',
                      color: station === i + 1 ? '#1A0B2E' : 'white',
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
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
            className="flex items-center gap-3 px-5 py-3 rounded"
            style={{
              border: '1.5px solid white',
              borderRadius: '0.25rem',
              background: 'rgba(124,58,237,0.9)',
              backdropFilter: 'blur(10px)',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'lowercase',
              color: 'white',
              fontSize: '0.875rem',
            }}
          >
            <span
              className="w-6 h-6 rounded-sm flex items-center justify-center text-xs"
              style={{
                border: '1px solid rgba(255,255,255,0.4)',
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
            <div className="h-screen flex flex-col items-center px-6 text-center">
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
                    Tetris Labs
                  </span>
                  <p
                    className="text-white/50"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      textTransform: 'lowercase',
                      fontSize: '1rem',
                    }}
                  >
                    turn how your team works into ai-powered systems
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
                  >
                    book a strategy call
                  </a>
                  <a
                    href="#"
                    className="button"
                    style={{
                      background: 'white',
                      color: '#1A0B2E',
                      fontSize: '0.875rem',
                      minHeight: '3.25rem',
                      padding: '0 2rem',
                    }}
                  >
                    request a deck
                  </a>
                </motion.div>

                {/* Group 3: Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex gap-8"
                >
                  {['x', 'linkedin', 'telegram'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-white/40 text-sm hover:text-white transition-colors"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        textTransform: 'lowercase',
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Bottom bar — pinned to bottom */}
              <div className="flex items-center justify-between w-full pb-6 pt-4" style={{ maxWidth: '32rem' }}>
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
