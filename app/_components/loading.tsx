"use client"

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const LoadingAnimation = ({ customInput = '', loadingMessage = 'Preparing dashboard' }) => {
  const [loadingText, setLoadingText] = useState('');
  const [progress, setProgress] = useState(0);
  const baseText = `${loadingMessage} for ${customInput || 'you'}`;
  const fullText = `${baseText}...`;

  useEffect(() => {
    let textIndex = 0;
    const textIntervalId = setInterval(() => {
      setLoadingText(fullText.slice(0, textIndex));
      textIndex = (textIndex + 1) % (fullText.length + 1);
    }, 100);

    let progressValue = 0;
    const progressIntervalId = setInterval(() => {
      progressValue += 1;
      setProgress(progressValue > 100 ? 100 : progressValue);
    }, 50);

    return () => {
      clearInterval(textIntervalId);
      clearInterval(progressIntervalId);
    };
  }, [fullText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/logo.svg"
            alt="Company Logo"
            width={220}
            height={220}
            className="h-auto animate-pulse mb-10"
          />
          <div className="relative">
            <Loader2 className="animate-spin text-black" size={48} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-black">{progress}%</span>
            </div>
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-700 text-center mb-4">
          {loadingText}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-black h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Please wait while we set things up for you...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;