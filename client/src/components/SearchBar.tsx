import { useState } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import { ComponentType } from "../interface/ComponentInterfaces";

interface SearchBarProps extends ComponentType {
  as?: "icon" | "normal";
  dir?: "left" | "right";
}

const SearchBar = ({ as = "icon", dir = "left" }: SearchBarProps) => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    if (as === "icon") setActive(prev => !prev);
    return;
  };

  return (
    <label
      className={`cursor-pointer flex gap-2 border rounded-full w-fit ${
        active ? "px-[20px] py-3" : "p-3"
      }`}>
      {dir === "left" && (
        <img src={SearchIcon} alt="Magnifying Glass" onClick={handleActive} />
      )}
      {active && (
        <input className="h-fit w-fit outline-none" placeholder="Search here" />
      )}
      {dir === "right" && (
        <img src={SearchIcon} alt="Magnifying Glass" onClick={handleActive} />
      )}
    </label>
  );
};

export default SearchBar;
