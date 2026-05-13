import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const education = [
  {
    institution: 'Universidade do Minho',
    degree: "Bachelor's Degree in Software Engineering",
    location: 'Braga, Portugal',
    icon: '🎓',
    description:
      'Comprehensive program covering software architecture, algorithms, data structures, and systems programming across multiple languages including Java, C, C++, Haskell, and Python.',
  },
  {
    institution: 'Lancaster College English School',
    degree: 'English Language Certificate',
    location: 'Portugal',
    icon: '🌍',
    description:
      'Professional English language training, developing fluency for international business and technical communication.',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading label="04 — background" title="Education" />

      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {education.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className="bg-card border border-white/5 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,255,204,0.05)] cursor-default"
          >
            <div className="text-3xl mb-4">{edu.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-1">{edu.institution}</h3>
            <p className="text-primary font-mono text-sm mb-1">{edu.degree}</p>
            <p className="text-gray-600 text-xs font-mono mb-4">{edu.location}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
