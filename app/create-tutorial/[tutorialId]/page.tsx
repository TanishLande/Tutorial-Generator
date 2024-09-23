"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import TutorialBasicInfo from './_components/CourseBasicInfo';
import TutorialDetails from './_components/TutorialDetails';
import ChapterList from './_components/ChapterList';
import LoadingDialog from '../_components/LoadingDialog';
import { Button } from '@/components/ui/button';
import { RiAiGenerate } from "react-icons/ri";
import { GenerateContentChapter_AI } from '@/configs/AiModal';

interface TutorialLayoutProps {
  params: {
    tutorialId: string;
  };
}

interface Chapter {
  name: string;
  // Add other chapter properties as needed
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

const TutorialLayout = ({ params }: TutorialLayoutProps) => {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params && user) {
      GetTutorial();
    }
  }, [params, user]);

  const GetTutorial = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.tutorialId, params.tutorialId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress ?? '')
          )
        );
      setCourse(result[0] as Course);
      console.log(result);
    } catch (err) {
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    if (course?.courseOutput?.course?.chapters && course.courseOutput.course.chapters.length > 0) {
      const chapters = course.courseOutput.course.chapters;
      
      chapters.forEach(async (chapter, index) => {
        const PROMPT = `Explain the concept in Detail on Topic: ${course.name}, Chapter: ${chapter.name}, in JSON Format with the list of array with field as title, explaining on given chapter in detail, Code Example(Code field in <precode> format) if applicable.`;
        
        try {
          // Await the result of the AI call for the chapter
          const result = await GenerateContentChapter_AI.sendMessage(PROMPT);
          
          // Log the result only if the index is 0
          if (index === 0) {
            console.log(await result.response?.text());
          }
        } catch (err) {
          setLoading(false);
          console.error('Error generating chapter content for chapter', chapter.name, err);
        }
      });
    } else {
      console.log('Course data is not fully loaded or structured as expected');
    }
    setLoading(false);
  };
  
  
  

  if (loading) {
    return <LoadingDialog loading={loading} />;
  }

  return (
    <div className="mt-10 px-7 sm:mb-20 md:px-20 md:mb-24 lg:px-44">
      <h2 className="font-bold text-center text-2xl">
        Course Layout
      </h2>
      <TutorialBasicInfo course={course} />
      <TutorialDetails course={course} />
      <ChapterList course={course} />
      <Button
        className='my-10 gap-x-2'
        variant='blue'
        onClick={GenerateChapterContent}
      >
        Generate Tutorial Content <RiAiGenerate />
      </Button>
    </div>
  );
};

export default TutorialLayout;