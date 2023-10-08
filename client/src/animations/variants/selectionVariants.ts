interface animateProps {
  state: number;
  index: number;
  error?: boolean;
}

export const cardSelection = {
  animate: ({ state, index }: animateProps) => {
    return state === index ? "selected" : "unselected";
  },
  variant: {
    selected: { border: "2px solid black" },
    unselected: { border: "1px solid rgba(0,0,0,0.2)" },
    error: { border: "2px solid red" },
  },
};
