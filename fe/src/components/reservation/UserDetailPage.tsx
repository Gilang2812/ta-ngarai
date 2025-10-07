import { FC } from "react";
import { InfoGrid } from "./InfoGrid";
import { ProductCard } from "./ProductCard";
import { StatusBadge } from "./StatusBadge";
import { ShippingData } from "@/types/schema/CraftTransactionSchema";
import {
  getCraftTransactionStatus,
  getCraftTransactionStatusColor,
} from "@/utils/getCraftTransactionStatus";
import dayjs from "dayjs";
import { formatPrice } from "@/lib/priceFormatter";
import { isExpired } from "@/lib/expiredChecker";

type Props = {
  history: ShippingData;
};
export const UserDetailPage: FC<Props> = ({ history }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            {history.awb ? (
              <h2 className="text-xl font-bold mb-3 text-primary">
                Receipt No. {history.awb}
              </h2>
            ) : (
              <h2 className="text-xl font-bold mb-3 italic">
                await for delivery
              </h2>
            )}
            <p>OrderID. {history.shippingItems[0].checkout.id}</p>
          </div>
          <StatusBadge
            status={getCraftTransactionStatusColor(
              history.status,
              history.shippingItems[0].checkout.transaction_token,
              isExpired(history.shippingItems[0].checkout.checkout_date)
            )}
            text={getCraftTransactionStatus(
              history.status,
              history.shippingItems[0].checkout.transaction_token,
              isExpired(history.shippingItems[0].checkout.checkout_date)
            )}
          />
        </div>

        <InfoGrid
          items={[
            {
              label: "Transaction Date",
              value: dayjs(
                history.shippingItems[0].checkout.checkout_date
              ).format("DD MMMM YYYY"),
            },
            {
              label: "Payment Method",
              value: history.shippingItems[0].checkout.payment,
            },
            {
              label: "Total Payment",
              value: formatPrice(history.grand_total || 0),
            },
          ]}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 text-primary">
          Purchased Products
        </h3>
        <div className="space-y-3">
          {history.shippingItems.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 text-primary">
          Shipping Information
        </h3>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-secondary">
          <div className="font-semibold  mb-2">
            {`📦 Package from ${history?.shippingItems?.[0]?.detailCraft?.souvenirPlace?.name}`}
          </div>
          <div className="text-sm  space-y-1">
            <div>
              <strong>Courier:&nbsp;</strong>
              {`${history?.shipping_name ?? ""} (${
                history?.shipping_type ?? ""
              })`}
            </div>
            <div>
              <strong>Shipping Cost:&nbsp;</strong>
              {formatPrice(history?.total_shipping_cost || 0)}
            </div>
            <div>
              <strong>Destination Address:&nbsp;</strong>
              {Object.values(
                history?.shippingItems[0]?.checkout?.shippingAddress
              )
                .slice(2, -1)
                .join(", ")}
            </div>
            <div>
              <strong>Tracking Number:</strong> {history?.shipping_no}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 text-primary">
          Payment Details
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Product Subtotal:</span>
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
            <span>Shipping Cost:</span>
            <span>{formatPrice(history.total_shipping_cost || 0)}</span>
          </div>
          <div className="flex justify-between pt-2 text-primary border-t border-gray-300 font-semibold">
            <span>Total:</span>
            <span>{formatPrice(history.grand_total || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
