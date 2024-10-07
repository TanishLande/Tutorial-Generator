'use client'
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CheckCircle2 } from 'lucide-react';
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
    height: '480',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <h2 className="text-2xl text-gray-600 mb-4">{title}</h2>
        <p className='text-md text-gray-500 max-w-2xl mx-auto'>{tutorial?.courseOutput?.course?.description}</p>
        <div className="flex justify-center space-x-2 mt-4">
          <Badge variant="secondary">{tutorial?.category}</Badge>
          <Badge variant="secondary">{tutorial?.level}</Badge>
        </div>
      </header>

      {content?.videoId && (
        <div className="aspect-w-16 aspect-h-9 shadow-lg rounded-lg overflow-hidden">
          <YouTube videoId={content.videoId} opts={youtubeOpts} className="w-full h-full" />
        </div>
      )}

      <div className="space-y-8">
        {content?.content?.map((item, index) => (
          <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ReactMarkdown className="prose max-w-none">{item.explanation}</ReactMarkdown>
              {item.code && (
                <div className="relative">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    className="rounded-md text-sm"
                  >
                    {item.code}
                  </SyntaxHighlighter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-black absolute top-2 right-2 transition-all duration-300"
                    onClick={() => handleCopyCode(item.code, index)}
                  >
                    {copiedIndex === index ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Alert>
          <AlertTitle className="text-lg font-semibold">Course Information</AlertTitle>
          <AlertDescription>
            <div className='flex justify-between'>
              <div>
                <p><strong>Created by:</strong> {tutorial?.createdBy}</p>
                <p><strong>Instructor:</strong> {tutorial?.userName}</p>
              </div>
              <div className='flex items-center justify-center'>
                {tutorial?.userProfileImage && (
                  <img src={tutorial.userProfileImage} alt={tutorial.userName || 'Instructor'} className="w-12 h-12 rounded-full mt-2" />
                )}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ChapterContent;