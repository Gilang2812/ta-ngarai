import React from 'react';

const ReviewTransactionSkeleton = ({ itemCount = 3 }) => {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header with diagonal blue background */}
      <div className="relative bg-primary/50 h-20">
        {/* Diagonal design */}
        <div className="absolute inset-0 bg-primary/50 transform -skew-y-1 origin-top-left"></div>
        
        {/* Page title */}
        <div className="relative z-10 pt-8 px-6">
          <div className="h-7 w-40 bg-white bg-opacity-80 rounded-md animate-pulse"></div>
        </div>
      </div>
      
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Transaction items */}
          <div className="space-y-6">
            {[...Array(itemCount)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  {/* Left side - Product info */}
                  <div className="flex items-center gap-4">
                    {/* Product image */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                    
                    {/* Product details */}
                    <div className="flex flex-col">
                      {/* Product name */}
                      <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse mb-3"></div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="h-4 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Rate button */}
                  <div className="flex-shrink-0">
                    <div className="h-10 w-24 bg-blue-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional transaction info (optional) */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transaction details */}
              <div className="space-y-3">
                <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-36 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              
              {/* Order summary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTransactionSkeleton;