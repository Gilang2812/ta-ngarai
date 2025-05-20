import React from "react";

const ManagementSkeletonLoader = ({ type = "marketplace" }) => {
  // Number of rows to display in the skeleton table
  const rowCount = 5;

  return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Management panel */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-10 w-36 bg-blue-200 rounded-md animate-pulse"></div>
        </div>

        {/* Table skeleton */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-full">
            {/* Table header */}
            <div className="flex border-b border-gray-200 pb-2">
              <div className="w-12 h-6 bg-gray-200 rounded-md animate-pulse mr-2"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="w-40 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="w-56 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="w-32 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse mr-4"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Table rows */}
            {[...Array(rowCount)].map((_, index) => (
              <div
                key={index}
                className="flex py-4 border-b border-gray-100 items-center"
              >
                <div className="w-12 h-5 bg-gray-200 rounded-md animate-pulse mr-2"></div>
                <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                <div className="w-40 h-5 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                {/* Address column - taller for multiline content */}
                <div className="w-56 h-10 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                <div className="w-32 h-5 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                {/* Description column - taller for multiline content */}
                <div className="flex-1 h-12 bg-gray-200 rounded-md animate-pulse mr-4"></div>
                <div className="w-20 h-8 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional panel for versatility (can be customized based on management type) */}
      {type === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse mb-4"></div>
              <div className="h-24 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      )}

      {type === "analytics" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-6 w-36 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-60 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementSkeletonLoader;
