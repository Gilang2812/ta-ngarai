import React from 'react';

// Individual skeleton components
const SkeletonLine = ({ width = "100%", height = "h-4" }) => (
  <div 
    className={`${height} bg-gray-300 rounded animate-pulse`}
    style={{ width }}
  />
);

const SkeletonCircle = ({ size = "w-12 h-12" }) => (
  <div className={`${size} bg-gray-300 rounded-full animate-pulse`} />
);

const SkeletonRectangle = ({ width = "100%", height = "h-32" }) => (
  <div 
    className={`${height} bg-gray-300 rounded animate-pulse`}
    style={{ width }}
  />
);

// Profile skeleton (matches the profile component)
const ProfileSkeleton = () => (
  <main className="bg-gray-50 min-h-screen p-6">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <SkeletonLine width="120px" height="h-8" />
        <SkeletonLine width="100px" height="h-10" />
      </header>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <section className="space-y-6">
          {/* Fullname */}
          <div>
            <SkeletonLine width="60px" height="h-4" />
            <div className="mt-1">
              <SkeletonLine width="120px" height="h-6" />
            </div>
          </div>

          {/* Username */}
          <div>
            <SkeletonLine width="70px" height="h-4" />
            <div className="mt-1">
              <SkeletonLine width="80px" height="h-6" />
            </div>
          </div>

          {/* Email */}
          <div>
            <SkeletonLine width="40px" height="h-4" />
            <div className="mt-1">
              <SkeletonLine width="200px" height="h-6" />
            </div>
          </div>

          {/* Address */}
          <div>
            <SkeletonLine width="55px" height="h-4" />
            <div className="mt-1">
              <SkeletonLine width="90px" height="h-6" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <SkeletonLine width="45px" height="h-4" />
            <div className="mt-1">
              <SkeletonLine width="130px" height="h-6" />
            </div>
          </div>
        </section>

        {/* Profile Picture Section */}
        <section>
          <SkeletonLine width="90px" height="h-4" />
          <div className="flex justify-center mt-4">
            <SkeletonCircle size="w-48 h-48" />
          </div>
        </section>
      </div>
    </div>
  </main>
);

// Card skeleton
const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <SkeletonCircle size="w-16 h-16" />
      <div className="flex-1 space-y-2">
        <SkeletonLine width="70%" height="h-5" />
        <SkeletonLine width="50%" height="h-4" />
      </div>
    </div>
    <div className="space-y-2">
      <SkeletonLine width="100%" height="h-4" />
      <SkeletonLine width="90%" height="h-4" />
      <SkeletonLine width="75%" height="h-4" />
    </div>
  </div>
);

// List skeleton
const ListSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="p-4 flex items-center space-x-4">
        <SkeletonCircle size="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="60%" height="h-4" />
          <SkeletonLine width="40%" height="h-3" />
        </div>
        <SkeletonLine width="20px" height="h-4" />
      </div>
    ))}
  </div>
);

// Table skeleton
const TableSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Table header */}
    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonLine key={index} width="80%" height="h-4" />
        ))}
      </div>
    </div>
    
    {/* Table rows */}
    {Array.from({ length: 6 }).map((_, rowIndex) => (
      <div key={rowIndex} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
        <div className="grid grid-cols-4 gap-4 items-center">
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <SkeletonLine 
              key={colIndex} 
              width={colIndex === 0 ? "90%" : colIndex === 3 ? "60%" : "70%"} 
              height="h-4" 
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Article skeleton
const ArticleSkeleton = () => (
  <article className="bg-white rounded-lg shadow-sm p-6 space-y-4">
    <SkeletonRectangle width="100%" height="h-48" />
    <div className="space-y-3">
      <SkeletonLine width="80%" height="h-7" />
      <div className="flex items-center space-x-4">
        <SkeletonCircle size="w-8 h-8" />
        <SkeletonLine width="120px" height="h-4" />
        <SkeletonLine width="80px" height="h-4" />
      </div>
      <div className="space-y-2 pt-2">
        <SkeletonLine width="100%" height="h-4" />
        <SkeletonLine width="95%" height="h-4" />
        <SkeletonLine width="85%" height="h-4" />
        <SkeletonLine width="70%" height="h-4" />
      </div>
    </div>
  </article>
);

// Main component showcasing different skeletons
type ViewKey = 'profile' | 'cards' | 'list' | 'table' | 'article';

export default function LoadingSkeletons() {
  const [currentView, setCurrentView] = React.useState<ViewKey>('profile');

  const views: Record<ViewKey, { component: React.FC; title: string }> = {
    profile: { component: ProfileSkeleton, title: 'Profile Skeleton' },
    cards: { component: () => (
      <div className="p-6 space-y-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    ), title: 'Card Skeletons' },
    list: { component: () => (
      <div className="p-6">
        <ListSkeleton />
      </div>
    ), title: 'List Skeleton' },
    table: { component: () => (
      <div className="p-6">
        <TableSkeleton />
      </div>
    ), title: 'Table Skeleton' },
    article: { component: () => (
      <div className="p-6">
        <ArticleSkeleton />
      </div>
    ), title: 'Article Skeleton' }
  };

  const CurrentComponent = views[currentView].component;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(views).map(([key, view]) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as ViewKey)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === key
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {view.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="py-4">
        <CurrentComponent />
      </div>
    </div>
  );
}