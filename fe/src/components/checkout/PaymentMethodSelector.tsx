"use client";

type PaymentMethod = "cod" | "bank" | "apar";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = ({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={selectedMethod === "cod"}
            onChange={() => onSelectMethod("cod")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 block">Cash on Delivery</span>
        </label>

        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={selectedMethod === "bank"}
            onChange={() => onSelectMethod("bank")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 block">Bank Transfer</span>
        </label>

        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="apar"
            checked={selectedMethod === "apar"}
            onChange={() => onSelectMethod("apar")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 block">Apar Payment</span>
        </label>
      </div>
    </div>
  );
};
