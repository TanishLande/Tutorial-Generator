import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <Link href='/dashboard' className='flex gap-x-2 items-center'>
        <Image 
          src='/logo.svg'
          alt='logo'
          width={50}
          height={50}
        />
        <h1 className='text-2xl'>
          ForgeFox
        </h1>
      </Link>
      
      <UserButton />
    </div>
  )
}

export default Header