import React from "react";

const CheckoutSkeletonLoader = ({ orderItemCount = 4 }) => {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header with diagonal primary */}
      <div className="relative bg-primary h-20">
        {/* Diagonal design */}
        <div className="absolute inset-0 bg-secondary/30 transform -skew-y-1 origin-top-left"></div>

        {/* Page title */}
        <div className="relative z-10 pt-8 px-6">
          <div className="h-8 w-24 bg-white bg-opacity-80 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Billing Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Information Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-6"></div>

              {/* Select Address */}
              <div className="mb-6">
                <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-3"></div>
                <div className="h-4 w-64 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-4"></div>

                {/* Payment options */}
                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <div className="flex items-center gap-3 p-3 border border-primary rounded-lg bg-primary">
                    <div className="w-5 h-5 bg-primary rounded-full animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>

                  {/* Bank Transfer */}
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>

                  {/* Apar Payment */}
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-6"></div>

              <div className="mb-3">
                <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              {/* Text area */}
              <div className="h-24 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              {/* Order Summary header */}
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-6"></div>

              {/* Order items */}
              <div className="space-y-4 mb-6">
                {[...Array(orderItemCount)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {/* Product image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>

                    {/* Product details */}
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-1"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-6"></div>

              {/* Order totals */}
              <div className="space-y-3 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                  <div className="h-5 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>

              {/* Place Order button */}
              <div className="h-12 w-full bg-primary rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeletonLoader;
