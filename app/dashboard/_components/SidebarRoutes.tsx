import React from 'react';
// import { MdExplore } from "react-icons/md";
// import { TbPremiumRights } from "react-icons/tb";
// import { LuLogOut } from "react-icons/lu";
// import { IoBookOutline } from "react-icons/io5";
import SidebarItem from './SidebarItem';
import { Compass, DollarSign, House, LogOut } from 'lucide-react';

// interface MenuProps {
//   id: number;
//   label: string;
//   icon: LucideIcon;
//   href: string;
// }

const Menu = [
  {
    label: 'My Workspace',
    icon: House,
    href: '/dashboard',
  },
  {
    label: 'Explore',
    icon: Compass,
    href: '/dashboard/explore',
  },
  {
    label: 'Premium',
    icon:  DollarSign ,
    href: '/dashboard/premium',
  },
  {
    label: 'Logout',
    icon: LogOut,
    href: '/dashboard/logout',
  },
];

const SidebarRoutes: React.FC = () => {
  const routes = Menu;
  return (
    <>
      {routes.map((route) => (
        <SidebarItem key={route.href} {...route} />
      ))}
    </>
  );
};

export default SidebarRoutes;