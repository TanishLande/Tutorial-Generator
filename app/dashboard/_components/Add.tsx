"use client";
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

const Add = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleRouting = () => {
    router.push('/create-tutorial');
  };

  return (
    <div className="flex flex-col items-start justify-between p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Welcome, 
          <span className="font-extrabold text-blue-900"> {user?.fullName}</span>
        </h2>
        <p className="mt-2 text-lg text-gray-600 max-w-md">
          Create your own tutorials, learn easily, share with friends, and explore more.
        </p>
      </div>
      <Hint
        label= "Create new Ai tutorial"
        side="bottom"
        align="start"
        sideOffset={18}
      >
      <Button
        onClick={handleRouting}
        className="mt-4 w-full md:w-1/2 lg:w-1/3 bg-blue-900 text-white hover:bg-sky-700 transition duration-300 py-3 rounded-lg"
      >
        + New Tutorial
      </Button>
      </Hint>
    </div>
  );
};

export default Add;
