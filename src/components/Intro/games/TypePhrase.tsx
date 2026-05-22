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
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  function handleChange(val: string) {
    setInput(val);
    if (val.toUpperCase().trim() === phrase) {
      setTimeout(onSolve, 150);
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

      <input
        ref={ref}
        value={input}
        onChange={e => handleChange(e.target.value)}
        className="w-full font-mono text-center text-lg bg-transparent border-b-2 outline-none pb-2 uppercase tracking-[0.2em] text-transparent caret-[#00ffcc]"
        style={{ borderColor: '#00ffcc44' }}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
