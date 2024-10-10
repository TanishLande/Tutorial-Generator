"use client";

import React from 'react';
import { FaRegClock } from "react-icons/fa";
import { RiCheckboxCircleLine } from "react-icons/ri";
import EditChapter from './EditChapter';
import { Skeleton } from "@/components/ui/skeleton";

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
  courseOutput: { course: CourseDetails };
  createdBy: string;
  userName: string | null;
  userProfileImage: string | null;
}

interface ChapterListProps {
  course: Course | null;
  edit?: boolean;
  isLoading?: boolean;
}

const ChapterList: React.FC<ChapterListProps> = ({ course, edit = true, isLoading = false }) => {
  const SkeletonChapter = () => (
    <div className='border p-4 rounded-lg mb-3 flex items-center justify-between shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105'>
      <div className='flex gap-4 items-center'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div>
          <Skeleton className='h-6 w-40 mb-2' />
          <Skeleton className='h-4 w-60 mb-1' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>
      <Skeleton className='h-8 w-8 rounded-full' />
    </div>
  );

  if (isLoading) {
    return (
      <div className='mt-4'>
        <Skeleton className='h-8 w-40 mb-4' />
        <div className='mt-2'>
          {[...Array(3)].map((_, index) => (
            <SkeletonChapter key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mt-4'>
      <h2 className='font-bold text-2xl text-gray-800 mt-4 mb-3'>Chapters</h2>
      <div className='mt-2'>
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div key={index} className='border p-4 rounded-lg mb-3 flex items-center justify-between shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105'>
            <div className='flex gap-4 items-center'>
              <h2 className='bg-blue-900 flex-none h-10 w-10 p-2 rounded-full text-white text-center font-bold'>
                {index + 1}
              </h2>
              <div>
                <h2 className='font-semibold text-lg text-gray-800'>
                  {chapter?.name} {edit && <EditChapter course={course} index={index} />}
                </h2>
                <p className='text-sm text-gray-600'>{chapter?.about}</p>
                {/* Optional: Uncomment if duration is needed
                <p className='flex gap-2 text-blue-700 items-center mt-1'>
                  <FaRegClock className="text-blue-600" /> <span>{chapter?.duration}</span>
                </p> */}
              </div>
            </div>
            {edit ? (
              <RiCheckboxCircleLine className='text-4xl text-gray-400 hover:text-blue-700 transition-colors duration-200' />
            ) : (
              <RiCheckboxCircleLine className='text-4xl text-green-400 hover:text-blue-700 transition-colors duration-200' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
