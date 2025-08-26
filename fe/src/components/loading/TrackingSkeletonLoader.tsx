export const TrackingPageSkeleton = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const cardBgClass = isDark ? "bg-gray-800" : "bg-white";
  const skeletonVariant = isDark ? "dark" : "default";
  const circleVariant = isDark ? "darkCircle" : "circle";

  const Skeleton = ({ className = "", variant = "default" }) => {
    const baseClass = "animate-pulse rounded";
    const variants = {
      default: "bg-gray-300",
      dark: "bg-gray-800",
      circle: "rounded-full bg-gray-300",
      darkCircle: "rounded-full bg-gray-800",
    };

    return (
      <div
        className={`${baseClass} ${
          variants[variant as keyof typeof variants]
        } ${className}`}
      />
    );
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black" : "bg-gray-50"} py-8 px-4`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className={`${cardBgClass} rounded-xl shadow-lg p-6 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className={`h-8 w-48`} variant={skeletonVariant} />
            <Skeleton
              className={`h-10 w-32 rounded-full`}
              variant={skeletonVariant}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className={`h-4 w-64`} variant={skeletonVariant} />
            <Skeleton className={`h-4 w-56`} variant={skeletonVariant} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courier Info Skeleton */}
          <div className={`${cardBgClass} rounded-xl shadow-lg p-6`}>
            <Skeleton className={`h-6 w-40 mb-4`} variant={skeletonVariant} />
            <div className="flex items-center mb-4">
              <Skeleton className={`w-12 h-12 mr-4`} variant={circleVariant} />
              <div className="flex-1">
                <Skeleton
                  className={`h-5 w-32 mb-2`}
                  variant={skeletonVariant}
                />
                <Skeleton className={`h-4 w-20`} variant={skeletonVariant} />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className={`h-4 w-36`} variant={skeletonVariant} />
              <Skeleton className={`h-4 w-28`} variant={skeletonVariant} />
            </div>
          </div>

          {/* Addresses Skeleton */}
          <div
            className={`lg:col-span-2 ${cardBgClass} rounded-xl shadow-lg p-6`}
          >
            <Skeleton className={`h-6 w-32 mb-4`} variant={skeletonVariant} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-gray-300 pl-4">
                <Skeleton
                  className={`h-5 w-16 mb-2`}
                  variant={skeletonVariant}
                />
                <Skeleton
                  className={`h-4 w-24 mb-1`}
                  variant={skeletonVariant}
                />
                <Skeleton className={`h-4 w-full`} variant={skeletonVariant} />
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <Skeleton
                  className={`h-5 w-20 mb-2`}
                  variant={skeletonVariant}
                />
                <Skeleton
                  className={`h-4 w-28 mb-1`}
                  variant={skeletonVariant}
                />
                <Skeleton className={`h-4 w-full`} variant={skeletonVariant} />
              </div>
            </div>
          </div>
        </div>

        {/* Tracking History Skeleton */}
        <div className={`${cardBgClass} rounded-xl shadow-lg p-6 mt-6`}>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className={`h-6 w-36`} variant={skeletonVariant} />
            <Skeleton className={`h-4 w-28`} variant={skeletonVariant} />
          </div>

          <div className="relative">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative flex items-start pb-6">
                {index !== 3 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                )}

                <Skeleton
                  className={`w-12 h-12 mr-4 z-10`}
                  variant={circleVariant}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Skeleton
                      className={`h-4 w-24`}
                      variant={skeletonVariant}
                    />
                    <Skeleton
                      className={`h-3 w-32`}
                      variant={skeletonVariant}
                    />
                  </div>
                  <Skeleton
                    className={`h-4 w-full mb-2`}
                    variant={skeletonVariant}
                  />
                  <Skeleton
                    className={`h-6 w-16 rounded-full`}
                    variant={skeletonVariant}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
