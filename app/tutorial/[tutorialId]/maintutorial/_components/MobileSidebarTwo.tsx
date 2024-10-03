import React, { useState } from 'react';
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

interface MobileSidebarTwoProps {
  tutorial: any; // Replace 'any' with your actual tutorial type
}

const MobileSidebarTwo: React.FC<MobileSidebarTwoProps> = ({ tutorial }) => {
  const [open, setOpen] = useState(false);

  const handleContentChange = (content: any) => {
    console.log("Content changed:", content);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <Sidebar 
          tutorial={tutorial}
          onContentChange={handleContentChange}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebarTwo;