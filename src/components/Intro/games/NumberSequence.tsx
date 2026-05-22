import { useEffect, useRef, useState } from 'react';

const SEQS = [
  { seq: [1, 1, 2, 3, 5, 8],     ans: 13, hint: 'Fibonacci'         },
  { seq: [2, 4, 8, 16, 32],       ans: 64, hint: 'Powers of 2'       },
  { seq: [1, 4, 9, 16, 25],       ans: 36, hint: 'Perfect squares'   },
  { seq: [3, 6, 12, 24, 48],      ans: 96, hint: 'Double each time'  },
  { seq: [1, 3, 6, 10, 15],       ans: 21, hint: 'Triangular numbers'},
  { seq: [5, 10, 20, 40, 80],    ans: 160, hint: 'Double each time'  },
  { seq: [100, 81, 64, 49, 36],   ans: 25, hint: 'Descending squares'},
];

export default function NumberSequence({ onSolve }: { onSolve: () => void }) {
  const [{ seq, ans, hint }] = useState(() => SEQS[Math.floor(Math.random() * SEQS.length)]);
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (parseInt(input) === ans) {
      onSolve();
    } else {
      setShake(true);
      setTimeout(() => { setShake(false); setInput(''); ref.current?.focus(); }, 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="font-mono text-xs text-[#00ffcc]/30">What comes next?</p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        {seq.map((n, i) => (
          <span key={i} className="font-mono text-2xl text-white">{n}</span>
        ))}
        <span className="font-mono text-2xl text-[#00ffcc]/30">,</span>
        <span className="font-mono text-2xl text-[#00ffcc] animate-pulse">?</span>
      </div>

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

      <p className="font-mono text-[9px] text-[#00ffcc]/20 tracking-widest uppercase">{hint}</p>
    </div>
  );
}
