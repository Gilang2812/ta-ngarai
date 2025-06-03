import { ProductCard } from "./ProductCard";
import { ShippingInfo } from "./ShippingInfo";
import { StatusBadge } from "./StatusBadge";

type Props = {
  transaction: {
    id: string;
    user?: string;
    date: string;
    status: "pending" | "confirmed" | "shipped" | "delivered";
    statusText: string;
    products: Array<{
      name: string;
      store: string;
      qty: number;
      details?: string;
      price: string;
    }>;
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
    total: string;
  };
  showUser?: boolean;
  showActions?: boolean;
};

export const TransactionCard = ({
  transaction,
  showUser = false,
  showActions = true,
}: Props) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
      <div>
        <div
          className="font-semibold text-lg mb-1"
          style={{ color: "#435ebe" }}
        >
          {transaction.id}
        </div>
        <div className="text-sm text-gray-600">
          {showUser ? `User: ${transaction.user}` : transaction.date}
        </div>
      </div>
      <StatusBadge status={transaction.status as "shipped"} text={transaction.statusText} />
    </div>

    <div className="space-y-3 mb-4">
      {transaction.products.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </div>

    <ShippingInfo shipping={transaction.shipping} />

    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
      <span className="font-semibold text-gray-900">Total Pembayaran:</span>
      <span className="text-xl font-bold" style={{ color: "#435ebe" }}>
        {transaction.total}
      </span>
    </div>

    {showActions && (
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          className="px-4 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: "#435ebe" }}
        >
          Lihat Detail
        </button>
        <button
          className="px-4 py-2 border-2 font-semibold rounded-lg transition-all duration-300 hover:text-white hover:-translate-y-0.5"
          style={{ borderColor: "#435ebe", color: "#435ebe" }}
        >
          Lacak Pengiriman
        </button>
      </div>
    )}
  </div>
);
