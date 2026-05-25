import { type ComponentType, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimonSays      from './games/SimonSays';
import ReactionTest   from './games/ReactionTest';
import TypePhrase     from './games/TypePhrase';
import QuickMath      from './games/QuickMath';
import NumberSequence from './games/NumberSequence';
import MiniMaze       from './games/MiniMaze';
import AnagramSolve   from './games/AnagramSolve';

type GameProps = { onSolve: () => void };

const GAMES: { Component: ComponentType<GameProps>; name: string }[] = [
  { Component: SimonSays,      name: 'Simon Says'      },
  { Component: ReactionTest,   name: 'Reaction Test'   },
  { Component: TypePhrase,     name: 'Type to Unlock'  },
  { Component: QuickMath,      name: 'Quick Math'      },
  { Component: NumberSequence, name: 'Number Sequence' },
  { Component: MiniMaze,       name: 'Mini Maze'       },
  { Component: AnagramSolve,   name: 'Anagram'         },
];

export default function Intro({ onUnlock }: { onUnlock: () => void }) {
  const [idx]  = useState(() => Math.floor(Math.random() * GAMES.length));
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!won) return;
    const t = setTimeout(onUnlock, 2800);
    return () => clearTimeout(t);
  }, [won, onUnlock]);

  const { Component: Game, name } = GAMES[idx];

  return (
    <motion.div
      className="h-screen bg-[#020c0a] relative overflow-hidden flex flex-col items-center justify-center"
      animate={won ? { opacity: 0 } : { opacity: 1 }}
      transition={won ? { duration: 0.9, delay: 1.9 } : {}}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(0,255,204,0.035) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(0,255,204,0.035) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <AnimatePresence>
        {!won && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center gap-8"
          >
            <div className="flex flex-col items-center gap-1">
              <p className="font-mono text-[9px] tracking-[0.6em] text-[#00ffcc]/25 uppercase">
                Mini challenge
              </p>
              <h2 className="font-mono text-base tracking-[0.25em] text-[#00ffcc]/60 uppercase">
                {name}
              </h2>
            </div>

            <Game onSolve={() => setWon(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip */}
      {!won && (
        <button
          onClick={onUnlock}
          className="absolute bottom-6 right-8 font-mono text-[10px] tracking-[0.3em] text-[#00ffcc]/20 hover:text-[#00ffcc]/50 transition-colors uppercase z-10"
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
              className="flex flex-col items-center gap-4 w-full px-4 text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.6em] text-[#00ffcc]/50 uppercase">
                Identity verified
              </p>
              <h1 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-[0.1em] md:tracking-[0.15em] glow">
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
