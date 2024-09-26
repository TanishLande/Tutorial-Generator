"use client"
import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
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
  )
}

export default Logo