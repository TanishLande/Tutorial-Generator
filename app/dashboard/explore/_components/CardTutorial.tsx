import React from 'react';
import Link from 'next/link';
import { Tag } from '@/components/ui/tag';

interface Tutorial {
  id: number;
  name: string;
  category: string;
  level: string;
  includeVideo: string;
  createdBy: string;
  tutorialBanner: string;
  userName: string;
  userProfileImage: string | null;
  description?: string;
  tutorialId: string;
}

const CardTutorial: React.FC<{ tutorial: Tutorial }> = ({ tutorial }) => {
  const {
    tutorialId,
    tutorialBanner,
    name,
    category,
    level,
    userName,
    userProfileImage,
    description
  } = tutorial;

  return (
    <Link href={`/tutorial/${tutorialId}`} className="block">
      <div className="bg-white rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg p-4 border border-gray-200 hover:bg-blue-100/10 hover:border-blue-400">
        <img
          src={tutorialBanner}
          alt={name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Tag variant={category === 'Programming' ? 'blue' : 'gray'}>{category}</Tag>
          <Tag variant={level === 'Beginner' ? 'green' : 'yellow'}>Level: {level}</Tag>
        </div>
        <div className="flex items-center mb-3">
          <img 
            src={userProfileImage || '/default-profile.png'} 
            alt={userName} 
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{userName || 'Unknown User'}</span>
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 hover:line-clamp-none">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CardTutorial;