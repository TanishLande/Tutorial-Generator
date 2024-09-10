// In a file named `HorizontalScrollingTutorials.tsx`
"use client"; // This directive ensures this component runs on the client-side

import React from 'react';
import { motion } from 'framer-motion';

const HorizontalScrollingTutorials = () => {
  const tutorialInfo = [
    {
      title: "Master AI Concepts",
      description: "Create engaging tutorials on neural networks, machine learning algorithms, and AI fundamentals. Break down complex concepts into easy-to-understand modules."
    },
    {
      title: "Implement Deep Learning",
      description: "Design hands-on tutorials for implementing deep learning models. Guide learners through real-world projects using popular frameworks like TensorFlow and PyTorch."
    },
    {
      title: "Build Intelligent Systems",
      description: "Develop comprehensive tutorials on building end-to-end AI systems. Cover topics from data preprocessing to model deployment, including chatbots and recommendation engines."
    }
  ];

  const containerVariants = {
    animate: {
      x: [0, -1200], // Adjust based on the total width of your containers
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="w-full h-64 bg-gray-50 overflow-hidden relative">
      <motion.div
        className="absolute h-full flex items-center"
        variants={containerVariants}
        animate="animate"
      >
        {[...tutorialInfo, ...tutorialInfo].map((info, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-96 h-56 bg-gray-100 rounded-lg shadow-lg mx-4 p-6 border border-gray-300"
          >
            <h2 className="text-2xl font-bold text-black-600 mb-3">
              {info.title}
            </h2>
            <p className="text-gray-700 text-sm">
              {info.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScrollingTutorials;
