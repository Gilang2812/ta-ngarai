import React from 'react';

const CraftCartSkeletonLoader = ({ itemCount = 4 }) => {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header with diagonal blue background */}
      <div className="relative bg-primary h-20">
        {/* Diagonal design */}
        <div className="absolute inset-0 bg-primary transform -skew-y-1 origin-top-left"></div>
        
        {/* Tab navigation */}
        <div className="relative z-10 pt-8 px-6">
          <div className="flex gap-8">
            <div className="h-6 w-16 bg-blue-200 rounded-md animate-pulse"></div>
            <div className="h-6 w-12 bg-blue-100 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-6">
        {/* Main cart content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items section */}
          <div className="flex-1">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-6">
              <div className="col-span-5 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="col-span-2 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="col-span-2 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="col-span-2 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="col-span-1"></div>
            </div>
            
            {/* Cart items */}
            {[...Array(itemCount)].map((_, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
                {/* Product image and name */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
                
                {/* Price */}
                <div className="col-span-2">
                  <div className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                
                {/* Quantity controls */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
                
                {/* Subtotal */}
                <div className="col-span-2">
                  <div className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                
                {/* Remove button */}
                <div className="col-span-1">
                  <div className="w-6 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart total sidebar */}
          <div className="w-full lg:w-80">
            <div className="bg-gray-50 rounded-lg p-6">
              {/* Cart Total header */}
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse mb-6"></div>
              
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>
              
              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <div className="h-5 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              
              {/* Checkout button */}
              <div className="h-12 w-full bg-blue-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftCartSkeletonLoader;