import { createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  ApplicantPage,
  DashboardPage,
  SchedulePage,
  AnnoucementPage,
} from "../pages";
import Examiniees from "../pages/Examiniees";
import MasterList from "../pages/MasterList";
import ApplicantProvider from "../context/ApplicantPanelContext";

const routes = [
  { path: "/", element: <DashboardPage /> },
  {
    path: "/applicants",
    element: (
      <ApplicantProvider>
        <ApplicantPage />
      </ApplicantProvider>
    ),
  },
  { path: "/applicants/examinees", element: <Examiniees /> },
  { path: "/schedule", element: <SchedulePage /> },
  { path: "/annoucement", element: <AnnoucementPage /> },
  { path: "/masterlist", element: <MasterList /> },
  { path: "/examiniees", element: <Examiniees /> },
];

export const privateRoutes = createBrowserRouter(
  routes.map(route => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
