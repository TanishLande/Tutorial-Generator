import React from 'react';
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
  courseOutput: { course: CourseDetails }; 
  createdBy: string;
  userName: string | null;
  userProfileImage: string | null;
}

interface TutorialDetailsProps {
  course: Course | null;
}

const TutorialDetails: React.FC<TutorialDetailsProps> = ({ course }) => {
  return (
    <div className='border p-6 rounded-xl shadow-lg mt-3 bg-white'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Course Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'> 
        <DetailCard 
          icon={<IoBarChartOutline className='text-4xl' />}
          label="Skill Level"
          value={course?.level}
        />
        <DetailCard 
          icon={<FaRegClock className='text-4xl' />}
          label="Duration"
          value={course?.courseOutput?.course?.duration}
        />
        <DetailCard 
          icon={<MdOutlineTopic className='text-4xl' />}
          label="Topic"
          value={course?.courseOutput?.course?.topic}
        />
        <DetailCard 
          icon={<FaCirclePlay className='text-4xl' />}
          label="Video Included"
          value={course?.includeVideo}
        />
      </div>
    </div>
  );
}

const DetailCard: React.FC<{ icon: React.ReactNode, label: string, value?: string }> = ({ icon, label, value }) => {
  return (
    <div className='flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-gray-50'>
      <div className='text-blue-900 mr-4'>
        {icon}
      </div>
      <div>
        <h2 className='text-xs text-gray-500'>{label}</h2>
        <h2 className='font-medium text-lg text-gray-800'>{value || 'N/A'}</h2>
      </div>
    </div>
  );
};

export default TutorialDetails;
