import React from "react";
import Image from "next/image";
import { HotBadge } from "./HotBadge";
import { Rating } from "./Rating";
import { formatPrice } from "@/lib/priceFormatter";
import Link from "next/link";
import { CraftProduct } from "@/type/schema/CraftSchema";
import { baseUrl } from "@/lib/baseUrl";

interface ProductCardProps {
  product: CraftProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`craft/${product.id_craft}?idvr=${product.id}`}>
      <div
        aria-label={`Go to ${product.name} details`}
        className="relative border p-2 hover:cursor-pointer bg-white  hover:shadow-primary/30 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      >
        {<HotBadge />}
        <div className="relative h-48 w-full">
          <Image
            src={`${baseUrl}/${product.craftGalleries[0].url}`}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <Rating
            rating={product.itemCheckouts.length}
            reviewCount={product.itemCheckouts.length}
          />
          <h3 className="capitalize mt-2 text-sm font-medium text-gray-900 line-clamp-2">
            {`${product.craft.name} ${product.name}`}
          </h3>
          <p className="mt-1 text-lg font-semibold text-red-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};
