import { useEffect, useRef, useState } from 'react';

const PALETTE = [
  { id: 'teal',   hex: '#00ffcc', bg: '#00ffcc15' },
  { id: 'blue',   hex: '#00aaff', bg: '#00aaff15' },
  { id: 'yellow', hex: '#ffcc00', bg: '#ffcc0015' },
  { id: 'pink',   hex: '#ff66cc', bg: '#ff66cc15' },
  { id: 'orange', hex: '#ff8844', bg: '#ff884415' },
  { id: 'lime',   hex: '#aaff44', bg: '#aaff4415' },
];

function shuffle<T>(a: T[]) { return [...a].sort(() => Math.random() - 0.5); }

export default function ColorFlash({ onSolve }: { onSolve: () => void }) {
  const [[sequence, scrambled]] = useState<[typeof PALETTE, typeof PALETTE]>(() => {
    const seq = shuffle(PALETTE).slice(0, 4);
    return [seq, shuffle(seq)];
  });

  const [phase, setPhase]   = useState<'show' | 'play' | 'wrong'>('show');
  const [clicks, setClicks] = useState<string[]>([]);
  const locked = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase('play'), 2800);
    return () => clearTimeout(t);
  }, []);

  function pick(id: string) {
    if (locked.current || phase !== 'play') return;
    const next = clicks.length;
    if (id !== sequence[next].id) {
      locked.current = true;
      setPhase('wrong');
      setTimeout(() => {
        locked.current = false;
        setClicks([]);
        setPhase('play');
      }, 950);
      return;
    }
    const updated = [...clicks, id];
    setClicks(updated);
    if (updated.length === sequence.length) onSolve();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-xs text-[#00ffcc]/40 h-5">
        {phase === 'show'  && 'Memorize the order...'}
        {phase === 'play'  && `Repeat in order — ${clicks.length} / 4`}
        {phase === 'wrong' && '✗ Wrong — try again'}
      </p>

      {phase === 'show' ? (
        <div className="flex gap-4 items-end">
          {sequence.map((c, i) => (
            <div key={c.id} className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-white/40">{i + 1}</span>
              <div className="w-16 h-16 rounded-xl transition-all"
                style={{ background: c.bg, border: `2px solid ${c.hex}`, boxShadow: `0 0 18px ${c.hex}55` }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4">
          {scrambled.map(c => {
            const done = clicks.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => pick(c.id)}
                className="w-16 h-16 rounded-xl border-2 transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  background:    done ? `${c.hex}35` : c.bg,
                  borderColor:   done ? c.hex : `${c.hex}55`,
                  boxShadow:     done ? `0 0 16px ${c.hex}66` : 'none',
                  opacity:       phase === 'wrong' ? 0.4 : 1,
                  pointerEvents: phase === 'wrong' ? 'none' : 'auto',
                  cursor:        'pointer',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
