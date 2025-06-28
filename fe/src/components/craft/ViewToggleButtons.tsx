"use client";

import { motion } from "framer-motion";

type Props<T extends string> = {
  current: T;
  onChange: (view: T) => void;
  views: T[];
};

export const ViewToggleButtons = <T extends string>({
  current,
  onChange,
  views,
}: Props<T>) => {
  return (
    <header className="flex gap-4   items-center justify-center border-b  p-4">
      {views.map((tab) => (
        <button
          key={tab}
          className="text-secondary capitalize px-4 py-2 relative"
          onClick={() => onChange(tab)}
        >
          {tab}
          {current === tab && (
            <motion.div
              layoutId="underline"
              className="bg-secondary h-1 absolute left-0 bottom-0 right-0 "
            />
          )}
        </button>
      ))}
    </header>
  );
};
