import React from 'react'
import SideBar from './_components/SideBar'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({
    children
}: DashboardLayoutProps) => {
  return (
    <div>
        <div
            className='sm:hidden md:w-64 md:block'
        >
            <SideBar />
        </div>
        <div 
        className='md:ml-64 p-10'
        >
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout