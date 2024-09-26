"use client"
import React from 'react';
import { BsTrash3 } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DropDownProps {
  children: React.ReactNode;
  handleDelete: () => void;
}

const DropDown: React.FC<DropDownProps> = ({ children, handleDelete }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onClick={handleDeleteClick}>
              <div className="text-red-500 flex gap-x-2 text-base hover:text-red-600">
                <BsTrash3 className="mt-1" /> Delete
              </div>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white rounded-3xl p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">Delete Tutorial?</AlertDialogTitle>
              <DropdownMenuSeparator className='my-2' />
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this tutorial? This action <span className="font-semibold text-red-500">cannot be undone</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                  handleDelete();
                  setIsOpen(false);
                }}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;