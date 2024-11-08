import { RawSkeleton } from "@/components/loading/RawSkeleton";

interface RawSkeletonProps {
    tableHead: string[];
  } 
  export const TableRawSkeleton: React.FC<RawSkeletonProps> = ({ tableHead }) => {
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
        <RawSkeleton />
        </div>
    );
  };
  