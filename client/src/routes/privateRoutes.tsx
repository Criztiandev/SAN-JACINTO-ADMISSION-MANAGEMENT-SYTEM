import { createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  ApplicantPage,
  DashboardPage,
  SchedulePage,
  AnnoucementPage,
  ExaminiesPage,
  MasterListPage,
} from "../pages";
import { TableProvider, ScheduleProvider } from "../context";
import Tools from "../pages/Tools";
import Profile from "../pages/Profile";

const routes = [
  {
    path: "/",
    element: (
      <ScheduleProvider>
        <TableProvider>
          <DashboardPage />
        </TableProvider>
      </ScheduleProvider>
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
        <TableProvider>
          <SchedulePage />
        </TableProvider>
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

  { path: "/tools", element: <Tools /> },
  { path: "/profile", element: <Profile /> },
];

export const privateRoutes = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
