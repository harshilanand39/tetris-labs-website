'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';

/* ─── constants ─── */
const BG_TILE =
  'https://cdn.prod.website-files.com/66ffd660becd2fa4ef990307/66ffd660becd2fa4ef99031a_background-tile-05.svg';

const STATIONS_META = [
  'why us',
  'what we build',
  'who we serve',
  'results',
  'testimonials',
  'how we work',
  'our edge',
];

const TRUST_PARTNERS = [
  { name: 'Caladan', src: '/images/clients/Caladan Logo@4x.png' },
  { name: 'Corn', src: '/images/clients/corn_logo.png' },
  { name: 'Crypto Coach', src: '/images/clients/Crypto Coach Brand Assets (10)@4x.png' },
  { name: 'Crypto Coach', src: '/images/clients/Crypto Coach Brand Assets (9)@4x.png' },
  { name: 'Crypto Coach', src: '/images/clients/Crypto Coach Chaos to Clarity@4x.png' },
  { name: 'Eclipse', src: '/images/clients/Eclipse Logo Lockup@4x.png' },
  { name: 'Woodstock', src: '/images/clients/Woodstock Fund Logo@4x.png' },
];

const CASE_STUDIES = [
  {
    slug: 'up-top',
    client: 'Up Top',
    stats: [
      { value: '$3M+', label: 'revenue' },
      { value: '400+', label: 'clients' },
      { value: '0', label: 'headcount added' },
    ],
    title: 'Systems that helped Up Top scale to over $3M in revenue and 400+ clients',
    description: 'What we built: Automated talent pipeline, client tracking system, custom ATS, cross-tool workflow integrations, and an onboarding engine that scaled without adding headcount.',
    tags: ['Talent Pipeline', 'Custom ATS', 'Client CRM', 'Workflow Automations', 'Onboarding Engine'],
  },
  {
    slug: 'vc-case-study',
    client: 'Deep Tech VC',
    stats: [
      { value: '$50M', label: 'AUM' },
      { value: '50+', label: 'portfolio cos.' },
      { value: '11', label: 'workflows rebuilt' },
    ],
    title: "Rebuilding a VC's entire operating stack — from the inside out",
    description: 'What we built: AI-powered deal sourcing, automated KYB/KYC closing, institutional knowledge RAG bot, unified portfolio data sync, and an end-to-end event management system.',
    tags: ['Venture Capital', 'AI Agents', 'Deal Flow Automation', 'KYB/KYC', 'Portfolio Management'],
  },
  {
    slug: 'caladan',
    client: 'Caladan',
    stats: [
      { value: '$2B+', label: 'daily trading volume' },
      { value: '9,500+', label: 'interactions structured' },
      { value: '5hrs', label: 'weekly reporting saved' },
    ],
    title: 'Turning 9,500+ fragmented interactions into one intelligent operating system.',
    description: 'A crypto firm processing $2B+ in daily trading volume had a CRM no one wanted to use. 3,500+ company records, freeform meeting notes, disconnected tools — and a team flying blind on pipeline performance.',
    tags: ['CRM & Data Infrastructure', 'Crypto Trading', 'Market Making', 'AI Automation'],
  },
];

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
    name: 'Fast-Moving Operators',
    desc: "You\u2019re building something serious with a lean team. Everyone is in execution mode, and nobody has time to build the systems that would make execution easier. We do that part.",
    items: [
      'Automated coordination and status tracking across your team',
      'Project and client management systems that scale with you',
      'Weekly reporting that writes itself',
      'Onboarding systems that work even when you\u2019re too busy to babysit them',
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
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'discovery-call' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
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
  const [activeAudience, setActiveAudience] = useState(0);
  const [activeProblem, setActiveProblem] = useState(0);

  /* auto-advance problem selector on station 1 */
  useEffect(() => {
    if (station !== 1) return;
    const id = setInterval(() => {
      setActiveProblem((prev) => (prev + 1) % PROBLEM_PAIRS.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeProblem]);

  const [activeBuild, setActiveBuild] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [caseStudyDir, setCaseStudyDir] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDir, setTestimonialDir] = useState(1);

  /* auto-advance station 2: What We Build */
  useEffect(() => {
    if (station !== 2) return;
    const id = setInterval(() => {
      setActiveBuild((prev) => (prev + 1) % BUILD_CATEGORIES.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeBuild]);

  /* auto-advance station 3: Who We Serve */
  useEffect(() => {
    if (station !== 3) return;
    const id = setInterval(() => {
      setActiveAudience((prev) => (prev + 1) % AUDIENCES.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeAudience]);

  /* auto-advance station 4: Results */
  useEffect(() => {
    if (station !== 4) return;
    const id = setInterval(() => {
      setCaseStudyDir(1);
      setActiveCaseStudy((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeCaseStudy]);

  /* auto-advance station 5: Testimonials */
  useEffect(() => {
    if (station !== 5) return;
    const id = setInterval(() => {
      setTestimonialDir(1);
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 10000);
    return () => clearInterval(id);
  }, [station, activeTestimonial]);

  /* auto-advance station 6: How We Work */
  useEffect(() => {
    if (station !== 6) return;
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
    if (s === 4) setActiveCaseStudy(0);
    if (s === 5) setActiveTestimonial(0);
    if (s === 6) setActiveStep(0);
  }, []);

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
              padding: 'clamp(1rem, 2vh, 1.5rem) clamp(1.25rem, 2.5vw, 2rem)',
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
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="button"
                style={{ minHeight: '2.75rem', fontSize: '0.875rem' }}
                data-cal-namespace="discovery-call"
                data-cal-link="harshil-tetris/discovery-call"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
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
                We build <span style={{ color: '#22D3EE' }}>AI-powered systems</span> that let great teams{' '}
                scale.
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
                We map your operational chaos, identify every bottleneck, and build
                custom AI-powered internal tools and agentic workflows so
                your team can focus on what actually moves the needle.
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
                    className="button"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.1vw, 1.125rem)',
                      minHeight: 'clamp(2.75rem, 4vw, 3.75rem)',
                      padding: '0 clamp(1rem, 2.5vw, 2.25rem)',
                      whiteSpace: 'nowrap',
                    }}
                    data-cal-namespace="discovery-call"
                    data-cal-link="harshil-tetris/discovery-call"
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  >
                    book a strategy call
                  </button>
                  <button
                    onClick={() => goStation(4)}
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
                    see our work
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
                    trusted by teams who can&apos;t afford to slow down
                  </p>
                  {/* Marquee logos — infinite seamless loop */}
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <div className="marquee-logos" style={{ alignItems: 'center', gap: '2.5rem', animationDuration: '20s', width: 'max-content' }}>
                      {[...TRUST_PARTNERS, ...TRUST_PARTNERS].map((p, i) => (
                        <img
                          key={i}
                          src={p.src}
                          alt={p.name}
                          style={{
                            height: 'clamp(1rem, 1.75vw, 1.5rem)',
                            width: 'auto',
                            maxWidth: '120px',
                            objectFit: 'contain',
                            opacity: 0.55,
                            filter: 'brightness(0) invert(1)',
                            flexShrink: 0,
                          }}
                        />
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
              ref={stationScrollRef}
              className="w-full md:w-auto md:max-w-[50vw] flex flex-col gap-5 md:gap-8 hide-scrollbar"
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
                      From Operational Chaos to Strategic Momentum
                    </h2>
                    <p className="body-text">
                      We guide your shift from fighting daily ops fires to building
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
                      We encode your team into AI.
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {BUILD_CATEGORIES.map((cat, i) => {
                      const isActive = activeBuild === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveBuild(i)}
                          className="flex items-center gap-3 text-left transition-all rounded-sm"
                          style={{
                            position: 'relative',
                            overflow: 'hidden',
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
                          {isActive && station === 2 && (
                            <div
                              key={activeBuild}
                              className="problem-timer-bar"
                            />
                          )}
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
                            {BUILD_CATEGORIES[activeBuild].items.map((item, remvidx) => (
                              <li key={remvidx} className="station-list-item">
                                <svg className="bullet" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10M8 3l4 4-4 4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                      who we serve
                    </div>
                    <h2 className="heading h2">
                      built for teams that move fast
                    </h2>
                    <p className="body-text">
                      Whether you&apos;re running a recruiting agency, a deal team,
                      or a high-growth operation — if you&apos;re a
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
                          {isActive && station === 3 && (
                            <div
                              key={activeAudience}
                              className="problem-timer-bar"
                            />
                          )}
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
                                <svg className="bullet" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10M8 3l4 4-4 4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                      Results that speak for themselves.
                    </h2>
                    <p className="body-text">
                      Three years. Dozens of teams. Here&apos;s what
                      we&apos;ve actually built.
                    </p>
                  </motion.div>

                  {/* Featured case study carousel */}
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
                          featured case study
                        </span>
                      </div>

                      {/* Animated card content — slides up/down */}
                      <AnimatePresence mode="wait" custom={caseStudyDir}>
                        <motion.div
                          key={activeCaseStudy}
                          custom={caseStudyDir}
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
                            {CASE_STUDIES[activeCaseStudy].stats.map((stat, i) => (
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
                              {CASE_STUDIES[activeCaseStudy].title}
                            </h3>
                            <p
                              style={{
                                fontSize: '0.9375rem',
                                lineHeight: '170%',
                                color: 'rgba(255,255,255,0.55)',
                                marginBottom: '1.25rem',
                              }}
                            >
                              {CASE_STUDIES[activeCaseStudy].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {CASE_STUDIES[activeCaseStudy].tags.map((tag) => (
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
                        </motion.div>
                      </AnimatePresence>

                      {/* Timer bar */}
                      <div style={{ position: 'relative', height: '3px', background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          key={activeCaseStudy}
                          className="problem-timer-bar"
                          style={{ position: 'absolute', top: 0 }}
                        />
                      </div>

                      {/* CTA — fixed at bottom */}
                      <a
                        href={`/case-studies/${CASE_STUDIES[activeCaseStudy].slug}`}
                        className="button w-full"
                        style={{ borderRadius: 0, margin: 0, borderLeft: 0, borderRight: 0, borderBottom: 0 }}
                      >
                        read case study
                      </a>
                    </motion.div>

                    {/* ── Arrow buttons outside card ── */}
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '0.5rem', justifyContent: isMobile ? 'center' : undefined }}>
                      <motion.button
                        aria-label="Previous case study"
                        onClick={() => {
                          setCaseStudyDir(-1);
                          setActiveCaseStudy(i => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
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
                        aria-label="Next case study"
                        onClick={() => {
                          setCaseStudyDir(1);
                          setActiveCaseStudy(i => (i + 1) % CASE_STUDIES.length);
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

              {/* ── Station 6: How We Work — Vertical Timeline ── */}
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
                      process
                    </div>
                    <h2 className="heading h3">
                      How we make it happen:
                    </h2>
                    <h2
                      className="heading h2"
                      style={{ color: '#22D3EE' }}
                    >
                      The Ops Blueprint.
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
                      className="grid grid-cols-2 md:grid-cols-4"
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
                              <svg className="bullet" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10M8 3l4 4-4 4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </>
              )}

              {/* ── Station 7: Our Edge ── */}
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
                    <div className="label">
                      our edge
                    </div>
                    <h2 className="heading h2">
                      We&apos;re not a traditional agency.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
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


              {/* ── Station 5: Testimonials ── */}
              {station === 5 && (
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
      {!loading && !heroVisible && station >= 1 && station <= 7 && !isMobile && (
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
                    We build AI-powered systems that let great teams scale
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
                    data-cal-namespace="discovery-call"
                    data-cal-link="harshil-tetris/discovery-call"
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  >
                    book a strategy call
                  </a>
                </motion.div>

                {/* Group 3: Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex gap-8"
                >
                  {['x', 'telegram'].map((link) => (
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
