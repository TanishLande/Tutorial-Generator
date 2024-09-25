import React, { useState } from 'react';
import { CiTimer } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";

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
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
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

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '340px' }}
    >
      <div className="relative h-full">
        <div 
          className={`transition-all rounded-xl duration-300 ease-in-out absolute inset-0 bg-cover bg-center`}
          style={{
            backgroundImage: `url(${tutorial.tutorialBanner || "/placeholder-image.jpg"})`,
            height: isHovered ? '160px' : '200px',
            top: 0,
          }}
        />
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-outs ${isHovered ? 'opacity-50' : 'opacity-0'}`}
          style={{
            height: isHovered ? '160px' : '200px',
            top: 0,
          }}
        />
        <div 
          className={`absolute rounded-xl left-0 right-0 bg-white transition-all duration-300 ease-in-out`}
          style={{
            top: isHovered ? '160px' : '200px',
            height: isHovered ? '180px' : '140px',
          }}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{tutorial.courseOutput.course.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                <TbCategoryPlus className="inline mr-1" />
                {tutorial.category}
              </span>
              <span className="px-2 py-1 rounded text-sm bg-purple-100 text-purple-800">
                <CiTimer className="inline mr-1" />
                {tutorial.courseOutput.course.duration}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${getLevelStyle(tutorial.level)}`}>
                {tutorial.level}
              </span>
            </div>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden`}
              style={{ maxHeight: isHovered ? '80px' : '0px' }}
            >
              <p className="text-sm text-gray-600">
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