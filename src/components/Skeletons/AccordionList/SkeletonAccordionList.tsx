import React from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonAccordionList= ({value}: {value: string}) => (
  <AccordionItem value={value}>
    <AccordionTrigger className=" rounded-t-lg text-gray-500 font-bold p-4 uppercase hover:no-underline ">
      <Skeleton className="h-10 w-32 bg-gray-300" />
    </AccordionTrigger>
    <AccordionContent>
      <div className="flex justify-end items-center my-4">
        <Skeleton className="h-10 w-32 bg-gray-300" />
      </div>
      <div className="h-[400px] w-full bg-gray-100 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4">
            <Skeleton className="h-8 w-full mb-2 bg-gray-200" />
            <Skeleton className="h-8 w-full bg-gray-200" />
          </div>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
); 

export default SkeletonAccordionList;
