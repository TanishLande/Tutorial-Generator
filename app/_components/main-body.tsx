import React from 'react';

const MainBody = () => {
  return (
    <section className="text-black bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-60 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            Effortless Learning with 
            <span className="sm:block"> AI-Powered Solutions. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Unlock the potential of knowledge with our innovative AI technology that transforms content into comprehensive, tailored solutions for your professional needs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full mr-20 ml-20 rounded-full border border-black bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray-800 focus:outline-none focus:ring active:bg-gray-900 sm:w-auto lg:mr-1"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full mr-20 ml-20 rounded-full border border-gray-300 bg-gray-50 px-12 py-3 text-sm font-medium text-black shadow transition-colors duration-300 hover:bg-gray-200 hover:border-white hover:text-black focus:outline-none focus:ring active:bg-gray-200 sm:w-auto lg:ml-1"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBody;