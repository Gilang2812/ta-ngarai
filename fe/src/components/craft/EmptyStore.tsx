import React from "react";
import { PiEmpty } from "react-icons/pi";

const EmptyStore = () => {
  return (
    <section className="w-80 h-full bg-white border-l border-gray-200 flex flex-col">
      <article className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Available Items
        </h2>
      </article>
      <article className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <PiEmpty className="w-10 h-10 text-gray-400" />
        </div>

        <h3 className="text-lg font-medium text-gray-700 mb-2">
          No Items Available
        </h3>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          There are currently no craft items available in this area. Try
          exploring different locations on the map or check back later.
        </p>
      </article>
    </section>
  );
};

export default EmptyStore;
