"use client";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link'; // Import Link from next/link

// Logos
import { IoHomeOutline } from 'react-icons/io5';
import { MdExplore } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

// 
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';


interface MenuProps {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

const SideBar: React.FC = () => {
  // Menu for SideBar with proper typing
  const Menu: MenuProps[] = [
    {
      id: 1,
      name: 'Home',
      icon: <IoHomeOutline />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Explore',
      icon: <MdExplore />,
      path: '/dashboard/explore',
    },
    {
      id: 3,
      name: 'Premium',
      icon: <TbPremiumRights />,
      path: '/dashboard/premium',
    },
    {
      id: 4,
      name: 'Logout',
      icon: <LuLogOut />,
      path: '/dashboard/logout',
    },
  ];
  
  const path = usePathname();

  return (
    <div className='fixed h-full md:w-64 p-5 shadow-lg'>
      <div
        className='flex gap-x-2'
      >
      <Image
        src='/logo.svg'
        alt='Logo'
        width={60}
        height={60}
        className='mb-5'
      />
      <h1 
        className='text-black text-xl' 
       >
        Forge AI
      </h1>
      </div>
      

      <hr className='py-3' />

      {/* Showing Menu List */}
      <ul>
        {Menu.map((item) => (
          <li
            key={item.id} // Use item.id as the key
            className={`flex items-center gap-2 p-3 rounded-lg m-2 cursor-pointer ${
              item.path === path
                ? 'bg-gray-100 text-black'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <Link href={item.path} className="flex items-center gap-2">
              <div className='text-2xl'>
                {item.icon}
              </div>
              <h2>
                {item.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>

      {/* Loading progress */}
      <div
        className='absolute bottom-10 w-[80%]'
      >
        <Progress value={40} />
        <h4 className='text-black text-base my-2'  >3 Out of 5 Course created.</h4>
        <h2 className='text-xs text-gray-500'>Upgrade to premium for unlimited courses.</h2>
      </div>
    </div>
  );
};

export default SideBar;
