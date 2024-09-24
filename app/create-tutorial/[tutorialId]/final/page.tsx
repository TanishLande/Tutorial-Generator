"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import TutorialBasicInfo from '../_components/CourseBasicInfo';
import { FaCopy } from "react-icons/fa";

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

const FinalTutorial = ({ params }: TutorialLayoutProps) => {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (params && user) {
      GetTutorial();
    }
  }, [params, user]);

  const GetTutorial = async () => {
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
      setIsComplete(result[0]?.publish ?? false);
    } catch (err) {
      console.error('Error fetching course:', err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="px-10 md:px-20 lg:px-44 my-7">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Congratulations!</h2>
        <p className="text-sm md:text-lg text-center">You have successfully completed your tutorial. Well done on this remarkable achievement!</p>
        <TutorialBasicInfo course={course} />
        <h2 className='text-2xl gap-y-2 mt-2 md:mt-4 font-bold'>Tutorial URL:</h2>
        <h2 className='text-center mt-2 md:mt-4 flex gap-5 text-gray-400 border p-2 rounded'>
          {process.env.NEXT_PUBLIC_HOST_NAME}/tutorial/view/{course?.tutorialId} <FaCopy className='h-5 w-5 cursor-pointer' onClick={() => navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME + '/tutorial/view/' + course?.tutorialId)} />
        </h2>
      </div>
    </div>
  );
};

export default FinalTutorial;