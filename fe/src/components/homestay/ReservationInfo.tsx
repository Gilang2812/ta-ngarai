import React from "react";
import { DetailHomestayReservation } from "@/type/schema/ReservationSchema";
import ImgCraft from "../common/ImgCraft";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import Button from "../common/Button";
import { FaMoneyBill } from "react-icons/fa6";

type Props = {
  data: DetailHomestayReservation;
  homestayInfo: {
    label: string;
    values: string | number | JSX.Element;
  }[];
  status: ReservationStatus;
  handlePayment: () => void;
};

const ReservationInfo = ({
  data,
  homestayInfo,
  status,
  handlePayment,
}: Props) => {
  const PaymentButton = () =>
    (status === "Payment-Required" || status === "Deposit-Required") && (
      <dl>
        <dt>Payment</dt>
        <dd onClick={handlePayment}>
          <Button className="h-fit text-nowrap">
            <FaMoneyBill />
            {status === "Deposit-Required"
              ? "Pay Deposit Now"
              : status === "Payment-Required"
              ? "Pay Full Amount Now"
              : ""}
          </Button>
        </dd>
      </dl>
    );
  return (
    <SingleContentWrapper>
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Detail Reservation
        </h2>
      </header>

      {/* Reservation Details Section */}
      <section className="mb-4" aria-labelledby="reservation-details">
        <div className="[&_dt]:font-bold [&_dt]:min-w-[200px] [&_dl]:flex [&_dl]:items-center [&_dl]:py-2  font-medium">
          <article>
            {homestayInfo &&
              homestayInfo?.length > 0 &&
              homestayInfo?.map((info, index) => (
                <dl key={index}>
                  <dt>{info.label}</dt>
                  <dd>{info.values}</dd>
                </dl>
              ))}
            <PaymentButton />
          </article>
        </div>
      </section>

      {/* Homestay Reservation Section */}
      <section aria-labelledby="homestay-details">
        <h2
          id="homestay-details"
          className="text-2xl text-secondary font-bold  mb-6"
        >
          Homestay Reservation
        </h2>

        <article className="bg-gray-50 rounded-md overflow-hidden  border flex flex-col md:flex-row gap-6">
          {/* Homestay Image */}
          <div className="flex-shrink-0">
            <ImgCraft
              width={100}
              height={100}
              src={data.detail?.[0]?.homestay?.homestay?.galleries?.[0]?.url}
              alt="Traditional  Minangkabau house with distinctive curved roof architecture"
              className="h-full object-cover min-w-[200px] w-full"
            />
          </div>

          {/* Homestay Information */}
          <div className="flex-1 p-4">
            <h3 className="text-xl font-bold text-secondary  mb-2">
              {data.detail?.[0]?.homestay?.homestay?.name || "Homestay Name"}
            </h3>
            <address className="font-normal leading-relaxed line-clamp-4 ">
              {data.detail?.[0]?.homestay?.homestay?.address ||
                "Address not available"}{" "}
              {data.detail?.[0]?.homestay?.homestay?.description}
            </address>
          </div>
        </article>
      </section>
    </SingleContentWrapper>
  );
};

export default ReservationInfo;
