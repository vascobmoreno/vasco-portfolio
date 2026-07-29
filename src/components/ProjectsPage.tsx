import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HowItWorksStep {
  title:       string;
  description: string;
}

interface Project {
  title:       string;
  description: string;
  tech:        string[];
  github?:     string;
  live?:       string;
  year:        string;
  status:      'completed' | 'in progress' | 'ongoing' | 'archived';
  detail?: {
    logo?:                   string;
    longDescription:         string;
    whatItDoes?:             string[];
    whatMakesItInteresting?: string[];
    howItWorks?:             HowItWorksStep[];
    website?:                string;
  };
}

const PROJECTS: Project[] = [
  {
    title:       "L'Avenue",
    description: 'Marketing/brand site for a Portuguese electronic-music and nightlife event brand — events, ticketing, and newsletter capture.',
    tech:        ['HTML', 'CSS', 'JavaScript', 'Vercel', 'Klaviyo', 'GA4'],
    github:      '',
    live:        'https://lavenuexperience.com',
    year:        '2026',
    status:      'ongoing',
    detail: {
      logo: '/lavenue_logo.png',
      longDescription:
        "A marketing/brand site for L'Avenue, a real Portuguese electronic-music and nightlife event brand. Built deliberately minimal — plain HTML, CSS, and vanilla JavaScript, no framework, no build tool, no npm dependencies. Every page is a static .html file sharing styles.css and script.js, kept simple to host, fast to load, and easy to hand-edit.",
      whatItDoes: [
        'Homepage with hero, about, upcoming experiences, gallery, and partners/sponsors sections',
        'Dedicated event pages for the live ticketed event, the next upcoming event, and a "Past Experiences" archive',
        'A custom email-capture modal wired directly to Klaviyo\'s client-side API for real newsletter list growth',
        '"Get Directions" dropdown per event linking out to Waze, Google Maps, and Apple Maps',
        'Hosted on Vercel with Git-connected auto-deploys, vercel.json rewrites for clean URLs, and a custom domain (lavenuexperience.com)',
        'Google Analytics 4 tracks page views and a custom buy_tickets_click event; Vercel Web Analytics and Speed Insights also installed',
      ],
      whatMakesItInteresting: [
        'A signature "fan" logo animation — a CSS conic-gradient used as a mask, driven by requestAnimationFrame, that opens and closes like a hand fan',
        'Hero background video has dimming baked in via ffmpeg instead of applied at runtime with CSS opacity, for better mobile performance',
        'Horizontal-scroll DJ/gallery flip-cards reveal front/back images, with hover on desktop and scroll-position-driven interaction on mobile',
        'Real event photography and video processed with PIL and ffmpeg for web-appropriate sizing and compression',
      ],
      website: 'https://lavenuexperience.com',
    },
  },
  {
    title:       'The Tips Lobby',
    description: 'Social pick-tracking platform for football and basketball fans.',
    tech:        ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
    github:      '',
    live:        'https://the-tips-lobby.vercel.app/',
    year:        '2026',
    status:      'ongoing',
    detail: {
      logo: '/the_tips_lobby_logo.png',
      longDescription:
        'A full-stack web app where users create private lobbies, invite friends, and compare sports predictions before kick-off — no real money involved, just bragging rights.',
      whatItDoes: [
        'Make picks on upcoming matches across 14 competitions (Champions League, Premier League, La Liga, Bundesliga, Serie A, NBA, and more)',
        'Create private lobbies with invite codes and compete on a leaderboard with friends',
        'See live community pick splits — before the game starts, you can see what percentage of all users backed each outcome',
        'Track your personal record: total picks made, how many were resolved, and your correct pick rate',
        'Match data updates automatically every day with live scores and results',
      ],
      whatMakesItInteresting: [
        'Every pick feeds into a global stats engine — so even without a lobby, you can browse any match and instantly see how the crowd is leaning',
        'After results come in, picks are automatically resolved and each user\'s accuracy stats update in real time',
        'All community percentages are aggregated anonymously — no individual data is ever exposed',
      ],
      howItWorks: [
        {
          title: 'Browse matches',
          description: 'Open the app and see all upcoming football and basketball matches for today and tomorrow — organised by league, with kick-off times.',
        },
        {
          title: 'Make your picks',
          description: 'For each match, choose your predictions: who wins, whether both teams score, how many goals, and more. Picks lock at kick-off.',
        },
        {
          title: 'See the community split',
          description: 'Instantly see what percentage of all users picked each outcome — before the game starts. Is the crowd backing the favourite, or is there a surprise upset coming?',
        },
        {
          title: 'Create or join a lobby',
          description: 'Create a private lobby and share the invite code with friends, a group chat, or your community. Everyone\'s picks are tracked in the same place.',
        },
        {
          title: 'Compete on the leaderboard',
          description: 'Once results come in, picks are automatically resolved. The lobby leaderboard updates in real time — see who called it right and who got it wrong.',
        },
        {
          title: 'Track your stats',
          description: 'Your profile tracks everything: total picks made, how many were resolved, and your overall accuracy rate. Improve your record week after week.',
        },
      ],
      website: 'https://the-tips-lobby.vercel.app/',
    },
  },
  {
    title:       'LPL, S.A — Trevi',
    description: 'A website for a food production and distribution company, showcasing their brand and full product catalogue.',
    tech:        ['HTML', 'CSS', 'JavaScript'],
    github:      '',
    live:        'https://www.trevi.pt/testev2/',
    year:        '2026',
    status:      'ongoing',
    detail: {
      logo: '/logo_trevi.png',
      longDescription:
        'TREVI is a website for a food production and distribution company, built with plain HTML, CSS, and JavaScript. It serves as both a brand showcase and a full product catalogue, available in four languages — Portuguese, Spanish, English, and French.',
      whatItDoes: [
        'Products are organised by category and can be filtered or searched, with a live image grid appearing as the user types.',
        'Each product opens a detailed modal showing all available sizes and variants, reference codes, and EAN/ITF barcodes — all copyable with a single click.',
        'For products with quality grades, these are clearly distinguished in the variant table.',
        'An order list side panel lets users add products, adjust quantities, and view, copy, or print their full order list.',
        'A separate print-optimised PDF catalogue is also available.',
        'Available in four languages — Portuguese, Spanish, English, and French.',
      ],
      website: 'https://www.trevi.pt/testev2/',
    },
  },
  {
    title:       'Portfolio',
    description: 'Personal developer portfolio with an interactive 3D body model and a dark, terminal-inspired aesthetic.',
    tech:        ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Vercel'],
    github:      'https://github.com/vascobmoreno/vasco-portfolio',
    live:        '',
    year:        '2026',
    status:      'ongoing',
    detail: {
      logo: '/favicon.svg',
      longDescription:
        'A personal developer portfolio built with React and TypeScript. Features an interactive 3D body model with clickable zones, a dark holographic aesthetic, and a minimal state-based router — no dependencies beyond what the UI actually needs.',
      whatItDoes: [
        'Interactive 3D body model built with Three.js and React Three Fiber — click any highlighted zone to trigger context-specific interactions.',
        'Dark holographic UI theme with CSS scanline effects, zone pulse rings, and teal accent glows throughout.',
        'Projects section with per-project detail views, hover curtain reveal on cards, and structured content (what it does, how it works, what makes it interesting).',
        'Contact form with country code selector, powered by Web3Forms for server-side email delivery with no backend required.',
        'Zero-dependency routing via a three-state React machine — no react-router, no overhead.',
        'Smooth page transitions using Framer Motion AnimatePresence on every view change.',
      ],
      whatMakesItInteresting: [
        'The 3D model uses a custom GLSL ShaderMaterial for zone boundary glows — all rendering happens on the GPU.',
        'The glitch animation on "Moreno" layers two CSS clip-path keyframe sequences (24 and 34 frames) with a time-offset visibility cycle, so it fires pseudo-randomly.',
        'The entire app is driven by a three-value state machine (home / projects / contact) — no routing library, no URL changes, no history stack.',
      ],
    },
  },
];

const STATUS_COLORS = {
  'completed':   'text-[#00ffcc]/70 border-[#00ffcc]/30',
  'ongoing':     'text-yellow-400/80 border-yellow-400/35',
  'in progress': 'text-yellow-400/70 border-yellow-400/30',
  'archived':    'text-gray-500 border-gray-600/30',
};

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12l7 7M5 12l7-7" />
    </svg>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const hasDetail = !!project.detail;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={hasDetail ? onClick : undefined}
      className={`relative overflow-hidden border border-[#00ffcc]/12 p-6 rounded-sm bg-[#00ffcc]/[0.02] hover:border-[#00ffcc]/25 transition-all group flex flex-col gap-4 ${hasDetail ? 'cursor-pointer' : ''}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-mono text-base font-semibold text-white group-hover:text-[#00ffcc] transition-colors leading-snug">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`font-mono text-[8px] tracking-[0.3em] uppercase border px-2 py-0.5 rounded-sm ${STATUS_COLORS[project.status]}`}>
            {project.status}
          </span>
          <span className="font-mono text-[9px] text-gray-600">{project.year}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-xs font-mono leading-relaxed flex-1">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <span key={t} className="font-mono text-[9px] tracking-[0.15em] text-[#00ffcc]/45 border border-[#00ffcc]/15 px-2 py-0.5 rounded-sm uppercase">
            {t}
          </span>
        ))}
      </div>

      {/* Curtain overlay */}
      {hasDetail && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 35%)' }}>
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#00ffcc] uppercase flex items-center gap-2">
            View Project
            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      )}
    </motion.div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const d = project.detail!;
  const siteUrl = project.live || d.website;

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar: back + links */}
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#00ffcc]/70 border border-[#00ffcc]/25 px-4 py-2 rounded-sm bg-[#00ffcc]/5 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-all uppercase"
        >
          <BackArrow />
          All Projects
        </button>

        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#00ffcc]/70 border border-[#00ffcc]/25 px-5 py-2 rounded-sm bg-[#00ffcc]/5 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-all uppercase"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {siteUrl && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#00ffcc]/70 border border-[#00ffcc]/25 px-5 py-2 rounded-sm bg-[#00ffcc]/5 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-all uppercase"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Visit Site
            </a>
          )}
        </div>
      </div>

      {/* Logo + header */}
      <div className="flex items-center gap-5 mb-4">
        {d.logo && (
          <img
            src={d.logo}
            alt={`${project.title} logo`}
            className="w-14 h-14 rounded-sm object-contain shrink-0"
          />
        )}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className={`font-mono text-[8px] tracking-[0.3em] uppercase border px-2 py-0.5 rounded-sm ${STATUS_COLORS[project.status]}`}>
              {project.status}
            </span>
            <span className="font-mono text-[9px] text-gray-600">{project.year}</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">{project.title}</h1>
        </div>
      </div>

      <p className="text-gray-400 text-sm font-mono mb-10 leading-relaxed max-w-2xl">{d.longDescription}</p>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5 mb-12">
        {project.tech.map(t => (
          <span key={t} className="font-mono text-[9px] tracking-[0.15em] text-[#00ffcc]/45 border border-[#00ffcc]/15 px-2 py-0.5 rounded-sm uppercase">
            {t}
          </span>
        ))}
      </div>

      {/* What it does */}
      {d.whatItDoes && d.whatItDoes.length > 0 && (
        <div className="mb-10">
          <p className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/35 uppercase mb-5">What it does</p>
          <ul className="flex flex-col gap-3">
            {d.whatItDoes.map((item, i) => (
              <li key={i} className="flex gap-3 font-mono text-xs text-gray-400 leading-relaxed">
                <span className="text-[#00ffcc]/40 mt-0.5 shrink-0">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* How it works */}
      {d.howItWorks && d.howItWorks.length > 0 && (
        <div className="mb-10">
          <p className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/35 uppercase mb-6">How it works</p>
          <div className="flex flex-col gap-0">
            {d.howItWorks.map((step, i) => (
              <div key={i} className="flex gap-5 group">
                {/* Step number + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-6 h-6 rounded-full border border-[#00ffcc]/25 bg-[#00ffcc]/5 flex items-center justify-center shrink-0">
                    <span className="font-mono text-[9px] text-[#00ffcc]/60">{i + 1}</span>
                  </div>
                  {i < d.howItWorks!.length - 1 && (
                    <div className="w-px flex-1 bg-[#00ffcc]/10 my-1" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-6 ${i === d.howItWorks!.length - 1 ? '' : ''}`}>
                  <p className="font-mono text-xs font-semibold text-white mb-1">{step.title}</p>
                  <p className="font-mono text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What makes it interesting */}
      {d.whatMakesItInteresting && d.whatMakesItInteresting.length > 0 && (
        <div className="mb-12">
          <p className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/35 uppercase mb-5">What makes it interesting</p>
          <ul className="flex flex-col gap-3">
            {d.whatMakesItInteresting.map((item, i) => (
              <li key={i} className="flex gap-3 font-mono text-xs text-gray-400 leading-relaxed">
                <span className="text-[#00ffcc]/40 mt-0.5 shrink-0">–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

    </motion.div>
  );
}

export default function ProjectsPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex-1 overflow-y-auto pt-24 pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {selected ? (
            <ProjectDetail key="detail" project={selected} onBack={() => setSelected(null)} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back to home */}
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#00ffcc]/70 border border-[#00ffcc]/25 px-4 py-2 rounded-sm bg-[#00ffcc]/5 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-all uppercase mb-12"
              >
                <BackArrow />
                Back
              </button>

              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Projects.</h1>
              <p className="text-gray-400 text-sm font-mono mb-12 leading-relaxed">
                A collection of projects I've built or been involved in.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((p, i) => (
                  <ProjectCard key={i} project={p} index={i} onClick={() => setSelected(p)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
