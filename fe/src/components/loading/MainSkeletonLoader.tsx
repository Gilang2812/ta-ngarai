import React from "react";

const MainSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        {/* Logo/Brand */}
        <div className="p-4 border-b">
          <div className="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="w-20 h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <div className="space-y-3">
            {/* Home - Active */}
            <div className="bg-blue-100 p-3 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-400 rounded animate-pulse"></div>
                <div className="w-12 h-4 bg-gray-400 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Other menu items */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Social Links */}
        <div className="p-4 mt-auto">
          <div className="flex space-x-4">
            <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="w-48 h-8 bg-gray-400 rounded mb-2 animate-pulse"></div>
            <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Announcement Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2 animate-pulse"></div>
            <div className="w-28 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start">
                <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-full h-4 bg-gray-300 rounded mb-1 animate-pulse"></div>
                  {item === 1 && (
                    <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="w-48 h-6 bg-gray-400 rounded mb-4 animate-pulse"></div>

            {/* Map Controls */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-300 rounded animate-pulse"></div>
                <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Map Buttons */}
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((btn) => (
                <div
                  key={btn}
                  className="w-10 h-10 bg-blue-200 rounded animate-pulse"
                ></div>
              ))}
            </div>

            {/* Weather Info */}
            <div className="flex items-center space-x-6 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-300 rounded animate-pulse mb-4"></div>

            {/* Map Toggle */}
            <div className="flex space-x-2">
              <div className="px-4 py-2 bg-gray-200 rounded animate-pulse">
                <div className="w-8 h-4 bg-gray-400 rounded animate-pulse"></div>
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded animate-pulse">
                <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div>
            <div className="w-40 h-6 bg-gray-400 rounded mb-4 animate-pulse"></div>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
              <div className="p-4">
                <div className="w-32 h-5 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSkeletonLoader;
