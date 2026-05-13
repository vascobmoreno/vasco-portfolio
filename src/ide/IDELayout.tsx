import { useState } from 'react';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import EditorPane from './EditorPane';
import StatusBar from './StatusBar';
import type { FileId } from './types';

export default function IDELayout() {
  const [activeFile, setActiveFile]   = useState<FileId>('readme');
  const [openFiles, setOpenFiles]     = useState<FileId[]>(['readme']);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openFile = (id: FileId) => {
    setOpenFiles(prev => prev.includes(id) ? prev : [...prev, id]);
    setActiveFile(id);
  };

  const closeFile = (id: FileId) => {
    const next = openFiles.filter(f => f !== id);
    setOpenFiles(next);
    if (activeFile === id) setActiveFile(next[next.length - 1] ?? 'readme');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-vsc-editor overflow-hidden font-mono text-syn-text">
      {/* Title bar */}
      <div className="bg-vsc-titlebar flex items-center px-4 h-8 shrink-0 select-none border-b border-vsc-border">
        <div className="flex gap-2 mr-4">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[12px] text-[#cccccc] mx-auto">
          PORTFOLIO — Visual Studio Code
        </span>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(v => !v)} />

        {sidebarOpen && (
          <Sidebar activeFile={activeFile} onOpen={openFile} />
        )}

        <div className="flex flex-col flex-1 overflow-hidden">
          <TabBar
            openFiles={openFiles}
            activeFile={activeFile}
            onSelect={setActiveFile}
            onClose={closeFile}
          />
          <EditorPane activeFile={activeFile} />
        </div>
      </div>

      <StatusBar activeFile={activeFile} />
    </div>
  );
}
