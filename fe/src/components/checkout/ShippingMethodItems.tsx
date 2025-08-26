import { formatPrice } from "@/lib/priceFormatter";
import { CheckoutItem } from "@/type/schema/CheckoutSchema";
import { CourierPricing, ItemRatesType } from "@/type/schema/ShippingSchema";
import { Clock, CreditCard } from "lucide-react";
import React, { useEffect } from "react";
import ImgCraft from "../common/ImgCraft"; 
import Swal from "sweetalert2";
import useCourierRates from "@/features/shipping/useCourierRates";

type Props = {
  items: CheckoutItem[];
  index: number;
  itemShipping?: CourierPricing[];

  selectedAddressId: string;
  setShippingMethods: React.Dispatch<React.SetStateAction<CourierPricing[]>>;
  setItemShipping: React.Dispatch<React.SetStateAction<CourierPricing[]>>;
  handleSelectShipping: (index: number) => void;
  handleNoteChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const ShippingMethodItems = ({
  items,
  index,
  itemShipping,
  setShippingMethods,
  setItemShipping,
  selectedAddressId,
  handleSelectShipping,
  handleNoteChange,
}: Props) => {
  const itemsRates: ItemRatesType[] = items?.map((item) => ({
    name: `${item.detailCraft.variant.craft.name} ${item.detailCraft.variant.name}`,
    quantity: item.jumlah,
    value: item.detailCraft.price,
    weight: item.detailCraft.weight,
  }));
  const {
    data: courier,
    isLoading: courierLoading,
    refetch: refetchCourier,
  } = useCourierRates({
    couriers: "tiki,anteraja,jne,sicepat",
    destination_area_id: items[0]?.detailCraft?.souvenirPlace.destination_id,
    origin_area_id: selectedAddressId,
    items: itemsRates,
  });

  useEffect(() => {
    refetchCourier();
  }, [selectedAddressId, refetchCourier]);

  useEffect(() => {
    if (courierLoading) {
      Swal.fire({
        title: "Loading Shipping Methods",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
    }
    if (courier) {
      setItemShipping([]);
    }
    return () => {
      Swal.close();
    };
  }, [setItemShipping, courierLoading, courier]);

  const handleSelectShippingMethod = (index: number) => {
    if (!courier) {
      return;
    }
    handleSelectShipping(index);

    setShippingMethods(courier || []);
  };

  return (
    <div className="mt-6 space-y-4 border p-4 rounded-xl" key={index}>
      {items?.map((item, index) => (
        <section key={index} className="flex items-center">
          <div className="flex-shrink-0 w-16 h-16 mr-4 relative overflow-hidden rounded">
            <ImgCraft
              src={item.detailCraft?.craftGalleries?.[0]?.url}
              alt={item.detailCraft?.variant?.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-gray-800">
              {item?.detailCraft?.variant.craft?.name}{" "}
              {item?.detailCraft?.variant.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {formatPrice(item?.detailCraft?.price)} × {item.jumlah}
            </p>
          </div>
          <div className="font-medium text-right text-nowrap">
            {formatPrice(item?.detailCraft?.price * item.jumlah)}
          </div>
        </section>
      ))}
      <input
        type="text"
        name="note"
        id={`note-${index}`}
        autoCapitalize="characters"
        autoComplete="off"
        placeholder="(optional) Add a note for the seller"
        className="w-full font-normal rounded-xl p-1 px-3 focus:!outline-none focus:!ring-2 focus:!ring-primary/20 border !border-gray-200"
        onChange={(event) => handleNoteChange(event, index)}
      />
      <div
        onClick={() => handleSelectShippingMethod(index)}
        className="space-y-2 p-4 border rounded-xl checked:bg-primary/10 hover:bg-primary/5 transition-colors cursor-pointer flex items-center leading-loose gap-2 flex-wrap justify-between"
      >
        {!itemShipping?.[index] ? (
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Select Shipping Method</span>
          </div>
        ) : (
          <>
            <div>
              <p className="uppercase">
                {itemShipping[index].courier_name} -
                {itemShipping[index].courier_service_name}
              </p>
              <p className="font-normal flex items-center gap-2 text-slate-800">
                <Clock />

                {itemShipping[index].shipment_duration_range === "0"
                  ? itemShipping[index].service_type.replaceAll("_", " ")
                  : itemShipping[index].duration}
              </p>
            </div>
            <div>
              <p>{formatPrice(itemShipping[index].price)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingMethodItems;
