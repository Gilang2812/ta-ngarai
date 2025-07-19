import { FC } from "react";
import { InfoGrid } from "./InfoGrid";
import { ProductCard } from "./ProductCard";
import { StatusBadge } from "./StatusBadge";
import { ShippingData } from "@/type/schema/CraftTransactionSchema";
import {
  getCraftTransactionStatus,
  getCraftTransactionStatusColor,
} from "@/utils/getCraftTransactionStatus";
import dayjs from "dayjs";
import { formatPrice } from "@/lib/priceFormatter";

type Props = {
  history: ShippingData;
};
export const UserDetailPage: FC<Props> = ({ history }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-3 text-primary">
              Shipping No.{history.shipping_no}
            </h2>
            <p>OrderID. {history.shippingItems[0].checkout.id}</p>
          </div>
          <StatusBadge
            status={getCraftTransactionStatusColor(history.status)}
            text={getCraftTransactionStatus(history.status)}
          />
        </div>

        <InfoGrid
          items={[
            {
              label: "Tanggal Transaksi",
              value: dayjs(
                history.shippingItems[0].checkout.checkout_date
              ).format("DD MMMM YYYY"),
            },
            {
              label: "Metode Pembayaran",
              value: history.shippingItems[0].checkout.payment,
            },
            {
              label: "Total Pembayaran",
              value: formatPrice(history.grand_total),
            },
          ]}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 text-primary">
          Produk yang Dibeli
        </h3>
        <div className="space-y-3">
          {history.shippingItems.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 text-primary">
          Informasi Pengiriman
        </h3>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-secondary">
          <div className="font-semibold text-gray-900 mb-2">
            {`📦 Paket dari ${history?.shippingItems?.[0]?.detailCraft?.souvenirPlace?.name}`}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <strong>Kurir:&nbsp;</strong>
              {`${history?.shipping_name} (${history?.shipping_type})`}
            </div>
            <div>
              <strong>Ongkos Kirim:&nbsp;</strong>
              {formatPrice(history?.total_shipping_cost || 0)}
            </div>
            <div>
              <strong>Alamat Tujuan:&nbsp;</strong>
              {Object.values(history?.shippingItems[0]?.checkout?.shippingAddress)
                .slice(2, -1)
                .join(", ")}
            </div>
            <div>
              <strong>No. Resi:</strong> {history?.shipping_no}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 text-primary">
          Rincian Pembayaran
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal Produk:</span>
            <span>
              {formatPrice(
                history?.shippingItems?.reduce(
                  (acc, item) => acc + item?.detailCraft?.price * item?.jumlah,
                  0
                )
              )}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Ongkos Kirim:</span>
            <span>{formatPrice(history.total_shipping_cost || 0)}</span>
          </div>
          <div className="flex justify-between pt-2 text-primary border-t border-gray-300 font-semibold">
            <span>Total:</span>
            <span>{formatPrice(history.grand_total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
