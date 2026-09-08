// Rendered as raw Markdown with syntax colouring (VS Code Dark+)
const k  = (t: string) => <span className="text-syn-md_h">{t}</span>;      // headings / markers
const g  = (t: string) => <span className="text-syn-comment">{t}</span>;    // muted / hr
const w  = (t: string) => <span className="text-white font-medium">{t}</span>;
const s  = (t: string) => <span className="text-syn-string">{t}</span>;
const p  = (t: string) => <span className="text-syn-prop">{t}</span>;
const d  = (t: string) => <span className="text-syn-text">{t}</span>;

const L = ({ children, indent = '' }: { children?: React.ReactNode; indent?: string }) => (
  <div className="code-line"><span className={indent}>{children}</span></div>
);

export default function ReadmeFile() {
  return (
    <>
      <L>{k('# ')}{w('Vasco Moreno')}</L>
      <L />
      <L>{k('## ')}{w('Software Engineer')}</L>
      <L />
      <L>{g('> ')}{d("I'm a 25-year-old software engineer based in Fafe, Portugal.")}</L>
      <L>{g('> ')}{d('Motivated to learn, ready for new challenges and focused on')}</L>
      <L>{g('> ')}{d('developing my personal skills.')}</L>
      <L />
      <L>{g('---')}</L>
      <L />
      <L>{k('## ')}{w('Contact')}</L>
      <L />
      <L indent="i1">{g('- ')}{p('Email')}{d('    ')} {s('vascobmoreno@gmail.com')}</L>
      <L indent="i1">{g('- ')}{p('Location')} {s('Fafe, Braga, Portugal')}</L>
      <L />
      <L>{g('---')}</L>
      <L />
      <L>{k('## ')}{w('Languages')}</L>
      <L />
      <L indent="i1">{g('- ')}{p('Portuguese')} {d('— ')}{s('Native')}</L>
      <L indent="i1">{g('- ')}{p('English')}{d('    — ')}{s('Fluent')}</L>
      <L indent="i1">{g('- ')}{p('Spanish')}{d('    — ')}{s('Conversational')}</L>
    </>
  );
}
