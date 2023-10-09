import { createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  ApplicantPage,
  DashboardPage,
  SchedulePage,
} from "../pages";
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

  { path: "/schedule", element: <SchedulePage /> },
];

export const privateRoutes = createBrowserRouter(
  routes.map(route => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
