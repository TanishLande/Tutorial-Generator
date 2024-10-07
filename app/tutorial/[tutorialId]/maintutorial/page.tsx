"use client";


import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import Sidebar from './_components/Sidebar';
import ChapterContent from './_components/ChapterContent';
import NavbarHeader from './_components/NavbarHeader';

interface MainTutorialProps {
  params: {
    tutorialId: string
  }
}

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

const MainTutorial = ({ params }: MainTutorialProps) => {
  const [tutorial, setTutorial] = useState<Course | null>(null);
  const [chapterContent, setChapterContent] = useState<ChapterData | null>(null);

  useEffect(() => {
    GetTutorial();
  }, []);

  const GetTutorial = async () => {
    try {
      const result = await db.select()
        .from(CourseList)
        .where(
          eq(CourseList.tutorialId, params.tutorialId)
        );
      if (result.length > 0) {
        setTutorial(result[0] as Course);
      }
    } catch (error) {
      console.error("Error fetching tutorial:", error);
    }
  };

  const handleContentChange = (content: ChapterData | null) => {
    setChapterContent(content);
  };

  return (
    <div className='flex h-screen'>
      {/* sidebar */}
      <div className='hidden lg:block w-[350px] border-r shadow-sm'>
        <Sidebar
          tutorial={tutorial}
          onContentChange={handleContentChange}
        />
      </div>
      {/* main content */}
      <div className='flex-1 overflow-auto flex flex-col'>
        <NavbarHeader tutorial={tutorial} />
        <ChapterContent content={chapterContent} tutorial={tutorial} name={chapterContent?.content[0].title} title={tutorial?.courseOutput?.course?.chapters[0].name || ''} />
      </div>
    </div>
  );
};

export default MainTutorial