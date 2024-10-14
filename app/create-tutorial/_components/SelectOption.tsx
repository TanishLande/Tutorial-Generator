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
  // Motion variants for container and items to add animation effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Use context to get user input and update state
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error("UserInputContext is not provided");
  }

  const { userTutorialInput, setUserTutorialInput } = context;

  // Parse user input safely from JSON, initializing with an empty object if it fails
  let parsedInput: { level?: string; duration?: string; displayVideo?: string; numberOfChapter?: string; language?: string } = {};
  try {
    parsedInput = JSON.parse(userTutorialInput);
  } catch (e) {
    // If parsing fails, we handle invalid JSON by leaving parsedInput empty
  }

  // Handler to update context with the new field value as JSON
  const handleInputChange = (fieldName: string, value: string) => {
    setUserTutorialInput(prev => {
      try {
        const prevObject = JSON.parse(prev);  // Parse previous state
        return JSON.stringify({ ...prevObject, [fieldName]: value });  // Merge with new value
      } catch {
        return JSON.stringify({ [fieldName]: value });  // In case of invalid previous state, reset with the new field
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

        {/* Difficulty level dropdown */}
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

        {/* Language dropdown */}
        <motion.div variants={itemVariants}>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Select your language:
          </label>
          <Select
            onValueChange={(value) => handleInputChange('language', value)}
            defaultValue={parsedInput.language}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Marathi">Marathi</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="Mandarin">Mandarin</SelectItem>
              <SelectItem value="Arabic">Arabic</SelectItem>
              <SelectItem value="Bengali">Bengali</SelectItem>
              <SelectItem value="Portuguese">Portuguese</SelectItem>
              <SelectItem value="Russian">Russian</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Punjabi">Punjabi</SelectItem>
              <SelectItem value="Korean">Korean</SelectItem>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Turkish">Turkish</SelectItem>
              <SelectItem value="Vietnamese">Vietnamese</SelectItem>
              <SelectItem value="Tamil">Tamil</SelectItem>
              <SelectItem value="Urdu">Urdu</SelectItem>
              <SelectItem value="Gujarati">Gujarati</SelectItem>
              <SelectItem value="Telugu">Telugu</SelectItem>
              <SelectItem value="Malayalam">Malayalam</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Duration dropdown */}
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

        {/* Video option dropdown */}
        {/* <motion.div variants={itemVariants}>
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
        </motion.div> */}

        {/* Number of videos input */}
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
