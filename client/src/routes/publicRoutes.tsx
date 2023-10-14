import { createBrowserRouter } from "react-router-dom";
import { LandingPage, RegisterPage } from "../pages";

export const publicRoutes = createBrowserRouter([
  {
    path: "/admission",
    element: <RegisterPage />,
  },

  {
    path: "/",
    element: <LandingPage />,
  },
]);
