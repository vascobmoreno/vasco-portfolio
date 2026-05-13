const kw = (t: string) => <span className="text-syn-keyword">{t}</span>;
const ty = (t: string) => <span className="text-syn-type">{t}</span>;
const pr = (t: string) => <span className="text-syn-prop">{t}</span>;
const st = (t: string) => <span className="text-syn-string">"{t}"</span>;
const cm = (t: string) => <span className="text-syn-comment">// {t}</span>;
const pu = (t: string) => <span className="text-syn-punct">{t}</span>;

const L = ({ children, indent = '' }: { children?: React.ReactNode; indent?: string }) => (
  <div className="code-line"><span className={indent}>{children}</span></div>
);

export default function ExperienceFile() {
  return (
    <>
      <L>{cm('experience.ts — Work history')}</L>
      <L />
      <L>{kw('interface ')} {ty('Job ')} {pu('{')}</L>
      <L indent="i1">{pr('company')}{pu(':        ')}{ty('string')}{pu(';')}</L>
      <L indent="i1">{pr('role')}{pu(':           ')}{ty('string')}{pu(';')}</L>
      <L indent="i1">{pr('period')}{pu(':         ')}{ty('string')}{pu(';')}</L>
      <L indent="i1">{pr('responsibilities')}{pu(': ')}{ty('string')}{pu('[];')}</L>
      <L indent="i1">{pr('stack')}{pu(':          ')}{ty('string')}{pu('[];')}</L>
      <L>{pu('}')}</L>
      <L />
      <L>{kw('const ')} {pr('experience')}{pu(': ')}{ty('Job')}{pu('[] = [')}</L>
      <L indent="i1">{pu('{')}</L>
      <L indent="i2">{pr('company')}{pu(':        ')}{st('Deloitte Portugal')}{pu(',')}</L>
      <L indent="i2">{pr('role')}{pu(':           ')}{st('Tech Analyst')}{pu(',')}</L>
      <L indent="i2">{pr('period')}{pu(':         ')}{st('May 2025 — Dec 2025')}{pu(',')}</L>
      <L indent="i2">{pr('responsibilities')}{pu(': [')}</L>
      <L indent="i3">{st('Integration and development in the IRM module')}{pu(',')}</L>
      <L indent="i3">{st('Integration and development in the VR module')}{pu(',')}</L>
      <L indent="i3">{st('SecOps AI Integration on ServiceNow')}{pu(',')}</L>
      <L indent="i3">{st('Cross-functional team collaboration on enterprise solutions')}{pu(',')}</L>
      <L indent="i2">{pu('],')}</L>
      <L indent="i2">{pr('stack')}{pu(': [')}</L>
      <L indent="i3">{st('ServiceNow')}{pu(', ')}{st('JavaScript')}{pu(', ')}{st('IRM')}{pu(', ')}{st('VR')}{pu(', ')}{st('SecOps AI')}{pu(',')}</L>
      <L indent="i2">{pu('],')}</L>
      <L indent="i1">{pu('},')}</L>
      <L>{pu('];')}</L>
      <L />
      <L>{kw('export default ')} {pr('experience')}{pu(';')}</L>
    </>
  );
}
