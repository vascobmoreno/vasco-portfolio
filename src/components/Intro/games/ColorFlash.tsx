import { useEffect, useState } from 'react';

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
  const [sequence]  = useState(() => shuffle(PALETTE).slice(0, 4));
  const [scrambled] = useState(() => { const s = shuffle(sequence); return s; });
  const [phase, setPhase] = useState<'show' | 'play' | 'wrong'>('show');
  const [clicks, setClicks] = useState<string[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setPhase('play'), 2600);
    return () => clearTimeout(t);
  }, []);

  function pick(id: string) {
    if (phase === 'wrong') return;
    const next = clicks.length;
    if (id !== sequence[next].id) {
      setPhase('wrong');
      setTimeout(() => { setClicks([]); setPhase('play'); }, 900);
      return;
    }
    const updated = [...clicks, id];
    setClicks(updated);
    if (updated.length === sequence.length) onSolve();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-xs text-[#00ffcc]/40 h-5">
        {phase === 'show'  ? 'Memorize the order...'                           : ''}
        {phase === 'play'  ? `Click in the same order — ${clicks.length} / 4` : ''}
        {phase === 'wrong' ? '✗ Wrong order!'                                  : ''}
      </p>

      {phase === 'show' ? (
        <div className="flex gap-4 items-end">
          {sequence.map((c, i) => (
            <div key={c.id} className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-white/30">{i + 1}</span>
              <div className="w-16 h-16 rounded-xl"
                style={{ background: c.bg, border: `2px solid ${c.hex}`, boxShadow: `0 0 16px ${c.hex}44` }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4">
          {scrambled.map(c => {
            const clicked = clicks.includes(c.id);
            return (
              <button key={c.id} onClick={() => pick(c.id)} disabled={clicked}
                className="w-16 h-16 rounded-xl border-2 transition-all duration-150 hover:scale-105 disabled:opacity-30"
                style={{
                  background:  clicked ? `${c.hex}30` : c.bg,
                  borderColor: clicked ? c.hex         : `${c.hex}55`,
                  boxShadow:   clicked ? `0 0 14px ${c.hex}55` : 'none',
                }} />
            );
          })}
        </div>
      )}

      {phase === 'show' && (
        <p className="font-mono text-[9px] text-[#00ffcc]/20 tracking-widest animate-pulse">
          Memorizing in {2.6}s...
        </p>
      )}
    </div>
  );
}
