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
import ApplicantSkeleton from "../containers/Skeleton/ApplicantSkeleton";
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
          <ApplicantSkeleton />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/schedule",
    element: (
      <ProviderWrapper loader={<Loading />}>
        <SchedulePage />
      </ProviderWrapper>
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
