import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChessScene from './ChessScene';

export default function ChessIntro({ onUnlock }: { onUnlock: () => void }) {
  const [won, setWon] = useState(false);

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
      <ChessScene onWin={() => setWon(true)} />

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
              Click the board to move the king
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#ff4422]/40 uppercase">
              Capture the enemy king to enter
            </p>
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
    </motion.div>
  );
}
