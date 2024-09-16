"use client"
import React, { useState } from 'react'

// icons
import { TbCategoryFilled } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";

import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicsDescription from './_components/TopicsDescription';
import SelectOption from './_components/SelectOption';

interface StepsProps {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const CreateTutorial = () => {
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
                  className={`
                    p-3 rounded-full text-white
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
                  className={`
                    h-1 w-[50px] mb-4 md:w-[100px] rounded-full lg:w-[170px] 
                    ${activeIndex > item.id ? 'bg-black' : 'bg-gray-200'}
                  `} 
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
      className='px-10 md:px-20 lg:px-44 mt-10'
      >

      {/* main components */}

      {activeIndex == 1 ? <SelectCategory /> : 
        activeIndex == 2 ? <TopicsDescription />
        : <SelectOption />
      }

      {/* next and previous button */}
      <div
        className='flex justify-between mt-10 '
      >
      <Button
        onClick={() => setActiveIndex((prev) => Math.min(prev - 1, steps.length))}
        variant='outline'
        disabled={activeIndex == 1}
        className="mt-4 gap-x-2"
      >
        <GrLinkPrevious />
        Previous
      </Button>
      {activeIndex<3 &&
        <Button
        onClick={() => setActiveIndex((prev) => Math.min(prev + 1, steps.length))}
        className="mt-4 gap-x-2"
      >
        
        Next
        <GrLinkNext />
      </Button>
      }
      {activeIndex===3 && 
        <Button
          className='mt-4 gap-x-2 '
        >
          Generate
          <RiAiGenerate />
        </Button>}
      </div>
      </div>
    </div>
  )
}

export default CreateTutorial