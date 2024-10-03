import React from 'react';
import NavbarRoute from '@/app/_components/navbar-routes';
import MobileSidebarTwo from './MobileSidebarTwo';

interface NavbarHeaderProps {
  tutorial: any; // Replace 'any' with your actual tutorial type
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ tutorial }) => {
  return (
    <div className='p-4 border-b flex items-center bg-white shadow-sm'>
      <MobileSidebarTwo tutorial={tutorial} />
      <NavbarRoute />
    </div>
  );
};

export default NavbarHeader;