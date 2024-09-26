// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import NavbarRoute from '@/app/_components/navbar-routes'

const Header = () => {
  return (
    <div className='p-4 border-b flex item-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoute />
    </div>
    // <div
    //     className='flex justify-between item-center p-5 shadow-sm'
    // >
    //     <Image 
    //         src={'/logo.svg'}
    //         alt='logo'
    //         width={50}
    //         height={50}
    //     />
    //     <UserButton />
    // </div>
  )
}

export default Header