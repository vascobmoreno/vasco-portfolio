import { FILES, type FileId } from './types';

interface Props { activeFile: FileId }

export default function StatusBar({ activeFile }: Props) {
  const f = FILES.find(x => x.id === activeFile)!;
  return (
    <div className="bg-vsc-statusbar flex items-center px-3 gap-4 text-white text-[12px] h-[22px] shrink-0 select-none overflow-hidden">
      {/* Left */}
      <span className="flex items-center gap-1.5">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        main
      </span>
      <span className="flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        0
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        0
      </span>

      {/* Right */}
      <div className="ml-auto flex items-center gap-4">
        <span>{f.language}</span>
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
        <span>Vasco Moreno</span>
      </div>
    </div>
  );
}
