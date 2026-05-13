interface Props {
  sidebarOpen: boolean;
  onToggle: () => void;
}

const icons = [
  { title: 'Explorer', active: true,
    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h7V3H3v4zm0 10h7v-4H3v4zM13 3v4h8V3h-8zm0 14h8v-4h-8v4z" /> },
  { title: 'Search',
    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" /> },
  { title: 'Source Control',
    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /> },
];

export default function ActivityBar({ sidebarOpen, onToggle }: Props) {
  return (
    <div className="bg-vsc-actbar flex flex-col items-center py-2 gap-1 shrink-0 w-12 border-r border-vsc-border">
      {icons.map((icon, i) => (
        <button
          key={icon.title}
          title={icon.title}
          onClick={i === 0 ? onToggle : undefined}
          className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors
            ${i === 0 && sidebarOpen ? 'text-white border-l-2 border-white' : 'text-[#858585] hover:text-[#cccccc]'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon.svg}
          </svg>
        </button>
      ))}

      {/* Bottom: settings icon */}
      <div className="mt-auto">
        <button title="Settings" className="w-10 h-10 flex items-center justify-center text-[#858585] hover:text-[#cccccc] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
