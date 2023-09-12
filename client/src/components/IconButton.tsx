interface IconProps {
  icon?: string;
}

const IconButton = ({ icon = "I" }: IconProps) => {
  return (
    <button className="w-8 h-8 border border-black rounded-full">{icon}</button>
  );
};

export default IconButton;
