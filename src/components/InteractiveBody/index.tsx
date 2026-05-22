import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HumanScene from './HumanScene';
import HoloPanel from './HoloPanel';
import type { Zone } from './BodyModel';

type Anchor = { x: number; y: number };

function ConnectingLine({ anchor, sectionW, sectionH }: {
  anchor: Anchor;
  sectionW: number;
  sectionH: number;
}) {
  // Panel is right-8 (32px from right), 320px wide — line connects to its left edge
  const panelX = sectionW - 32 - 320;
  const panelY = sectionH / 2;
  const dx     = panelX - anchor.x;
  const ctrl   = Math.max(Math.abs(dx) * 0.42, 70);
  const d      = `M ${anchor.x} ${anchor.y} C ${anchor.x + ctrl} ${anchor.y}, ${panelX - ctrl} ${panelY}, ${panelX} ${panelY}`;

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <defs>
        <filter id="glow-line" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={d}
        stroke="#00ffcc"
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.65"
        filter="url(#glow-line)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      <motion.circle
        cx={anchor.x}
        cy={anchor.y}
        r={4}
        fill="#00ffcc"
        filter="url(#glow-line)"
        style={{ transformOrigin: `${anchor.x}px ${anchor.y}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.2, delay: 0.45 }}
      />

      <motion.line
        x1={panelX} y1={panelY - 8}
        x2={panelX} y2={panelY + 8}
        stroke="#00ffcc"
        strokeWidth="1.5"
        strokeOpacity="0.55"
        filter="url(#glow-line)"
        style={{ transformOrigin: `${panelX}px ${panelY}px` }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.15, delay: 0.52 }}
      />
    </motion.svg>
  );
}

interface InteractiveBodyProps { showHint?: boolean; }

export default function InteractiveBody({ showHint = true }: InteractiveBodyProps) {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [anchor, setAnchor]         = useState<Anchor | null>(null);
  const sectionRef                  = useRef<HTMLElement>(null);

  const handleAnchorUpdate = useCallback((pos: Anchor | null) => setAnchor(pos), []);

  const sW = sectionRef.current?.clientWidth  ?? 0;
  const sH = sectionRef.current?.clientHeight ?? 0;

  return (
    <section ref={sectionRef} className="relative w-full h-full">
      <div className="absolute inset-0">
        <HumanScene
          activeZone={activeZone}
          showHint={showHint}
          onZoneClick={(z) => setActiveZone(prev => prev === z ? null : z)}
          onZoneHover={() => {}}
          onMissedClick={() => setActiveZone(null)}
          onAnchorUpdate={handleAnchorUpdate}
        />
      </div>

      <AnimatePresence>
        {activeZone && anchor && sW > 0 && (
          <ConnectingLine key={activeZone} anchor={anchor} sectionW={sW} sectionH={sH} />
        )}
      </AnimatePresence>

      <HoloPanel zone={activeZone} onClose={() => setActiveZone(null)} />
    </section>
  );
}
