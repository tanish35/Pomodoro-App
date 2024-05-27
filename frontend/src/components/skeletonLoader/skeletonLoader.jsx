import React from 'react';
import './skeletonLoader.css'; // We'll create this CSS file for custom styles

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 max-w-sm mx-auto">
      <div className="skeleton-loader h-6 w-3/4"></div>
      <div className="skeleton-loader h-6 w-1/2"></div>
      <div className="skeleton-loader h-6 w-full"></div>
    </div>
  );
};

export default SkeletonLoader;
