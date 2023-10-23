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
import UserAccount from "../pages/UserAccount";
import TableProvider from "../context/TableContext";
import ScheduleContextProvider from "../context/ScheduleContext";

const routes = [
  { path: "/", element: <DashboardPage /> },
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
      <ScheduleContextProvider>
        <SchedulePage />
      </ScheduleContextProvider>
    ),
  },
  { path: "/applicants/examinees", element: <Examiniees /> },
  { path: "/annoucement", element: <AnnoucementPage /> },
  { path: "/masterlist", element: <MasterList /> },
  { path: "/examiniees", element: <Examiniees /> },
  { path: "/user", element: <UserAccount /> },
];

export const privateRoutes = createBrowserRouter(
  routes.map(route => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
