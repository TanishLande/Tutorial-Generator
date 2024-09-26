"use client";

import React from 'react';
import { Progress } from '@/components/ui/progress';
import Logo from "./logo";
import SidebarRoutes from './SidebarRoutes';

interface SideBarProps {
  onItemClick?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onItemClick }) => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>
      
      <div className='flex flex-col w-full'>
        <SidebarRoutes onItemClick={onItemClick} />
      </div>
      
      <div className='mt-auto p-4'>
        <Progress value={40} />
        <h4 className='text-black text-base my-2'>3 Out of 5 Course created.</h4>
        <h2 className='text-xs text-gray-500'>Upgrade to premium for unlimited courses.</h2>
      </div>
    </div>
  );
};

export default SideBar;