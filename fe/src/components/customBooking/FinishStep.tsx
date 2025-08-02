import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  currentSteps: number;
  steps: number[];
};
export const FinishStep: FC<Props> = ({ currentSteps, steps }) => {
  const isVisibile = currentSteps === steps.length;
  return (
    <div
      className={`${
        !isVisibile && "hidden"
      } bg-white rounded-lg flex justify-center items-center  p-10 flex-col gap-10 `}
    >
      <h2 className="text-4xl text-secondary">Success!</h2>
      <Image
        alt="success"
        width={100}
        height={100}
        src={`https://img.icons8.com/color/96/000000/ok--v2.png`}
      />
      <p>Your Reservation Has Been Successfully Booked.</p>
      <Link className="btn btn-fill-primary" href="/web/cart">
        My Reservation
      </Link>
    </div>
  );
};
