import { type VariantBelongCraftSchema } from "@/type/schema/CraftSchema";
import { motion } from "framer-motion";
import React from "react";

interface ColorVariantSelectorProps {
  variants?: VariantBelongCraftSchema[];
  selectedVariantId: string;
  onSelect: (variant: VariantBelongCraftSchema) => void;
}

export const VariantSelector: React.FC<ColorVariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onSelect,
}) => {
  return (
    <motion.div layout className="flex gap-2 flex-wrap">
      {variants?.map((variant) => (
        <motion.div layout className="relative" key={variant.id}>
          <motion.button
            onClick={() => onSelect(variant)}
            disabled={!variant.stock}
            title={variant.name}
            className="capitalize text-nowrap bg-primary/10 border border-slate-300 rounded p-2 text-slate-500 text-sil"
          >
            {variant.name}
          </motion.button>
          {selectedVariantId === variant.id && (
            <motion.div
              layoutId="selectedBorder"
              className="absolute bg-yellow-500/5  ring-2 ring-yellow-300 border top-0 left-0 rounded border-yellow-300 w-full h-full"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};
