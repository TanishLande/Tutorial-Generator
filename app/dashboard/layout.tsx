import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex relative">
      {/* Sidebar: hidden on mobile, visible on md and larger */}
      <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      
      {/* Main content */}
      <div className="w-full md:pl-64">
        <Header />
        <div className="p-4 md:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout