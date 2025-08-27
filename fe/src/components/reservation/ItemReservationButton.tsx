import React from "react";
import Button from "../common/Button";
import Link from "next/link";

type Props = {
  status: number | string;
  order_id: string | number;
  shipping_id: string;
  handleCompleteOrder: (order_id: string, shipping_id: string) => void;
  handleRateClick: () => void;
  token?: string;
  tracking_id: string;
  paymentStatus?: string;
};

const ItemReservationButton = ({
  status,
  order_id,
  handleCompleteOrder,
  shipping_id,
  handleRateClick,
  paymentStatus,
  token,
}: Props) => {
  switch (status) {
    case 1:
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="button"
          asChild
        >
          <Link href={`/web/reservation/${order_id}/payment`}>Pay Now</Link>
        </Button>
      );
    case 2:
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant={"secondary"}
          type="button"
          disabled
        >
          Seller Processing
        </Button>
      );
    case 3:
      return (
        <>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCompleteOrder(order_id as string, shipping_id as string);
            }}
            type="button"
          >
            Finish the order
          </Button>
        </>
      );
    case 4:
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="button"
          asChild
        >
          <Link href={`/web/reservation/${shipping_id}/rating-items`}>
            Rate
          </Link>
        </Button>
      );
    case 5:
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleRateClick();
          }}
          type="button"
        >
          View Rated
        </Button>
      );
    case 6:
      return (
        <Button
          variant={token ? "default" : "secondary"}
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="button"
          disabled={!token || paymentStatus === "failure"}
          asChild={!!token && paymentStatus !== "failure"}
        >
          {token && paymentStatus !== "failure" ? (
            <Link href={`/web/reservation/${order_id}/payment`}>Pay Now</Link>
          ) : (
            "Payment Failed"
          )}
        </Button>
      );
    default:
      return null;
  }
};

export default ItemReservationButton;
