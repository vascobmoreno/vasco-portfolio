import { motion, AnimatePresence } from 'framer-motion';
import type { Zone } from './BodyModel';

interface Props {
  zone: Zone | null;
  onClose: () => void;
}

/* ── Shared primitives ──────────────────────────────────────────────── */
const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline gap-2">
    <span className="text-[#00ffcc]/50 text-[10px] font-mono uppercase tracking-widest w-24 shrink-0">{label}</span>
    <span className="text-[#e0fff8] text-[13px] font-mono">{value}</span>
  </div>
);

const Divider = () => <div className="border-t border-[#00ffcc]/15 my-3" />;

const Bar = ({ label, pct, delay }: { label: string; pct: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="mb-2"
  >
    <div className="text-[11px] font-mono mb-1">
      <span className="text-[#9cdcfe]">{label}</span>
    </div>
    <div className="h-[3px] bg-[#00ffcc]/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ delay: delay + 0.1, duration: 0.8, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-[#00aacc] to-[#00ffcc] rounded-full"
        style={{ boxShadow: '0 0 6px rgba(0,255,204,0.6)' }}
      />
    </div>
  </motion.div>
);

const Bullet = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex gap-2 text-[12px] font-mono text-[#aee8d0] leading-relaxed"
  >
    <span className="text-[#00ffcc] shrink-0 mt-0.5">▸</span>
    <span>{text}</span>
  </motion.div>
);

/* ── Panel content per zone ─────────────────────────────────────────── */
function PanelContent({ zone }: { zone: Zone }) {
  if (zone === 'skills') return (
    <>
      <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-4">Neural Matrix</div>
      {[
        ['Java',        80],
        ['C / C++',     80],
        ['SQL',         78],
        ['JavaScript',  72],
        ['Python',      68],
        ['HTML / CSS',  65],
        ['ServiceNow',  57],
        ['Haskell',     50],
      ].map(([label, pct], i) => (
        <Bar key={label as string} label={label as string} pct={pct as number} delay={0.05 * i} />
      ))}
    </>
  );

  if (zone === 'about') return (
    <>
      <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-4">Core Data</div>
      {[
        ['Name', 'Vasco Moreno'],
        ['Title', 'Software Engineer'],
        ['Age', '25'],
        ['Location', 'Fafe, Braga — Portugal'],
      ].map(([l, v], i) => (
        <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.06 * i }}>
          <Row label={l} value={v} />
        </motion.div>
      ))}
      <Divider />
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
        className="text-[12px] font-mono text-[#aee8d0]/70 leading-relaxed"
      >
        Motivated to learn, ready for new challenges and focused on developing personal skills.
      </motion.p>
      <Divider />
      {[
        ['Portuguese', 'Native'],
        ['English', 'Fluent'],
        ['Spanish', 'Conversational'],
      ].map(([lang, lvl], i) => (
        <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 + 0.06 * i }}>
          <Row label={lang} value={lvl} />
        </motion.div>
      ))}
      <Divider />
      {[
        { label: 'Email', value: 'vascobmoreno@gmail.com', href: 'mailto:vascobmoreno@gmail.com' },
        { label: 'Phone', value: '+351 912 971 296',       href: 'tel:+351912971296' },
      ].map(({ label, value, href }, i) => (
        <motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 + 0.06 * i }}
          className="mb-3">
          <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-0.5">{label}</div>
          <a href={href} className="text-[13px] font-mono text-[#e0fff8] hover:text-[#00ffcc] transition-colors">{value}</a>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.76 }}
        className="flex items-center gap-2 mt-1">
        <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
        <span className="text-[11px] font-mono text-[#00ffcc]">Open to new opportunities</span>
      </motion.div>
    </>
  );

  if (zone === 'experience') return (
    <>
      <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-4">Operation Log</div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="text-[15px] font-mono text-white font-semibold mb-0.5">
        Deloitte Portugal
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="text-[12px] font-mono text-[#00ffcc] mb-3">
        Tech Analyst
      </motion.div>
      <Divider />
      <div className="space-y-2">
        <Bullet text="IRM (Integrated Risk Management) module integration" delay={0.2} />
        <Bullet text="VR (Vulnerability Response) module development" delay={0.27} />
        <Bullet text="SecOps AI integration on ServiceNow" delay={0.34} />
      </div>
      <Divider />
      <div className="flex flex-wrap gap-1.5">
        {['ServiceNow', 'JavaScript', 'IRM', 'VR', 'SecOps AI'].map((tag, i) => (
          <motion.span key={tag}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.06 }}
            className="text-[10px] font-mono text-[#00ffcc]/70 border border-[#00ffcc]/20 px-2 py-0.5 rounded"
          >{tag}</motion.span>
        ))}
      </div>
    </>
  );

  if (zone === 'education') return (
    <>
      <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-4">Knowledge Base</div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="border border-[#00ffcc]/15 rounded p-3 mb-3">
        <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-2">[ DEGREE ]</div>
        <div className="text-[14px] font-mono text-white font-semibold">Universidade do Minho</div>
        <div className="text-[12px] font-mono text-[#00ffcc] mt-0.5">BSc Software Engineering</div>
        <div className="text-[11px] font-mono text-[#aee8d0]/50 mt-1">Braga, Portugal</div>
        <Divider />
        <div className="text-[11px] font-mono text-[#aee8d0]/60 leading-relaxed">
          Java · C · C++ · Python · Haskell · SQL<br />
          Algorithms · Data Structures · Architecture
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="border border-[#00ffcc]/15 rounded p-3">
        <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-2">[ LANGUAGE CERT. ]</div>
        <div className="text-[14px] font-mono text-white font-semibold">Lancaster College</div>
        <div className="text-[12px] font-mono text-[#00ffcc] mt-0.5">English Language Certificate</div>
        <div className="text-[11px] font-mono text-[#aee8d0]/50 mt-1">Portugal</div>
      </motion.div>
    </>
  );

  // contact → cerebellum
  return (
    <>
      <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-4">Establish Uplink</div>
      {[
        { label: 'Email', value: 'vascobmoreno@gmail.com', href: 'mailto:vascobmoreno@gmail.com' },
        { label: 'Phone', value: '+351 912 971 296', href: 'tel:+351912971296' },
        { label: 'Location', value: 'Fafe, Braga, Portugal', href: undefined },
      ].map(({ label, value, href }, i) => (
        <motion.div key={label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 * i }}
          className="mb-4">
          <div className="text-[10px] font-mono text-[#00ffcc]/40 uppercase tracking-widest mb-1">{label}</div>
          {href
            ? <a href={href} className="text-[13px] font-mono text-[#e0fff8] hover:text-[#00ffcc] transition-colors">{value}</a>
            : <span className="text-[13px] font-mono text-[#e0fff8]">{value}</span>
          }
        </motion.div>
      ))}
      <Divider />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
        <span className="text-[11px] font-mono text-[#00ffcc]">Open to new opportunities</span>
      </motion.div>
    </>
  );
}

/* ── Zone meta ─────────────────────────────────────────────────────── */
const ZONE_META: Record<Zone, { title: string; body: string }> = {
  skills:     { title: '◈ SKILLS',     body: 'FRONTAL LOBE'  },
  about:      { title: '◈ ABOUT ME',   body: 'TORSO'         },
  experience: { title: '◈ EXPERIENCE', body: 'LEFT HEMI'     },
  education:  { title: '◈ EDUCATION',  body: 'RIGHT HEMI'    },
  contact:    { title: '◈ CONTACT',    body: 'CEREBELLUM'    },
};

/* ── Corner brackets ────────────────────────────────────────────────── */
function Corners() {
  const cls = 'absolute w-4 h-4 border-[#00ffcc]/70';
  return (
    <>
      <span className={`${cls} top-0 left-0 border-t border-l`} />
      <span className={`${cls} top-0 right-0 border-t border-r`} />
      <span className={`${cls} bottom-0 left-0 border-b border-l`} />
      <span className={`${cls} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/* ── Main HoloPanel ─────────────────────────────────────────────────── */
export default function HoloPanel({ zone, onClose }: Props) {
  return (
    <AnimatePresence>
      {zone && (
        <motion.div
          key={zone}
          initial={{ opacity: 0, x: 20, scale: 0.96, y: '-50%' }}
          animate={{ opacity: 1, x: 0,  scale: 1,    y: '-50%' }}
          exit={{ opacity: 0, x: 20, scale: 0.96, y: '-50%' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="holo-panel holo-scan absolute top-1/2 right-8 w-[320px] max-h-[82vh] overflow-y-auto rounded-sm z-20"
        >
          <Corners />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#00ffcc]/15">
            <div>
              <span className="holo-title text-[#00ffcc] font-mono text-[15px] font-bold tracking-widest">
                {ZONE_META[zone].title}
              </span>
              <div className="text-[9px] font-mono text-[#00ffcc]/30 tracking-[0.35em] mt-0.5">
                ZONE: {ZONE_META[zone].body} · ACTIVE
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center text-[#00ffcc]/40 hover:text-[#00ffcc] hover:bg-[#00ffcc]/10 rounded transition-colors font-mono text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 py-4">
            <PanelContent zone={zone} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
