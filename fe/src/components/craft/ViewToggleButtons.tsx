"use client";
 
import { motion } from "framer-motion";

type ViewMode = "grid" | "map";

interface Props {
  current: ViewMode;
  onChange: (view: ViewMode) => void;
}

export const ViewToggleButtons = ({ current, onChange }: Props) => {
  return (
    <header className="flex gap-4 border-b  p-4">
      {["grid", "map"].map((tab) => (
        <button
          key={tab}
          className="text-primary capitalize px-4 py-2 relative"
          onClick={() => onChange(tab as ViewMode)}
        >
         {tab}
          {current === tab && (
            <motion.div
              layoutId="underline"
              className="bg-primary h-1 absolute left-0 bottom-0 right-0 "
            />
          )}
        </button>
      ))}
    </header>
  );
};
