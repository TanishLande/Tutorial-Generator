"use client"

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { BiEdit } from "react-icons/bi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

interface CourseDetails {
  name: string;
  description: string;
  category: string;
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

interface EditCourseBsicInfoProps {
  course: Course | null;
}

const EditCourseBsicInfo = ({ course }: EditCourseBsicInfoProps) => {
  const [name, setName] = useState<string>(course?.courseOutput?.course?.name || '');
  const [description, setDescription] = useState<string>(course?.courseOutput?.course?.description || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (course?.courseOutput?.course) {
      setName(course.courseOutput.course.name);
      setDescription(course.courseOutput.course.description);
    }
  }, [course]);

  const onSaveHandler = async () => {
    if (course?.courseOutput?.course && course.id) {
      setIsUpdating(true);
      try {
        const updatedCourseOutput = {
          ...course.courseOutput,
          course: {
            ...course.courseOutput.course,
            name: name,
            description: description
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

        router.push(`/create-tutorial/${course?.tutorialId}`)
        
        router.refresh(); 
      } catch (error) {
        console.error("Error updating course:", error);
        // You might want to add some user feedback here, e.g., an error message
      } finally {
        setIsUpdating(false);
      }
    }
  }

  if(isUpdating){
    return(
      <div>
        Loading...
      </div>
    )
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <BiEdit className="h-6 w-6 hover:text-blue-900" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[550px] sm:max-w-[425px] w-[95%] max-h-[90vh] overflow-y-auto rounded-lg bg-white p-4 sm:p-6">
        <DialogHeader className="mb-4 sm:mb-6">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">Edit Tutorial Details</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2">
            Make changes to your tutorial information here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:gap-6">
          <div className="grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="course-title" className="text-sm font-medium sm:text-right">
              Tutorial Title
            </label>
            <Input
              id="course-title"
              className="sm:col-span-3"
              placeholder='Enter new title'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="course-description" className="text-sm font-medium sm:text-right">
              Description
            </label>
            <Textarea
              id="course-description"
              className="h-44 sm:col-span-3 min-h-[100px]"
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSaveHandler} type="submit" className="w-full sm:w-auto">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCourseBsicInfo