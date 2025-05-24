import React from "react";

const CraftSkeleton = ({ itemsPerRow = 4, rows = 2 }) => {
  const totalItems = itemsPerRow * rows;

  return (
    <div className="w-full bg-gray-50 p-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(totalItems)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden relative"
          >
            {/* Hot badge skeleton (only show on first few items) */}
            {index < 2 && (
              <div className="absolute top-2 left-2 z-10 w-8 h-6 bg-red-200 rounded-sm animate-pulse"></div>
            )}

            {/* Product image skeleton */}
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>

            {/* Product content */}
            <div className="p-4">
              {/* Star rating skeleton */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, starIndex) => (
                  <div
                    key={starIndex}
                    className="w-4 h-4 bg-yellow-200 rounded-sm animate-pulse"
                  ></div>
                ))}
                <div className="ml-2 w-12 h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              {/* Product title skeleton */}
              <div className="mb-3">
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              {/* Price skeleton */}
              <div className="h-5 w-20 bg-red-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more skeleton (optional) */}
      <div className="flex justify-center mt-8">
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default CraftSkeleton;
