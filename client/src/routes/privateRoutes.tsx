import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, ApplicantPage, DashboardPage } from "../pages";
import Examiniees from "../pages/Examiniees";

const routes = [
  {
    path: "/",
    element: <DashboardPage />,
  },

  {
    path: "/applicants",
    element: <ApplicantPage />,
  },

  {
    path: "/applicants/examinees",
    element: <Examiniees />,
  },
];

export const privateRoutes = createBrowserRouter(
  routes.map(route => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
