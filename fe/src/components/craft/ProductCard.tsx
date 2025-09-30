import React from "react";
import Image from "next/image";
import { Rating } from "./Rating";
import { formatPrice } from "@/lib/priceFormatter";
import Link from "next/link";
import { baseUrl } from "@/lib/baseUrl";
import { DetailCraftOrderResponse } from "@/type/schema/DetailCraftSchema";
import { ROUTES } from "@/data/routes";
import { Store } from "lucide-react";

interface ProductCardProps {
  product: DetailCraftOrderResponse;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={ROUTES.DETAIL_CRAFT({
        id_craft: product?.variant?.id_craft,
        id_souvenir_place: product.id_souvenir_place,
        id_craft_variant: product?.craft_variant_id,
      })}
    >
      <div
        aria-label={`Go to ${product?.variant?.name} details`}
        className="relative z-0 border p-2 hover:cursor-pointer bg-white  hover:shadow-primary/30 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      >
        <div className="relative h-48 w-full">
          <Image
            src={`${baseUrl}/${product?.craftGalleries?.[0]?.url}`}
            alt={product?.variant?.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 space-y-2">
          <Rating
            rating={
              product?.items?.reduce(
                (acc, item) => acc + (item.review_rating || 0),
                0
              ) / product?.items?.filter((item) => item.review_rating).length
            }
            reviewCount={
              product?.items?.filter((item) => item.review_rating).length
            }
          />
          <p className="bg-secondary text-white flex rounded gap-2 text-nowrap p-1">
            <Store />
            {product.souvenirPlace.name}
          </p>
          <h3 className="capitalize mt-2 text-sm font-medium text-gray-900 line-clamp-2">
            {`${product?.variant?.craft.name} ${product?.variant?.name}`}
          </h3>
          <p className="mt-1 text-lg font-semibold text-red-600">
            {formatPrice(product?.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};
