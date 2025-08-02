import { scrollToTop } from "@/utils/ScrollUtil";
import { useState } from "react";

type Props = number;

const useFormStep = (stepsLength: Props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: number[] = [...new Array(stepsLength)].map(() => 0);
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };
  return {
    currentStep,
    setCurrentStep,
    steps,
    nextStep,
    prevStep,
    stepsLength,
  };
};

export default useFormStep;
