import { ShoppingBag } from "lucide-react";

import Link from "next/link";
import Button from "../common/Button";

export const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <ShoppingBag className="w-8 h-8 text-gray-500" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6">
        Looks like you haven&apos;t added any items to your cart yet.
      </p>
      <Link href="/products" passHref>
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
};
