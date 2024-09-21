"use client"

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiEdit } from "react-icons/bi";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

interface Chapter {
  name: string;
  about: string;
  duration: string;
}

interface CourseDetails {
  name: string;
  description: string;
  category: string;
  duration: string;
  topic: string;
  chapters: Chapter[];
}

interface Course {
  id: number;
  tutorialId: string;
  name: string;
  category: string;
  level: string;
  includeVideo: string;
  courseOutput: { course: CourseDetails };
  createdBy: string;
  userName: string | null;
  userProfileImage: string | null;
}

interface EditChapterProps {
  course: Course | null;
  index: number;
}

const EditChapter = ({ course, index }: EditChapterProps) => {
  const chapters = course?.courseOutput?.course?.chapters || [];
  const currentChapter = chapters[index] || { name: '', about: '', duration: '' };

  const [chapterName, setChapterName] = useState(currentChapter.name);
  const [chapterAbout, setChapterAbout] = useState(currentChapter.about);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (course && course.courseOutput?.course?.chapters[index]) {
      setChapterName(course.courseOutput.course.chapters[index].name);
      setChapterAbout(course.courseOutput.course.chapters[index].about);
    }
  }, [course, index]);

  const onSaveHandler = async () => {
    if (course?.courseOutput?.course && course.id) {
      setIsUpdating(true);
      try {
        const updatedChapters = [...chapters];
        updatedChapters[index] = {
          ...updatedChapters[index],
          name: chapterName,
          about: chapterAbout
        };

        const updatedCourseOutput = {
          ...course.courseOutput,
          course: {
            ...course.courseOutput.course,
            chapters: updatedChapters
          }
        };

        const result = await db
          .update(CourseList)
          .set({
            courseOutput: updatedCourseOutput
          })
          .where(eq(CourseList.id, course.id))
          .returning({ id: CourseList.id });

        console.log("Update result:", result);

        router.push(`/create-tutorial/${course?.tutorialId}`);
        router.refresh();
        setIsOpen(false);
      } catch (error) {
        console.error("Error updating course:", error);
        // You might want to add some user feedback here, e.g., an error message
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <BiEdit className="h-4 w-4 hover:text-blue-900" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[550px] sm:max-w-[425px] w-[95%] max-h-[90vh] overflow-y-auto rounded-lg bg-white p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Make changes to your chapter details here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium">Chapter Name</span>
            <Input
              id="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium">About</span>
            <Textarea
              id="chapterAbout"
              value={chapterAbout}
              onChange={(e) => setChapterAbout(e.target.value)}
              className="col-span-3 h-32"
            />
          </div>
        </div>
        <DialogFooter className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSaveHandler} type="submit" className="w-full sm:w-auto" disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapter;