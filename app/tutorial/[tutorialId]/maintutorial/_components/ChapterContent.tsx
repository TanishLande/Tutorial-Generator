import React from 'react';

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
  title: string;
  name?: string;
}

const ChapterContent = ({ content, title, name }: ChapterContentProps) => {
  return (
    <div className="m-4 md:m-5 lg:m-10">
   {name}
    </div>
  );
};

export default ChapterContent;