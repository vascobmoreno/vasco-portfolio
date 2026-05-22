import { useState } from 'react';

const POOL = [
  { q: 'JavaScript is single-threaded',             a: true  },
  { q: 'Python uses curly braces for code blocks',  a: false },
  { q: 'git pull = git fetch + git merge',          a: true  },
  { q: 'CSS stands for Computer Style Sheets',      a: false },
  { q: 'null == undefined in JavaScript',           a: true  },
  { q: 'React was created by Google',               a: false },
  { q: 'SSH uses port 22 by default',               a: true  },
  { q: 'HTTP is stateless',                         a: true  },
  { q: 'Docker containers share the host OS kernel',a: true  },
  { q: 'typeof null === "object" in JavaScript',    a: true  },
  { q: 'Python is a compiled language',             a: false },
  { q: 'Arrays in JS are objects',                  a: true  },
];

export default function TrueOrFalse({ onSolve }: { onSolve: () => void }) {
  const [questions] = useState(() => [...POOL].sort(() => Math.random() - 0.5).slice(0, 3));
  const [cur, setCur] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  function answer(val: boolean) {
    if (feedback) return;
    if (val === questions[cur].a) {
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        if (cur === 2) onSolve();
        else setCur(c => c + 1);
      }, 700);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 700);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i < cur ? '#00ffcc' : i === cur ? '#00ffcc88' : '#00ffcc22' }} />
        ))}
      </div>

      <div className="font-mono text-lg text-white text-center leading-relaxed min-h-16 flex items-center px-2">
        {questions[cur].q}
      </div>

      <div className="font-mono text-xs h-5" style={{ color: feedback === 'correct' ? '#00ffcc' : '#ff4444' }}>
        {feedback === 'correct' ? '✓ Correct!' : feedback === 'wrong' ? '✗ Wrong' : ''}
      </div>

      <div className="flex gap-4">
        <button onClick={() => answer(true)}
          className="w-32 py-3 font-mono text-sm tracking-widest border-2 rounded-lg transition-all hover:scale-105 uppercase"
          style={{
            borderColor: feedback === 'correct' && questions[cur].a  ? '#00ffcc' : '#00ffcc44',
            color: '#00ffcc',
            background: feedback === 'correct' && questions[cur].a ? '#00ffcc18' : 'transparent',
          }}>
          True
        </button>
        <button onClick={() => answer(false)}
          className="w-32 py-3 font-mono text-sm tracking-widest border-2 rounded-lg transition-all hover:scale-105 uppercase"
          style={{
            borderColor: feedback === 'correct' && !questions[cur].a ? '#00ffcc' : '#ff444444',
            color: '#ff6666',
            background: feedback === 'correct' && !questions[cur].a ? '#00ffcc18' : 'transparent',
          }}>
          False
        </button>
      </div>
    </div>
  );
}
