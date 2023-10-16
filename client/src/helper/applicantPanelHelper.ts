/* eslint-disable @typescript-eslint/no-explicit-any */
import ApplicantIcon from "../assets/icons/Applicants.svg";

// Tab Lists
export const TabLists = [
  { title: "Pending", active: true },
  { title: "Accepted", active: false },
  { title: "Revision", active: false },
];

// Filter Items
export const FilterList = [
  { title: "Pending", icon: ApplicantIcon },
  { title: "Update", icon: ApplicantIcon },
  { title: "Accepted", icon: ApplicantIcon },
];

// Table Column Config
export const TableCol: Array<string> = [
  "250px",
  "150px",
  "100px",
  "150px",
  "100px",
  "200px",
  "200px",
  "100px",
  "150px",
  "100px",
];

export const handleTitleUpdate = (_default: string, value: string) =>
  value === "Default" || value === "" ? _default : value;
