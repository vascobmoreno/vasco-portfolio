import { FILES, type FileId } from './types';
import FileIcon from './FileIcon';

interface Props {
  openFiles: FileId[];
  activeFile: FileId;
  onSelect: (id: FileId) => void;
  onClose: (id: FileId) => void;
}

export default function TabBar({ openFiles, activeFile, onSelect, onClose }: Props) {
  const fileMap = Object.fromEntries(FILES.map(f => [f.id, f]));

  return (
    <div className="bg-vsc-tab flex items-end shrink-0 overflow-x-auto border-b border-vsc-border">
      {openFiles.map((id) => {
        const f = fileMap[id];
        const active = id === activeFile;
        return (
          <div
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-2 px-4 py-2 text-[13px] cursor-pointer shrink-0 border-r border-vsc-border transition-colors
              ${active
                ? 'bg-vsc-tabactive text-[#ffffff] border-t border-t-[#007acc]'
                : 'text-[#969696] hover:bg-vsc-editor hover:text-[#cccccc]'}`}
          >
            <FileIcon ext={f.ext} size={13} />
            <span>{f.name}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(id); }}
              className="ml-1 w-4 h-4 flex items-center justify-center rounded-sm text-[#969696] hover:text-white hover:bg-white/10 transition-colors"
              aria-label={`Close ${f.name}`}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
