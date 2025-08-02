import React from "react";

const WeatherSkeletonLoader = () => {
  return (
    <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-12 h-5 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex items-center space-x-1">
        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default WeatherSkeletonLoader;
