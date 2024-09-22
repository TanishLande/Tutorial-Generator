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

interface TutorialLayoutProps {
  params: {
    tutorialId: string;
  };
}

const TutorialLayout = ({ params }: TutorialLayoutProps) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null); // Use useState to manage course state
  const [loading,setLoading] =  useState(false);

  useEffect(() => {
    if (params && user) {
      GetTutorial(); // Fetch course data when params and user are available
    }
  }, [params, user]); // Add both params and user as dependencies

  const GetTutorial = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.tutorialId, params.tutorialId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]); // Set the fetched course data into state
      console.log(result); // Log result for debugging
    } catch (err) {
      console.error('Error fetching course:', err);
    }
    finally{
      setLoading(false)
    }
  };

  if(loading){
    return(
      <LoadingDialog loading={loading} />
    )
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">
        Course Layout
      </h2>
      {/* Basic Info */}
      <TutorialBasicInfo 
        course={course} 
      />

      {/* Tutorial details  */}
      <TutorialDetails  
        course={course}
      />

      {/* chapter */}
      <ChapterList 
        course={course}
      />
    </div>
  );
};

export default TutorialLayout;
