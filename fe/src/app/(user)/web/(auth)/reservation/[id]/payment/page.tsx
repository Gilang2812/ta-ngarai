import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import PaymentPage from "@/components/managereservation/payment/PaymentPage";

const PaymentTransaction = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <SingleContentWrapper>
      <div className="border-l-4 border-primary pl-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
      </div>
      <PaymentPage id={id} />
    </SingleContentWrapper>
  );
};

export default PaymentTransaction;
