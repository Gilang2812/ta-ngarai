interface RawSkeletonProps {
    tableHead: string[];
  }
  
  export const RawSkeleton: React.FC<RawSkeletonProps> = ({ tableHead }) => {
    return (
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              {tableHead?.map((title, index) => (
                <th key={index} className="p-2 text-left">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
          <div className="h-4 bg-gray-300 mb-6 rounded"></div>
          <div className="h-4 bg-gray-200 mb-6 rounded"></div>
          <div className="h-4 bg-gray-300 mb-6 rounded"></div>
          <div className="h-4 bg-gray-200 mb-6 rounded"></div>
        </div>
      </div>
    );
  };
  