import { ReactElement, useState } from "react";
import { useMultipleFormOption } from "../interface/MultiStep.Type";

const useMultipleForm = (steps: ReactElement[]): useMultipleFormOption => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Next Step
  const nextStep = () =>
    setCurrentStepIndex((prev) => (prev >= steps.length - 1 ? prev : prev + 1));

  // Prev Step
  const prevStep = () =>
    setCurrentStepIndex((prev) => (prev <= 0 ? prev : prev - 1));

  // Goto Step
  const goto = (step: number) => setCurrentStepIndex(step);
  const resetIndex = () => setCurrentStepIndex(0);

  return {
    currentIndex: currentStepIndex,
    Steps: steps[currentStepIndex],
    goto,
    nextStep,
    prevStep,
    resetIndex,

    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};

export default useMultipleForm;
