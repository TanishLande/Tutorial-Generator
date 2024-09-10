import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div
        className='flex justify-between item-center p-5 shadow-sm'
    >
        <Image 
            src={'/logo.svg'}
            alt='logo'
            width={50}
            height={50}
        />
        <UserButton />
    </div>
  )
}

export default Header