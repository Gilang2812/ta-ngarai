"use client";
import React, { useState } from "react";

import { Product } from "@/data/craft";
import { Rating } from "./Rating";
import { formatPrice } from "@/lib/priceFormatter";
import { ColorVariantSelector } from "./ColorVariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { BsBagCheck, BsCart } from "react-icons/bs";
import ButtonTooltip from "../common/ButtonTooltip";
import { FaFacebook, FaPinterest, FaTiktok } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants?.[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} items to cart!`);
    // Here you would implement your actual cart logic
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} items!`);
    // Here you would implement your checkout logic
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="space-y-4 font-normal">
      <div className="flex items-center">
        <Rating rating={product.bintang} showText={true} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

      <div className="grid grid-cols-2 text-sm text-gray-600">
        <div>Stok: {product.stock}</div>
        <div>Terjual: {product.sold}</div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-red-600">
          {formatPrice(product.currentPrice)}
        </span>
        {product.price && (
          <span className="text-base text-gray-400 line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      {product.voucherInfo && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
          {product.voucherInfo}
        </div>
      )}
      <div className="grid grid-cols-2 justify-between">
        <section className="w-[500px]  ">
          <div className="py-2">
            <h3 className="text-sm  font-bold text-gray-900 mb-2">Variasi</h3>
            <ColorVariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariantId}
              onSelect={setSelectedVariantId}
            />
          </div>
          {product.warranty && (
            <div className="py-2">
              <p className="text-sm font-bold text-gray-600">{product.warranty}</p>
            </div>
          )}
        </section>
        <section className="py-4 ">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Deskripsi</h3>
          <p className="text-gray-700">{product.description}</p>
        </section>
      </div>

      <div className="flex gap-3">
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          onChange={handleQuantityChange}
          max={product.stock}
        />
        <ButtonTooltip
          label={"KERANJANG"}
          className="w-full"
          onClick={handleAddToCart}
          Icon={BsCart}
        />

        <ButtonTooltip
          label=" BELI SEKARANG"
          Icon={BsBagCheck}
          variant="primary"
          className="w-full"
          onClick={handleBuyNow}
        />
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-gray-200">
        <button
          onClick={toggleFavorite}
          className={`${
            isFavorite && "text-red-500"
          } flex items-center active:text-black text-gray-500    `}
        >
          <MdFavorite />
          <span className="ml-2 text-sm">Favorit</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">Bagikan:</span>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-blue-600 transition-ease-in-out">
              <FaFacebook />
            </button>
            <button className="text-gray-500 hover:text-white hover:bg-black transition-ease-in-out rounded-full">
              <FaTiktok />
            </button>
            <button className="text-gray-500 hover:text-red-600 transition-ease-in-out">
              <FaPinterest />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
