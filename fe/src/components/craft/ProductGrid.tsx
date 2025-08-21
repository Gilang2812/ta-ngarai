import React from "react";
import { ProductCard } from "./ProductCard";
import { DetailCraftOrderResponse } from "@/type/schema/DetailCraftSchema";

interface ProductGridProps {
  crafts: DetailCraftOrderResponse[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ crafts }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {crafts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
