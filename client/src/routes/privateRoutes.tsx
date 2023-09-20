import { createBrowserRouter } from "react-router-dom";
import {
  LandingPage,
  RegisterPage,
  LoginPage,
  ErrorPage,
  ApplicantPage,
  SchedulePage,
  AnnoucementPage,
  ToolPage,
  DashboardPage,
} from "../pages";

export const privateRoutes = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "/register", element: <RegisterPage />, errorElement: <ErrorPage /> },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/applicants",
    element: <ApplicantPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/schedule",
    element: <SchedulePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/message",
    element: <AnnoucementPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/tools",
    element: <ToolPage />,
    errorElement: <ErrorPage />,
  },
]);
