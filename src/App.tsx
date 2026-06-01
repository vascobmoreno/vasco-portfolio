import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Navbar from './components/Navbar';
import InteractiveBody from './components/InteractiveBody';
import ContactPage from './components/ContactPage';
import ProjectsPage from './components/ProjectsPage';

type Page = 'home' | 'contact' | 'projects';

/* ── Shared button styles ──────────────────────────────────────── */
const btnClass =
  'pointer-events-auto mt-2 inline-flex items-center gap-2.5 border border-[#00ffcc]/20 px-3 py-2 rounded-sm hover:border-[#00ffcc]/45 hover:bg-[#00ffcc]/5 transition-all group';
const btnText =
  'text-[10px] font-mono tracking-[0.2em] text-[#00ffcc]/50 group-hover:text-[#00ffcc]/80 transition-colors uppercase';
const btnIcon =
  'w-3.5 h-3.5 text-[#00ffcc]/50 group-hover:text-[#00ffcc]/80 transition-colors';

function ContactButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9 }}
      className={`${btnClass} mt-5`}
    >
      <svg viewBox="0 0 24 24" fill="none" className={btnIcon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
      <span className={btnText}>Contact me</span>
    </motion.button>
  );
}

function LinkedInButton() {
  return (
    <motion.a
      href="https://www.linkedin.com/in/vasco-moreno-13a6aa261/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.05 }}
      className={btnClass}
    >
      <svg viewBox="0 0 24 24" className={`${btnIcon} fill-current`}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      <span className={btnText}>LinkedIn</span>
    </motion.a>
  );
}

function DownloadCVButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      className={btnClass}
    >
      <svg viewBox="0 0 24 24" fill="none" className={btnIcon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v13M7 11l5 5 5-5" />
        <path d="M3 19h18" />
      </svg>
      <span className={btnText}>Download CV</span>
    </motion.button>
  );
}

function ProjectsButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.35 }}
      className={btnClass}
    >
      <svg viewBox="0 0 24 24" fill="none" className={btnIcon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
      <span className={btnText}>Projects</span>
    </motion.button>
  );
}

function FreelanceBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-5 inline-flex items-center gap-2.5 border border-[#00ffcc]/35 px-4 py-2 rounded-sm bg-[#00ffcc]/5"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffcc]" />
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-[#00ffcc]/80 uppercase">
        Open to freelance work
      </span>
    </motion.div>
  );
}

function CVModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,12,10,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative flex flex-col w-full max-w-3xl"
        style={{ height: 'min(88vh, 860px)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border border-b-0 border-[#00ffcc]/20 rounded-t-sm bg-[#020c0a]">
          <span className="font-mono text-[9px] tracking-[0.5em] text-[#00ffcc]/40 uppercase">Curriculum Vitae</span>
          <div className="flex items-center gap-3">
            <a
              href="/vasco-moreno-cv.pdf"
              download="vasco-moreno-cv.pdf"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-[#00ffcc]/60 border border-[#00ffcc]/25 px-3 py-1.5 rounded-sm hover:bg-[#00ffcc]/10 hover:text-[#00ffcc] transition-all uppercase"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v13M7 11l5 5 5-5" />
                <path d="M3 19h18" />
              </svg>
              Download
            </a>
            <button onClick={onClose} className="font-mono text-[#00ffcc]/35 hover:text-[#00ffcc]/80 transition-colors text-lg leading-none" aria-label="Close">×</button>
          </div>
        </div>
        <iframe src="/vasco-moreno-cv.pdf" className="flex-1 w-full border border-[#00ffcc]/20 rounded-b-sm" style={{ background: '#111' }} title="Vasco Moreno CV" />
      </motion.div>
    </motion.div>
  );
}

/* ── Button column used in both layouts ────────────────────────── */
function ButtonColumn({ onContact, onCvOpen, onProjects }: { onContact: () => void; onCvOpen: () => void; onProjects: () => void }) {
  return (
    <div className="flex flex-col items-start">
      <ProjectsButton  onClick={onProjects} />
      <div className="mb-4" />
      <ContactButton   onClick={onContact}  />
      <LinkedInButton />
      <DownloadCVButton onClick={onCvOpen}  />
    </div>
  );
}

export default function App() {
  const [page, setPage]              = useState<Page>('home');
  const [isMobile, setIsMobile]      = useState(false);
  const [modelRevealed, setRevealed] = useState(false);
  const [cvOpen, setCvOpen]          = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const nav = <Navbar currentPage={page} onNavigate={setPage} />;

  /* ── Non-home pages ── */
  if (page === 'contact') return (
    <div className="min-h-screen bg-dark flex flex-col">
      {nav}
      <ContactPage onBack={() => setPage('home')} />
    </div>
  );

  if (page === 'projects') return (
    <div className="min-h-screen bg-dark flex flex-col">
      {nav}
      <ProjectsPage onBack={() => setPage('home')} />
    </div>
  );

  /* ── Home page ── */
  return (
    <div className="h-screen overflow-hidden bg-dark flex flex-col">
      {nav}

      <div className="flex-1 relative min-h-0">

        {/* ── Desktop ── */}
        {!isMobile && (
          <>
            <div className="absolute inset-0">
              <InteractiveBody showHint />
            </div>

            <div className="absolute left-14 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <motion.p
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-primary text-[11px] tracking-[0.35em] mb-5 uppercase"
              >
                Hello, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl font-bold text-white mb-3 tracking-tight leading-tight"
              >
                Vasco{' '}
                <span className="text-primary glow glitch-text" data-text="Moreno">Moreno</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="text-lg text-gray-400 font-light h-7"
              >
                <TypeAnimation
                  sequence={['Software Engineer', 2000, 'Tech Enthusiast', 2000, 'Problem Solver', 2000, 'Developer', 2000]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>

              <FreelanceBadge />

              <ButtonColumn
                onContact={  () => setPage('contact')}
                onCvOpen={   () => setCvOpen(true)}
                onProjects={ () => setPage('projects')}
              />
            </div>
          </>
        )}

        {/* ── Mobile ── */}
        {isMobile && (
          <>
            <div className="absolute inset-0">
              <InteractiveBody showHint={false} />
            </div>

            <AnimatePresence>
              {!modelRevealed && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark px-10 text-center"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-mono text-primary text-[11px] tracking-[0.35em] mb-5 uppercase"
                  >
                    Hello, I'm
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="text-5xl font-bold text-white mb-3 tracking-tight leading-tight"
                  >
                    Vasco{' '}
                    <span className="text-primary glow glitch-text" data-text="Moreno">Moreno</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-lg text-gray-400 font-light h-7 mb-2"
                  >
                    <TypeAnimation
                      sequence={['Software Engineer', 2000, 'Tech Enthusiast', 2000, 'Problem Solver', 2000, 'Developer', 2000]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-3 mb-1 inline-flex items-center gap-2.5 border border-[#00ffcc]/35 px-4 py-2 rounded-sm bg-[#00ffcc]/5"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffcc]" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#00ffcc]/80 uppercase">
                      Open to freelance work
                    </span>
                  </motion.div>

                  <div className="flex flex-col items-center mt-1">
                    <ProjectsButton  onClick={() => setPage('projects')} />
                    <div className="mb-4" />
                    <ContactButton   onClick={() => setPage('contact')}  />
                    <LinkedInButton />
                    <DownloadCVButton onClick={() => setCvOpen(true)}    />
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    onClick={() => setRevealed(true)}
                    className="mt-10 flex flex-col items-center gap-2 group"
                  >
                    <span className="text-[11px] font-mono tracking-[0.3em] text-[#00ffcc]/50 uppercase group-hover:text-[#00ffcc] transition-colors">
                      Tap to explore
                    </span>
                    <motion.span
                      animate={{ scale: [1, 1.22, 1] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                      className="text-[#00ffcc]/40 group-hover:text-[#00ffcc] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3" />
                        <circle cx="12" cy="12" r="6.5" strokeOpacity="0.5" />
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      </svg>
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {modelRevealed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setRevealed(false)}
                  className="fixed bottom-6 left-5 z-40 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#00ffcc]/60 border border-[#00ffcc]/25 px-3 py-2 rounded-sm bg-[#020c0a]/80 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-all uppercase"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M5 12l7 7M5 12l7-7" />
                  </svg>
                  Back
                </motion.button>
              )}
            </AnimatePresence>
          </>
        )}

      </div>

      <AnimatePresence>
        {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
