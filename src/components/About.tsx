import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const highlights = [
  { value: '25', label: 'Years Old' },
  { value: 'BSc', label: 'Software Engineering' },
  { value: '3+', label: 'Languages Spoken' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading label="01 — about" title="Who I Am" />

      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-5 text-gray-400 leading-relaxed"
        >
          <p>
            I'm a software engineer based in <span className="text-primary font-medium">Fafe, Braga</span> with
            a Bachelor's Degree in Software Engineering from{' '}
            <span className="text-white font-medium">Universidade do Minho</span>.
          </p>
          <p>
            Currently working as a <span className="text-white font-medium">Tech Analyst at Deloitte Portugal</span>,
            where I develop and integrate solutions using ServiceNow — including IRM, Vulnerability Response,
            and cutting-edge SecOps AI integrations.
          </p>
          <p>
            I'm motivated by continuous learning and driven by challenges that push the boundaries of what
            technology can achieve.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Fafe, Braga', 'vascobmoreno@gmail.com'].map((item) => (
              <span key={item} className="font-mono text-xs text-primary/80 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-card border border-white/5 rounded-xl p-6 text-center glow-border hover:border-primary/30 transition-colors"
            >
              <div className="text-3xl font-bold text-primary glow mb-1">{h.value}</div>
              <div className="text-xs text-gray-500 leading-tight">{h.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
