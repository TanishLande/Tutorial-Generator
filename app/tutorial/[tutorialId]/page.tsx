"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import TutorialBasicInfo from '@/app/create-tutorial/[tutorialId]/_components/CourseBasicInfo'
import EditCourseBsicInfo from '@/app/create-tutorial/[tutorialId]/_components/EditCourseBsicInfo'
import Header from '@/app/create-tutorial/_components/header'
import TutorialDetails from '@/app/create-tutorial/[tutorialId]/_components/TutorialDetails'
import ChapterList from '@/app/create-tutorial/[tutorialId]/_components/ChapterList'

interface TutorialDetailsMainProps {
  params: { tutorialId: string }
}

interface Tutorial {
  id: number;
  tutorialId: string;
  courseOutput: {
    course: {
      id: string;
      name: string;
      description: string;
    }
  }
  // Add other fields as needed
}

const TutorialDetailsMain: React.FC<TutorialDetailsMainProps> = ({ params }) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.tutorialId) {
      getTutorial();
    }
  }, [params.tutorialId]);

  const getTutorial = async () => {
    try {
      setLoading(true);
      const result = await db.select()
        .from(CourseList)
        .where(
          eq(CourseList.tutorialId, params.tutorialId)
        );

      if (result.length > 0) {
        setTutorial(result[0] as Tutorial);
      } else {
        setError("Tutorial not found");
      }
      console.log(result)
    } catch (err) {
      console.error("Error fetching tutorial:", err);
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tutorial) return <div>No tutorial found</div>;

  return (
    <div>
      <Header />
      <div className='px-10 md:px-20 lg:px-44'>
        <TutorialBasicInfo course={tutorial} edit={false} />

        <TutorialDetails course={tutorial} />

        <ChapterList course={tutorial} edit={false} />
      </div>
      
    </div>
  );
}

export default TutorialDetailsMain;