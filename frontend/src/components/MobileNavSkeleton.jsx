import React from 'react';

const MobileNavSkeleton = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full backdrop-blur-2xl shadow-lg p-2 flex justify-around">
      {/* Skeleton Buttons */}
      {Array(3).fill(null).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-16 h-3 mt-2 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default MobileNavSkeleton;
