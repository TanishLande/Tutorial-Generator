// components/NoData.tsx
import React from 'react';
import Image from 'next/image'; // Use next/image for optimized images

const NoData: React.FC<{ onPrevious: () => void }> = ({ onPrevious }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-500px)] bg-gray-100 transition-all duration-300 w-full">
      <div className="text-center">
        <Image 
          src="/images/nocard.svg" 
          alt="No Data" 
          width={200} 
          height={200} 
          className="animate-bounce" // Add bounce animation to the image
        />
        <p className="mt-4 text-lg font-semibold text-gray-800">No tutorials available.</p>
        <button 
          onClick={onPrevious} 
          className="mt-6 bg-blue-900 text-white p-3 rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
        >
          Go to Previous
        </button>
      </div>
    </div>
  );
};

export default NoData;
