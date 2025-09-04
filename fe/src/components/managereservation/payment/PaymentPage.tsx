"use client";
import { OrderDetailSkeleton } from "@/components/loading/OrderDetailSkeleton";
import usePayment from "@/hooks/usePayment";
import { formatPrice } from "@/lib/priceFormatter";
import React from "react";
import dayjs from "dayjs";

type Props = {
  id: string;
};

const PaymentPage = ({ id }: Props) => {
  const { payment, isLoading } = usePayment(id);
  if (isLoading) {
    return <OrderDetailSkeleton />;
  }
  return (
    payment && (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Order ID
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {payment?.order_id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Total Pembayaran
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {formatPrice(payment?.total_pembayaran)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Status
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Waktu Transaksi
              </label>
              <p className="text-sm text-gray-900">
                {dayjs(payment.waktu_transaksi).format("DD MMMM YYYY HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PaymentPage;
