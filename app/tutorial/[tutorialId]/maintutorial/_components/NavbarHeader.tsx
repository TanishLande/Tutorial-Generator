import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavbarRoute from '@/app/_components/navbar-routes';
import MobileSidebarTwo from './MobileSidebarTwo';
import { Hint } from '@/components/Hint';

interface NavbarHeaderProps {
  tutorial: any; // Replace 'any' with your actual tutorial type
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ tutorial }) => {
  return (
    <>
      {/* Navbar container with sticky positioning and high z-index */}
      <div className='sticky top-0 z-50 p-4 border-b flex items-center bg-white/80 backdrop-blur-sm shadow-sm'>
        {/* Logo visible on md and above, hidden on small screens */}
        <div className='hidden md:block'>
          <Hint
            label='Redirected to dashboard'
            side='right'
            align='center'
          >
            <Link href='/dashboard' className='flex'>
              <Image
                src='/logo.svg'
                alt='logo'
                width={80}
                height={80}
                className='p-2'
              />
              {/* <h2 className='text-2xl font-bold flex justify-center items-center '>ForgeFox</h2> */}
            </Link>
          </Hint>
        </div>
        <MobileSidebarTwo tutorial={tutorial} />
        <NavbarRoute />
      </div>
    </>
  );
};

export default NavbarHeader;
