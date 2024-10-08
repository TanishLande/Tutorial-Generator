"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import CardTutorial from './_components/CardTutorial';
import Cardskeleton from './_components/Skeleton';
import NoData from './_components/NoData';

const Page = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const tutorialsPerPage = 10;

  useEffect(() => {
    GetAllTutorials();
  }, [currentPage]);

  const GetAllTutorials = async () => {
    setLoading(true);
    const result = await db.select()
      .from(CourseList)
      .limit(tutorialsPerPage)
      .offset(currentPage * tutorialsPerPage);
    setTutorials(result as any);
    setLoading(false);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const isDataAvailable = tutorials.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold">Explore more projects</h2>
      <p>Explore more projects built by the community</p>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 md:mt-12">
        {loading 
          ? Array.from({ length: tutorialsPerPage }).map((_, index) => 
          <div className='w-full h-full pr-300'>
            <Cardskeleton key={index} />
          </div>
        ) 
          : isDataAvailable 
          ? tutorials.map((tutorial) => (
              <CardTutorial key={tutorial?.tutorialId} tutorial={tutorial as any} />
            ))
          : <NoData onPrevious={handlePrevious} />
        }
      </div>
      <div className="flex justify-between mt-8">
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 0} 
          className={`bg-blue-900 text-white p-2 rounded-xl shadow-sm  px-4 py-2 ${currentPage === 0 ? 'cursor-not-allowed  bg-gray-400 text-white hover:bg-gray-400 text-black' : ' hover:bg-blue-900/80'}`}
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={!isDataAvailable} 
          className={`bg-blue-900 text-white p-2 rounded-xl shadow-sm  px-4 py-2 ${!isDataAvailable ? 'cursor-not-allowed  bg-gray-400 text-white hover:bg-gray-400 text-black' : 'hover:bg-blue-900/80'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
