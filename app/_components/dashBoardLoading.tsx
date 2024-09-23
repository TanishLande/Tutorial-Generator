import React, { useState, useEffect } from 'react';

const ProfessionalLoadingAnimation = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="text-center w-80">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E0E7FF"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">{`${progress}%`}</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Dashboard</h2>
        <p className="text-gray-600 mb-4">Please wait while we prepare your experience...</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === progress % 3 ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLoadingAnimation;