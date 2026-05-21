import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChessScene, { type Keys } from './ChessScene';

/* ── Mobile D-pad ───────────────────────────────────────────────────── */
function DPad({ keysRef }: { keysRef: React.MutableRefObject<Keys> }) {
  const Btn = ({ dir, label }: { dir: keyof Keys; label: string }) => (
    <button
      onPointerDown={() => { keysRef.current[dir] = true; }}
      onPointerUp={() => { keysRef.current[dir] = false; }}
      onPointerLeave={() => { keysRef.current[dir] = false; }}
      className="w-14 h-14 flex items-center justify-center border border-[#00ffcc]/30 rounded bg-[#00ffcc]/5 text-[#00ffcc]/60 font-mono text-xl active:bg-[#00ffcc]/15 active:text-[#00ffcc] transition-all select-none touch-none"
    >
      {label}
    </button>
  );
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2 z-20">
      <div /><Btn dir="up" label="↑" /><div />
      <Btn dir="left" label="←" /><div /><Btn dir="right" label="→" />
      <div /><Btn dir="down" label="↓" /><div />
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function ChessIntro({ onUnlock }: { onUnlock: () => void }) {
  const [won, setWon]           = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const keysRef = useRef<Keys>({ up: false, down: false, left: false, right: false });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const MAP: Record<string, keyof Keys> = {
      ArrowUp: 'up',   w: 'up',   W: 'up',
      ArrowDown: 'down', s: 'down', S: 'down',
      ArrowLeft: 'left', a: 'left', A: 'left',
      ArrowRight: 'right', d: 'right', D: 'right',
    };
    const down = (e: KeyboardEvent) => { const k = MAP[e.key]; if (k) { e.preventDefault(); keysRef.current[k] = true; } };
    const up   = (e: KeyboardEvent) => { const k = MAP[e.key]; if (k) keysRef.current[k] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  // Unlock after win animation
  useEffect(() => {
    if (!won) return;
    const t = setTimeout(onUnlock, 2800);
    return () => clearTimeout(t);
  }, [won, onUnlock]);

  return (
    <motion.div
      className="h-screen bg-dark relative overflow-hidden"
      animate={won ? { opacity: 0 } : { opacity: 1 }}
      transition={won ? { duration: 0.9, delay: 1.9 } : {}}
    >
      <ChessScene keysRef={keysRef} onWin={() => setWon(true)} />

      {/* Instructions */}
      <AnimatePresence>
        {!won && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10"
          >
            <p className="font-mono text-[10px] tracking-[0.5em] text-[#00ffcc]/40 uppercase">
              Slide the king to enter
            </p>
            {!isMobile && (
              <div className="flex gap-1.5">
                {['W', 'A', 'S', 'D'].map(k => (
                  <div key={k} className="w-6 h-6 flex items-center justify-center border border-[#00ffcc]/20 rounded-sm font-mono text-[10px] text-[#00ffcc]/35 bg-[#00ffcc]/5">
                    {k}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      {!won && (
        <button
          onClick={onUnlock}
          className="absolute bottom-6 right-8 font-mono text-[10px] tracking-[0.3em] text-[#00ffcc]/25 hover:text-[#00ffcc]/60 transition-colors uppercase z-10"
        >
          Skip →
        </button>
      )}

      {/* Win overlay */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="font-mono text-[10px] tracking-[0.6em] text-[#00ffcc]/50 uppercase">
                Identity verified
              </p>
              <h1 className="font-mono text-4xl md:text-5xl font-bold text-white tracking-[0.15em] glow">
                ACCESS GRANTED
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 260 }}
                transition={{ delay: 0.5, duration: 1.4, ease: 'easeOut' }}
                className="h-px bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && !won && <DPad keysRef={keysRef} />}
    </motion.div>
  );
}
