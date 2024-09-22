"use client"
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

interface TutorialBasicInfoProps {
  course: Course | null;
}

const TutorialBasicInfo: React.FC<TutorialBasicInfoProps> = ({ course }) => {
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
    };
  }, [selectedFile]);

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
        console.log('Attempting to upload file:', fileName);
        const uploadResult = await uploadBytes(storageRef, file);
        console.log('Upload result:', uploadResult);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File uploaded successfully. Download URL:', downloadURL);
        
        await db.update(CourseList).set({
          tutorialBanner: downloadURL
        }).where(eq(CourseList.id,course?.id));

      } catch (error: any) {
        console.error('File upload failed:', error);
        setUploadError(`File upload failed: ${error.message}`);
        if (error.code) {
          console.error('Error code:', error.code);
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className="flex flex-col h-full">
          <div>
            <h2 className='font-bold text-3xl flex gap-x-2 '>
              {course.courseOutput.course.name} <EditCourseBsicInfo course={course} />
            </h2>
            <p className='text-sm text-gray-400 mb-5 sm:mb-0'>
              {course.courseOutput.course.description}
            </p>
            <h2 className='font-medium mt-2 flex gap-2 items-center text-blue-900'>
              <TbCategoryPlus /> {course.courseOutput.course.category}
            </h2>
          </div>
          <div className="mt-auto">
            <Button className='w-full mt-5' variant='blue'>
              Start
            </Button>
          </div>
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : '/images/placeholder.png'}
              alt="Image Placeholder"
              className='w-full rounded-xl h-[180px] cursor-pointer object-cover md:h-[300px] lg:h-[350px]'
              width={300}
              height={300}
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className='opacity-0'
            onChange={onFileSelected}
            accept="image/*"
          />
          {isUploading && <p>Uploading...</p>}
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
};

export default TutorialBasicInfo;