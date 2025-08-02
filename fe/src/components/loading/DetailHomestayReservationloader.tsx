const DetailHomestayReservationLoader = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
      </div>

      {/* Reservation Details Skeleton */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homestay Section Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex gap-4">
              <div className="w-32 h-24 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-300 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Tourism Package Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Transaction Table Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
        <div className="bg-gray-300 h-12 rounded-t"></div>
        <div className="bg-gray-100 h-16 rounded-b"></div>
        <div className="h-8 bg-gray-200 rounded w-32 mt-4 ml-auto"></div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex gap-4 justify-end">
        <div className="h-10 bg-gray-300 rounded w-20"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
};

export default DetailHomestayReservationLoader;
