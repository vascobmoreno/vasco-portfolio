import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      {ready && (
        <Particles
          id="tsparticles"
          className="absolute inset-0"
          options={{
            fullScreen: false,
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            particles: {
              number: { value: 60, density: { enable: true, width: 800, height: 800 } },
              color: { value: '#00ffcc' },
              opacity: { value: { min: 0.05, max: 0.3 } },
              size: { value: { min: 1, max: 2.5 } },
              links: {
                enable: true,
                color: '#00ffcc',
                opacity: 0.08,
                distance: 130,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.6,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'out' },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'repulse' },
              },
              modes: {
                repulse: { distance: 80, duration: 0.4 },
              },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Radial gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-primary text-sm tracking-[0.3em] mb-6 uppercase"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          Vasco{' '}
          <span className="text-primary glow">Moreno</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-gray-400 mb-8 h-8 font-light"
        >
          <TypeAnimation
            sequence={[
              'Software Engineer',
              2000,
              'Problem Solver',
              2000,
              'Backend Developer',
              2000,
              'Full Stack Developer',
              2000,
              'Continuous Learner',
              2000,
              'Tech Enthusiast',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          25-year-old software engineer from Fafe, Portugal — motivated to learn,
          ready for new challenges, and focused on continuous growth.
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
