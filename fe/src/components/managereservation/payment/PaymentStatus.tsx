import { type PaymentStatusProps } from "@/type/props/Payment";
import React from "react";

interface PaymentStatusBadgeProps {
  status: PaymentStatusProps;
}

const statusStyles: Record<
  PaymentStatusProps,
  { label: string; bg: string; text: string }
> = {
  challenge: {
    label: "Challenge",
    bg: "bg-orange-500",
    text: "text-white",
  },
  success: {
    label: "Success",
    bg: "bg-emerald-500",
    text: "text-white",
  },
  deny: {
    label: "Denied",
    bg: "bg-rose-500",
    text: "text-white",
  },
  failure: {
    label: "Failed",
    bg: "bg-red-600",
    text: "text-white",
  },
  pending: {
    label: "Pending",
    bg: "bg-primary",
    text: "text-white",
  },
  expired: {
    label: "Expired",
    bg: "bg-gray-600",
    text: "text-white",
  },
};

const PaymentStatus: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  const { label, bg, text } = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${bg} ${text}`}
    >
      {label}
    </span>
  );
};

export default PaymentStatus;
