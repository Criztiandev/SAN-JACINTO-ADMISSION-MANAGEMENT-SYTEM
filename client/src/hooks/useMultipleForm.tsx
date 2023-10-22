import { ReactElement, useState } from "react";

const useMultipleForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(7);
  // Next Step
  const next = () =>
    setCurrentStepIndex(prev => (prev >= steps.length - 1 ? prev : prev + 1));

  // Prev Step
  const back = () => setCurrentStepIndex(prev => (prev <= 0 ? prev : prev - 1));

  // Goto Step
  const goto = (step: number) => setCurrentStepIndex(step);

  const resetIndex = () => setCurrentStepIndex(0);

  return {
    currentIndex: currentStepIndex,
    steps: steps[currentStepIndex],
    goto,
    next,
    back,
    resetIndex,

    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};

export default useMultipleForm;
