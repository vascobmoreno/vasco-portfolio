import { useEffect, useState } from 'react';

type Pos = [number, number];

// 0 = open, 1 = wall. Start=[0,0], End=[4,4]. All verified solvable.
const MAZES = [
  [[0,0,1,0,0],[1,0,1,0,1],[0,0,0,0,0],[0,1,0,1,0],[0,0,0,0,0]],
  [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0],[1,1,0,0,0],[0,0,1,0,0]],
  [[0,0,0,1,0],[1,1,0,1,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0]],
  [[0,0,1,0,0],[1,0,0,0,1],[0,1,1,0,0],[0,0,1,0,1],[1,0,0,0,0]],
];

export default function MiniMaze({ onSolve }: { onSolve: () => void }) {
  const [maze] = useState(() => MAZES[Math.floor(Math.random() * MAZES.length)]);
  const [pos, setPos] = useState<Pos>([0, 0]);

  function move(nr: number, nc: number) {
    if (nr < 0 || nr > 4 || nc < 0 || nc > 4 || maze[nr][nc] === 1) return;
    setPos([nr, nc]);
    if (nr === 4 && nc === 4) setTimeout(onSolve, 500);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const DIRS: Record<string, [number, number]> = {
        ArrowUp: [-1,0], w: [-1,0], W: [-1,0],
        ArrowDown: [1,0], s: [1,0], S: [1,0],
        ArrowLeft: [0,-1], a: [0,-1], A: [0,-1],
        ArrowRight: [0,1], d: [0,1], D: [0,1],
      };
      const d = DIRS[e.key];
      if (!d) return;
      e.preventDefault();
      setPos(prev => {
        const [r, c] = prev;
        const nr = r + d[0], nc = c + d[1];
        if (nr < 0 || nr > 4 || nc < 0 || nc > 4 || maze[nr][nc] === 1) return prev;
        if (nr === 4 && nc === 4) setTimeout(onSolve, 500);
        return [nr, nc];
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [maze, onSolve]);

  const [pr, pc] = pos;

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="font-mono text-xs text-[#00ffcc]/30">Navigate to the exit</p>

      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {maze.map((row, r) => row.map((cell, c) => {
          const isPlayer = pr === r && pc === c;
          const isGoal   = r === 4 && c === 4;
          const isAdj    = !cell && !isPlayer && (Math.abs(pr - r) + Math.abs(pc - c) === 1);
          return (
            <div
              key={`${r}-${c}`}
              onClick={() => isAdj && move(r, c)}
              className="w-11 h-11 flex items-center justify-center rounded transition-all duration-100"
              style={{
                background: cell    ? '#001208'    :
                            isPlayer? '#00ffcc25'  :
                            isGoal  ? '#00441a'    : '#010f08',
                border:     cell    ? '1px solid #000a06' :
                            isPlayer? '1px solid #00ffcc88' :
                            isGoal  ? '1px solid #00ffcc44' :
                            isAdj   ? '1px solid #00ffcc33' : '1px solid #00ffcc0a',
                cursor:    isAdj   ? 'pointer' : 'default',
                boxShadow: isPlayer ? '0 0 14px #00ffcc44' : 'none',
              }}
            >
              {isPlayer && <div className="w-3.5 h-3.5 rounded-full bg-[#00ffcc] shadow-[0_0_8px_#00ffcc]" />}
              {isGoal && !isPlayer && <span className="font-mono text-[9px] text-[#00ffcc]/50 tracking-tighter">EXIT</span>}
            </div>
          );
        }))}
      </div>

      <p className="font-mono text-[9px] text-[#00ffcc]/20 tracking-widest">WASD · arrows · or tap adjacent cells</p>
    </div>
  );
}
