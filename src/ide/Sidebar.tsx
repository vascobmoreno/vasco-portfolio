import { FILES, type FileId } from './types';
import FileIcon from './FileIcon';

interface Props {
  activeFile: FileId;
  onOpen: (id: FileId) => void;
}

export default function Sidebar({ activeFile, onOpen }: Props) {
  return (
    <div className="bg-vsc-sidebar w-52 shrink-0 flex flex-col overflow-hidden border-r border-vsc-border select-none">
      {/* Header */}
      <div className="px-4 py-2.5 text-[11px] font-bold tracking-widest text-vsc-sidehdr uppercase">
        Explorer
      </div>

      {/* Folder */}
      <div className="px-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 text-[13px] text-[#cccccc]">
          <svg className="w-3 h-3 shrink-0 text-[#c5c5c5]" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 0L8 2H14a1 1 0 011 1v9a1 1 0 01-1 1H2a1 1 0 01-1-1V1a1 1 0 011-1h4z" />
          </svg>
          <span>PORTFOLIO</span>
        </div>

        {/* Files */}
        <div className="mt-1">
          {FILES.map((f) => (
            <button
              key={f.id}
              onClick={() => onOpen(f.id)}
              className={`w-full flex items-center gap-2 px-4 py-0.5 text-[13px] cursor-pointer transition-colors text-left
                ${activeFile === f.id
                  ? 'bg-[#37373d] text-[#ffffff]'
                  : 'text-[#cccccc] hover:bg-vsc-hover'}`}
            >
              <FileIcon ext={f.ext} size={14} />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
