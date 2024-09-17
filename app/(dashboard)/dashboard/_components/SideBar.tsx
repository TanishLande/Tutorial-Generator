"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdExplore } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

interface MenuProps {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

const SideBar: React.FC = () => {
  const Menu: MenuProps[] = [
    {
      id: 1,
      name: 'My Workspace',
      icon: <IoBookOutline />,
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
      <div className='flex gap-x-2'>
        <Image
          src='/logo.svg'
          alt='Logo'
          width={60}
          height={60}
          className='mb-5'
        />
        <h1 className='text-black text-xl'>
          ForgeFox
        </h1>
      </div>

      <hr className='py-3' />

      {/* Showing Menu List */}
      <ul>
        {Menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <li
              className={`flex items-center gap-2 p-3 rounded-lg m-2 cursor-pointer ${
                item.path === path
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: item.path === path ? -5 : 0 }}
                whileHover={{
                  y: [0, -5, 0],
                  transition: { duration: 0.5, repeat: 5 }
                }}
                className='text-2xl flex items-center gap-2 w-full'
              >
                {item.icon}
                <h2 className='text-lg'>{item.name}</h2>
              </motion.div>
            </li>
          </Link>
        ))}
      </ul>

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