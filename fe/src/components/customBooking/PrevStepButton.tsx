import React, { FC } from "react";

type Props = {
  prevStep: () => void;
};

export const PrevStepButton: FC<Props> = ({ prevStep }) => {
  return (
    <button
      onClick={prevStep}
      className="btn text-white bg-stone-600 !rounded-md hover:bg-slate-900 font-normal px-8 py-2 capitalize "
    >
      preview
    </button>
  );
};
