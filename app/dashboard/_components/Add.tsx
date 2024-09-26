"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React from 'react'

const Add = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleRouting = () =>{
    router.push('/create-tutorial')
  }
    
  return (
    <div
        className='flex items-center justify-between'
    >
      <div>
        <h2 className='text-2xl md:text-3xl'>
        Welcome! 
          <span className='font-bold'> {user?.fullName}</span>
        </h2>
        <p className='text-sm text-gray-500'>
          Create your own tutorials, learn easily, share with friends, and explore more.
        </p>
      </div>
      <Button
        onClick={()=> handleRouting()}
      >
        + New Tutorial
      </Button>
    </div>
  )
}

export default Add
