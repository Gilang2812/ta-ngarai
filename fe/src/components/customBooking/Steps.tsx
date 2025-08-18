import React, { FC } from "react";

type Props = {
  steps: number[];
  currentStep: number;
};

export const Steps: FC<Props> = ({ currentStep, steps }: Props) => {
  return (
    <section className="flex   relative items-center   w-full ">
      {steps.map((_, index) => (
        <div
          key={index}
          className={` relative justify-center  flex-1 flex items-center`}
        >
          <article className="flex    items-center">
            <span
              className={`w-10 h-10 z-[2] flex items-center  transition-ease-in-out justify-center rounded-[50%] text-white font-semibold ${
                index + 1 <= currentStep ? "bg-primary" : "bg-slate-300"
              }`}
            >
              {index + 1}
            </span>
            <p
              className={`mt-2 absolute -bottom-1/2 text-sm ${
                index + 1 <= currentStep ? "text-primary" : "text-gray-500"
              }`}
            >
              {index + 1 === steps.length ? "final" : `step ${index + 1}`}
            </p>
          </article>

          <div className="absolute top-1/2 -translate-y-1/2 w-full rounded-sm ">
            <div className={` relative bg-slate-200 h-0.5 flex-1   `}>
              <span
                className={`absolute inset-0 origin-left  ${
                  index + 1 <= currentStep
                    ? "bg-primary scale-x-100"
                    : "  scale-x-0"
                } transition-ease-in-out `}
              ></span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
