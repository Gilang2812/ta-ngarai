
import React from "react";
import { ProductCard } from "./ProductCard";
import { CraftProduct } from "@/type/schema/CraftSchema";

interface ProductGridProps {
  crafts: CraftProduct[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ crafts }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {crafts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
