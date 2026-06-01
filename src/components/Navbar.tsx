import { motion } from 'framer-motion';

type Page = 'home' | 'contact' | 'projects';

interface Props {
  currentPage?: Page;
  onNavigate?:  (p: Page) => void;
}

export default function Navbar({ onNavigate }: Props) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="px-5 flex items-center h-16">
        <button
          onClick={() => onNavigate?.('home')}
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <img src="/favicon.svg" alt="logo" className="w-7 h-7" />
        </button>
      </div>
    </motion.nav>
  );
}
