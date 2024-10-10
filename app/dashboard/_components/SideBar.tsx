"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { useClerk } from '@clerk/clerk-react'; // Import useClerk for logout functionality
import Logo from "./logo";
import SidebarRoutes from './SidebarRoutes';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface SideBarProps {
  onItemClick?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onItemClick }) => {
  const router = useRouter(); // Initialize the router
  const { signOut } = useClerk(); // Get the signOut function from Clerk

  const handleLogout = async () => {
    try {
      await signOut(); // Sign the user out from Clerk
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error("Logout error:", error); // Handle any logout errors if needed
    }
  };

  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>
      
      <div className='flex flex-col w-full'>
        <SidebarRoutes onItemClick={onItemClick} />
      </div>
      
      <div className='mt-auto p-4'>
        <Button
          className='p-6 rounded-full text-xl w-[280px] md:w-[230px] mx-auto flex justify-center items-center'
          onClick={handleLogout} // Attach the logout handler to the button
        >
          <LogOut className='mx-2' /> Logout
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
