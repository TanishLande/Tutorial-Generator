"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TbCategoryPlus } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import EditCourseBsicInfo from './EditCourseBsicInfo';
import { storage } from '@/configs/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { Skeleton } from '@/components/ui/skeleton'; 
import { RiImageEditLine } from "react-icons/ri";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CourseDetails {
  name: string;
  description: string;
  category: string;
  language: string;
  topic: string;
  duration: string;
  chapters: string;
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
  tutorialBanner?: string;
  userName: string | null;
  userProfileImage: string | null;
  language: string;
}

interface TutorialBasicInfoProps {
  course: Course | null;  
  edit: boolean;
  language?: string;
}

const TutorialBasicInfo: React.FC<TutorialBasicInfoProps> = ({ 
  course,
  edit = true,
  language
}) => {
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
    };
  }, [selectedFile]);

  useEffect(() => {
    if (course) {
      setSelectedFile(course.tutorialBanner);
    }
  }, [course]);

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file.');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(previewUrl);
      setIsUploading(true);
      setUploadError(null);

      try {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `ai-tutorial-images/${fileName}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await db.update(CourseList).set({
          tutorialBanner: downloadURL
        }).where(eq(CourseList.id, course?.id));

      } catch (error: any) {
        setUploadError(`File upload failed: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };


  if (!course) {
    return (
      <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5 bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className="flex flex-col h-full">
          <div>
            <h2 className='font-semibold text-2xl text-gray-800 flex gap-x-2 sm:mb-2 lg:mb-4'>
              {course.courseOutput.course.name} {edit && <EditCourseBsicInfo course={course} />}
            </h2>
            <p className='text-md text-gray-600 sm:mb-0'>
              {course.courseOutput.course.description}
            </p>
          </div>
          <div className="mt-auto">
            <h2 className='font-medium mt-2 flex gap-2 items-center text-blue-800 hover:underline'>
              <TbCategoryPlus /> {course.courseOutput.course.category}
              <Separator orientation="vertical" className='h-4' />
              <Languages  className='text-sm' /> {course?.courseOutput?.course?.language}

            </h2>
            <Link href={`/tutorial/${course.tutorialId}/maintutorial`}>
              { !edit && <Button className='w-full mt-5' onClick={()=> { router.push(`/tutorial/${course.tutorialId}/maintutorial`) } } variant='blue' >
                Start
              </Button>}
            </Link>
          </div>
        </div>
        <div className="relative">
          <label htmlFor="upload-image" className="block cursor-pointer">
            <Image
              src={selectedFile ? selectedFile : '/images/placeholder.png'}
              alt="Image Placeholder"
              className='w-full rounded-xl h-[180px] cursor-pointer object-cover md:h-[300px] lg:h-[350px]'
              width={300}
              height={300}
            />
            {edit && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 rounded-xl transition-opacity duration-300">
                <RiImageEditLine className="text-white text-[80px]" />
              </div>
            )}
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className='opacity-0'
              onChange={onFileSelected}
              accept="image/*"
            />
          )}
          {isUploading && <p className="text-gray-500">Uploading...</p>}
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
};

export default TutorialBasicInfo;
