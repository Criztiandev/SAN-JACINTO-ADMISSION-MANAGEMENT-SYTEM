import { RouterProvider } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";

const Routes = () => {
  return <RouterProvider router={privateRoutes} />;
};

export default Routes;
