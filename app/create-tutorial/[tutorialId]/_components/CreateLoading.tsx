"use client"
import React, { useState, useEffect } from 'react';
import { Book, Pen, Brain, Code, Video, Sparkles, LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingStepProps {
  icon: LucideIcon;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
}

const LoadingStep: React.FC<LoadingStepProps> = ({ icon: Icon, text, isActive, isCompleted }) => (
  <div className={`flex items-center space-x-2 ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
    <Icon className={`w-6 h-6 ${isActive ? 'animate-bounce' : ''}`} />
    <span className={`${isCompleted ? 'line-through' : ''}`}>{text}</span>
  </div>
);

interface Step {
  icon: LucideIcon;
  text: string;
}

const TutorialCreationLoadingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const steps: Step[] = [
    { icon: Brain, text: 'Analyzing content' },
    { icon: Book, text: 'Structuring curriculum' },
    { icon: Pen, text: 'Writing explanations' },
    { icon: Code, text: 'Generating code examples' },
    { icon: Video, text: 'Preparing visual aids' },
    { icon: Sparkles, text: 'Polishing final content' },
  ];

  const tips: string[] = [
    "Did you know? Active recall is one of the most effective learning techniques.",
    "Tip: Take short breaks every 25 minutes to maintain focus and productivity.",
    "Fun fact: The average tutorial length for optimal engagement is around 10 minutes.",
    "Remember: Practical examples can significantly improve understanding and retention.",
    "Insight: Visuals can increase learning effectiveness by up to 400%.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = Math.min(oldProgress + 1, 100);
        setCurrentStep(Math.floor((newProgress / 100) * steps.length));
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [steps.length]);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex((oldIndex) => (oldIndex + 1) % tips.length);
    }, 5000);

    return () => clearInterval(tipTimer);
  }, [tips.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Creating Your Tutorial</h1>
          
          <div className="mb-8">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-gray-600 text-center">{progress}% Complete</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {steps.map((step, index) => (
              <LoadingStep
                key={index}
                icon={step.icon}
                text={step.text}
                isActive={index === currentStep}
                isCompleted={index < currentStep}
              />
            ))}
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700 font-medium">{tips[tipIndex]}</p>
          </div>
        </CardContent>
      </Card>

      <p className="mt-4 text-sm text-gray-600">
        Powered by AI - Crafting the perfect tutorial just for you
      </p>
    </div>
  );
};

export default TutorialCreationLoadingPage;