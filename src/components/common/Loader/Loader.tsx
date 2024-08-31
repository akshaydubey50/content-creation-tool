"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <Card className="w-[350px] overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-[200px] rounded-t-lg animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3 mb-3">
          <Skeleton className="h-[25px] w-[150px] rounded-xl animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
            <Skeleton className="h-4 w-[200px] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
          </div>
        </div>
       <div className="flex flex-col space-y-3">
          <Skeleton className="h-[25px] w-[50px] rounded-xl animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-[40px] w-[200px] rounded-lg animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
            <Skeleton className="h-[40px] w-[40px] rounded-md animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%] animate-shimmer" />
          </div>
       </div>
      </CardContent>
    </Card>
  )
}