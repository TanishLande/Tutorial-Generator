import React from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';

const SelectOption = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className='px-4 sm:px-6 md:px-10 lg:px-20 xl:px-44 py-8'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10'
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Select your difficulty level:
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            How long would you like your tutorial to be:
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((hours) => (
                <SelectItem key={hours} value={`${hours} hour${hours > 1 ? 's' : ''}`}>
                  {hours} hour{hours > 1 ? 's' : ''}
                </SelectItem>
              ))}
              <SelectItem value="6+ hours">6+ hours</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Add Video (Adding video or just want the notes):
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Number of videos:
          </label>
          <Input type='number' className="w-full" placeholder="Enter number of videos" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SelectOption;