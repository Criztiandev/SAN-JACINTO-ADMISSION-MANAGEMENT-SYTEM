import { CardSelectionProps } from "../../interface/animationInterface";

export const CardSelectionAnim = {
  animate: ({ currVal, value }: CardSelectionProps) => {
    return currVal === value ? "selected" : "unselected";
  },
  variant: {
    selected: { border: "2px solid black" },
    unselected: { border: "1px solid rgba(0,0,0,0.2)" },
    error: { border: "2px solid red" },
  },
};
