import React from "react";
import BaseLayout from "../../layouts/BaseLayout";
import Nav from "../../layouts/Nav";
import Skeleton from "react-loading-skeleton";

const PageLoader = () => {
  return (
    <div className="grid grid-cols-[70px_auto] gap">
      <Nav />
      <Skeleton height={"100%"} width={"100%"} />
    </div>
  );
};

export default PageLoader;
