import { motion } from 'framer-motion';

interface Project {
  title:       string;
  description: string;
  tech:        string[];
  github?:     string;
  live?:       string;
  year:        string;
  status:      'completed' | 'in progress' | 'ongoing' | 'archived';
}

const PROJECTS: Project[] = [
  {
    title:       'The Tips Lobby',
    description: 'A social platform where football and basketball fans make match predictions, compete in private lobbies with friends, and track their pick accuracy over time.',
    tech:        ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
    github:      '',
    live:        '',
    year:        '2026',
    status:      'ongoing',
  },
  {
    title:       'Project Title',
    description: 'Short description of what the project does and the problem it solves.',
    tech:        ['ServiceNow', 'JavaScript', 'REST API'],
    github:      '',
    live:        '',
    year:        '2024',
    status:      'completed',
  },
  {
    title:       'Project Title',
    description: 'Short description of what the project does and the problem it solves.',
    tech:        ['Java', 'Spring Boot', 'PostgreSQL'],
    github:      '',
    live:        '',
    year:        '2024',
    status:      'completed',
  },
];

const STATUS_COLORS = {
  'completed':   'text-[#00ffcc]/70 border-[#00ffcc]/30',
  'ongoing':     'text-yellow-400/80 border-yellow-400/35',
  'in progress': 'text-yellow-400/70 border-yellow-400/30',
  'archived':    'text-gray-500 border-gray-600/30',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="border border-[#00ffcc]/12 p-6 rounded-sm bg-[#00ffcc]/[0.02] hover:border-[#00ffcc]/25 hover:bg-[#00ffcc]/[0.04] transition-all group flex flex-col gap-4"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-mono text-base font-semibold text-white group-hover:text-[#00ffcc] transition-colors leading-snug">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`font-mono text-[8px] tracking-[0.3em] uppercase border px-2 py-0.5 rounded-sm ${STATUS_COLORS[project.status]}`}>
            {project.status}
          </span>
          <span className="font-mono text-[9px] text-gray-600">{project.year}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-xs font-mono leading-relaxed flex-1">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <span key={t} className="font-mono text-[9px] tracking-[0.15em] text-[#00ffcc]/45 border border-[#00ffcc]/15 px-2 py-0.5 rounded-sm uppercase">
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      {(project.github || project.live) && (
        <div className="flex items-center gap-4 pt-1 border-t border-[#00ffcc]/08">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#00ffcc]/40 hover:text-[#00ffcc]/80 transition-colors uppercase"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#00ffcc]/40 hover:text-[#00ffcc]/80 transition-colors uppercase"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Live
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectsPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex-1 overflow-y-auto pt-24 pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#00ffcc]/70 border border-[#00ffcc]/25 px-4 py-2 rounded-sm bg-[#00ffcc]/5 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 transition-all uppercase mb-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Back
        </button>

        {/* Heading */}
        <p className="font-mono text-[10px] tracking-[0.5em] text-[#00ffcc]/35 uppercase mb-3">Selected work</p>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Projects.</h1>
        <p className="text-gray-400 text-sm font-mono mb-12 leading-relaxed">
          A collection of projects I've built or been involved in.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
