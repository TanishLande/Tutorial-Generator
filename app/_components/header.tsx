"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DashboardLoadingPage from './dashBoardLoading';

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    // Simulate loading time
    setTimeout(() => {
      router.push('/dashboard');
    }); // 5 seconds delay to showcase the animation
  };

  if (loading) {
    return <DashboardLoadingPage text="Loading..." />;
  }

  return (
    <div className='flex justify-between bg-gray-50 p-5 shadow-sm'>
      <div className='flex gap-x-2'>
        <Image
          src="/logo.svg"
          alt="ForgeFox Logo"
          width={50}
          height={50}
        />
        <h1 className='text-2xl mt-1'>
          ForgeFox
        </h1>
      </div>
      
      <Button onClick={handleGetStarted}>
        Get Started
      </Button>
    </div>
  );
};

export default Header;