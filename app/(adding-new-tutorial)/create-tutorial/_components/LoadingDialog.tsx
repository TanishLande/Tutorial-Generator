import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoadingProps {
  loading: boolean;
}

const LoadingDots = () => {
  return (
    <div className="flex space-x-1 ml-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-1.5 h-1.5 bg-gray-800 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  );
};

const LoadingDialog: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-2xl font-bold text-gray-800 flex justify-center items-center">
            Generating Your Tutorial
            <div
                className='mt-2'
            >
            <LoadingDots/>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-4">
            <div className="flex flex-col items-center py-4">
              <Image
                src="/loading/artificial-intelligence.gif"
                alt="AI Loading Animation"
                width={150}
                height={150}
                className="mb-4"
              />
              <h2 className="text-lg text-gray-600 text-center max-w-md">
                AI is crafting your personalized tutorial. This may take a moment. Please wait...
              </h2>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;