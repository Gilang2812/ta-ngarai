export const OrderDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white"> 
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg p-6 mb-6">
        <div className="h-8 bg-white/20 rounded animate-pulse mb-2"></div>
      </div> 
      <div className="bg-gray-50 rounded-b-lg p-6"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> 
          <div className="space-y-4"> 
            <div>
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-20"></div>
              <div className="h-6 bg-gray-300 rounded animate-pulse w-32"></div>
            </div> 
            <div>
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-32"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse w-40"></div>
            </div> 
            <div>
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-16"></div>
              <div className="h-6 bg-red-200 rounded animate-pulse w-24"></div>
            </div>
          </div> 
          <div className="space-y-4"> 
            <div>
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-28"></div>
              <div className="h-6 bg-gray-300 rounded animate-pulse w-36"></div>
            </div> 
            <div>
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-28"></div>
              <div className="h-6 bg-gray-300 rounded animate-pulse w-36"></div>
            </div>
          </div>
        </div> 
        <div className="mb-6">
          <div className="h-6 bg-gray-300 rounded animate-pulse mb-4 w-48"></div>
          
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-3"> 
              <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-5 bg-gray-300 rounded animate-pulse w-8"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-6 bg-gray-300 rounded animate-pulse w-40"></div>
              <div className="h-8 bg-blue-200 rounded animate-pulse w-16"></div>
            </div>
          </div>
        </div> 
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-orange-300 rounded animate-pulse mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-orange-200 rounded animate-pulse w-32"></div>
              <div className="h-4 bg-orange-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-orange-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};