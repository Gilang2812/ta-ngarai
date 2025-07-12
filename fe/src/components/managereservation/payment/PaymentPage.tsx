"use client";
import { OrderDetailSkeleton } from "@/components/loading/OrderDetailSkeleton";
import usePayment from "@/hooks/usePayment";
import { formatPrice } from "@/lib/priceFormatter";
import React from "react";
import PaymentStatus from "./PaymentStatus";
import { type PaymentStatusProps } from "@/type/props/Payment";
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
              <div className="mt-1">
                <PaymentStatus status={payment?.status as PaymentStatusProps} />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Waktu Transaksi
              </label>
              <p className="text-sm text-gray-900">{dayjs(payment.waktu_transaksi).format("DD MMMM YYYY HH:mm")}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Waktu Kadaluarsa
              </label>
              <p className="text-sm text-gray-900">{dayjs(payment.expire).format("DD MMMM YYYY HH:mm")}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nomor Virtual Account
          </h3>
          <div className="bg-gray-50 rounded-lg p -4 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">🏦 BNI</p>
                <p className="text-xl font-mono font-bold text-primary mt-1">
                  9884789075168537
                </p>
              </div>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">
              ⚠️ Transaksi Kadaluarsa
            </h4>
            <p className="text-sm text-red-800">
              Virtual account ini sudah tidak dapat digunakan karena melewati
              batas waktu pembayaran. Silakan lakukan pemesanan ulang.
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default PaymentPage;
