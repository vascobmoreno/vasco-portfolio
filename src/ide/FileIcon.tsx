interface Props { ext: string; size?: number }

const COLORS: Record<string, string> = {
  ts:   '#3178c6',
  json: '#cbcb41',
  md:   '#519aba',
};
const LABELS: Record<string, string> = {
  ts:   'TS',
  json: '{}',
  md:   'M',
};

export default function FileIcon({ ext, size = 14 }: Props) {
  const bg = COLORS[ext] ?? '#888';
  const label = LABELS[ext] ?? ext.toUpperCase().slice(0, 2);
  return (
    <span
      style={{ backgroundColor: bg, fontSize: size * 0.6, width: size, height: size, lineHeight: `${size}px` }}
      className="inline-flex items-center justify-center rounded-[2px] text-white font-bold select-none shrink-0"
    >
      {label}
    </span>
  );
}
