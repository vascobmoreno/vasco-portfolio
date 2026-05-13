const kw = (t: string) => <span className="text-syn-keyword">{t}</span>;
const ty = (t: string) => <span className="text-syn-type">{t}</span>;
const pr = (t: string) => <span className="text-syn-prop">{t}</span>;
const st = (t: string) => <span className="text-syn-string">"{t}"</span>;
const cm = (t: string) => <span className="text-syn-comment">// {t}</span>;
const pu = (t: string) => <span className="text-syn-punct">{t}</span>;

const L = ({ children, indent = '' }: { children?: React.ReactNode; indent?: string }) => (
  <div className="code-line"><span className={indent}>{children}</span></div>
);

export default function EducationFile() {
  return (
    <>
      <L>{cm('education.ts — Academic background')}</L>
      <L />
      <L>{kw('interface ')} {ty('Education ')} {pu('{')}</L>
      <L indent="i1">{pr('institution')}{pu(': ')}{ty('string')}{pu(';')}</L>
      <L indent="i1">{pr('degree')}{pu(':      ')}{ty('string')}{pu(';')}</L>
      <L indent="i1">{pr('location')}{pu(':    ')}{ty('string')}{pu(';')}</L>
      <L indent="i1">{pr('description')}{pu('?: ')}{ty('string')}{pu(';')}</L>
      <L>{pu('}')}</L>
      <L />
      <L>{kw('const ')} {pr('education')}{pu(': ')}{ty('Education')}{pu('[] = [')}</L>
      <L indent="i1">{pu('{')}</L>
      <L indent="i2">{pr('institution')}{pu(': ')}{st('Universidade do Minho')}{pu(',')}</L>
      <L indent="i2">{pr('degree')}{pu(':      ')}{st("Bachelor's in Software Engineering")}{pu(',')}</L>
      <L indent="i2">{pr('location')}{pu(':    ')}{st('Braga, Portugal')}{pu(',')}</L>
      <L indent="i2">{pr('description')}{pu(': ')}{st('Java, C, C++, Python, Haskell, SQL, Algorithms, Architecture')}{pu(',')}</L>
      <L indent="i1">{pu('},')}</L>
      <L indent="i1">{pu('{')}</L>
      <L indent="i2">{pr('institution')}{pu(': ')}{st('Lancaster College English School')}{pu(',')}</L>
      <L indent="i2">{pr('degree')}{pu(':      ')}{st('English Language Certificate')}{pu(',')}</L>
      <L indent="i2">{pr('location')}{pu(':    ')}{st('Portugal')}{pu(',')}</L>
      <L indent="i1">{pu('},')}</L>
      <L>{pu('];')}</L>
      <L />
      <L>{kw('export default ')} {pr('education')}{pu(';')}</L>
    </>
  );
}
