"use client";

import React from 'react';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Add = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleRouting = () => {
    router.push('/create-tutorial');
  };

  const handleExplore = () => {
    router.push('/dashboard/explore'); // Assuming this route exists
  };

  const handleBookReview = () => {
    router.push('/create-book-review'); // Assuming this route exists
  };

  return (
    <div className="relative min-h-[450px] flex flex-col justify-center p-8 rounded-xl shadow-2xl overflow-hidden bg-black">
      {/* Subtle Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
        style={{
          backgroundImage: "url('/api/placeholder/1600/900')", // Replace with your cool, professional image
          filter: "grayscale(100%) contrast(120%)"
        }}
      />
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-gray-100">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 md:flex ">
          Welcome, <div className="text-white">{user?.fullName}</div>
        </h2>
        <p className="text-lg mb-10 text-base text-gray-300 max-w-2xl leading-relaxed md:text-xl">
          Elevate your learning experience. Create powerful AI-driven tutorials, 
          share knowledge effortlessly, and explore a world of innovative education.
        </p>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Hint
            label="Create new AI tutorial"
            side="bottom"
            align="start"
            sideOffset={18}
          >
            <Button
              onClick={handleRouting}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-4 rounded-lg text-lg font-semibold"
            >
              + New Tutorial
            </Button>
          </Hint>

          <Hint
            label="Get review of a book"
            side="bottom"
            align="start"
            sideOffset={18}
          >
            <Button
              onClick={handleBookReview}
            className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300 py-4 rounded-lg text-lg font-semibold"
          >
            +  Book Review
          </Button>
          </Hint>

          <Hint
            label="Explore Tutorials"
            side="bottom"
            align="start"
            sideOffset={18}
          >
            <Button
            onClick={handleExplore}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300 py-4 rounded-lg text-lg font-semibold"
          >
            Explore Tutorials
          </Button>
          </Hint>
          
        </div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-20 z-10" />
    </div>
  );
};

export default Add;