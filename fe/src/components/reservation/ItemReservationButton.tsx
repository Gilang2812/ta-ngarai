import React from "react";
import Button from "../common/Button";
import Link from "next/link";

type Props = {
  status: number | string;
  order_id: string | number;
  shipping_id: string;
  handleCompleteOrder: (order_id: string, shipping_id: number) => void;
  handleRateClick: () => void;
  token?: string;
};

const ItemReservationButton = ({
  status,
  order_id,
  handleCompleteOrder,
  shipping_id,
  handleRateClick,
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
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleCompleteOrder(order_id as string, parseInt(shipping_id));
          }}
          type="button"
        >
          Finish the order
        </Button>
      );
    case 4:
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="button"
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
            if (token) {
            }
          }}
          type="button"
          disabled={!token}
        >
          {token ? (
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
