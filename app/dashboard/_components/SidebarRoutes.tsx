"use client";

import React, { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { Compass, DollarSign, PencilRuler, LogOut, BookText } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarRoutesProps {
  onItemClick?: () => void;
}

const Menu = [
  {
    label: 'My Workspace',
    icon: PencilRuler,
    href: '/dashboard',
  },
  {
    label: 'Explore',
    icon: Compass,
    href: '/dashboard/explore',
  },
  {
    label: 'Premium',
    icon: DollarSign,
    href: '/dashboard/premium',
  },
  {
    label: 'BookRead',
    icon: BookText,
    href: '/dashboard/bookread',
  },
  // {
  //   label: 'Logout',
  //   icon: LogOut,
  //   href: '/dashboard/logout',
  // },
];

const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ onItemClick }) => {
  const [activationCounts, setActivationCounts] = useState<Record<string, number>>({});
  const pathname = usePathname();

  useEffect(() => {
    setActivationCounts((prev) => {
      const newCounts = { ...prev };
      const activeRoute = Menu.find((route) => route.href === pathname);
      if (activeRoute) {
        newCounts[activeRoute.href] = (newCounts[activeRoute.href] || 0) + 1;
      }
      return newCounts;
    });
  }, [pathname]);

  return (
    <>
      {Menu.map((route) => (
        <SidebarItem
          key={route.href}
          {...route}
          onClick={onItemClick}
          activationCount={activationCounts[route.href] || 0}
        />
      ))}
    </>
  );
};

export default SidebarRoutes;