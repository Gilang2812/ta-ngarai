import React from "react";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import { Steps } from "../customBooking/Steps";

type Props = {
  id: string;
};

const HomestayReservationPage = (props: Props) => {
  return (
    <section className="space-y-8">
      <SingleContentWrapper>
        <Steps currentStep={1}  />
        HomestayReservationPage {props.id}
      </SingleContentWrapper>
      <SingleContentWrapper>
        HomestayReservationPage {props.id}
      </SingleContentWrapper>
    </section>
  );
};

export default HomestayReservationPage;
