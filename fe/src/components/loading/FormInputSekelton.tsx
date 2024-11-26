export const FormInputSkeleton = () => {
  return (
    <div
      role="status"
      className="  p-4 space-y-4  bg-white   divide-gray-200 rounded-xl animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
       
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
       
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
       
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
       
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="w-full">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
       
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
