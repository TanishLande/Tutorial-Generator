"use client"
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const CreateTutorialCard = () => {
    const router = useRouter();

    return (
      <Card 
        className="w-full max-w-sm h-[28rem] transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg flex flex-col justify-center items-center cursor-pointer"
        onClick={() => router.push('/create-tutorial')}
      >
        <Plus className="h-20 w-20 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">Create New Tutorial</h3>
      </Card>
    );
  };

export default CreateTutorialCard
