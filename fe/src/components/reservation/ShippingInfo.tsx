type Props = {
  shipping: {
    multiple: boolean;
    store?: string;
    courier?: string;
    estimate?: string;
    cost?: string;
    details?: Array<{
      store: string;
      courier: string;
      cost: string;
    }>;
  };
};

export const ShippingInfo = ({ shipping }: Props) => (
  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border-l-4 border-green-500">
    {shipping.multiple ? (
      <div>
        <div className="font-semibold text-gray-900 mb-2">
          🚚 Pengiriman Terpisah
        </div>
        {shipping.details?.map((detail, idx) => (
          <div key={idx} className="text-sm text-gray-600">
            • {detail.store}: {detail.courier} • {detail.cost}
          </div>
        ))}
      </div>
    ) : (
      <div>
        <div className="font-semibold text-gray-900 mb-1">
          🚚 Pengiriman dari {shipping.store || "Toko"}
        </div>
        <div className="text-sm text-gray-600">
          {shipping.courier} • Estimasi: {shipping.estimate} • {shipping.cost}
        </div>
      </div>
    )}
  </div>
);
