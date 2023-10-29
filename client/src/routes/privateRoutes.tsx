import { createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  ApplicantPage,
  DashboardPage,
  SchedulePage,
  AnnoucementPage,
  ExaminiesPage,
  MasterListPage,
  UserAccountPage,
} from "../pages";
import { TableProvider, ScheduleProvider } from "../context";

const routes = [
  {
    path: "/",
    element: (
      <TableProvider>
        <DashboardPage />
      </TableProvider>
    ),
  },
  {
    path: "/applicants",
    element: (
      <TableProvider>
        <ApplicantPage />
      </TableProvider>
    ),
  },
  {
    path: "/schedule",
    element: (
      <ScheduleProvider>
        <SchedulePage />
      </ScheduleProvider>
    ),
  },

  {
    path: "/annoucement",
    element: (
      <TableProvider>
        <AnnoucementPage />
      </TableProvider>
    ),
  },
  {
    path: "/masterlist",
    element: (
      <TableProvider>
        <MasterListPage />
      </TableProvider>
    ),
  },
  {
    path: "/examiniees",
    element: (
      <TableProvider>
        <ExaminiesPage />
      </TableProvider>
    ),
  },
  { path: "/user", element: <UserAccountPage /> },
];

export const privateRoutes = createBrowserRouter(
  routes.map(route => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
