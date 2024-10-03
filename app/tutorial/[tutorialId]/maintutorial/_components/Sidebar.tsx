import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterItems from './ChapterItems';
import { db } from '@/configs/db';
import { Chapters } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';

interface ChapterContent {
  title: string;
  explanation: string;
  code: string;
}

interface ChapterData {
  chapterId: number;
  content: ChapterContent[];
  courseId: string;
  id: number;
  videoId: string;
}

interface Chapter {
  name: string;
  about: string;
  duration: string;
}

interface CourseDetails {
  name: string;
  description: string;
  category: string;
  chapters: Chapter[];
}

export interface Course {
  id: number;
  name: string;
  tutorialId: string;
  category: string;
  level: string;
  includeVideo: string;
  createdBy: string;
  userName: string | null;
  userProfileImage: string | null;
  tutorialBanner: string | null;
  publish: boolean | null;
  courseOutput: {
    course: CourseDetails;
  };
}

interface SidebarProps {
  tutorial: Course;
  onContentChange: (content: ChapterData | null) => void;
  chapterIndex: 1;
}

const Sidebar: React.FC<SidebarProps> = ({ tutorial, onContentChange, chapterIndex}) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(0);

  useEffect(() => {
    getSelectedChapter(0);
  }, [tutorial]);

  const getSelectedChapter = async (chapterIndex: number) => {
    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterIndex),
            eq(Chapters.courseId, tutorial.tutorialId)
          )
        );
      console.log(result);
      if (result.length > 0) {
        onContentChange(result[0] as ChapterData);
      } else {
        onContentChange(null);
      }
    } catch (error) {
      console.error("Error fetching chapter:", error);
      onContentChange(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed top-0 left-0 h-screen w-[350px] shadow-2xl overflow-y-auto z-40"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {tutorial?.courseOutput.course.name}
          </h2>
          <div className="space-y-2">
            {tutorial?.courseOutput?.course?.chapters?.map((chapter, index) => (
              <div 
                key={index}
                onClick={() => {
                  setSelectedChapterIndex(index);
                  getSelectedChapter(index || 0);
                }}
              >
                <ChapterItems
                  chapter={chapter}
                  index={index}
                  active={selectedChapterIndex === index}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;