import React from "react";
import Applicants from "../assets/icons/Applicant_Dark.svg";
import useURL from "../hooks/useURL";
import Dropdown from "./Dropdown";

const Shortcut = () => {
  const { navigateTo } = useURL();

  const routes = [
    {
      icon: Applicants,
      title: "Archieve",
      onClick: () => navigateTo("/archieve"),
    },
    {
      icon: Applicants,
      title: "Examiniees",
      onClick: () => navigateTo("/examiniees"),
    },
    {
      icon: Applicants,
      title: "Batch",
      onClick: () => navigateTo("/batch"),
    },
    {
      icon: Applicants,
      title: "Masterlist",
      onClick: () => navigateTo("/masterlist"),
    },

    {
      icon: Applicants,
      title: "Users",
      onClick: () => navigateTo("/user"),
    },
  ];

  return (
    <Dropdown
      icon="ssdfsdf"
      as="outlined"
      option={routes}
      className="w-[150px] px-3 py-2"
    />
  );
};

export default Shortcut;
