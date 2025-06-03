import { formatPrice } from "@/lib/priceFormatter";
import Button from "../common/Button";

interface CartSummaryProps {
  subtotal: number;
  shippingCost?: number;
  total: number;
  isDirty?: boolean;
  handleCheckout?: () => void;
}

export const CartSummary = ({
  subtotal,
  shippingCost = 0,
  total,
  isDirty,
  handleCheckout,
}: CartSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Cart Total</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span>{shippingCost === 0 ? "-" : formatPrice(shippingCost)}</span>
        </div>

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Button disabled={isDirty} onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};
