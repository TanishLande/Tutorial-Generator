// components/CardTutorial.tsx
import React from 'react';
import Link from 'next/link';

interface CardTutorialProps {
  tutorial: {
    id: number;
    name: string;
    category: string;
    level: string;
    includeVideo: string;
    createdBy: string;
    tutorialBanner: string;
    userName: string;
    userProfileImage: string | null;
    description?: string; // Optional description field
    tutorialId: string;
  };
}

const CardTutorial: React.FC<CardTutorialProps> = ({ tutorial }) => {
  return (
    <Link href={`/tutorial/${tutorial.tutorialId}`} className="block">
      <div className="bg-white rounded-lg shadow-md transition p-2 duration-300 ease-in-out border border-transparent hover:border-blue-400 hover:bg-blue-50 relative overflow-hidden">
        <img 
        src={tutorial.tutorialBanner} 
        alt={tutorial.name} 
        className="w-full h-48 object-cover rounded-md" />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{tutorial.name}</h3>
          <p className={`text-gray-600 ${tutorial.category === 'Programming' ? 'text-blue-600' : 'text-gray-600'}`}>
            {tutorial.category}
          </p>
          <p className={`text-gray-500 ${tutorial.level === 'Beginner' ? 'bg-green-200' : 'bg-yellow-200'} rounded px-2 inline-block`}>
            Level: {tutorial.level}
          </p>
          <p className="text-gray-500">Created by: {tutorial.userName || tutorial.createdBy}</p>
          <div className="flex items-center mt-2">
            <img src={tutorial.userProfileImage || 'default-profile.png'} alt={tutorial.userName} className="w-8 h-8 rounded-full mr-2" />
            <span>{tutorial.userName || 'Unknown User'}</span>
          </div>
          <p className="text-gray-500 mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{tutorial.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardTutorial;
