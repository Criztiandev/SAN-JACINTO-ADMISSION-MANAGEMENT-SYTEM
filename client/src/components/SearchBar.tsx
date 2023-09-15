/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, ChangeEvent, forwardRef } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import { ComponentType } from "../interface/componentInterface";

interface SearchBarProps extends ComponentType {
  as?: "icon" | "normal";
  dir?: "left" | "right";
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ as = "normal", dir = "left", value, onChange }: SearchBarProps, ref) => {
    const [active, setActive] = useState<boolean>(as === "normal");
    const searchBarRef = useRef<HTMLLabelElement | null>(null);

    const handleActive = () => {
      if (as === "icon") setActive(prev => !prev);
    };

    // Handle Click outside to turn off the searchbar
    useEffect(() => {
      if (as === "icon") {
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
      }
    }, [as]);

    return (
      <label
        ref={searchBarRef}
        className={`cursor-pointer flex gap-2 border rounded-full w-fit ${
          active ? "px-[20px] py-3" : "p-3"
        }`}>
        {dir === "left" && (
          <img src={SearchIcon} alt="Magnifying Glass" onClick={handleActive} />
        )}
        {active && (
          <input
            ref={ref}
            className="h-fit w-fit outline-none"
            placeholder="Search here"
            value={value}
            onChange={onChange}
          />
        )}
        {dir === "right" && (
          <img src={SearchIcon} alt="Magnifying Glass" onClick={handleActive} />
        )}
      </label>
    );
  }
);

export default SearchBar;
