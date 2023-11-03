import { ReactElement } from "react";
export interface useMultipleFormOption {
  currentIndex: number;
  steps: ReactElement;
  goto: (value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetIndex: () => void;

  isFirstStep: boolean;
  isLastStep: boolean;
}
