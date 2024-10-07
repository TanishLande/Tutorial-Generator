"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import TutorialCard from '../_components/TutorialCard'



const page = () => {

  const [tutorial, setTutorial] = useState();

  useEffect(() => {
    GetAllTutorial();
  }, []);

  const GetAllTutorial = async () => {
    const result = await db.select()
      .from(CourseList)
      .limit(10)
      .offset(0);

      console.log(result);
  }

  return (
    <div>
      <h2 className='text-2xl font-bold'>Explore more projects</h2>
      <p>Explore more projects built by the community</p>
    </div>
  )
}

export default page