import React from 'react';
import Image from 'next/image';
import { TbCategoryPlus } from "react-icons/tb";
import { Button } from "@/components/ui/button"

interface CourseDetails {
  name: string;
  description: string;
  category: string;
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

interface TutorialBasicInfoProps {
  course: Course | null; // Allow course to be null
}

const TutorialBasicInfo = ({ course }: TutorialBasicInfoProps) => {
  // Handle case when course is null
  if (!course) {
    return <div>Loading...</div>; // or some other loading state
  }

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl '>
            {course.courseOutput.course.name}
          </h2>
          <p className='text-sm text-gray-400 mb-5 sm:mb-0'>
            {course.courseOutput.course.description}
          </p>
          <h2
            className='font-medium mt-2 flex gap-2 items-center text-blue-900'
          >
           <TbCategoryPlus />{course.courseOutput.course.category}
          </h2>
          <Button
            className='w-full mt-5'
            variant='blue'
          >
            Start
          </Button>
        </div>
        <div>
            <Image 
                src='/images/placeholder.png'
                alt="Image Placeholder"
                className='w-full rounded-xl h-[250px] object-cover'
                width={300}
                height={300}
            />
        </div>
      </div>
    </div>
  );
}

export default TutorialBasicInfo;
