"use client";

import React, { useContext } from 'react';
import Image from 'next/image';
import { CategoryList } from '@/app/_Shared/CategoryList';
import { UserInputContext } from '@/app/_context/UserInputContext';

const SelectCategory: React.FC = () => {
  const { userTutorialInput, setUserTutorialInput } = useContext(UserInputContext);

  interface IdProps {
    category: string;
  }

  const handleCategoryChange = ({ category }: IdProps) => {
    setUserTutorialInput(prev => {
      try {
        const prevObject = JSON.parse(prev);
        return JSON.stringify({ ...prevObject, category });
      } catch {
        return JSON.stringify({ category });
      }
    });
  };

  // Parse userTutorialInput to get the current category
  let currentCategory = '';
  try {
    const userInput = JSON.parse(userTutorialInput);
    currentCategory = userInput.category || '';
  } catch {
    // If parsing fails, assume no category is selected
  }

  return (
    <>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 my-8 text-center'>
          Select a Category for Your Tutorial
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {CategoryList.map((item) => (
          <div
            key={item.id}
            className={`
              flex flex-col items-center justify-between p-3 sm:p-4 rounded-lg
              transition-all duration-300 ease-in-out
              ${
                currentCategory === item.name
                  ? 'bg-black text-white scale-105 rotate-1'
                  : 'bg-gray-100 border-black hover:bg-blue-100 hover:scale-102 hover:-rotate-1'
              }
              cursor-pointer shadow-md hover:shadow-lg
              h-full
            `}
            onClick={() => handleCategoryChange({ category: item.name })}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-2 transition-transform duration-300 ease-in-out transform hover:scale-110">
                <Image
                  src={item.icon}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-center font-medium mb-2 text-sm sm:text-base">{item.name}</span>
            </div>
            {/* <p className="text-xs sm:text-sm text-center mt-2 flex-grow">
              {item.description || 'No description available'}
            </p> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectCategory;