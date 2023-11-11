import { FC, ReactElement, Suspense, ReactNode } from "react";
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
import DashboardSkeleton from "../containers/Skeleton/DashbardSkeleton";
import { Loading } from "../components";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import ScheduleSkeleton from "../containers/Skeleton/ScheduleSkeleton";
interface ProviderWrapperProps {
  children: React.ReactNode;
  loader: ReactElement;
}

// eslint-disable-next-line react-refresh/only-export-components
const ProviderWrapper: FC<ProviderWrapperProps> = ({ children, loader }) => {
  return (
    <Suspense fallback={loader}>
      <TableProvider>
        <ScheduleProvider>{children}</ScheduleProvider>
      </TableProvider>
    </Suspense>
  );
};

const routes = [
  {
    path: "/",
    element: (
      <ProviderWrapper loader={<DashboardSkeleton />}>
        <DashboardSkeleton />
      </ProviderWrapper>
    ),
  },
  {
    path: "/applicants",
    element: (
      <Suspense fallback={<Loading />}>
        <TableProvider>
          <TablePanelSkeleton />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/schedule",
    element: (
      <ProviderWrapper loader={<ScheduleSkeleton />}>
        <ScheduleSkeleton />
      </ProviderWrapper>
    ),
  },

  {
    path: "/annoucement",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <TablePanelSkeleton />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/masterlist",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <TablePanelSkeleton />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/examiniees",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <TablePanelSkeleton />
        </TableProvider>
      </Suspense>
    ),
  },

  {
    path: "/users",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <TablePanelSkeleton />
        </TableProvider>
      </Suspense>
    ),
  },

  { path: "/tools", element: <Tools /> },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    ),
  },
];

export const privateRoutes = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
