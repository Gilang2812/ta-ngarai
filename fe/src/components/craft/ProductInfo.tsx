"use client";
import React from "react";

import { Rating } from "./Rating";
import { formatPrice } from "@/lib/priceFormatter";
import { VariantSelector } from "./VariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { BsBagCheck, BsCart } from "react-icons/bs";
import ButtonTooltip from "../common/ButtonTooltip";
import { FaStore } from "react-icons/fa6";
import { Form, Formik } from "formik";
import { CraftCartForm } from "@/types/schema/CraftCartSchema";
import { motion } from "framer-motion";
import {
  DetailCraftManagementResponse,
  DetailCraftOrderResponse,
} from "@/types/schema/DetailCraftSchema";
import useUserRole from "@/hooks/useUserRole";

type DataProdukInfo = {
  rating: number;
  craftName: string;
  price: number;
  description: string;
  stock: number;
  sold: number;
  storeName: string;
  craftId: string;
  craftVariantId: string;
  idSouvenirPlace: string;
};

interface ProductInfoProps {
  crafts: DetailCraftOrderResponse[];
  setSelectedDetailCraft: (
    variant: DetailCraftOrderResponse | DetailCraftManagementResponse
  ) => void;
  initialValues: CraftCartForm;
  handleSubmit: (values: CraftCartForm) => void;
  handleCart: () => void;
  handleBuy: () => void;
  data: DataProdukInfo;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  setSelectedDetailCraft,
  initialValues,
  handleSubmit,
  handleCart,
  handleBuy,
  crafts,
  data,
}) => {

  const { isOwner } = useUserRole();

  return (
    <div className="space-y-4 font-normal">
      <div className="flex items-center">
        <Rating rating={data.rating} showText={true} />
      </div>

      <h1 className="text-2xl font-bold capitalize text-gray-900">
        {data.craftName}
      </h1>

      <div className="grid grid-cols-2 text-sm text-gray-600">
        <div>Stok: {data.stock}</div>
        <div>Terjual: {data.sold}</div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-red-600">
          {formatPrice(data.price)}
        </span>
        {data.price && (
          <span className="text-base text-gray-400 line-through">
            {formatPrice(data.price)}
          </span>
        )}
      </div>

      <div className="bg-primary/10 text-secondary flex items-center gap-4 font-body p-3 rounded-md text-lg capitalize">
        <FaStore /> {data.storeName}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className=" py-2 w- grow  ">
          <h3 className="text-sm  font-bold text-gray-900 mb-2">Variasi</h3>
          <VariantSelector
            crafts={crafts}
            selectedDetailCraftId={data.craftVariantId}
            onSelect={setSelectedDetailCraft}
          />
        </section>
        <motion.section layout className="py-4 grow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Deskripsi</h3>
          <p className="text-gray-700">{data.description}</p>
        </motion.section>
      </div>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="flex gap-3">
          <QuantitySelector stock={data.stock} />
          <ButtonTooltip
            label={"Add to Cart"}
            type="submit"
            className="w-full"
            Icon={BsCart}
            onClick={handleCart}
            disabled={isOwner(data.idSouvenirPlace)}
          />

          <ButtonTooltip
            label="Checkout Now"
            Icon={BsBagCheck}
            type="submit"
            variant="primary"
            className="w-full"
            onClick={handleBuy}
            disabled={isOwner(data.idSouvenirPlace)}
          />
        </Form>
      </Formik>


    </div>
  );
};
