import {
  DetailCraftManagementResponse,
  DetailCraftOrderResponse,
} from "@/type/schema/DetailCraftSchema";
import { motion } from "framer-motion";
import React from "react";

interface ColorVariantSelectorProps {
  crafts: (DetailCraftOrderResponse | DetailCraftManagementResponse)[];
  selectedDetailCraftId: string;
  onSelect: (
    variant: DetailCraftOrderResponse | DetailCraftManagementResponse
  ) => void;
  isFullName?: boolean;
}

export const VariantSelector: React.FC<ColorVariantSelectorProps> = ({
  crafts,
  selectedDetailCraftId,
  onSelect,
  isFullName = false,
}) => {
  return (
    <motion.div layout className="flex gap-2 flex-wrap">
      {crafts?.map((detail, index) => (
        <motion.div layout className="relative" key={index}>
          <motion.button
            onClick={() => onSelect(detail)}
            disabled={!detail.stock}
            title={detail.variant.name}
            className="capitalize text-nowrap bg-primary/10 border border-slate-300 rounded p-2 text-slate-500 text-sil"
          >
            {`${isFullName ? detail.variant.craft.name : ""} ${
              detail.variant.name
            }`}
          </motion.button>
          {selectedDetailCraftId === detail.craft_variant_id && (
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
