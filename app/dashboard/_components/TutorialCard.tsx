"use client"
import React, { useState } from 'react';
import { CiTimer } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from './DropDown';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

interface Chapter {
  name: string;
  // Add other chapter properties as needed
}

interface CourseDetails {
  name: string;
  description: string;
  category: string;
  duration: string;
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

interface TutorialCardProps {
  tutorial: Course;
  refreshData: () => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, refreshData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getLevelStyle = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    try{
        const res = await db.delete(CourseList)
      .where(
        eq(CourseList.id,tutorial?.id)
      )
      .returning({id:CourseList?.id})

      if(res){
        refreshData()
      }
    } catch (error){
      console.log(error);
    }
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '340px' }}
    >
      <div className="relative h-full">
        <div
          className={`transition-all rounded-t-xl duration-300 ease-in-out absolute inset-0 bg-cover bg-center`}
          style={{
            backgroundImage: `url(${tutorial.tutorialBanner || "/placeholder-image.jpg"})`,
            height: isHovered ? '160px' : '200px',
            top: 0,
          }}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-50' : 'opacity-0'}`}
          style={{
            height: isHovered ? '160px' : '200px',
            top: 0,
          }}
        />
        <div className="absolute top-2 right-2 z-10">
          <DropDown
            handleDelete = {() => handleDelete()}
          >
            <div className="p-1 rounded-xl bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300">
              <BsThreeDotsVertical className="text-gray-700" />
            </div>
          </DropDown>
        </div>
        <div
          className={`absolute left-0 right-0 bg-white transition-all duration-300 ease-in-out`}
          style={{
            top: isHovered ? '160px' : '200px',
            height: isHovered ? '180px' : '140px',
          }}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{tutorial.courseOutput.course.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                <TbCategoryPlus className="inline mr-1" />
                {tutorial.category}
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                <CiTimer className="inline mr-1" />
                {tutorial.courseOutput.course.duration}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getLevelStyle(tutorial.level)}`}>
                {tutorial.level}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden`}
              style={{ maxHeight: isHovered ? '60px' : '0px' }}
            >
              <p className="text-sm text-gray-600 line-clamp-3">
                {tutorial.courseOutput.course.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;