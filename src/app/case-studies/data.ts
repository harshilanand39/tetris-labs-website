/* ─── Rich Content Types ─── */
export type DiscoveryCard = { person: string; role: string; description: string };
export type Pillar = { area: string; title: string; description: string; frictionPoints: string[] };
export type WorkflowItem = { name: string; tools: string; description: string };
export type SolutionCluster = { icon: string; title: string; subtitle: string; items: WorkflowItem[] };
export type OutcomeMetric = { value: string; label: string; note: string };

export type RichContent = {
  about?: string;
  clientsImage?: string;
  tweetIds?: string[];
  discovery?: {
    heading: string;
    intro: string;
    cards: DiscoveryCard[];
    quote: string;
    quoteAttribution: string;
    bodyCopy: string[];
  };
  findings?: {
    heading: string;
    intro: string;
    pillars: Pillar[];
  };
  solutionClusters?: {
    heading: string;
    intro: string;
    methodCallout: string;
    clusters: SolutionCluster[];
  };
  outcomes?: {
    heading: string;
    intro: string;
    metrics: OutcomeMetric[];
    textItems: string[];
  };
};

/* ─── Core Type ─── */
export type CaseStudy = {
  slug: string;
  client: string;
  logo?: string;
  description: string;
  industry: string;
  engagement: string;
  comingSoon: boolean;
  stats: { value: string; label: string }[];
  title: string;
  challenge: string;
  solution: string[];
  deliverables: string[];
  outcome: string;
  testimonialIndex: number | null;
  tags: string[];
  richContent?: RichContent;
};

/* ─── Testimonials ─── */
export const TESTIMONIALS = [
  {
    quote:
      'Working with Harshil was an absolute dream. My contacts, documents and advisory services framework was literally ALL over the place. In a short period of time Harshil listened to me, made recommendations, helped me execute on said recommendations, and even built some new custom flows for me. Harshil is patient, hardworking, detail oriented and has become a pivotal partner in not only the nuts and bolts, but also the strategy of my business moving forward.',
    name: 'Adam Mastrelli',
    title: 'US Partner, Woodstock Fund',
    photo: '/images/adam-mastrelli.png',
  },
  {
    quote:
      "I've worked with Harshil for the past ~2 years on custom recruiting solutions and applicant tracking systems. Most recently, when I took over recruiting and talent at SCRIB3, Harshil helped us build out our entire recruiting solution on the backend and has been extremely helpful with tweaks and updates after going live. With the help of Harshil and the Notion he built us, we've been able to make 50 hires and double in size within the past 6 months.",
    name: 'William Burleson',
    title: 'Head of Talent, SCRIB3',
    photo: '/images/william-burleson.png',
  },
  {
    quote:
      "Of all the wins we've had at Up Top in the past year, none have been more impactful than building out this CRM with Harshil and the Crypto Coach team. It's turned me from an unhinged sales guy who hates process, to an operator running a clean business. At this point, I can't imagine my company functioning without it. Harshil was extremely helpful in walking me through the discovery process, suggesting new features, and delivering on solutions to exactly what I needed to maximize efficiency and organization. On top of that, the team is always an absolute pleasure to work with. You will never leave a meeting without a laugh or a smile. Thanks Coach!",
    name: 'Dan Eskow',
    title: 'Founder, Up Top Search',
    photo: '/images/dan-eskow.png',
  },
];

/* ─── Case Studies ─── */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'up-top',
    client: 'Up Top',
    logo: '/images/up-top-logo.png',
    description: 'Web3 talent agency specializing in blockchain and digital assets — scaled to $3M+ in revenue and 400+ clients without adding ops headcount.',
    industry: 'Recruiting & Talent',
    engagement: 'Full Build — 8 weeks',
    comingSoon: false,
    stats: [],
    title: 'Systems that helped Up Top scale to over $3M in revenue and 400+ clients',
    challenge:
      "Up Top was growing fast — too fast for their ops to keep up. Dan and his team were tracking candidates in spreadsheets, managing client relationships through email threads and sticky notes, and onboarding new clients through a process that lived entirely in Dan's head. Every new client meant more manual work, more dropped balls, and more hours spent on things that had nothing to do with placing people.",
    solution: [
      "We started with a full operational audit — mapping every touchpoint in Up Top's recruiting and client workflow. What we found was a team brilliant at the actual work of recruiting, buried under the administrative overhead of running a growing business.",
      'Over eight weeks, we built a unified system on Notion that connected every layer of their operation: a custom ATS for candidate tracking, a client CRM with automated status updates and pipeline visibility, and an onboarding engine that could take a new client from signed contract to fully operational in under 48 hours — without anyone lifting a finger.',
      'We layered in cross-tool integrations connecting their email and communication workflows into the system, and built automated reporting that gave Dan real-time visibility into his pipeline without ever having to ask his team for an update.',
    ],
    deliverables: [
      'Custom ATS built on Notion with automated candidate pipeline tracking',
      'Client CRM with deal flow visibility and automated status communications',
      'Onboarding engine that onboards new clients in under 48 hours',
      'Cross-tool workflow integrations (email, Slack, Notion)',
      'Automated weekly pipeline and performance reporting',
      'Revenue tracking dashboard with real-time metrics',
    ],
    outcome:
      'Up Top went from scrappy to scalable — hitting $3M+ in revenue and 400+ clients without hiring a single person to manage their operations. Dan now runs a clean, process-driven business where the systems do the administrative work, and his team focuses entirely on placing people.',
    testimonialIndex: 2,
    tags: ['Talent Pipeline', 'Custom ATS', 'Client CRM', 'Workflow Automations', 'Onboarding Engine'],
    richContent: {
      about:
        'Up Top Search, founded in 2021, is a talent agency specializing in the blockchain and digital asset sectors, including algorithmic trading and blockchain engineering. They work with over 100 clients across various domains such as infrastructure, gaming, DeFi, Layer 1s, consumer services, and exchanges. The agency excels in connecting talented individuals with appropriate opportunities, averaging about 4 hires per month last year. Their focus is on building a skilled workforce at the forefront of web3 and digital assets, offering a comprehensive network for career development in the crypto industry.',
      clientsImage: '/images/up-top-clients-logos.png',
      discovery: {
        heading: 'Previous workflow cycle: Challenges',
        intro:
          'Up Top Search faced significant challenges stemming from their expensive, feature-rich, yet rigid systems, particularly in candidate and client management. Marcus from Up Top highlighted these inefficiencies, noting a clear misalignment between the available system features and their specific operational needs.',
        cards: [
          {
            person: '',
            role: 'Client Management System',
            description:
              'The Client Management System (CMS) posed notable issues with inefficient role selection processes and communication hurdles, hindering the effectiveness of client interactions.',
          },
          {
            person: '',
            role: 'Talent Management System',
            description:
              'The Talent Management System (TMS) was inadequate, lacking sophisticated candidate filtering and management capabilities. The team urgently required advanced tools for detailed tracking of candidates throughout the hiring lifecycle, including the ability to compile and present both individual and aggregated feedback clearly on client-facing pages.',
          },
          {
            person: '',
            role: 'Referrals & Communications',
            description:
              'There was a pressing need for more personalized and intuitive approaches to managing referrals and back-channel communications. The existing system complicated the effective management of collaborative documents, vital resource links, and seamless integration of social media and content strategies.',
          },
          {
            person: '',
            role: 'Admin & CRM',
            description:
              'The team found themselves dedicating excessive amounts of time to manual administrative tasks and CRM management. This significant diversion from their core competencies—supporting talent and providing exceptional client service—highlighted the necessity for a more tailored, flexible, and efficient operational solution, particularly suited to the rapidly evolving dynamics of the crypto industry.',
          },
        ],
        quote:
          'In the spirit of Design Thinking, we gathered all pertinent information directly from the Talent Partners at Up Top. We utilized this insight to devise and execute a strategy that emphasizes a Systems Thinking approach, benefiting both the organization and its employees.',
        quoteAttribution: 'Our Approach · Diagnosis',
        bodyCopy: [
          "Initially, we conducted a comprehensive review of Up Top's former workspace and their operational systems. This initial phase involved an examination of their use of Notion and other tools. We asked for clarifications and the reasons behind certain areas where team members identified productivity challenges, as well as their workspace necessities and preferences.",
          'The objective was to thoroughly explore and document individual feature requests.',
        ],
      },
      solutionClusters: {
        heading: 'Development',
        intro:
          'To reorganize Up Top Search\'s Notion workspace for enhanced visibility and scalability, a multi-faceted approach was necessary. Each component is designed to work cohesively, ensuring Up Top Search can effortlessly scale and adapt in the fast-paced crypto industry.',
        methodCallout:
          "Up Top Search's envisioned Notion workspace is a comprehensive ecosystem, seamlessly integrating a Client Management System for efficient role selection and communication, a Talent Management System with robust candidate filtering and tracking, along with collaborative knowledge systems and social media dashboards. This dream setup, complete with admin and client dashboards, invoicing, and a data mine page, aims to streamline operations and foster better engagement between Up Top and their clients, enabling a smooth and scalable operational flow.",
        clusters: [
          {
            icon: '◎',
            title: 'Client Management System (CMS)',
            subtitle: 'Client Operations · Role Selection · Dashboard',
            items: [
              {
                name: 'Centralized Client Hub',
                tools: 'Notion',
                description:
                  'A centralized hub for managing client interactions, with streamlined processes for open roles selection and efficient client communications. A gallery view for revisiting previous hires and a comprehensive dashboard for ongoing client engagements would enhance operational efficiency.',
              },
            ],
          },
          {
            icon: '◈',
            title: 'Talent Management System (TMS)',
            subtitle: 'Candidate Pipeline · Filtering · Matchmaking',
            items: [
              {
                name: 'Refined Talent Pool',
                tools: 'Notion',
                description:
                  'A refined talent pool, categorized by various parameters for efficient candidate management and matchmaking.',
              },
            ],
          },
          {
            icon: '◇',
            title: 'Hub, Partnerships & Social',
            subtitle: 'Knowledge Base · Content · Public Pages',
            items: [
              {
                name: 'Uptop Hub & Partnerships Page',
                tools: 'Notion',
                description:
                  'A repository for crucial documents, links, and templates for partnerships, ensuring easy access and organization.',
              },
              {
                name: 'Goldmine & Social Hub',
                tools: 'Notion · Automation',
                description:
                  'Dynamic platforms for aggregating valuable information and managing social media content, complete with automated processes for resource-saving and content scheduling.',
              },
              {
                name: 'Public Hiring Page',
                tools: 'Notion',
                description:
                  'Integration of this page with other sections for streamlined operations, eliminating manual upload hassles.',
              },
            ],
          },
          {
            icon: '◻',
            title: 'Agents & Automation',
            subtitle: 'Workflow Automation · AI Agents · Integrations',
            items: [
              {
                name: 'Client Invoicing & Onboarding',
                tools: 'QuickBooks · Notion',
                description:
                  'Automated client invoicing through QuickBooks. Automated Memorandum of Understanding (MOU) signing and automatic CRM updates during new client onboarding.',
              },
              {
                name: 'Candidate Communications',
                tools: 'Notion · Email',
                description:
                  'Automated email updates notifying candidates about their progress throughout the hiring process. Custom meeting note summarization with automatic integration into candidate profiles within the CRM.',
              },
              {
                name: 'CRM & Data Intelligence',
                tools: 'AI Agents · Crunchbase · Telegram',
                description:
                  'Automated client data collection and maintenance within the CRM. AI-powered agents actively monitoring client websites for new job listings, promptly notifying the relevant parties of newly opened roles. Agents enriching the client CRM database with current, accurate information from Crunchbase. Integration with Telegram for real-time notifications regarding new payments and reminders for commission payouts.',
              },
              {
                name: 'Reporting & Branding',
                tools: 'Notion · Automation',
                description:
                  'Automated generation of comprehensive monthly reports. Automated client banner generation for consistent branding and engagement.',
              },
            ],
          },
          {
            icon: '△',
            title: 'Documentation & Training',
            subtitle: 'Team Onboarding · Knowledge Transfer',
            items: [
              {
                name: 'Team Lead Training',
                tools: 'Documentation · Live Sessions',
                description:
                  'As part of our services, we consistently interacted with and trained team leaders to support them on various fronts as they scaled. We also offered them advice and Documentation for the effective upkeep of their Notion workspace, as well as training for all the team leads. This allowed the team leads to easily adapt to their new environment without significant bottlenecks, thereby avoiding a steep learning curve.',
              },
            ],
          },
        ],
      },
      tweetIds: ['1808302521657483272', '1904975402034233504'],
      outcomes: {
        heading: 'The Result: Infrastructure That Gets Out of the Way',
        intro:
          "These numbers belong to Up Top's team — their talent partners do the work. Since we built their operational foundation, they've used our systems to scale to $3M+ in revenue and 400+ clients, all without adding a single person to manage operations. Our job was to build infrastructure that gave their people the clarity and space to do their best work.",
        metrics: [
          { value: '$3M+', label: 'in revenue generated since engagement', note: 'Up Top Search' },
          { value: '400+', label: 'clients served since engagement', note: 'Up Top Search' },
          { value: '0', label: 'ops headcount added to support the growth', note: 'Operations' },
        ],
        textItems: [
          "We introduced new multifunctional databases, workflows, and training programs, creating a Notion workspace that's primed for growth.",
          "This optimized workspace is designed to bolster both their team's productivity and the company's expansion, both on a national and international scale.",
          'These tailored solutions significantly reduced manual overhead, allowing Up Top Search to refocus on their primary strengths—effectively supporting talent and enhancing client experiences.',
        ],
      },
    },
  },
  {
    slug: 'vc-case-study',
    client: '',
    description: 'A $50M deep tech fund. Four team members. Eleven manual workflows holding them back from finding the next breakthrough company.',
    industry: 'Venture Capital',
    engagement: 'Full Build',
    comingSoon: false,
    stats: [
      { value: '$50M', label: 'AUM' },
      { value: '50+', label: 'portfolio cos.' },
      { value: '11', label: 'workflows rebuilt' },
      { value: '4', label: 'team members' },
    ],
    title: "Rebuilding a VC's entire operating stack — from the inside out",
    challenge: '',
    solution: [],
    deliverables: [],
    outcome: '',
    testimonialIndex: null,
    tags: ['Venture Capital', 'AI Agents', 'Deal Flow Automation', 'KYB/KYC', 'Portfolio Management', 'RAG'],
    richContent: {
      discovery: {
        heading: "We didn't ask what they wanted. We watched what they did.",
        intro:
          'Before touching a single tool, we ran deep discovery sessions with every member of the team — sitting in on live work, shadowing calls, and mapping the unspoken logic behind how decisions actually got made.',
        cards: [
          {
            person: 'Stefano',
            role: 'Managing Partner · Deal Flow & Thesis',
            description:
              "Manually triaged hundreds of inbound submissions, with no systematic way to surface deals aligned to niche theses like sugar reduction or real-world decentralization. High-potential companies were being missed simply because there weren't enough hours in the day.",
          },
          {
            person: 'Francesco',
            role: 'Partner · Deal Evaluation',
            description:
              'Reviewed decks entirely by hand, wrote rejection emails manually — often weeks after submission. No structured framework existed for evaluating founder quality across calls. Institutional knowledge lived only in his head.',
          },
          {
            person: 'Francesca',
            role: 'Operations · Investment Closing',
            description:
              'The entire KYB/KYC compliance process sat on her shoulders. Founders drip-sending documents, manual Drive organization, manual Carta uploads — bad file naming alone was adding 30–40% overhead to every single deal close.',
          },
          {
            person: 'Vicky',
            role: 'Portfolio · Qualitative Tracking',
            description:
              'Maintained qualitative portfolio data in Airtable with no connection to Tactic (financial data) or Attio (CRM). Valuable context about portfolio companies existed only in her spreadsheet, invisible to the rest of the team.',
          },
        ],
        quote:
          "The real insight wasn't any single broken process. It was that each person had built their own private system — and none of them talked to each other.",
        quoteAttribution: 'Observation from Discovery · Tetris Labs',
        bodyCopy: [
          "Discovery surfaced one structural truth: the firm had four highly capable people operating as four separate firms. Data didn't flow. Decisions couldn't compound on prior knowledge. And every hour spent on manual ops was an hour not spent on the work that actually moves the needle — finding and backing the next breakthrough company.",
          'The output was a complete operational map across four functional areas: Deal Sourcing, Deal Evaluation, Investment Closing, and Portfolio Management — with clear friction points, tool dependencies, and automation opportunity for each.',
        ],
      },
      findings: {
        heading: 'Four functional areas. Four systemic breakdowns.',
        intro:
          "The problems weren't technical — they were structural. Manual processes had quietly become the load-bearing walls of the firm's operations. Everyone had adapted to the inefficiency rather than challenged it.",
        pillars: [
          {
            area: '01 — Deal Sourcing',
            title: 'Entirely passive. Thesis-blind.',
            description:
              'Deal flow was 100% inbound. No system existed to proactively find companies in the narrow spaces the fund genuinely cared about. Edge bets in niche theses — the exact areas where the fund had conviction — were being systematically missed.',
            frictionPoints: [
              'No thesis-driven sourcing pipeline',
              'Funding announcements missed entirely',
              'No market intelligence infrastructure',
              'Newsletter curation done manually',
            ],
          },
          {
            area: '02 — Deal Evaluation',
            title: 'Manual, slow, and unscalable.',
            description:
              'Decks sat unreviewed. Rejections took weeks. No structured scoring framework existed for founder calls. Institutional knowledge — memos, call notes, LP feedback — was scattered across six tools with no way to query or compound it.',
            frictionPoints: [
              'Founders waiting weeks for responses',
              'No call scoring or evaluation matrix',
              'Knowledge trapped in disconnected tools',
              'Memo creation entirely manual',
            ],
          },
          {
            area: '03 — Investment Closing',
            title: 'Compliance as a one-person bottleneck.',
            description:
              'KYB/KYC was fully manual — email chains, drag-and-drop downloads, individual Carta uploads. Founders sent documents in multiple tranches with inconsistent naming. No checklist. No visibility. Every close carried significant avoidable overhead.',
            frictionPoints: [
              '30–40% overhead from file renaming alone',
              'No status dashboard for the team',
              'Duplicate data entry across platforms',
              'No auto-folder creation on deal moves',
            ],
          },
          {
            area: '04 — Portfolio Management',
            title: 'Data siloed by person, invisible to the team.',
            description:
              'Financial data lived in Tactic (accessible to only one team member). Qualitative data lived in Airtable (maintained by just one other). CRM data lived in Attio. No integration between them. Portfolio visibility required assembling three separate sources manually.',
            frictionPoints: [
              'No two-way sync across tools',
              'Manual portfolio updates prone to lag',
              'No unified view for the team',
              'Documents disconnected from deal records',
            ],
          },
        ],
      },
      solutionClusters: {
        heading: 'Eleven systems. One design principle: fit the way they already work.',
        intro:
          "Every solution was designed to slot into existing behavioural patterns — not replace them. The team shouldn't have to learn a new way of working. The infrastructure should simply make the way they already work dramatically faster and more intelligent.",
        methodCallout:
          "We didn't redesign their workflows. We automated the version of their workflow that existed in their heads — the ideal version they never had time to execute manually.",
        clusters: [
          {
            icon: '◎',
            title: 'Proactive Deal Intelligence',
            subtitle: 'Deal Sourcing · Market Intelligence',
            items: [
              {
                name: 'Deal Scout Agent',
                tools: 'n8n · Clay · Attio',
                description:
                  "Thesis-driven sourcing agent that crawls niche data sources — forums, newsletters, Discord communities, Product Hunt, Hacker News — across the fund's conviction areas (e.g., real-world decentralization, sugar reduction, alternative proteins). Each company is enriched via Crunchbase/Clay, scored against a weighted rubric (founder background, traction, community sentiment, market fit), and the top deals each week are auto-posted to Slack with a full breakdown card.",
              },
              {
                name: 'Automated Newsletter Scraping',
                tools: 'n8n · Airtable · Attio',
                description:
                  'Automated ingestion of funding announcements from newsletters and deal sources directly into Airtable, with automatic creation of the relevant pipeline records in Attio. No more manually tracking rounds from email.',
              },
              {
                name: 'Internal News Portal + Newsletter',
                tools: 'Yutori · Airtable · Google Docs',
                description:
                  "A fleet of market intel scouts deployed via Yutori, tracking the entire web across the fund's thesis areas — funding announcements, partnerships, research, regulatory developments. Stories are published instantly to an internal news portal, tagged by category. Every Friday, a curated digest is assembled automatically and delivered to the relevant team members.",
              },
              {
                name: 'Newsletter on Autopilot',
                tools: 'Slack · Airtable · Google Docs',
                description:
                  "Captured all links from the team's #reading Slack channel into a structured Airtable base. Each link is auto-described and tagged by category. Every week, the agent assembles a Google Doc newsletter using all links from that week, structured using the team's established newsletter format and trained on all previous editions.",
              },
            ],
          },
          {
            icon: '◈',
            title: 'Smarter Evaluation Infrastructure',
            subtitle: 'Deal Evaluation · Institutional Knowledge',
            items: [
              {
                name: 'Investment Calls Copilot',
                tools: 'Circle Back · Grok · Attio',
                description:
                  'AI-powered analysis of founder call recordings. Transcripts are segmented into phases (intro, traction, team, close) and scored against a structured evaluation matrix across dimensions like market knowledge, communication clarity, and confidence. Scores are logged automatically into the deal record in Attio alongside reasoning. Designed to provide 30–50% more data-driven signal per founder evaluation.',
              },
              {
                name: 'Auto-Pass Email Pipeline',
                tools: 'Attio · n8n · Slack',
                description:
                  'Deals untagged as "Review" or "Consider" after 48 hours trigger an LLM-personalized rejection email — referencing the founder\'s name and company — pending one-click Slack approval from the team. Eliminates the founder limbo problem entirely. The partners maintain full oversight; the automation eliminates the friction that caused weeks-long delays.',
              },
              {
                name: 'RAG Bot — Institutional Knowledge',
                tools: 'Pinecone · LLM · Attio · Google Drive',
                description:
                  "All of the fund's institutional knowledge — deal notes, investment memos, call recordings, LP feedback — indexed into a vector store and made queryable via conversational AI. The team can now ask \"Show all hydrogen-related startups we vetted in Q1 2025 with ARR > $100K\" or \"What did LPs say about our robotics investments?\" and get an answer in seconds rather than hours.",
              },
              {
                name: 'Automated Investment Memo Creation',
                tools: 'LLM · Google Drive · Attio',
                description:
                  'Investment memos auto-generated from deal data, call notes, and enriched company information already captured in Attio and Google Drive. First-pass memos produced in minutes rather than hours, ready for partner review and refinement.',
              },
            ],
          },
          {
            icon: '◇',
            title: 'Frictionless Investment Closing',
            subtitle: 'KYB/KYC · Compliance · Document Management',
            items: [
              {
                name: 'KYB/KYC Automation',
                tools: 'Gmail · n8n · Google Drive · Carta',
                description:
                  'Gmail threads labelled with a custom KYB tag are watched automatically. Attachments are downloaded, intelligently renamed using LLM classification (pattern: Company_DocType_Date.pdf), and moved to the canonical Drive path — eliminating the 30–40% overhead that came from manual renaming alone. A KYB Tracker auto-populates with document status (Missing / Received / Uploaded), with Slack reminders for outstanding items.',
              },
              {
                name: 'Founder Upload Portal',
                tools: 'Supabase · Airtable · Google Drive',
                description:
                  'Magic-link portal for founders to upload KYB/KYC documents directly. Each founder sees a personalized checklist rendered from Airtable. Files are auto-organized in Drive, doc types detected automatically, and progress is visible to both sides. Eliminates the multi-batch email chaos that previously defined every deal close.',
              },
              {
                name: 'Attio → G-Drive Auto-Folder',
                tools: 'Attio · Google Drive · n8n',
                description:
                  'When a deal moves to "Invested" status in Attio, a structured Google Drive folder is automatically created for the portfolio company and all existing deal files are migrated in. Teams continue using Drive as normal — the system just ensures structure appears at exactly the right moment.',
              },
            ],
          },
          {
            icon: '◻',
            title: 'Unified Portfolio Data Ecosystem',
            subtitle: 'Portfolio Management · Data Sync',
            items: [
              {
                name: 'Tactyc ↔ Airtable ↔ Attio Sync',
                tools: 'n8n · API Integrations',
                description:
                  'Two-way sync connecting financial data (Tactyc: valuations, ownership percentages, KPIs), qualitative data (Airtable: runway, cash burn), and CRM data (Attio). A shared company ID as the primary key. Daily sync schedule. Simplified Attio views now give the entire team real-time visibility into key financial metrics that previously only one team member could access.',
              },
              {
                name: 'G-Drive ↔ Tactyc Document Sync',
                tools: 'Google Drive API · Tactyc API',
                description:
                  "Investment documents (SAFEs, term sheets, KYC files) automatically synced from Google Drive to Tactyc's data room. Documents tagged with metadata on upload. Eliminates the redundant manual upload process previously run for every investment.",
              },
            ],
          },
          {
            icon: '△',
            title: 'Event Management System',
            subtitle: 'Community · Operations',
            items: [
              {
                name: 'End-to-End Event Flow',
                tools: 'Attio · Stripe · Luma · n8n',
                description:
                  'A complete automated attendee journey: online application → instant Attio sync and auto-enrichment → approval triggers a custom Stripe payment link sent via personalized LLM-generated email → 3-email follow-up sequence using enriched attendee data → on payment, automatically marked as confirmed in CRM, added to the Luma event, and sent a confirmation. Zero manual steps between application and arrival.',
              },
            ],
          },
        ],
      },
      outcomes: {
        heading: 'From four separate firms to one connected operating system.',
        intro:
          "The goal was never to automate for automation's sake. It was to give a small, ambitious team the operational leverage to operate at the level their conviction deserved.",
        metrics: [
          {
            value: '50–70%',
            label: 'Reduction in manual deal screening time through automated triage and AI-powered first-pass evaluation',
            note: 'Target · Deal Evaluation',
          },
          {
            value: '48hrs',
            label: 'Maximum response time to any inbound submission, down from weeks of founder limbo',
            note: 'Delivered · Deal Flow',
          },
          {
            value: '~40%',
            label: 'Overhead eliminated from investment closing through intelligent document automation and renaming',
            note: 'Delivered · KYB/KYC',
          },
        ],
        textItems: [
          'For the first time, the entire team has a unified view of every portfolio company — financial data, qualitative metrics, and deal history, accessible in one place without assembling it manually from three tools.',
          'Thesis-driven deal sourcing is now proactive, not passive — the firm can now systematically see every company operating in the narrow spaces it cares most about, rather than relying on what shows up in the inbox.',
          'Institutional knowledge that lived scattered across six tools is now queryable in seconds — memos, call notes, LP feedback, and deal history accessible through a single conversational interface.',
          "The team's market intelligence now arrives in real-time and in summary — a continuous news portal and weekly digest replacing the ad-hoc tab-checking and Slack link sharing that passed for staying informed.",
        ],
      },
    },
  },
  {
    slug: 'caladan',
    client: 'Caladan',
    logo: '/images/caladan-logo.png',
    description: 'A crypto firm processing $2B+ in daily trading volume had a CRM no one wanted to use. 3,500+ company records, freeform meeting notes, disconnected tools — and a team flying blind on pipeline performance.',
    industry: 'CRM & Data Infrastructure',
    engagement: 'Full Build',
    comingSoon: false,
    stats: [
      { value: '$2B+', label: 'Daily Trading Volume' },
      { value: '9,500+', label: 'Interactions Structured' },
      { value: '3,500+', label: 'Company Records' },
      { value: '5hrs', label: 'Weekly Reporting Saved' },
    ],
    title: 'Turning 9,500+ fragmented interactions into one intelligent operating system.',
    challenge:
      'Caladan operates across market making, venture, and structured products — each with distinct workflows, different team members, and entirely different definitions of what a "deal" looks like. The main CRM held 3,500+ company records with no consistent organization, meeting notes in freeform text, and team members who had quietly built shadow systems to survive. Team leads spent 5+ hours weekly chasing pipeline updates, BD reps had no focused view to manage their accounts, and leadership was making decisions without data.',
    solution: [
      "We started with stakeholder interviews across every department — BD, Legal, Finance, and the investment arm — to understand where actual work happened and why the official CRM wasn't it.",
      'We created a structured, standalone interactions database to track all client conversations with standardized formats requiring date, participants, service tags, and context. 9,500+ historical interactions were migrated and restructured.',
      'We built custom n8n workflows to convert years of unstructured meeting notes into properly formatted database entries using an LLM pipeline — converting freeform text to Markdown and writing it back to Notion with assigned owners, dates, and service tags.',
      'Each department now has a purpose-built interface: BD reps see only their assigned companies in a focused pipeline view, Legal and Finance access fields relevant to them, and team leads have a global performance dashboard.',
      'Connected the previously siloed stack: call recordings from Fireflies auto-populate the conversations database; Google Sheets outreach lists sync with CRM records; data moves between systems without manual intervention.',
    ],
    deliverables: [
      'Dedicated Conversations Database with structured interaction records',
      'AI-powered data transformation pipeline (n8n + LLM + Notion)',
      'Team-specific views and personal BD dashboards',
      'Automated pipeline analytics and real-time reporting',
      'Fireflies + Google Sheets + Notion integration stack',
    ],
    outcome:
      'Caladan went from a CRM no one trusted to a system every team member actively uses. 9,500+ legacy interactions were converted from freeform noise into structured, queryable records. Weekly manual reporting was eliminated with real-time dashboards. 100% team adoption — members who previously built shadow systems now operate entirely within the central platform.',
    testimonialIndex: null,
    tags: ['CRM & Data Infrastructure', 'Crypto Trading', 'Market Making', 'Venture', 'AI Automation', 'Pipeline Analytics'],
    richContent: {
      about:
        'Caladan is a crypto firm processing $2B+ in daily trading volume, operating across market making, venture, and structured products. With distinct workflows spanning BD, Legal, Finance, and their investment arm, Caladan manages 3,500+ company relationships — each team working from a different definition of what a deal looks like, and a different set of tools to get there.',
      discovery: {
        heading: 'A CRM with 3,500 records that nobody trusted.',
        intro:
          'Caladan operates across market making, venture, and structured products — each with distinct workflows, different team members, and entirely different definitions of what a "deal" looks like. We mapped each one from the ground up.',
        cards: [],
        quote: "The CRM wasn't a source of truth. It was a filing cabinet people had stopped opening.",
        quoteAttribution: 'Observation from Discovery · Tetris Labs',
        bodyCopy: [
          "We started with stakeholder interviews across every department — BD, Legal, Finance, and the investment arm. The goal wasn't to understand what systems they used. It was to understand where their actual work happened and why the official CRM wasn't it. What we found: people had quietly built shadow systems to survive.",
        ],
      },
      findings: {
        heading: 'Three categories of dysfunction.',
        intro:
          "The problems weren't isolated to one team — they were structural failures across data quality, process efficiency, and user experience.",
        pillars: [
          {
            area: '01 — Data Structure Issues',
            title: 'Fragmented, untrustworthy records.',
            description:
              'The main CRM held 3,500+ company records with no consistent organization. Meeting notes and conversation logs lacked dates, context, and structure. Multiple teams shared a single CRM view, cluttered with irrelevant fields from other departments.',
            frictionPoints: [
              'Fragmented records with no consistent organization',
              'Freeform interaction logs — unsearchable and context-free',
              'Cluttered interface overwhelming for focused work',
            ],
          },
          {
            area: '02 — Process Inefficiencies',
            title: 'Manual overhead at every layer.',
            description:
              'Team leads spent 5+ hours weekly checking Google Calendars and chasing people for status updates. BD reps had no focused view to manage their ~30 assigned companies. TMM outreach lists lived in Google Sheets entirely separate from the CRM, with no pipeline analytics to inform decisions.',
            frictionPoints: [
              'Manual reporting consuming 5+ hours weekly',
              'Siloed BD workflows with no focused account views',
              'Disconnected outreach lists in Google Sheets',
              'Zero pipeline visibility for leadership',
            ],
          },
          {
            area: '03 — User Experience Problems',
            title: 'A system the team worked around.',
            description:
              "BD members actively avoided the CRM due to information overload. Team members built personal tracking spreadsheets outside the CRM. Legal, Finance, and BD teams couldn't easily surface relevant information from each other, creating bottlenecks at the exact moments deals needed to move fast.",
            frictionPoints: [
              'Active system avoidance due to information overload',
              'Shadow systems built by individual team members',
              'Cross-team friction slowing deal progression',
            ],
          },
        ],
      },
      solutionClusters: {
        heading: 'One central system. Every team finally using it.',
        intro:
          "The solution wasn't to replace the CRM — it was to make it actually work. We rebuilt the data architecture, automated the messy parts, and gave each team a view that matched how they actually operated.",
        methodCallout:
          "We didn't redesign their workflows. We made the CRM earn its place — by fixing the data, automating the overhead, and giving every team a view built for how they actually work.",
        clusters: [
          {
            icon: 'DB',
            title: 'Dedicated Conversations Database',
            subtitle: 'Notion · n8n · Fireflies',
            items: [
              {
                name: 'Structured Interactions Database',
                tools: 'Notion · n8n · Fireflies',
                description:
                  'Created a structured, standalone interactions database to track all client conversations — with standardized formats requiring date, participants, service tags, and context. Every meeting is now a queryable record, not a freeform note buried in a company page. 9,500+ historical interactions were migrated and restructured.',
              },
            ],
          },
          {
            icon: 'AI',
            title: 'AI-Powered Data Transformation',
            subtitle: 'n8n · LLM · Notion API',
            items: [
              {
                name: 'Legacy Data Migration Pipeline',
                tools: 'n8n · LLM · Notion API',
                description:
                  'Built custom n8n workflows to convert years of unstructured meeting notes into properly formatted database entries. The pipeline processes freeform text through an LLM, converts it to Markdown, and writes it back to Notion in the correct block format — with assigned owners, dates, and service tags applied automatically. This is what turned 9,500+ legacy records from noise into signal.',
              },
            ],
          },
          {
            icon: '◈',
            title: 'Team-Specific Views & Personal Dashboards',
            subtitle: 'Notion',
            items: [
              {
                name: 'Role-Based Workspace Architecture',
                tools: 'Notion',
                description:
                  'Each department now has a purpose-built interface within the same central repository. BD reps see only their ~30 assigned companies in a focused pipeline view. Legal and Finance access the fields relevant to them. Team leads have a global performance dashboard. The overwhelming single-view problem that caused CRM avoidance is eliminated entirely.',
              },
            ],
          },
          {
            icon: '◎',
            title: 'Automated Pipeline Analytics',
            subtitle: 'Notion · Google Sheets',
            items: [
              {
                name: 'Real-Time Pipeline Dashboards',
                tools: 'Notion · Google Sheets',
                description:
                  'Built dashboards tracking calls by owner, proposals submitted, deals closed, and pipeline stage distribution — updated automatically without anyone needing to compile reports. Team leads moved from 5+ hours of weekly manual reporting to real-time visibility on demand. Pattern recognition across conversations now surfaces common follow-up items and themes automatically.',
              },
            ],
          },
          {
            icon: '⇄',
            title: 'Streamlined Data Flow & Integrations',
            subtitle: 'Google Sheets · Fireflies · Notion · n8n',
            items: [
              {
                name: 'Connected Stack Integration',
                tools: 'Google Sheets · Fireflies · Notion · n8n',
                description:
                  'Connected the previously siloed stack: call recordings from Fireflies auto-populate the conversations database; Google Sheets outreach lists sync with CRM records; data moves between systems without manual intervention. The TMM outreach workflow that lived entirely outside the CRM is now directly integrated into the deal record it belongs to.',
              },
            ],
          },
        ],
      },
      outcomes: {
        heading: 'A system the team actually uses.',
        intro:
          "The measure of a CRM rebuild isn't the number of records migrated. It's whether the team opens it the next morning.",
        metrics: [
          {
            value: '9,500+',
            label: 'Legacy interactions converted from freeform notes into structured, linked database records with full metadata',
            note: 'Delivered · Data Infrastructure',
          },
          {
            value: '5hrs',
            label: 'Weekly manual reporting time eliminated — team leads now have real-time pipeline visibility without compiling it themselves',
            note: 'Delivered · Operations',
          },
          {
            value: '100%',
            label: 'Team adoption — members who previously built shadow systems now operate entirely within the central platform',
            note: 'Delivered · CRM Adoption',
          },
        ],
        textItems: [
          'All team members can now track exactly how long any deal has spent in each pipeline stage — enabling data-driven decisions on when to push, hold, or deprioritize.',
          'Individual performance metrics (client conversations, proposals submitted, deals closed) are now visible at the team-lead level, driving consistent follow-up behavior across the BD team.',
          'AI workflows across 9,500+ conversation records now identify common themes, follow-up patterns, and deal signals that were previously invisible inside the unstructured data.',
          'Legal and Finance now access deal-relevant information directly from the CRM without requesting it from BD — removing the friction that slowed deal progression at the closing stage.',
          "Every client interaction — from an initial cold outreach to a closing call — is now permanently captured, attributed, and retrievable. Caladan's relationship history no longer lives in individual inboxes.",
        ],
      },
    },
  },
];

/* ─── Helper ─── */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug);
}
