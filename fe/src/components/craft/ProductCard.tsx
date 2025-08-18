import React from "react";
import Image from "next/image";
import { HotBadge } from "./HotBadge";
import { Rating } from "./Rating";
import { formatPrice } from "@/lib/priceFormatter";
import Link from "next/link";
import { baseUrl } from "@/lib/baseUrl";
import { DetailCraftUserResponse } from "@/type/schema/DetailCraftSchema";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";

interface ProductCardProps {
  product: DetailCraftUserResponse;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isUserAuth } = useUserRole();
  return (
    <Link
      href={
        isUserAuth
          ? ROUTES.DETAIL_CRAFT(
              product?.variant?.id_craft,
              product.id_souvenir_place,
              product?.craft_variant_id
            )
          : "#"
      }
    >
      <div
        aria-label={`Go to ${product?.variant?.name} details`}
        className="relative border p-2 hover:cursor-pointer bg-white  hover:shadow-primary/30 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      >
        {<HotBadge />}
        <div className="relative h-48 w-full">
          <Image
            src={`${baseUrl}/${product?.craftGalleries?.[0]?.url}`}
            alt={product?.variant?.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <Rating
            rating={product?.items?.length}
            reviewCount={product?.items?.length}
          />
          <p className="bg-purple-500/50 text-white"></p>
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
