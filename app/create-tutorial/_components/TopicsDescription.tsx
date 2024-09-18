import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserInputContext } from '@/app/_context/UserInputContext';

const TopicsDescription: React.FC = () => {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error("UserInputContext is not provided");
  }

  const { userTutorialInput, setUserTutorialInput } = context;

  // Parse userTutorialInput safely
  let parsedInput: { topic?: string; details?: string } = { topic: '', details: '' };
  try {
    parsedInput = JSON.parse(userTutorialInput);
  } catch (e) {
    // Handle invalid JSON
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

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
      className="max-w-3xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="topic">
          What topic would you like to generate a tutorial for?
        </label>
        <Input
          id="topic"
          placeholder="Enter your topic"
          className="w-full"
          defaultValue={parsedInput.topic || ''}
          onChange={(e) => handleInputChange('topic', e.target.value)}
        />
      </motion.div>

      <motion.div className="mb-8" variants={itemVariants}>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="details">
          Provide additional details for your personalized tutorial (Optional):
        </label>
        <Textarea
          id="details"
          placeholder="Tell us more about your desired tutorial content"
          className="w-full h-32"
          defaultValue={parsedInput.details || ''}
          onChange={(e) => handleInputChange('details', e.target.value)}
        />
      </motion.div>
    </motion.div>
  );
};

export default TopicsDescription;
