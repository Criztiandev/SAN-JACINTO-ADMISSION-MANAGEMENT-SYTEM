/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import { SearchBarProps } from "../interface/Component.Type";
import Skeleton from "react-loading-skeleton";

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    { dir = "left", value, onChange, onClick, disabled }: SearchBarProps,
    ref
  ) => {
    // if Disabled return the loading
    if (disabled)
      return (
        <div className="w-[300px] rounded-ful h-[49px]">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
      );

    return (
      <label
        className={`cursor-pointer flex gap-2 border rounded-full w-fit p-3`}
        onClick={onClick}>
        {dir === "left" && <img src={SearchIcon} alt="Magnifying Glass" />}
        <input
          ref={ref}
          className="h-fit w-fit outline-none"
          placeholder="Search here"
          value={value}
          onChange={onChange}
        />
        {dir === "right" && <img src={SearchIcon} alt="Magnifying Glass" />}
      </label>
    );
  }
);

export default SearchBar;
