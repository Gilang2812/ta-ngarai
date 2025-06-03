"use client";
import React, { useState } from "react";

import { Rating } from "./Rating";
import { formatPrice } from "@/lib/priceFormatter";
import { VariantSelector } from "./VariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { BsBagCheck, BsCart } from "react-icons/bs";
import ButtonTooltip from "../common/ButtonTooltip";
import { FaFacebook, FaPinterest, FaStore, FaTiktok } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import {
  VariantBelongCraftSchema,
  type CraftDetailSchema,
} from "@/type/schema/CraftSchema";
import { Form, Formik } from "formik";
import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { motion } from "framer-motion";

interface ProductInfoProps {
  craft: CraftDetailSchema;
  selectedVariant: VariantBelongCraftSchema;
  setSelectedVariant: (variant: VariantBelongCraftSchema) => void;
  initialValues: CraftCartForm;
  handleSubmit: (values: CraftCartForm) => void;
  actionRef: React.MutableRefObject<string>;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  craft,
  selectedVariant,
  setSelectedVariant,
  initialValues,
  handleSubmit,
  actionRef,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="space-y-4 font-normal">
      <div className="flex items-center">
        <Rating rating={selectedVariant.itemCheckouts.length} showText={true} />
      </div>

      <h1 className="text-2xl font-bold capitalize text-gray-900">
        {craft.name} {selectedVariant.name}
      </h1>

      <div className="grid grid-cols-2 text-sm text-gray-600">
        <div>Stok: {selectedVariant.stock}</div>
        <div>Terjual: {selectedVariant.itemCheckouts.length}</div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-red-600">
          {formatPrice(selectedVariant.price)}
        </span>
        {selectedVariant.price && (
          <span className="text-base text-gray-400 line-through">
            {formatPrice(selectedVariant.price)}
          </span>
        )}
      </div>

      <div className="bg-primary/10 text-secondary flex items-center gap-4 font-body p-3 rounded-md text-lg capitalize">
        <FaStore /> {craft.souvenirPlace.name}
      </div>

      <div className="grid lg:grid-cols-2">
        <section className=" py-2 w- grow  ">
          <h3 className="text-sm  font-bold text-gray-900 mb-2">Variasi</h3>
          <VariantSelector
            variants={craft.variants}
            selectedVariantId={selectedVariant.id}
            onSelect={setSelectedVariant}
          />
        </section>
        <motion.section layout className="py-4 grow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Deskripsi</h3>
          <p className="text-gray-700">{selectedVariant.description}</p>
        </motion.section>
      </div>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="flex gap-3">
          <QuantitySelector />
          <ButtonTooltip
            label={"KERANJANG"}
            type="submit"
            className="w-full"
            Icon={BsCart}
            onClick={() => (actionRef.current = "cart")}
          />

          <ButtonTooltip
            label=" BELI SEKARANG"
            Icon={BsBagCheck}
            type="submit"
            variant="primary"
            className="w-full"
            onClick={() => (actionRef.current = "buy")}
          />
        </Form>
      </Formik>

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
