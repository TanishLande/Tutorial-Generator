"use client";

import React, { useEffect, useState } from 'react';
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
  tutorial: Course | null;
  onContentChange: (content: ChapterData | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tutorial, onContentChange }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (tutorial && tutorial.tutorialId) {
      getSelectedChapter(0);
    }
  }, [tutorial]);


  const getSelectedChapter = async (chapterIndex: number) => {
    if (!tutorial || !tutorial.tutorialId) return;

    setLoading(true);
    setError(null);
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
      console.log("Fetched chapter:", result);
      if (result.length > 0) {
        onContentChange(result[0] as ChapterData);
      } else {
        onContentChange(null);
        setError("No chapter found");
      }
    } catch (error) {
      console.error("Error fetching chapter:", error);
      setError("Failed to fetch chapter");
      onContentChange(null);
    } finally {
      setLoading(false);
    }
  };

  if (!tutorial) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-gray-500">No tutorial data available</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full sm:w-72 md:w-80 overflow-y-auto bg-white scrollbar-hide">
      <div className="p-6">
        <h2 className=" text-lg md:text-2xl font-bold mb-6 text-gray-800">
          {tutorial.courseOutput.course.name}
        </h2>
        <hr className='my-4' />
        {loading && <p className="text-gray-500">Loading chapters...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-2">
          {tutorial.courseOutput?.course?.chapters?.map((chapter, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedChapterIndex(index);
                getSelectedChapter(index);
              }}
              className="cursor-pointer hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
    </div>
  );
};

export default Sidebar;