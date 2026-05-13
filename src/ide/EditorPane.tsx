import { AnimatePresence, motion } from 'framer-motion';
import type { FileId } from './types';
import ReadmeFile from './files/ReadmeFile';
import ExperienceFile from './files/ExperienceFile';
import SkillsFile from './files/SkillsFile';
import EducationFile from './files/EducationFile';
import ContactFile from './files/ContactFile';

interface Props { activeFile: FileId }

const FILE_COMPONENTS: Record<FileId, React.ComponentType> = {
  readme:     ReadmeFile,
  experience: ExperienceFile,
  skills:     SkillsFile,
  education:  EducationFile,
  contact:    ContactFile,
};

export default function EditorPane({ activeFile }: Props) {
  const Content = FILE_COMPONENTS[activeFile];
  return (
    <div className="flex-1 bg-vsc-editor overflow-y-auto overflow-x-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="code-body py-4 text-[14px] min-w-max"
        >
          <Content />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
