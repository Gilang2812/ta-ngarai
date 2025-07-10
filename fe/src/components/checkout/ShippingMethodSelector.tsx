"use client";

import { CheckCircle, Clock, CreditCard, Truck } from "lucide-react";
import { formatPrice } from "@/lib/priceFormatter";
import { useModal } from "@/utils/ModalUtils";
import { CheckoutItem } from "@/type/schema/CheckoutSchema";
import { ShippingItem } from "@/type/schema/ShippingSchema";
import { Dispatch, SetStateAction, useState } from "react";
import { InfoModal } from "../modal/InfoModal";
import ShippingMethodItems from "./ShippingMethodItems";

interface PaymentMethodSelectorProps {
  groupedItems: CheckoutItem[][];
  shippingMethods: ShippingItem[];
  itemShipping: ShippingItem[];
  setItemShipping: Dispatch<SetStateAction<ShippingItem[]>>;
  setShippingMethods: Dispatch<SetStateAction<ShippingItem[]>>;
  selectedAddressId: string;
  handleNoteChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export const ShippingMethodSelector = ({
  shippingMethods,
  itemShipping,
  setItemShipping,
  setShippingMethods,
  selectedAddressId,
  handleNoteChange,
  groupedItems,
}: PaymentMethodSelectorProps) => {
  const { isOpen, toggleModal } = useModal();
  const [shippingIndex, setShippingIndex] = useState<number | null>(null);

  const handleSelectShipping = (index: number) => {
    toggleModal();
    setShippingIndex(index);
  };

  return (
    <section className="space-y-4 mt-6">
      <header>
        <h3 className="text-lg font-semibold mb-4 flex items-center text-primary gap-2">
          <Truck /> <span className="text-slate-800">Shipping Method</span>
        </h3>
      </header>
      {groupedItems.map((items, index) => (
        <ShippingMethodItems
          key={index}
          items={items}
          selectedAddressId={selectedAddressId}
          index={index}
          itemShipping={itemShipping}
          setShippingMethods={setShippingMethods}
          handleSelectShipping={handleSelectShipping}
          setItemShipping={setItemShipping}
          handleNoteChange={handleNoteChange}
        />
      ))}
      <InfoModal
        isOpen={isOpen && (shippingMethods?.length ?? 0) > 0}
        onClose={toggleModal}
        title="Select Shipping Method"
      >
        {shippingMethods?.map((shipping, index) => (
          <div
            key={index}
            onClick={() => {
              setItemShipping((prev) => {
                const newSelected = [...(prev || [])];
                newSelected[shippingIndex!] = shipping;
                return newSelected;
              });
            }}
            className={`border-2 rounded-lg flex items-center justify-between p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              JSON.stringify(itemShipping?.[shippingIndex!]) ===
              JSON.stringify(shipping)
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {shipping.shipping_name}
                </h3>
                <p className="text-sm text-gray-600">{shipping.service_name}</p>
              </div>
              {JSON.stringify(itemShipping?.[shippingIndex!]) ===
                JSON.stringify(shipping) && (
                <CheckCircle className="text-blue-600 w-6 h-6" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Biaya Kirim</p>
                <div className="flex items-center gap-2">
                  {shipping.shipping_cashback > 0 && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(shipping.shipping_cost)}
                    </span>
                  )}
                  <span className="font-semibold text-green-600">
                    {formatPrice(shipping.shipping_cost_net)}
                  </span>
                </div>
                {shipping.shipping_cashback > 0 && (
                  <span className="text-xs text-green-600">
                    Hemat {formatPrice(shipping.shipping_cashback)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Estimasi Tiba</p>
                <p className="font-semibold text-gray-900">
                  {shipping.etd === "-" ? "Besok" : shipping.etd}
                </p>
              </div>
            </div>
          </div>
        ))}
      </InfoModal>
    </section>
  );
};
