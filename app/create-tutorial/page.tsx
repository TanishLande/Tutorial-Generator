"use client"
import React, { useContext, useEffect, useState } from 'react';
import { TbCategoryFilled } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";

import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicsDescription from './_components/TopicsDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '@/app/_context/UserInputContext';
import { GernerateTutorialLayoutAI } from '@/configs/AiModal';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
// import { v4 as uuidv4 } from 'uuid';
import uuid4 from "uuid4";
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

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

interface TutorialLayout {
  courseName: string;
  description: string;
  chapters: {
    name: string;
    about: string;
    duration: string;
  }[];
}

const CreateTutorial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { userTutorialInput } = useContext(UserInputContext);
  const [parsedInput, setParsedInput] = useState<TutorialInput>({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const steps: StepsProps[] = [
    { id: 1, name: 'Category', icon: <TbCategoryFilled /> },
    { id: 2, name: 'Details', icon: <FaLightbulb /> },
    { id: 3, name: 'Options', icon: <CgOptions /> },
  ];

  useEffect(() => {
    try {
      const parsed = JSON.parse(userTutorialInput);
      setParsedInput(parsed);
    } catch (error) {
      console.error("Error parsing userTutorialInput:", error);
      setParsedInput({});
    }
  }, [userTutorialInput]);

  const checkStatus = () => {
    if (Object.keys(parsedInput).length === 0) return true;

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

  const generateTutorialLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = 'Generate a course or tutorial on following detail with field as course name, description, along with chapter name, about, duration:';
    const USER_INPUT_PROMPT = `Category: ${parsedInput.category}, Topic: ${parsedInput.topic}, Level: ${parsedInput.level}, Duration: ${parsedInput.duration} hours, noOfChapter: ${parsedInput.numberOfChapter},  in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT
    
    console.log(FINAL_PROMPT);

    const result = await GernerateTutorialLayoutAI.sendMessage(FINAL_PROMPT);
    console.log(result);
    const parsedResult = JSON.parse(result.response?.text() || '{}') as TutorialLayout;
    console.log(parsedResult);
    setLoading(false);
    SaveTutorialLayoutInDb(parsedResult);
  };

  const SaveTutorialLayoutInDb = async (tutorialLayout: TutorialLayout) => {
    const id = uuid4();
    setLoading(true);
    try {
      const result = await db.insert(CourseList).values({
        tutorialId: id,
        name: parsedInput?.topic || '',
        level: parsedInput?.level || '',
        category: parsedInput?.category || '',
        includeVideo: parsedInput?.displayVideo ? 'Yes' : 'No',
        courseOutput: JSON.stringify(tutorialLayout),
        createdBy: user?.primaryEmailAddress?.emailAddress || '',
        userName: user?.fullName || '',
        userProfileImage: user?.imageUrl || ''
      });
      console.log("Tutorial saved successfully:", result);
      router.replace(`/create-tutorial/${id}`)
    } catch (error) {
      console.error("Error saving tutorial:", error);
    } finally {
      setLoading(false);
      console.log("finished");
    }
  };

  return (
    <div>
      {/* Steps */}
      <div className='flex justify-center items-center flex-col mt-10'>
        <h2 className='text-3xl text-black font-medium'>Generate Your Tutorial</h2>
        <div className='flex mt-10'>
          {steps.map((item, index) => (
            <div key={item.id} className='flex items-center'>
              <div className={`group flex flex-col items-center w-[50px] md:w-[100px]`} data-active={activeIndex >= item.id}>
                <div className={`p-3 rounded-full text-white group-data-[active=false]:bg-gray-200 group-data-[active=true]:bg-black`}>
                  {item.icon}
                </div>
                <h2 className='md:block md:text-sm'>{item.name}</h2>
              </div>
              {index !== steps.length - 1 && (
                <div className={`h-1 w-[50px] mb-4 md:w-[100px] rounded-full lg:w-[170px] ${activeIndex > item.id ? 'bg-black' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {/* Main components */}
        {activeIndex === 1 ? <SelectCategory /> :
         activeIndex === 2 ? <TopicsDescription /> :
         <SelectOption />
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
              disabled={checkStatus()}
            >
              Next
              <GrLinkNext />
            </Button>
          }
          {activeIndex === 3 &&
            <Button
              className='mt-4 gap-x-2'
              disabled={checkStatus()}
              onClick={generateTutorialLayout}
            >
              Generate
              <RiAiGenerate />
            </Button>
          }
        </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  );
};

export default CreateTutorial;