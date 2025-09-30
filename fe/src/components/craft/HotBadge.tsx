import React from "react";

export const HotBadge: React.FC = () => {
  return (
    <div className="relative">
      <div className=" absolute top-2 z-50 left-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
        HOT
      </div>
    </div>
  );
};
