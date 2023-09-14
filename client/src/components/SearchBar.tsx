/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import { ComponentType } from "../interface/ComponentInterfaces";

interface SearchBarProps extends ComponentType {
  as?: "icon" | "normal";
  dir?: "left" | "right";
}

const SearchBar: React.FC<SearchBarProps> = ({
  as,
  dir = "left",
}: SearchBarProps) => {
  const [active, setActive] = useState(false);
  const searchBarRef = useRef<HTMLLabelElement | null>(null);

  const handleActive = () => {
    if (as === "icon") setActive(prev => !prev);
  };

  // Turn off if the user clic outside
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <label
      ref={searchBarRef}
      className={`cursor-pointer flex gap-2 border rounded-full w-fit ${
        active ? "px-[20px] py-3" : "p-3"
      }`}>
      {dir === "left" && (
        <img src={SearchIcon} alt="Magnifying Glass" onClick={handleActive} />
      )}
      {active ? (
        <input className="h-fit w-fit outline-none" placeholder="Search here" />
      ) : null}
      {dir === "right" && (
        <img src={SearchIcon} alt="Magnifying Glass" onClick={handleActive} />
      )}
    </label>
  );
};

export default SearchBar;
