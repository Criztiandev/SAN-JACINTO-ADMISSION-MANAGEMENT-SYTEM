import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages";

export const publicRoutes = createBrowserRouter([
  {
    path: "/admission",
    element: <RegisterPage />,
  },
]);
