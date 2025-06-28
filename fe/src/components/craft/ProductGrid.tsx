
import React from "react";
import { ProductCard } from "./ProductCard";
import { CraftProduct } from "@/type/schema/CraftSchema";

interface ProductGridProps {
  crafts: CraftProduct[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ crafts }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {crafts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
