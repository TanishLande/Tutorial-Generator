import React, { useEffect, useState } from 'react';
import { Loader2, CircleDot } from 'lucide-react';

interface LoadingPageMainProps {
  text: string;
}

const LoadingPageMain = ({ text }: LoadingPageMainProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 10);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="w-64 h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className="text-blue-500 progress-ring__circle stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="url(#gradient)"
            strokeDasharray="251.2"
            strokeDashoffset="100"
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}
          ></circle>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      </div>
      
      <h2 className="mt-8 text-3xl font-bold text-gray-800 animate-pulse">
        Loading your experience
      </h2>
      
      <div className="mt-4 flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <CircleDot 
            key={i} 
            className={`w-4 h-4 text-blue-500 animate-pulse`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      
      <p className="mt-4 text-lg text-gray-600">
        Please wait while we prepare your content
      </p>
      
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 max-w-md transform transition-all hover:scale-105 duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{text}</h3>
        {/* <p className="text-gray-600">{text}</p> */}
      </div>
    </div>
  );
};

export default LoadingPageMain;