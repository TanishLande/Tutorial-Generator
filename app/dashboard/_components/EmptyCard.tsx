"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const ProfessionalCenteredPage = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/create-tutorial');
    }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative w-full aspect-square max-w-xs mx-auto">
          <Image
            src="/images/nocard.svg" // Replace with a suitable 3D image
            alt="ForgeFox Professional Icon"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Welcome to ForgeFox
        </h1>
        
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Unlock the full potential of your workflow with ForgeFox's innovative tools designed for professionals.
        </p>
        
        <div className="mt-8 space-y-4">
          <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleClick}
          >
            Get Started
          </Button>
          
          <Button variant="outline" className="w-full text-blue-600 bg-white hover:bg-gray-50 font-semibold py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out">
            Learn More
          </Button>
        </div>
        
        <p className="mt-4 text-xs text-gray-500 sm:text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalCenteredPage;
