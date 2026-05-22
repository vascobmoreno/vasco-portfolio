import { useState } from 'react';

const PADS = [
  { id: 0, color: '#00ffcc', bg: '#00ffcc18' },
  { id: 1, color: '#00aaff', bg: '#00aaff18' },
  { id: 2, color: '#ffcc00', bg: '#ffcc0018' },
  { id: 3, color: '#ff66cc', bg: '#ff66cc18' },
];

const SEQ_LEN = 4;

export default function SimonSays({ onSolve }: { onSolve: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<'idle' | 'watch' | 'play' | 'fail'>('idle');

  function playSequence(seq: number[]) {
    setPhase('watch');
    setPlayerSeq([]);
    let delay = 400;
    for (const id of seq) {
      setTimeout(() => setActive(id), delay);
      delay += 600;
      setTimeout(() => setActive(null), delay);
      delay += 300;
    }
    setTimeout(() => setPhase('play'), delay + 100);
  }

  function start() {
    const seq = Array.from({ length: SEQ_LEN }, () => Math.floor(Math.random() * 4));
    setSequence(seq);
    playSequence(seq);
  }

  function tap(id: number) {
    if (phase !== 'play') return;
    const next = playerSeq.length;
    if (id !== sequence[next]) {
      setPhase('fail');
      setTimeout(() => playSequence(sequence), 900);
      return;
    }
    const updated = [...playerSeq, id];
    setPlayerSeq(updated);
    if (updated.length === sequence.length) onSolve();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-xs text-[#00ffcc]/40 h-5">
        {phase === 'idle'  ? 'Memorize and repeat the sequence'  : ''}
        {phase === 'watch' ? 'Watch carefully...'                : ''}
        {phase === 'play'  ? `Your turn — ${playerSeq.length} / ${SEQ_LEN}` : ''}
        {phase === 'fail'  ? '✗ Wrong — replaying'              : ''}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {PADS.map(p => (
          <button
            key={p.id}
            onClick={() => tap(p.id)}
            disabled={phase !== 'play'}
            className="w-28 h-28 rounded-xl border-2 transition-all duration-100"
            style={{
              borderColor: active === p.id ? p.color : `${p.color}33`,
              background:  active === p.id ? `${p.color}40` : p.bg,
              boxShadow:   active === p.id ? `0 0 28px ${p.color}88` : 'none',
              transform:   active === p.id ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {phase === 'idle' && (
        <button onClick={start}
          className="font-mono text-xs tracking-[0.3em] text-[#00ffcc]/60 border border-[#00ffcc]/30 px-6 py-2 hover:bg-[#00ffcc]/10 transition-all uppercase">
          Start
        </button>
      )}
    </div>
  );
}
