export type FileId = 'readme' | 'experience' | 'skills' | 'education' | 'contact';

export interface FileInfo {
  id: FileId;
  name: string;
  language: string;
  ext: string;
}

export const FILES: FileInfo[] = [
  { id: 'readme',     name: 'README.md',       language: 'Markdown',   ext: 'md' },
  { id: 'experience', name: 'experience.ts',   language: 'TypeScript', ext: 'ts' },
  { id: 'skills',     name: 'skills.json',     language: 'JSON',       ext: 'json' },
  { id: 'education',  name: 'education.ts',    language: 'TypeScript', ext: 'ts' },
  { id: 'contact',    name: 'contact.ts',      language: 'TypeScript', ext: 'ts' },
];
