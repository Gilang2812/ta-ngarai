import React, { FC } from "react";

type Props = {
  nextStep: () => void;
  disabled?: boolean;
};

export const NextStepButton: FC<Props> = ({ nextStep, disabled }) => {
  return (
    <button
      onClick={nextStep}
      type="button"
      className="btn text-white disabled:bg-stone-300 bg-primary !rounded-md hover:bg-secondary font-normal px-8 py-2 capitalize disabled:cursor-not-allowed disabled:hover:bg-secondary"
      disabled={disabled}
    >
      next
    </button>
  );
};
