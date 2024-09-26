"use client";

import React from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import Logo from "./logo"
import SidebarRoutes from './SidebarRoutes';


const SideBar: React.FC = () => {
  
  const path = usePathname();

  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>

      {/* Showing Menu List */}
      <div className='flex flex-col w-full'>
          <SidebarRoutes />
      </div>
      {/* <ul>
        {Menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <li
              className={`flex items-center gap-2 p-3 rounded-lg m-2 cursor-pointer ${
                item.path === path
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <div
                className='text-2xl flex items-center gap-2 w-full'
              >
                {item.icon}
                <h2 className='text-lg'>{item.name}</h2>
              </div>
            </li>
          </Link>
        ))}
      </ul> */}

      {/* Loading progress */}
      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={40} />
        <h4 className='text-black text-base my-2'>3 Out of 5 Course created.</h4>
        <h2 className='text-xs text-gray-500'>Upgrade to premium for unlimited courses.</h2>
      </div>
    </div>
  );
};

export default SideBar;