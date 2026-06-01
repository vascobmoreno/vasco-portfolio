import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Page = 'home' | 'contact' | 'projects';

interface Props {
  currentPage?: Page;
  onNavigate?:  (p: Page) => void;
}

export default function Navbar({ onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-primary/10 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="px-5 flex items-center h-16">
        <button
          onClick={() => onNavigate?.('home')}
          className="font-mono text-xs tracking-[0.3em] text-[#00ffcc]/40 hover:text-[#00ffcc]/80 transition-colors uppercase"
        >
          VM
        </button>
      </div>
    </motion.nav>
  );
}
