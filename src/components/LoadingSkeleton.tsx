import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'avatar' | 'project';
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  className = '' 
}) => {
  const baseClasses = 'animate-pulse bg-gray-300 dark:bg-gray-700 rounded';

  const skeletonTypes = {
    card: (
      <div className={`${className} space-y-4`}>
        <div className={`${baseClasses} h-48 w-full`} />
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 w-3/4`} />
          <div className={`${baseClasses} h-4 w-1/2`} />
        </div>
      </div>
    ),
    text: (
      <div className={`${className} space-y-2`}>
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-5/6`} />
        <div className={`${baseClasses} h-4 w-4/6`} />
      </div>
    ),
    avatar: (
      <div className={`${className} flex items-center space-x-4`}>
        <div className={`${baseClasses} h-12 w-12 rounded-full`} />
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 w-24`} />
          <div className={`${baseClasses} h-3 w-16`} />
        </div>
      </div>
    ),
    project: (
      <div className={`${className} space-y-4`}>
        <div className={`${baseClasses} h-40 w-full`} />
        <div className="space-y-3">
          <div className={`${baseClasses} h-6 w-3/4`} />
          <div className="space-y-2">
            <div className={`${baseClasses} h-3 w-full`} />
            <div className={`${baseClasses} h-3 w-5/6`} />
          </div>
          <div className="flex space-x-2">
            <div className={`${baseClasses} h-6 w-16`} />
            <div className={`${baseClasses} h-6 w-20`} />
            <div className={`${baseClasses} h-6 w-14`} />
          </div>
        </div>
      </div>
    )
  };

  return (
    <div role="status" aria-label="Cargando contenido">
      {skeletonTypes[type]}
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default LoadingSkeleton;