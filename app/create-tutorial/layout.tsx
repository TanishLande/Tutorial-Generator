"use client";

import React, { useState } from 'react';
import Header from './_components/header';
import { UserInputContext } from '@/app/_context/UserInputContext';

interface CreateTutorialLayoutProps {
  children: React.ReactNode;
}

const CreateTutorialLayout = ({
  children
}: CreateTutorialLayoutProps) => {
  // Initialize state with a default value
  const [userTutorialInput, setUserTutorialInput] = useState<string>("");
  
  return (
    <div>
      <UserInputContext.Provider value={{ userTutorialInput, setUserTutorialInput }}>
        <Header />
        {children}
      </UserInputContext.Provider>
    </div>
  );
};

export default CreateTutorialLayout;