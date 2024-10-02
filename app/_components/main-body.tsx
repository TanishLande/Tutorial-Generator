"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import DashboardLoadingPage from './dashBoardLoading';
import { useRouter } from 'next/navigation';
import LoadingPageMain from './dashBoardLoading';

const MainBody = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      router.push('/dashboard');
    }); // 5 seconds delay to showcase the animation
  };

  const LoadingScreen = () => (
    <LoadingPageMain text="Preparing your dashboard..." />
  );

  return (
    <>
      {isLoading && <LoadingScreen />}
      <section className="text-black bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Effortless Learning with
              <span className="sm:block"> AI-Powered Solutions.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Unlock the potential of knowledge with our innovative AI technology
              that transforms content into comprehensive, tailored solutions for
              your professional needs.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center bg-black px-8 py-3 text-white rounded-3xl hover:bg-gray-700 transition-colors"
              >
                Get Started
              </button>
              <Link href="#" className="inline-flex items-center bg-gray-200 px-8 py-3 text-gray-700 rounded-3xl hover:bg-gray-300 hover:underline transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainBody;