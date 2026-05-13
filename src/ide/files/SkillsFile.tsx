const pr = (t: string) => <span className="text-syn-prop">"{t}"</span>;
const st = (t: string) => <span className="text-syn-string">"{t}"</span>;
const nu = (t: string) => <span className="text-syn-num">{t}</span>;
const pu = (t: string) => <span className="text-syn-punct">{t}</span>;
const cm = (t: string) => <span className="text-syn-comment">// {t}</span>;

const L = ({ children, indent = '' }: { children?: React.ReactNode; indent?: string }) => (
  <div className="code-line"><span className={indent}>{children}</span></div>
);

export default function SkillsFile() {
  return (
    <>
      <L>{cm('skills.json — Proficiency levels out of 100')}</L>
      <L>{pu('{')}</L>
      <L indent="i1">{pr('languages')}{pu(': {')}</L>
      <L indent="i2">{pr('JavaScript')}{pu(': ')}{nu('88')}{pu(',')}</L>
      <L indent="i2">{pr('Java')}{pu(':       ')}{nu('82')}{pu(',')}</L>
      <L indent="i2">{pr('Python')}{pu(':     ')}{nu('75')}{pu(',')}</L>
      <L indent="i2">{pr('HTML_CSS')}{pu(':   ')}{nu('90')}{pu(',')}</L>
      <L indent="i2">{pr('SQL')}{pu(':        ')}{nu('72')}{pu(',')}</L>
      <L indent="i2">{pr('C_CPP')}{pu(':      ')}{nu('65')}{pu(',')}</L>
      <L indent="i2">{pr('Haskell')}{pu(':    ')}{nu('55')}</L>
      <L indent="i1">{pu('},')}</L>
      <L indent="i1">{pr('platforms')}{pu(': [')}</L>
      <L indent="i2">{st('ServiceNow')}{pu(', ')}{st('HTML')}{pu(', ')}{st('CSS')}</L>
      <L indent="i1">{pu('],')}</L>
      <L indent="i1">{pr('softSkills')}{pu(': [')}</L>
      <L indent="i2">{st('Software Architecture')}{pu(',')}</L>
      <L indent="i2">{st('Software Development')}{pu(',')}</L>
      <L indent="i2">{st('Data Analysis')}{pu(',')}</L>
      <L indent="i2">{st('Team Working')}</L>
      <L indent="i1">{pu(']')}</L>
      <L>{pu('}')}</L>
    </>
  );
}
