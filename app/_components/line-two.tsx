'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface TutorialInfo {
  title: string;
  description: string;
}

const HorizontalScrollingTutorialsTwo: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const tutorialInfo: TutorialInfo[] = [
    {
      title: "Master AI Concepts",
      description: "Learn neural networks, ML algorithms, and AI fundamentals."
    },
    {
      title: "Implement Deep Learning",
      description: "Hands-on tutorials with TensorFlow and PyTorch."
    },
    {
      title: "Build Intelligent Systems",
      description: "Create end-to-end AI systems, chatbots, and more."
    },
    {
      title: "Natural Language Processing",
      description: "Dive into NLP techniques and applications."
    },
    {
      title: "Computer Vision",
      description: "Explore image recognition and object detection."
    },
    {
      title: "Reinforcement Learning",
      description: "Master RL algorithms and game-playing AI."
    }
  ];

  useEffect(() => {
    const scroll = async () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        await controls.start({
          x: [-scrollWidth / 2, 0],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }
        });
      }
    };

    if (hoveredIndex === null) {
      scroll();
    } else {
      controls.stop();
    }
  }, [hoveredIndex, controls]);

  return (
    <div className="w-full h-40 bg-gray-50 overflow-hidden relative">
      <motion.div
        ref={containerRef}
        className="absolute h-full flex items-center right-0"
        animate={controls}
      >
        {[...tutorialInfo, ...tutorialInfo].map((info, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-64 h-32 bg-gray-100 rounded-lg shadow-lg mx-2 p-4 border border-gray-300"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.1,
              zIndex: 1,
              transition: { duration: 0.2 }
            }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {info.title}
            </h2>
            <p className="text-gray-600 text-xs">
              {info.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScrollingTutorialsTwo;