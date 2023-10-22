import { RouterProvider } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import { useAuthContext } from "../context/AuthContext";

const Routes = () => {
  const { user } = useAuthContext();

  if (user) return <RouterProvider router={privateRoutes} />;
  return <RouterProvider router={publicRoutes} />;
};

export default Routes;
