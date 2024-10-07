import React, { useState } from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <h2 className="text-xl text-gray-600">{title}</h2>
        <p className='text-sm text-gray-500'>{tutorial?.courseOutput?.course?.description}</p>
      </header>

      {content?.videoId && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Video Tutorial</CardTitle>
          </CardHeader>
          <CardContent>
            <YouTube videoId={content.videoId} opts={youtubeOpts} />
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {content?.content?.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ReactMarkdown>{item.explanation}</ReactMarkdown>
              {item.code && (
                <div className="relative">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    className="rounded-md"
                  >
                    {item.code}
                  </SyntaxHighlighter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopyCode(item.code, index)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <AlertTitle>Course Information</AlertTitle>
        <AlertDescription>
          <p><strong>Category:</strong> {tutorial?.category}</p>
          <p><strong>Level:</strong> {tutorial?.level}</p>
          <p><strong>Created by:</strong> {tutorial?.createdBy}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ChapterContent;