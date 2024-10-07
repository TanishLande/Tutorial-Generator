import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

interface Chapter {
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ChapterItemsProps {
  chapter: Chapter;
  index: number;
  active: boolean;
  onClick: () => void;
}

const ChapterItems = ({ chapter, index, active, onClick }: ChapterItemsProps) => {
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (active) {
      setIsRotating(true);
      const timer = setTimeout(() => setIsRotating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  const getDifficultyColor = (difficulty: Chapter['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl transition-all duration-300 flex flex-col space-y-2 mb-3 ${
        active
          ? 'bg-blue-50 border-l-4 border-blue-600 shadow-lg'
          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <span className="text-sm font-semibold">{index + 1}</span>
          </div>
          <div className="relative">
            <h3 className={`font-medium text-base ${active ? 'text-blue-600' : 'text-gray-700'}`}>
              {chapter.name}
            </h3>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: active ? '100%' : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              {/* <Badge className={getDifficultyColor(chapter.difficulty)}>
                {chapter.difficulty}
              </Badge> */}
            </div>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex items-center space-x-2"
        >
          {active ? (
            <Play size={20} className="text-blue-600" />
          ) : (
            <BookOpen size={20} className="text-gray-400" />
          )}
          <motion.div
            animate={{ rotate: isRotating ? 360 : 0 }}
            transition={{ duration: 3, ease: "linear" }}
          >
            <Star size={20} className={active ? "text-yellow-400" : "text-gray-300"} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChapterItems;