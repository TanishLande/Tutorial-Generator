"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const NoTutorials = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Image 
        src="/api/placeholder/400/300" 
        alt="No tutorials" 
        className="mb-8 rounded-lg shadow-md"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        You have not yet created any tutorials yet
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Start your journey as an educator by creating your first AI-powered tutorial. It is easy and fun!
      </p>
      <Link href="http://localhost:3000/create-tutorial" passHref>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Your First Tutorial
        </Button>
      </Link>
    </div>
  );
};

export default NoTutorials;