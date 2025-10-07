import { formatPrice } from "@/lib/priceFormatter";
import { ShippingDataWithReviewGallery } from "@/types/schema/CraftTransactionSchema";
import {
  getCraftTransactionStatus,
  getCraftTransactionStatusColor,
} from "@/utils/getCraftTransactionStatus";
import React, { FC } from "react";
import { GrBottomCorner } from "react-icons/gr";
import dayjs from "dayjs";
import Button from "../common/Button";
import ImgCraft from "../common/ImgCraft";
import ItemReservationButton from "./ItemReservationButton";
import { CraftCartForm } from "@/types/schema/CraftCartSchema";
import Link from "next/link";
import { FaTruck } from "react-icons/fa6";
import { ROUTES } from "@/data/routes";
import { Store } from "lucide-react";
import { isExpired } from "@/lib/expiredChecker";

type Props = {
  history: ShippingDataWithReviewGallery;
  onClick?: () => void;
  handleReOrder: (items: CraftCartForm[]) => void;
  handleCompleteOrder: (order_id: string, shipping_id: string) => void;
  handleRateClick: () => void;
};

const HistoryList: FC<Props> = ({
  history,
  onClick,
  handleReOrder,
  handleCompleteOrder,
  handleRateClick,
}) => {
  return (
    <div
      className="bg-white border relative border-gray-200 rounded-xl p-6 mb-4 transition-all duration-300 hover:shadow-lg hover:border-primary-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold flex items-center gap-4 bg-primary/10 text-primary p-2 rounded ">
          <Store />{" "}
          {history?.shippingItems?.[0]?.detailCraft?.souvenirPlace?.name}
        </h4>
        <span
          className={`${getCraftTransactionStatusColor(
            history.status,
            history.shippingItems[0].checkout.transaction_token,
            isExpired(history.shippingItems[0].checkout.checkout_date)
          )} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}
        >
          {getCraftTransactionStatus(
            history.status,
            history.shippingItems[0].checkout.transaction_token,
            isExpired(history.shippingItems[0].checkout.checkout_date)
          )}
        </span>
      </div>
      <div className="flex gap-4 mb-4">
        <div>
          <ImgCraft
            alt="Craft Image"
            width={50}
            className="aspect-square overflow-hidden rounded-lg"
            height={50}
            src={
              history?.shippingItems?.[0]?.detailCraft?.craftGalleries?.[0]?.url
            }
          />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="">Date</p>
              <p className="font-medium ">
                {dayjs(
                  history?.shippingItems?.[0]?.checkout?.checkout_date
                ).format("DD MMMM YYYY")}
              </p>
            </div>
            <div>
              <div className="">Total</div>
              <p className="font-extrabold text-xl text-secondary">
                {formatPrice(
                  history?.shippingItems?.[0]?.checkout?.total_price ?? 0
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="">Produks</p>
              <p className="font-medium ">
                {history.shippingItems
                  .map(
                    (item) =>
                      `${item?.detailCraft?.variant?.craft?.name} ${item?.detailCraft?.variant?.name}`
                  )
                  .join("+")}
              </p>
              <p className="text-base  ">
                {`x${history?.shippingItems?.reduce(
                  (acc, item) => acc + item.jumlah,
                  0
                )} items`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 items-center">
        {history.tracking_id && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            asChild
          >
            <Link href={ROUTES.TRACKING_ORDER(history.tracking_id)}>
              <FaTruck /> Track
            </Link>
          </Button>
        )}
        <ItemReservationButton
          order_id={history?.shippingItems?.[0]?.checkout_id}
          status={history?.status}
          handleCompleteOrder={handleCompleteOrder}
          shipping_id={history.shipping_id}
          handleRateClick={handleRateClick}
          token={history?.shippingItems?.[0]?.checkout?.transaction_token}
          isExpired={isExpired(
            history?.shippingItems?.[0]?.checkout?.checkout_date
          )}
          tracking_id={history?.tracking_id}
        />
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleReOrder(
              history.shippingItems.map((item) => ({
                craft_variant_id: item.craft_variant_id,
                id_souvenir_place: item.id_souvenir_place,
                jumlah: item.jumlah,
              }))
            );
          }}
          variant={"primary"}
        >
          Re-Order
        </Button>
      </div>
      <div className="absolute bottom-3 right-3 ">
        <GrBottomCorner className="text-sm absolute bottom-1 right-1" />
        <GrBottomCorner className="text-xl" />
      </div>
    </div>
  );
};

export default HistoryList;
