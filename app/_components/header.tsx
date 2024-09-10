import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <div
        className='flex justify-between p-5 shadow-sm'
    >
      <Image
        src="/logo.svg"  // The path starts from the root, no need for /public
        alt="Logo"       // Always include alt for accessibility
        width={50}
        height={50}
      />
      <Button>
        Get Started
      </Button>
    </div>
  );
};

export default Header;
