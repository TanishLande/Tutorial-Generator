import React from 'react'
import { FaRegClock } from "react-icons/fa";
import { RiCheckboxCircleLine } from "react-icons/ri";

interface Chapter {
    name: string;
    about: string;
    duration: string;
  }

interface CourseDetails {
    name: string;
    description: string;
    category: string;
    duration: string;
    topic: string;
    chapters: Chapter[];
  }
  
  interface Course {
    id: number;
    tutorialId: string;
    name: string;
    category: string;
    level: string;
    includeVideo: string;
    courseOutput: { course: CourseDetails }; // Use the specific interface here
    createdBy: string;
    userName: string | null;
    userProfileImage: string | null;
  }
  
  interface ChapterListProps {
    course: Course | null; // Allow course to be null
  }

const ChapterList = ({
    course
}:ChapterListProps) => {
  return (
    <div className='mt-3'>
        <h2 className='font-medium text-xl mt-2 mb-2' >
            Chapters
        </h2>
        <div className='mt-2'>
            {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
                <div key={index} className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
                    <div className='flex gap-5 item-center'>
                    <h2 className='bg-blue-900 mt-5 flex-none h-10 w-10 p-2 rounded-full text-white text-center'>
                        {index+1}
                    </h2>
                    <div>
                        <h2 className='font-medium text-lg'>
                            {chapter?.name}
                        </h2>
                        <p className='text-sm text-gray-500'>
                            {chapter?.about}
                        </p>
                        <p className='flex gap-2 text-blue-900 items-center flex-none'>
                           <FaRegClock/> {chapter?.duration}
                        </p>
                    </div>
                </div>
                <RiCheckboxCircleLine 
                    className='text-4xl text-gray-400'
                />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList