import { useEffect, useRef, useState } from 'react';

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function makeQ() {
  const op = ['+', '-', '×'][Math.floor(Math.random() * 3)] as '+' | '-' | '×';
  if (op === '+') { const a = rand(10, 50), b = rand(10, 50); return { q: `${a} + ${b}`, ans: a + b }; }
  if (op === '-') { const a = rand(20, 60), b = rand(1, 20);  return { q: `${a} - ${b}`, ans: a - b }; }
  const a = rand(2, 12), b = rand(2, 12);
  return { q: `${a} × ${b}`, ans: a * b };
}

export default function QuickMath({ onSolve }: { onSolve: () => void }) {
  const [qs] = useState(() => [makeQ(), makeQ(), makeQ()]);
  const [cur, setCur] = useState(0);
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, [cur]);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (parseInt(input) === qs[cur].ans) {
      if (cur === 2) { onSolve(); return; }
      setCur(c => c + 1);
      setInput('');
    } else {
      setShake(true);
      setTimeout(() => { setShake(false); setInput(''); ref.current?.focus(); }, 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex gap-2">
        {qs.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i < cur ? '#00ffcc' : i === cur ? '#00ffcc88' : '#00ffcc22' }} />
        ))}
      </div>

      <div className="font-mono text-4xl text-white tracking-wider">{qs[cur].q}</div>

      <form onSubmit={submit} className="flex flex-col items-center gap-4">
        <input
          ref={ref}
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-36 font-mono text-center text-2xl bg-transparent border-b-2 outline-none pb-2 text-[#00ffcc] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ borderColor: shake ? '#ff4444' : '#00ffcc55', transform: shake ? 'translateX(-3px)' : 'none' }}
          placeholder="?"
        />
        <button type="submit"
          className="font-mono text-xs tracking-[0.3em] text-[#00ffcc]/60 border border-[#00ffcc]/30 px-6 py-2 hover:bg-[#00ffcc]/10 transition-all uppercase">
          Submit
        </button>
      </form>
    </div>
  );
}
