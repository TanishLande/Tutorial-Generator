"use client";

import React, { useState } from 'react';
import { CiTimer } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Hint } from '@/components/Hint';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DropDown from './DropDown';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CreateTutorialCard from './CreateTutorialCard';

interface CourseDetails {
  name: string;
  description: string;
  duration: string;
}

interface Course {
  id: number;
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

interface TutorialCardProps {
  tutorial: Course;
  refreshData: () => void;
  handleDelete: (tutorialId: number) => void;
  isFirstCard?: boolean;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, refreshData, handleDelete, isFirstCard = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const getLevelStyle = (level: string): string => {
    const styles: Record<string, string> = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return styles[level.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const onDelete = async () => {
    try {
      const res = await db.delete(CourseList)
        .where(eq(CourseList.id, tutorial.id))
        .returning({ id: CourseList.id });

      if (res) {
        refreshData();
        toast.success("Tutorial deleted successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the tutorial");
    }
    finally {
      router.push('/dashboard');
    }
  };

  if (isFirstCard) {
    return <CreateTutorialCard />;
  }

  return (
    <Card 
      className="w-full max-w-sm h-[28rem] transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/tutorial/${tutorial.tutorialId}`} passHref>
          <img
            src={tutorial.tutorialBanner || "/placeholder-image.jpg"}
            alt={tutorial.courseOutput.course.name}
            className="w-full object-cover transition-all duration-300 ease-in-out"
            style={{ height: isHovered ? '12rem' : '14rem' }}
          />
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-40' : 'opacity-0'}`} 
          />
          <div className="absolute top-2 right-2 p-1 rounded-xl bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300">
            <DropDown handleDelete={onDelete}>
              <div className="cursor-pointer">
                <BsThreeDotsVertical className="h-5 w-5 text-gray-700" />
              </div>
            </DropDown>
          </div>
        </Link>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <Link href={`/tutorials/${tutorial.tutorialId}`} passHref>
          <h3 className="text-lg font-semibold leading-tight tracking-tight line-clamp-2 mb-2 cursor-pointer">
            {tutorial.courseOutput.course.name}
          </h3>
        </Link>
        <div className="space-y-2 mb-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TbCategoryPlus className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{tutorial.category}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CiTimer className="h-4 w-4 flex-shrink-0" />
            <span>{tutorial.courseOutput.course.duration}</span>
          </div>
          <Badge variant="secondary" className={getLevelStyle(tutorial.level)}>
            {tutorial.level}
          </Badge>
        </div>
        <p 
          className={`text-sm text-muted-foreground transition-all duration-300 ease-in-out overflow-hidden flex-grow ${isHovered ? 'max-h-20' : 'max-h-0'}`}
        >
          {tutorial.courseOutput.course.description}
        </p>
      </div>
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={tutorial.userProfileImage || undefined} alt={tutorial.userName || 'User'} />
            <AvatarFallback>{tutorial.userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{tutorial.userName || 'Anonymous'}</p>
            <p className="text-xs text-muted-foreground">Creator</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TutorialCard;