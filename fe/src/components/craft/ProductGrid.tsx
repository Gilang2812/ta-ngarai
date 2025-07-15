import React from "react";
import { ProductCard } from "./ProductCard";
import { DetailCraftUserResponse } from "@/type/schema/DetailCraftSchema";

interface ProductGridProps {
  crafts: DetailCraftUserResponse[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ crafts }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {crafts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
