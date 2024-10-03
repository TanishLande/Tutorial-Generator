import React from 'react'

interface ChapterContent {
  title: string;
  explanation: string;
  code: string;
}

interface ChapterData {
  chapterId: number;
  content: ChapterContent[];
  courseId: string;
  id: number;
  videoId: string;
}

interface ChapterContentProps {
  content: ChapterData;
}

const ChapterContent = (
  {content}: ChapterContentProps
) => {
  console.log("This is content", content);
  return (
    <div className='m-4 md:m-5 lg:m-10'>   
    <h1>
      {content?.videoId}
    </h1>
    </div>
  )
}

export default ChapterContent
