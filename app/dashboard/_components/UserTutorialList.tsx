"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import TutorialCard from './TutorialCard';
import Cardskeleton from './Cardskeleton';
import EmptyTutorials from './EmptyCard';

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface Course {
  id: number;
  tutorialId: string;
  name: string;
  category: string;
  level: string;
  includeVideo: string;
  courseOutput: unknown;
  createdBy: string;
  userName: string | null;
  userProfileImage: string | null;
  tutorialBanner: string | null;
  publish: boolean | null;
  description?: string;
  duration?: string;
  topic?: string;
  chapters?: Chapter[];
}

const UserTutorialList = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserTutorial();
    }
  }, [user]);

  const getUserTutorial = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress));
      setCourseList(result);
    } catch (error) {
      console.error('Error fetching user tutorials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='mt-10'>
        <h2 className='font-medium text-xl'>AI Generated Tutorials</h2>
        <div className='grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Cardskeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (courseList.length === 0) {
    return <EmptyTutorials />;
  }

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>AI Generated Tutorials</h2>
      <div className='grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {courseList.map((tutorial, index) => (
          <TutorialCard
            tutorial={tutorial as Course}
            key={index}
            refreshData={() => getUserTutorial()}
            handleDelete={() => {}} // Add this line to satisfy the prop requirement
          />
        ))}
      </div>
    </div>
  );
};

export default UserTutorialList;