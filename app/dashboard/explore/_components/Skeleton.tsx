import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const Cardskeleton = () => {
  return (
    <Card className="w-full max-w-sm h-[28rem] flex flex-col">
      <div className="relative">
        <Skeleton className="w-full h-56" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="space-y-2 mb-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-1/4 rounded-full" />
        </div>
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Cardskeleton
