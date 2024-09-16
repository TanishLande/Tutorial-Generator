"use client"
import React, { useContext, useEffect, useState } from 'react';

// icons
import { TbCategoryFilled } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";

import { Button } from '@/components/ui/button'; // Fixed import
import SelectCategory from './_components/SelectCategory';
import TopicsDescription from './_components/TopicsDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '@/app/_context/UserInputContext';

interface StepsProps {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface TutorialInput {
  category?: string;
  topic?: string;
  level?: string;
  duration?: number;
  displayVideo?: boolean;
  numberOfChapter?: number;
}


const CreateTutorial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const steps: StepsProps[] = [
    {
      id: 1,
      name: 'Category',
      icon: <TbCategoryFilled />
    },
    {
      id: 2,
      name: 'Details',
      icon: <FaLightbulb />
    },
    {
      id: 3,
      name: 'Options',
      icon: <CgOptions />
    },
  ];

  const { userTutorialInput } = useContext(UserInputContext);

  useEffect(() => {
    console.log(userTutorialInput);
  }, [userTutorialInput]);

  const CheckStatus = () => {
    let parsedInput: TutorialInput = {};
    
    try {
      parsedInput = JSON.parse(userTutorialInput);
    } catch (error) {
      // If JSON parsing fails, consider the input as invalid
      return true;
    }
    
    // Check if parsedInput is an empty object
    if (Object.keys(parsedInput).length === 0) {
      return true;
    }
  
    // Validate based on the current activeIndex
    if (activeIndex === 1 && (!parsedInput.category || parsedInput.category.trim() === '')) {
      return true;
    }
    
    if (activeIndex === 2 && (!parsedInput.topic || parsedInput.topic.trim() === '')) {
      return true;
    }
    
    if (activeIndex === 3 && (
      !parsedInput.level ||
      !parsedInput.duration ||
      parsedInput.displayVideo === undefined ||
      parsedInput.numberOfChapter === undefined
    )) {
      return true;
    }
  
    return false;
  };
  

  return (
    <div>
      {/* Steps */}
      <div className='flex justify-center items-center flex-col mt-10'>
        <h2 className='text-3xl text-black font-medium'>
          Generate Your Tutorial
        </h2>
        <div className='flex mt-10'>
          {steps.map((item, index) => (
            <div key={item.id} className='flex items-center'>
              <div
                className={`group flex flex-col items-center w-[50px] md:w-[100px]`}
                data-active={activeIndex >= item.id}
              >
                <div
                  className={`p-3 rounded-full text-white
                    group-data-[active=false]:bg-gray-200
                    group-data-[active=true]:bg-black
                  `}
                >
                  {item.icon}
                </div>
                <h2 className='md:block md:text-sm'>
                  {item.name}
                </h2>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`h-1 w-[50px] mb-4 md:w-[100px] rounded-full lg:w-[170px]
                    ${activeIndex > item.id ? 'bg-black' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {/* Main components */}
        {activeIndex === 1 ? <SelectCategory /> :
          activeIndex === 2 ? <TopicsDescription />
          : <SelectOption />
        }

        {/* Next and Previous buttons */}
        <div className='flex justify-between mt-10'>
          <Button
            onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 1))}
            variant='outline'
            disabled={activeIndex === 1}
            className="mt-4 gap-x-2"
          >
            <GrLinkPrevious />
            Previous
          </Button>
          {activeIndex < 3 &&
            <Button
              onClick={() => setActiveIndex((prev) => Math.min(prev + 1, steps.length))}
              className="mt-4 gap-x-2"
              disabled={CheckStatus()}
            >
              Next
              <GrLinkNext />
            </Button>
          }
          {activeIndex === 3 &&
            <Button
              className='mt-4 gap-x-2'
              disabled={CheckStatus()}
            >
              Generate
              <RiAiGenerate />
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateTutorial;
