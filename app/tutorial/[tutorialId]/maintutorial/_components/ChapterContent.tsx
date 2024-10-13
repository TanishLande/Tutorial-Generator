'use client'
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CheckCircle2, BookOpen, Code } from 'lucide-react';
import { Separator } from '@/components/ui/separator'; // Importing the Separator component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface Chapter {
  name: string;
  // Add other chapter properties as needed
}

interface CourseDetails {
  name: string;
  description: string;
  category: string;
  chapters: Chapter[];
}

export interface Course {
  id: number;
  name: string;
  tutorialId: string;
  category: string;
  level: string;
  includeVideo: string;
  createdBy: string;
  userName: string | null;
  userProfileImage: string | null;
  tutorialBanner: string | null;
  publish: boolean | null;
  courseOutput: {
    course: CourseDetails;
  };
}

interface ChapterContentProps {
  content: ChapterData;
  title: string;
  name?: string;
  tutorial: Course;
}

const ChapterContent = ({ content, title, name, tutorial }: ChapterContentProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const youtubeOpts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{name}</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-4">{title}</h2>
        <p className='text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-4'>{tutorial?.courseOutput?.course?.description}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm sm:text-base">{tutorial?.category}</Badge>
          <Badge variant="secondary" className="text-sm sm:text-base">{tutorial?.level}</Badge>
        </div>
      </header>

      {content?.videoId && (
        <div className="mb-8">
          <div className="aspect-w-16 aspect-h-9 shadow-lg rounded-lg overflow-hidden">
            <YouTube videoId={content.videoId} opts={youtubeOpts} className="w-full h-[250px] md:h-[600px]" />
          </div>
        </div>
      )}

      <div className="space-y-8">
        {content?.content?.map((item, index) => (
          <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                {item.code ? (
                  <Code className="w-6 h-6 text-blue-500" />
                ) : (
                  <BookOpen className="w-6 h-6 text-green-500" />
                )}
                <CardTitle className="text-lg sm:text-xl md:text-2xl">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent className="space-y-4">
              <ReactMarkdown className="prose max-w-none text-sm sm:text-base">{item.explanation}</ReactMarkdown>
              {item.code && (
                <div className="relative mt-4">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    className="rounded-md text-xs sm:text-sm md:text-base p-4"
                  >
                    {item.code}
                  </SyntaxHighlighter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white text-black hover:bg-gray-100 transition-all duration-300"
                    onClick={() => handleCopyCode(item.code, index)}
                  >
                    {copiedIndex === index ? (
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    <span className="hidden sm:inline">{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="mt-8">
        <AlertTitle className="text-lg font-semibold mb-2">Course Information</AlertTitle>
        <AlertDescription>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <div className="text-sm sm:text-base">
              <p className="mb-1"><strong>Created by:</strong> {tutorial?.createdBy}</p>
              <p><strong>Instructor:</strong> {tutorial?.userName}</p>
            </div>
            <div className='mt-4 sm:mt-0'>
              {tutorial?.userProfileImage && (
                <img 
                  src={tutorial.userProfileImage} 
                  alt={tutorial.userName || 'Instructor'} 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200" 
                />
              )}
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ChapterContent;
