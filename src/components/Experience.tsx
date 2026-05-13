import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const experience = [
  {
    company: 'Deloitte Portugal',
    role: 'Tech Analyst',
    period: 'May 2025 — Dec 2025',
    bullets: [
      'Integration and development in the IRM (Integrated Risk Management) module on ServiceNow.',
      'Integration and development in the VR (Vulnerability Response) module.',
      'SecOps AI integration on ServiceNow — implementing AI-driven security operations workflows.',
      'Collaboration with cross-functional teams to deliver enterprise-grade ServiceNow solutions.',
    ],
    tags: ['ServiceNow', 'IRM', 'SecOps', 'JavaScript', 'AI Integration'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading label="02 — work" title="Experience" />

      <div ref={ref} className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent hidden md:block" />

        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="md:pl-16 mb-10"
          >
            {/* Timeline dot */}
            <div className="hidden md:block absolute left-[18px] w-3 h-3 rounded-full bg-primary/80 border-2 border-dark shadow-[0_0_10px_rgba(0,255,204,0.5)]" />

            <div className="bg-card border border-white/5 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,204,0.05)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.company}</h3>
                  <p className="text-primary font-mono text-sm mt-1">{job.role}</p>
                </div>
                <span className="font-mono text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-primary/70 bg-primary/5 border border-primary/15 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
