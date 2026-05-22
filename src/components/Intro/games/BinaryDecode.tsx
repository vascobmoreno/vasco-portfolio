import { useEffect, useRef, useState } from 'react';

function makeRound() {
  const n = Math.floor(Math.random() * 15) + 1;
  return { bits: n.toString(2).padStart(4, '0'), ans: n };
}

export default function BinaryDecode({ onSolve }: { onSolve: () => void }) {
  const [rounds] = useState(() => [makeRound(), makeRound(), makeRound()]);
  const [cur, setCur] = useState(0);
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, [cur]);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (parseInt(input) === rounds[cur].ans) {
      if (cur === 2) { onSolve(); return; }
      setCur(c => c + 1);
      setInput('');
    } else {
      setShake(true);
      setTimeout(() => { setShake(false); setInput(''); ref.current?.focus(); }, 600);
    }
  }

  const { bits } = rounds[cur];

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex gap-2">
        {rounds.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i < cur ? '#00ffcc' : i === cur ? '#00ffcc88' : '#00ffcc22' }} />
        ))}
      </div>

      <p className="font-mono text-xs text-[#00ffcc]/30">Convert binary → decimal</p>

      {/* bit display with position weights */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3">
          {['8', '4', '2', '1'].map(w => (
            <span key={w} className="w-14 text-center font-mono text-[10px] text-[#00ffcc]/25">{w}</span>
          ))}
        </div>
        <div className="flex gap-3">
          {bits.split('').map((b, i) => (
            <div key={i}
              className="w-14 h-14 flex items-center justify-center font-mono text-3xl rounded-lg border-2 transition-all"
              style={{
                borderColor: b === '1' ? '#00ffcc88' : '#00ffcc22',
                background:  b === '1' ? '#00ffcc18' : 'transparent',
                color:       b === '1' ? '#00ffcc'   : '#00ffcc30',
              }}>
              {b}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col items-center gap-4">
        <input
          ref={ref}
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-32 font-mono text-center text-2xl bg-transparent border-b-2 outline-none pb-2 text-[#00ffcc] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ borderColor: shake ? '#ff4444' : '#00ffcc55', transform: shake ? 'translateX(-3px)' : 'none' }}
          placeholder="0"
        />
        <button type="submit"
          className="font-mono text-xs tracking-[0.3em] text-[#00ffcc]/60 border border-[#00ffcc]/30 px-6 py-2 hover:bg-[#00ffcc]/10 transition-all uppercase">
          Decode
        </button>
      </form>
    </div>
  );
}
