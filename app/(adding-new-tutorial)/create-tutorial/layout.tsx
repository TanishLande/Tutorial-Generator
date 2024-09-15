import React from 'react'
import Header from './_components/header';

interface CreateTutorialLayoutProps{
    children: React.ReactNode;
}

const CreateTutorialLayout = ({
    children
}: CreateTutorialLayoutProps ) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default CreateTutorialLayout