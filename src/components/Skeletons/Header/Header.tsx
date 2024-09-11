import React from 'react';

import {Skeleton} from '@/components/ui/skeleton';

const SkeletonHeader: React.FC = () => (
  <div className="mx-auto w-[140px] mb-4">
    <Skeleton className="w-full h-14 bg-gray-200" />
  </div>
); 

export default SkeletonHeader;
