import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import ReviewItems from "@/components/reservation/ReviewItems";

const ReviewTransaction = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <SingleContentWrapper>
      <header className="mb-8">
        <h3>Review Transaction</h3>
      </header>
      <ReviewItems id={id} />
    </SingleContentWrapper>
  );
};

export default ReviewTransaction;
