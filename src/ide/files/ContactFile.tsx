const kw = (t: string) => <span className="text-syn-keyword">{t}</span>;
const pr = (t: string) => <span className="text-syn-prop">{t}</span>;
const st = (t: string) => <span className="text-syn-string">"{t}"</span>;
const cm = (t: string) => <span className="text-syn-comment">// {t}</span>;
const pu = (t: string) => <span className="text-syn-punct">{t}</span>;

const L = ({ children, indent = '' }: { children?: React.ReactNode; indent?: string }) => (
  <div className="code-line"><span className={indent}>{children}</span></div>
);

export default function ContactFile() {
  return (
    <>
      <L>{cm("contact.ts — Feel free to reach out!")}</L>
      <L />
      <L>{kw('const ')} {pr('contact ')} {pu('= {')}</L>
      <L indent="i1">{pr('email')}{pu(':        ')}{st('vascobmoreno@gmail.com')}{pu(',')}</L>
      <L indent="i1">{pr('location')}{pu(':     ')}{st('Fafe, Braga, Portugal')}{pu(',')}</L>
      <L indent="i1">{pr('availability')}{pu(': ')}{st('Open to new opportunities')}{pu(',')}</L>
      <L>{pu('} ')} {kw('as const')}{pu(';')}</L>
      <L />
      <L>{cm('---')}</L>
      <L />
      <L>{kw('export default ')} {pr('contact')}{pu(';')}</L>
    </>
  );
}
