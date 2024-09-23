import React from 'react'
import { IoBarChartOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineTopic } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";

interface CourseDetails {
    name: string;
    description: string;
    category: string;
    duration?: string;
    topic?: string;
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
  
  interface TutorialDetailsProps {
    course: Course | null; // Allow course to be null
  }
  

const TutorialDetails = ({
    course
}: TutorialDetailsProps ) => {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'> 
            <div className='flex gap-2'>   
            <IoBarChartOutline className='text-4xl mt-2 text-blue-900' />
            <div>
                <h2 className='text-xs text-gray-500'>Skill Level:</h2>
                <h2 className='font-medium text-lg' >{course?.level}</h2>
            </div>
            </div>
            <div className='flex gap-2'>   
            <FaRegClock className='text-4xl mt-2 text-blue-900' />
            <div>
                <h2 className='text-xs text-gray-500'>Duration:</h2>
                <h2 className='font-medium text-lg' >{course?.courseOutput?.course?.duration}</h2>
            </div>
            </div>
            <div className='flex gap-2'>   
            <MdOutlineTopic className='text-4xl mt-2 text-blue-900' />
            <div>
                <h2 className='text-xs text-gray-500'>Topic:</h2>
                <h2 className='font-medium text-lg' >{course?.courseOutput?.course?.topic}</h2>
            </div>
            </div>
            <div className='flex gap-2'>   
            <FaCirclePlay className='text-4xl mt-2 text-blue-900' />
            <div>
                <h2 className='text-xs text-gray-500'>Video Included:</h2>
                <h2 className='font-medium text-lg' >{course?.includeVideo}</h2>
            </div>
            </div>
        </div>
    </div>
  )
}

export default TutorialDetails