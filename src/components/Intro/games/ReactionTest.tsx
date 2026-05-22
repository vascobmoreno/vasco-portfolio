import { useEffect, useRef, useState } from 'react';

type Phase = 'start' | 'wait' | 'now' | 'result';

export default function ReactionTest({ onSolve }: { onSolve: () => void }) {
  const [phase, setPhase] = useState<Phase>('start');
  const [ms, setMs] = useState(0);
  const [tooEarly, setTooEarly] = useState(false);
  const t0 = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function beginRound() {
    setTooEarly(false);
    setPhase('wait');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPhase('now');
      t0.current = Date.now();
    }, 1200 + Math.random() * 2200);
  }

  function tap() {
    if (phase === 'start') {
      beginRound();
    } else if (phase === 'wait') {
      clearTimeout(timer.current);
      setTooEarly(true);
      setPhase('result');
      setTimeout(beginRound, 1000);
    } else if (phase === 'now') {
      const elapsed = Date.now() - t0.current;
      setMs(elapsed);
      setPhase('result');
      setTimeout(onSolve, 1100);
    }
  }

  const bg = phase === 'now' ? '#003a22' : tooEarly && phase === 'result' ? '#2a0000' : '#020c0a';

  return (
    <div
      onClick={tap}
      className="flex flex-col items-center justify-center gap-5 h-64 rounded-xl border border-[#00ffcc]/15 cursor-pointer select-none transition-colors duration-200 w-full"
      style={{ background: bg }}
    >
      {phase === 'start' && (
        <>
          <p className="font-mono text-lg text-white">Tap when the screen turns teal</p>
          <p className="font-mono text-[10px] tracking-[0.4em] text-[#00ffcc]/30 uppercase">Tap anywhere to begin</p>
        </>
      )}
      {phase === 'wait' && <p className="font-mono text-2xl text-[#00ffcc]/30 tracking-widest">Wait...</p>}
      {phase === 'now'  && <p className="font-mono text-5xl text-[#00ffcc] tracking-widest glow">NOW!</p>}
      {phase === 'result' && (
        <p className="font-mono text-3xl" style={{ color: tooEarly ? '#ff4444' : '#00ffcc' }}>
          {tooEarly ? 'Too early!' : `${ms} ms`}
        </p>
      )}
    </div>
  );
}
