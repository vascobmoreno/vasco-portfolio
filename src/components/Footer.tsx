export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 text-center">
      <p className="text-gray-600 text-sm font-mono">
        Designed & Built by{' '}
        <span className="text-primary/80">Vasco Moreno</span>
        {' '}· {new Date().getFullYear()}
      </p>
    </footer>
  );
}
