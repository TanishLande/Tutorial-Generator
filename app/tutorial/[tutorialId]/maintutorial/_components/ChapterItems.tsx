import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock } from 'lucide-react';

interface Chapter {
  id: string;
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
      className={`cursor-pointer p-4 rounded-xl transition-all duration-300 flex items-center justify-between mb-3 ${
        active
          ? 'bg-blue-50 border-l-4 border-blue-600 shadow-md'
          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {index + 1}
        </div>
        <div>
          <h3 className={`font-medium ${active ? 'text-blue-600' : 'text-gray-700'}`}>
            {chapter.name}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <motion.div
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 3, ease: "linear" }}
            >
              <Clock size={14} />
            </motion.div>
            <span>{chapter.duration}</span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {active ? (
          <Play size={20} className="text-blue-600" />
        ) : (
          <BookOpen size={20} className="text-gray-400" />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChapterItems;