"use client";

import React, { useState } from 'react';
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideBar from "./SideBar";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SideBar onItemClick={handleClose} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;