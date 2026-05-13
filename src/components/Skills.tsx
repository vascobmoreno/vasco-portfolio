import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';

const skills = [
  { name: 'JavaScript', level: 88, category: 'Frontend' },
  { name: 'Java', level: 82, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'HTML / CSS', level: 90, category: 'Frontend' },
  { name: 'ServiceNow', level: 85, category: 'Platform' },
  { name: 'SQL', level: 72, category: 'Database' },
  { name: 'C / C++', level: 65, category: 'Systems' },
  { name: 'Haskell', level: 55, category: 'Functional' },
];

const softSkills = [
  'Software Architecture',
  'Software Development',
  'Data Analysis',
  'Team Working',
  'Problem Solving',
  'Continuous Learning',
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const motionLevel = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      animate(motionLevel, level, { duration: 1.2, delay });
    }
  }, [inView, level, delay, motionLevel]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <motion.span className="font-mono text-xs text-primary/80">
          {inView ? (
            <AnimatedNumber value={level} />
          ) : (
            '0%'
          )}
        </motion.span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,204,0.8)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}%`;
      },
    });
    return controls.stop;
  }, [value, motionVal]);

  return <span ref={ref}>0%</span>;
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading label="03 — skills" title="Technical Skills" />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Skill bars */}
        <div className="space-y-6">
          {skills.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
          ))}
        </div>

        {/* Soft skills + languages */}
        <div ref={ref} className="space-y-8">
          <div>
            <h3 className="text-sm font-mono text-primary/80 uppercase tracking-widest mb-4">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0,255,204,0.5)' }}
                  className="text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full cursor-default transition-colors"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono text-primary/80 uppercase tracking-widest mb-4">
              Languages
            </h3>
            <div className="space-y-3">
              {[
                { lang: 'Portuguese', level: 'Native', pct: 100 },
                { lang: 'English', level: 'Fluent', pct: 90 },
                { lang: 'Spanish', level: 'Conversational', pct: 65 },
              ].map((l, i) => (
                <motion.div
                  key={l.lang}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-gray-300 w-24">{l.lang}</span>
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${l.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                      className="h-full bg-primary/50 rounded-full"
                    />
                  </div>
                  <span className="font-mono text-xs text-gray-500 w-24 text-right">{l.level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
