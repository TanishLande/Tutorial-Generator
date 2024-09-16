import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserInputContext } from "@/app/_context/UserInputContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';

const SelectOption: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Use context
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error("UserInputContext is not provided");
  }

  const { userTutorialInput, setUserTutorialInput } = context;

  // Parse userTutorialInput safely
  let parsedInput: { level?: string; duration?: string; displayVideo?: string; numberOfChapter?: string } = {};
  try {
    parsedInput = JSON.parse(userTutorialInput);
  } catch (e) {
    // Handle invalid JSON, if necessary
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setUserTutorialInput(prev => {
      try {
        const prevObject = JSON.parse(prev);
        return JSON.stringify({ ...prevObject, [fieldName]: value });
      } catch {
        return JSON.stringify({ [fieldName]: value });
      }
    });
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
          <Select
            onValueChange={(value) => handleInputChange('level', value)}
            defaultValue={parsedInput.level}
          >
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
          <Select
            onValueChange={(value) => handleInputChange('duration', value)}
            defaultValue={parsedInput.duration}
          >
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
          <Select
            onValueChange={(value) => handleInputChange('displayVideo', value)}
            defaultValue={parsedInput.displayVideo}
          >
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
          <Input 
            type='number' 
            className="w-full" 
            placeholder="Enter number of videos" 
            value={parsedInput.numberOfChapter || ''}
            onChange={(event) => handleInputChange('numberOfChapter', event.target.value)}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SelectOption;
