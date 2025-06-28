import { ShippingItem } from "@/type/schema/CraftTransactionSchema";
import React from "react";
import ImgCraft from "../common/ImgCraft";
import { Rating } from "../craft/Rating";
import Image from "next/image";

type Props = {
  shippingItems: ShippingItem[];
};

const ReviewHistory = ({ shippingItems }: Props) => {
  return shippingItems.map((item, index) => (
    <section key={index} className="space-y-4 border-b-2 p-4">
      <article className="flex items-start gap-4 font-bold text-lg capitalize text-wrap">
        <ImgCraft
          alt="craft gallery"
          width={50}
          height={50}
          src={item.craftVariant.craftGalleries?.[0]?.url}
        />
        <p>
          {item.craftVariant.craft.name} {item.craftVariant.name}
        </p>
      </article>
      <article className="p-4 rounded-xl border flex items-start gap-4 font-bold text-lg capitalize text-wrap">
        <Image
          alt="profile"
          width={32}
          height={32}
          src="/images/carousel-1.jpg"
          className="size-12 rounded-full "
        />
        <div className="flex-1 space-y-4">
          <p className="font-medium text-sm text-gray-900">giaing2812</p>
          <div>
            <Rating rating={4.5} reviewCount={10} showText={true} />
          </div>

          <p className="text-sm text-gray-700 mb-2">Nama produk kurang jelas</p>
          <p className="text-xs text-gray-400">25-02-2025 19:08</p>
        </div>
      </article>
    </section>
  ));
};

export default ReviewHistory;
