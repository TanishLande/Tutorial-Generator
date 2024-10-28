// "use client";

// import React, { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { and, eq } from 'drizzle-orm';
// import { db } from '@/configs/db';
// import { CourseList } from '@/configs/schema';
// import TutorialBasicInfo from '../_components/CourseBasicInfo';
// import { FaCopy } from "react-icons/fa";
// import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

// interface TutorialLayoutProps {
//   params: {
//     tutorialId: string;
//   };
// }

// interface Chapter {
//   name: string;
//   // Add other chapter properties as needed
// }

// interface CourseDetails {
//   name: string;
//   description: string;
//   category: string;
//   chapters: Chapter[];
//   language: string;
//   topic: string;    
//   duration: string;
// }

// export interface Course {
//   id: number;
//   name: string;
//   tutorialId: string;
//   category: string;
//   level: string;
//   includeVideo: string;
//   createdBy: string;
//   userName: string | null;
//   userProfileImage: string | null;
//   tutorialBanner: string | null;
//   publish: boolean | null;
//   courseOutput: {
//     course: CourseDetails;
//   };
// }

// const FinalTutorial = ({ params }: TutorialLayoutProps) => {
//   const { user } = useUser();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [isComplete, setIsComplete] = useState(false);

//   useEffect(() => {
//     if (params && user) {
//       getTutorial();
//     }
//   }, [params, user]);

//   const getTutorial = async () => {
//     try {
//       const result = await db
//         .select()
//         .from(CourseList)
//         .where(
//           and(
//             eq(CourseList.tutorialId, params.tutorialId),
//             eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress ?? '')
//           )
//         );

//       setCourse(result[0] as Course);
//       setIsComplete(result[0]?.publish ?? false);
//     } catch (err) {
//       console.error('Error fetching course:', err);
//     }
//   };

//   const handleCopy = () => {
//     if (course) {
//       const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/tutorial/view/${course.tutorialId}`;
//       navigator.clipboard.writeText(url);
//       alert('Tutorial URL copied to clipboard!');
//     }
//   };


//   // if(!language){
//   //   language = "English"
//   // }

//   return (
//     <div className="flex justify-center">
//       <div className="px-10 md:px-20 lg:px-44 my-7">
//         <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Congratulations!</h2>
//         <p className="text-sm md:text-lg text-center mb-4">
//           You have successfully completed your tutorial. Well done on this remarkable achievement!
//         </p>
//         <TutorialBasicInfo course={course} edit={false} language={course?.courseOutput.course.language || "English"} />
        
//         {/* Copy link */}
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-sm">
//           <h2 className='text-2xl font-semibold mb-2'>Your Tutorial URL:</h2>
//           <div className='flex items-center justify-between p-2 bg-gray-100 rounded-md'>
//             <span className='text-gray-700'>
//               {process.env.NEXT_PUBLIC_HOST_NAME}/tutorial/{course?.tutorialId}/maintutorial
//             </span>
//             <FaCopy 
//               className='h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800' 
//               onClick={handleCopy} 
//               title="Copy URL"
//             />
//           </div>
//           <p className="text-xs text-gray-500 mt-1 text-center">Click the icon to copy the URL.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinalTutorial;


/////Second code 

"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import TutorialBasicInfo from '../_components/CourseBasicInfo';
import { FaCopy } from "react-icons/fa";

interface TutorialLayoutProps {
  params: {
    tutorialId: string;
  };
}

interface Chapter {
  name: string;
  title: string;
  content: string;
}


interface CourseDetails {
  name: string;
  description: string;
  category: string;
  chapters: Chapter[];
  language: string;
  topic: string;     // Added missing property
  duration: string;  // Added missing property
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
  tutorialBanner?: string;
  publish: boolean | null;
  courseOutput: {
    course: CourseDetails;
  };
}

const FinalTutorial = ({ params }: TutorialLayoutProps) => {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [_isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (params && user) {
      getTutorial();
    }
  }, [params, user]);

  const getTutorial = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.tutorialId, params.tutorialId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress ?? '')
          )
        );

      setCourse(result[0] as Course);
      setIsComplete(result[0]?.publish ?? false);
    } catch (err) {
      console.error('Error fetching course:', err);
    }
  };

  const handleCopy = () => {
    if (course) {
      const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/tutorial/view/${course.tutorialId}`;
      navigator.clipboard.writeText(url);
      alert('Tutorial URL copied to clipboard!');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="px-10 md:px-20 lg:px-44 my-7">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Congratulations!</h2>
        <p className="text-sm md:text-lg text-center mb-4">
          You have successfully completed your tutorial. Well done on this remarkable achievement!
        </p>
        <TutorialBasicInfo 
          course={course} 
          edit={false} 
          language={course?.courseOutput.course.language || "English"} 
        />
        
        {/* Copy link */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-sm">
          <h2 className='text-2xl font-semibold mb-2'>Your Tutorial URL:</h2>
          <div className='flex items-center justify-between p-2 bg-gray-100 rounded-md'>
            <span className='text-gray-700'>
              {process.env.NEXT_PUBLIC_HOST_NAME}/tutorial/{course?.tutorialId}/maintutorial
            </span>
            <FaCopy 
              className='h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800' 
              onClick={handleCopy} 
              title="Copy URL"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">Click the icon to copy the URL.</p>
        </div>
      </div>
    </div>
  );
};

export default FinalTutorial;