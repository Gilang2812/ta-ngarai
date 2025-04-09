 
const MapSkeletonLoader = () => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Map container */}
      <div className="w-full h-96 bg-gray-200 animate-pulse relative">
        
        {/* Land masses */}
        <div className="absolute top-24 left-24 w-72 h-48 bg-gray-300 rounded-xl animate-pulse"></div>
        <div className="absolute top-36 left-3/4 w-44 h-32 bg-gray-300 rounded-xl animate-pulse"></div>
        <div className="absolute top-64 left-1/2 w-24 h-24 bg-gray-300 rounded-full animate-pulse"></div>
        
        {/* Roads/rivers as lines */}
        <div className="absolute top-60 left-24 w-3/4 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="absolute top-24 left-72 w-2 h-64 bg-gray-400 rounded-full animate-pulse"></div>
        
        {/* POI markers with custom pulse animation */}
        <div className="absolute top-48 left-48 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute w-12 h-12 bg-gray-400 rounded-full animate-ping opacity-75"></div>
        </div>
        
        <div className="absolute top-44 right-1/4 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute w-12 h-12 bg-gray-400 rounded-full animate-ping opacity-75"></div>
        </div>
        
        <div className="absolute top-3/4 left-1/2 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute w-12 h-12 bg-gray-400 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Controls skeleton */}
        <div className="absolute top-4 left-4 w-10 h-20 bg-gray-400 rounded-md animate-pulse"></div>
        
        {/* Search box */}
        <div className="absolute top-4 right-4 w-48 h-10 bg-gray-400 rounded-full animate-pulse"></div>
        
        {/* Scale indicator */}
        <div className="absolute bottom-4 left-4 w-24 h-5 bg-gray-400 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default MapSkeletonLoader;