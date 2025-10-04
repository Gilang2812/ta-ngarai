import React from "react";
import { CartItemComponent } from "../craft/CartItem";
import { CartSummary } from "../craft/CartSummary";
import { motion } from "framer-motion";
import { useUserCraftCart } from "@/hooks/useUserCraftCart";
import CraftCartSkeletonLoader from "../loading/CraftCartSkeletonLoader";

const CraftCart = () => {
  const {
    carts,
    isLoading,
    isUpdating,
    updateCraftCart,
    isDirty,
    setIsDirty,
    handleDeleteCraftCart,
    handleCheckedCraft,
    selectedCraft,
    handleCheckout,
  } = useUserCraftCart();

  if (isLoading) {
    return <CraftCartSkeletonLoader />;
  }

  return (
    <motion.div
      layoutId="cartPage"
      className="py-4 grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2">
        <div className="p-6 border rounded-lg ">
          <table className="w-full [&_th]:p-4  [&_td]:p-2  ">
            <thead className="py-2 border-b">
              <tr>
                <th>#</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>

            <tbody className="space-y-4">
              {carts?.map((item) => (
                <CartItemComponent
                  setDirty={setIsDirty}
                  selectedCraft={selectedCraft}
                  isUpdating={isUpdating}
                  updateCart={updateCraftCart}
                  key={`${item.checkout_id}-${item.craft_variant_id}-${item.id_souvenir_place}`}
                  item={item}
                  handleDeleteCart={handleDeleteCraftCart}
                  handleCheckedCraft={handleCheckedCraft}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary
          handleCheckout={handleCheckout}
          isDirty={isDirty}
          subtotal={selectedCraft.reduce(
            (acc, curr) => acc + curr.jumlah * curr.price,
            0
          )}
          total={selectedCraft.reduce(
            (acc, curr) => acc + curr.jumlah * curr.price,
            0
          )}
        />
      </div>
    </motion.div>
  );
};

export default CraftCart;
