import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock } from 'lucide-react';

interface Chapter {
  name: string;
  duration: string;
  // Add other chapter properties as needed
}

interface ChapterItemsProps {
  chapter: Chapter;
  index: number;
  active: boolean;
}

const ChapterItems = ({ chapter, index, active }: ChapterItemsProps) => {
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (active) {
      setIsRotating(true);
      const timer = setTimeout(() => setIsRotating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer p-3 sm:p-4 rounded-xl transition-all duration-300 flex items-center justify-between mb-2 sm:mb-3 ${
        active
          ? 'bg-blue-50 border-l-4 border-blue-600 shadow-md'
          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
            active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <span className="text-xs sm:text-sm">{index + 1}</span>
        </div>
        <div>
          <h3 className={`font-medium text-sm sm:text-base ${active ? 'text-blue-600' : 'text-gray-700'}`}>
            {chapter.name}
          </h3>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
            <motion.div
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 3, ease: "linear" }}
            >
              <Clock size={12} className="sm:w-4 sm:h-4" />
            </motion.div>
            <span>{chapter.duration}</span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="ml-2 sm:ml-4"
      >
        {active ? (
          <Play size={16} className="text-blue-600 sm:w-5 sm:h-5" />
        ) : (
          <BookOpen size={16} className="text-gray-400 sm:w-5 sm:h-5" />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChapterItems;