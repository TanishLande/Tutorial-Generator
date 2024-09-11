"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();
  return (
    <div
        className='flex justify-between bg-gray-50 p-5 shadow-sm'
    >
      <div
       className='flex gap-x-2'
      >
      <Image
        src="/logo.svg"  // The path starts from the root, no need for /public
        alt="Logo"       // Always include alt for accessibility
        width={50}
        height={50}
      />
      <h1
       className='text-2xl mt-1'
      >
        ForgeFox
      </h1>
      </div>
      
      <Button
        onClick={()=>{
          router.push('/dashboard');
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Header;
