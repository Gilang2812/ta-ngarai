type Props = {
  product: {
    name: string;
    store: string;
    qty: number;
    details?: string;
    price: string;
  };
};

export const ProductCard = ({ product }: Props) => (
  <div
    className="flex gap-3 p-3 bg-gray-50 rounded-lg border-l-4"
    style={{ borderLeftColor: "#435ebe" }}
  >
    <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
      IMG
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
      <p className="text-sm text-gray-600 mb-1">
        Toko: {product.store} • Qty: {product.qty}
      </p>
      {product.details && (
        <p className="text-xs text-gray-500 mb-1">{product.details}</p>
      )}
      <p className="font-semibold" style={{ color: "#435ebe" }}>
        {product.price}
      </p>
    </div>
  </div>
);
