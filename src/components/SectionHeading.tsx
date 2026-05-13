import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  label: string;
  title: string;
}

export default function SectionHeading({ label, title }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px w-12 bg-primary/60" />
        <div className="h-px flex-1 bg-white/5" />
      </div>
    </motion.div>
  );
}
