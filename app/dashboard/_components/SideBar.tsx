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
      </div>
    </div>
  );
};

export default SideBar;