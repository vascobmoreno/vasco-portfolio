import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Navbar from './components/Navbar';
import InteractiveBody from './components/InteractiveBody';
import Intro from './components/Intro';

function LinkedInButton() {
  return (
    <motion.a
      href="https://www.linkedin.com/in/vasco-moreno-13a6aa261/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9 }}
      className="pointer-events-auto mt-7 inline-flex items-center gap-2.5 border border-[#00ffcc]/20 px-3 py-2 rounded-sm hover:border-[#00ffcc]/45 hover:bg-[#00ffcc]/5 transition-all group"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#00ffcc]/50 group-hover:text-[#00ffcc]/80 transition-colors">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      <span className="text-[10px] font-mono tracking-[0.2em] text-[#00ffcc]/50 group-hover:text-[#00ffcc]/80 transition-colors uppercase">LinkedIn</span>
    </motion.a>
  );
}

function ContactButton() {
  return (
    <motion.a
      href="mailto:vascobmoreno@gmail.com"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.05 }}
      className="pointer-events-auto mt-2 inline-flex items-center gap-2.5 border border-[#00ffcc]/20 px-3 py-2 rounded-sm hover:border-[#00ffcc]/45 hover:bg-[#00ffcc]/5 transition-all group"
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-[#00ffcc]/50 group-hover:text-[#00ffcc]/80 transition-colors" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
      <span className="text-[10px] font-mono tracking-[0.2em] text-[#00ffcc]/50 group-hover:text-[#00ffcc]/80 transition-colors uppercase">Contact me</span>
    </motion.a>
  );
}

export default function App() {
  const [unlocked, setUnlocked]      = useState(false);
  const [isMobile, setIsMobile]      = useState(false);
  const [modelRevealed, setRevealed] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!unlocked) return <Intro onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="h-screen overflow-hidden bg-dark flex flex-col">
      <Navbar />

      <div className="flex-1 relative min-h-0">

        {/* ── Desktop layout ── */}
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
                <span className="text-primary glow">Moreno</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="text-lg text-gray-400 font-light h-7"
              >
                <TypeAnimation
                  sequence={[
                    'Software Engineer', 2000,
                    'Tech Enthusiast',   2000,
                    'Problem Solver',    2000,
                    'Developer',         2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>

              <div className="flex flex-col items-start">
                <LinkedInButton />
                <ContactButton />
              </div>
            </div>
          </>
        )}

        {/* ── Mobile layout ── */}
        {isMobile && (
          <>
            {/* Model — always mounted so it loads in background */}
            <div className="absolute inset-0">
              <InteractiveBody showHint={false} showLabels={false} />
            </div>

            {/* Intro overlay */}
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
                    <span className="text-primary glow">Moreno</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-lg text-gray-400 font-light h-7 mb-2"
                  >
                    <TypeAnimation
                      sequence={[
                        'Software Engineer', 2000,
                        'Tech Enthusiast',   2000,
                        'Problem Solver',    2000,
                        'Developer',         2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </motion.div>

                  <LinkedInButton />
                  <ContactButton />

                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    onClick={() => setRevealed(true)}
                    className="mt-14 flex flex-col items-center gap-2 group"
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
          </>
        )}

      </div>
    </div>
  );
}
