import { useEffect, useRef, useState } from 'react';

const PHRASES = [
  'HELLO WORLD',
  'SHIP IT',
  'ACCESS GRANTED',
  'I LOVE CODE',
  'DEPLOY NOW',
];

export default function TypePhrase({ onSolve }: { onSolve: () => void }) {
  const [phrase] = useState(() => PHRASES[Math.floor(Math.random() * PHRASES.length)]);
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (input.toUpperCase().trim() === phrase) {
      onSolve();
    } else {
      setShake(true);
      setTimeout(() => { setShake(false); setInput(''); ref.current?.focus(); }, 600);
    }
  }

  const typed = input.toUpperCase();

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="font-mono text-2xl tracking-[0.15em] border border-[#00ffcc]/25 px-8 py-4 rounded-lg bg-[#00ffcc]/5 text-white">
        {phrase}
      </div>

      {/* Typed preview with per-character coloring */}
      <div className="font-mono text-xl tracking-[0.2em] h-8 flex items-center gap-0">
        {phrase.split('').map((ch, i) => {
          const typedCh = typed[i];
          const color = typedCh === undefined ? '#00ffcc18' : typedCh === ch ? '#00ffcc' : '#ff4444';
          return <span key={i} style={{ color }}>{ch === ' ' ? ' ' : ch}</span>;
        })}
      </div>

      <form onSubmit={submit} className="w-full flex flex-col items-center gap-4">
        <input
          ref={ref}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full font-mono text-center text-lg bg-transparent border-b-2 outline-none pb-2 uppercase tracking-[0.2em] text-transparent caret-[#00ffcc]"
          style={{
            borderColor: shake ? '#ff4444' : '#00ffcc44',
            transform: shake ? 'translateX(-4px)' : 'none',
            transition: 'border-color 0.2s, transform 0.1s',
          }}
          spellCheck={false}
          autoComplete="off"
        />
        <button type="submit"
          className="font-mono text-xs tracking-[0.3em] text-[#00ffcc]/60 border border-[#00ffcc]/30 px-6 py-2 hover:bg-[#00ffcc]/10 transition-all uppercase">
          Unlock →
        </button>
      </form>
    </div>
  );
}
