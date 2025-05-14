import React from "react";
import { CartItemComponent } from "../craft/CartItem";
import { cartItems } from "@/data/craft";
import { CartSummary } from "../craft/CartSummary";
import { motion } from "framer-motion";

const CraftCart = () => {
  return (
    <motion.div className="py-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="p-6 border rounded-lg ">
          <table className="w-full [&_th]:p-4  [&_td]:p-2  ">
            <thead className="py-2 border-b">
              <tr  >
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>

            <tbody className="space-y-4">
              {cartItems.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary subtotal={1000} total={2000} />
      </div>
    </motion.div>
  );
};

export default CraftCart;
