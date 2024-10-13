"use client"
import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Butterfly_Kids } from 'next/font/google';
import { Button } from '@/components/ui/button';

const carouselItems = [
  {
    title: "Welcome to ForgeFox",
    description: "Your journey to structured education begins here.",
    image: "/images/placeholder.png",
    color: "from-blue-700 to-blue-500"
  },
  {
    title: "Learn, Grow, Succeed",
    description: "Join our thriving community of learners today.",
    image: "/images/placeholder.png",
    color: "from-purple-700 to-purple-500"
  },
  {
    title: "Forge Your Future",
    description: "Unlock your potential with our cutting-edge courses.",
    image: "/images/placeholder.png",
    color: "from-green-700 to-green-500"
  }
];

const LoginPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);

    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => {
      clearInterval(carouselTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="flex min-h-screen">
      {/* Carousel Section */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className={`absolute inset-0 flex flex-col justify-center items-center text-white p-16 bg-gradient-to-br ${carouselItems[currentIndex].color}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={carouselItems[currentIndex].image}
              alt={carouselItems[currentIndex].title}
              className="w-full h-72 object-cover rounded-lg shadow-xl mb-10 hover:shadow-2xl transition-shadow duration-300"
            />
            <h2 className="text-6xl font-bold mb-6 text-center leading-tight">{carouselItems[currentIndex].title}</h2>
            <p className="text-2xl text-center max-w-xl">{carouselItems[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
        <button onClick={prevSlide} className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sign-In Section */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Sign in</h1>
              <p className="text-xl text-gray-600">Welcome back to ForgeFox</p>
            </div>
            <SignIn 
              afterSignInUrl="/dashboard"
              signUpUrl="/sign-up"
            />
            <p className='text-sm text-muted-foreground' >If not directed  to dashboard click below button</p>
            <Button variant='blue' onClick={()=> { router.push("/dashboard") } } >
              Dashboard
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;