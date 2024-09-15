import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({
    children
}: DashboardLayoutProps) => {
  return (
    <div className="flex relative">
      {/* Sidebar: hidden on mobile, visible on sm and lg */}
      <div className="sm:block w-64 fixed h-full">
        <SideBar />
      </div>
      
      {/* Main content */}
      <div className="w-full sm:ml-64">
        <Header />
        <div className="p-4 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout