import { useEffect, useRef, useState } from 'react';

const WORDS = [
  { word: 'PYTHON',   scrambled: 'HNOPYT',  hint: 'a language'     },
  { word: 'REACT',    scrambled: 'CEART',   hint: 'a JS framework'  },
  { word: 'DEBUG',    scrambled: 'BGUED',   hint: 'fix errors'      },
  { word: 'ARRAY',    scrambled: 'YAARR',   hint: 'a data structure'},
  { word: 'STACK',    scrambled: 'KCATS',   hint: 'LIFO structure'  },
  { word: 'CLONE',    scrambled: 'ELNOC',   hint: 'git command'     },
  { word: 'TOKEN',    scrambled: 'NETOK',   hint: 'auth concept'    },
  { word: 'MERGE',    scrambled: 'RGEEM',   hint: 'git command'     },
  { word: 'DOCKER',   scrambled: 'ROCKDE',  hint: 'containers'      },
  { word: 'BRANCH',   scrambled: 'CHNRAB',  hint: 'git concept'     },
];

export default function AnagramSolve({ onSolve }: { onSolve: () => void }) {
  const [{ word, scrambled, hint }] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [input, setInput] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  function handleChange(val: string) {
    const next = val.slice(0, word.length);
    setInput(next);
    if (next.toUpperCase() === word) {
      setTimeout(onSolve, 150);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="font-mono text-xs text-[#00ffcc]/30">Unscramble the tech word</p>

      <div className="flex gap-2.5 flex-wrap justify-center">
        {scrambled.split('').map((ch, i) => (
          <div key={i}
            className="w-11 h-11 flex items-center justify-center font-mono text-xl text-white border border-[#00ffcc]/30 rounded-lg bg-[#00ffcc]/5">
            {ch}
          </div>
        ))}
      </div>

      <p className="font-mono text-[10px] text-[#00ffcc]/25 tracking-widest italic">{hint}</p>

      <input
        ref={ref}
        value={input}
        onChange={e => handleChange(e.target.value)}
        className="w-full font-mono text-center text-xl bg-transparent border-b-2 outline-none pb-2 uppercase tracking-[0.2em]"
        style={{ borderColor: '#00ffcc44', color: '#00ffcc' }}
        spellCheck={false}
        autoComplete="off"
        maxLength={word.length}
      />
    </div>
  );
}
