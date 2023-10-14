import { RouterProvider } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { useState } from "react";
import { publicRoutes } from "./publicRoutes";

const Routes = () => {
  const [user, setUser] = useState("123123");

  if (user) {
    return <RouterProvider router={privateRoutes} />;
  }

  return <RouterProvider router={publicRoutes} />;
};

export default Routes;
