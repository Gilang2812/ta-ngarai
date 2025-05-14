import Image from "next/image";
import { X } from "lucide-react";

import { CartItem } from "@/type/schema/CraftSchema";
import { formatPrice } from "@/lib/priceFormatter";
import { QuantitySelector } from "./QuantitySelector";
import { useState } from "react";

interface CartItemProps {
  item: CartItem;
}

export const CartItemComponent = ({ item }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, item.quantity));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <tr className="  py-4 border-b border-gray-200">
      <td className="flex items-center">
        <div className="flex-shrink-0 w-16 h-16 mr-4 relative overflow-hidden rounded">
          <Image
            src={item.image || "/api/placeholder/100/100"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-bold align-middle text-gray-800">{item.name}</p>
      </td>

      <td className="mx-4">
        <p className="text-gray-600">{formatPrice(item.price)}</p>
      </td>

      <td className="">
        <QuantitySelector
          quantity={quantity}
          onDecrease={handleDecreaseQuantity}
          onIncrease={handleIncreaseQuantity}
          onChange={handleQuantityChange}
        />
      </td>
      <td className="w-24 text-center">
        <span className="font-medium">
          {formatPrice(item.price * item.quantity)}
        </span>
      </td>
      <td>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
