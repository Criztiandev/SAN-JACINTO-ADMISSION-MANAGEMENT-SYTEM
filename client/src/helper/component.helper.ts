interface ComponentTypeProps {
  type: "contained" | "outlined" | "ghost";
}

export const ComponentType = ({ type = "contained" }: ComponentTypeProps) => {
  const styles = {
    contained: "bg-[#cccccc]",
    outlined: "border",
    ghost: "",
  };

  return styles[type];
};
