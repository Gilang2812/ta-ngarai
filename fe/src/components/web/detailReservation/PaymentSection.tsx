import Button from "@/components/common/Button";
import { Table } from "@/components/common/Table";
import Payment from "@/components/managereservation/payment/Payment";
import ButtonCancel from "@/components/reservation/ButtonCancel";
import ButtonConfirmation from "@/components/reservation/ButtonConfirmation";
import ButtonRefundProof from "@/components/reservation/ButtonRefundProof";
import ReservationStep from "@/components/reservation/ReservationStep";
import useInvoice from "@/hooks/useInvoice";
import { formatPrice } from "@/lib/priceFormatter";
import { ItemDetails } from "@/type/common/paymentItemDetails";
import { DetailReservationPackage } from "@/type/schema/ReservationSchema";
import { getReservationStatus } from "@/utils/common/getReservationStatus";
import { FaDownload } from "react-icons/fa6";

type Props = {
  data: DetailReservationPackage;
  handlePayment: () => void;
  item_details: ItemDetails[];
  refetch: () => void;
};
export const PaymentSection = ({
  data,
  handlePayment,
  item_details,
  refetch,
}: Props) => {
  const { refetch: createInvoice } = useInvoice(data.id);
  const status = getReservationStatus(data);
  return (
    <div className="bg-white p-5 rounded-lg   space-y-4">
      <header className="text-lg text-center    ">
        <h2>Payment</h2>
      </header>
      <section className="capitalize flex gap-4 items-center  ">
        {status === "Awaiting-Approval" ? (
          <>
            <ButtonConfirmation
              deposit={data.deposit}
              item_details={item_details}
              refetchData={refetch}
              reservation_id={data.id}
              status={status}
              total_price={data.total_price}
            />
          </>
        ) : (
          <>
            <Payment handlePayment={handlePayment} status={status} />
            <Button
              variant={"regEdit"}
              onClick={() => createInvoice()}
              className="btn btn-regsuccess"
            >
              <FaDownload /> Download Invoice
            </Button>
          </>
        )}
        <ButtonRefundProof
          id={data.id}
          refund_check={data.refund_check}
          proof_refund={data.proof_refund}
          refetchData={refetch}
        />
        <ButtonCancel
          cancel_date={data.cancel_date}
          check_in={data.check_in}
          deposit={data.deposit}
          refetchData={refetch}
          depositRefundPercentage={50}
          deposit_date={data.deposit_date}
          id={data.id}
          payment_date={data.payment_date}
          refund_date={data.refund_date}
          total_price={data.total_price}
        />
      </section>
      <div className="border-b w-full">
        <Table className="w-fit">
          <tbody>
            <tr>
              <td className="min-w-[250px]">Total Reservation</td>
              <td>:</td>
              <td>{formatPrice(data.total_price)}</td>
            </tr>
            <tr>
              <td>Deposit Reservation</td>
              <td>:</td>
              <td>{formatPrice(data.deposit)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <ReservationStep reservation={data} />
    </div>
  );
};
