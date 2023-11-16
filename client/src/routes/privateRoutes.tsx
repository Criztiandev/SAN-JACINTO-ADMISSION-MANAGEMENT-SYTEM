/* eslint-disable react-refresh/only-export-components */
import { FC, ReactElement, Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { TableProvider, ScheduleProvider } from "../context";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import ErrorPage from "../pages/ErrorPage";
import DashboardSkeleton from "../containers/Skeleton/DashbardSkeleton";
import ScheduleSkeleton from "../containers/Skeleton/ScheduleSkeleton";
import ProfileSkeleton from "../containers/Skeleton/ProfileSkeleton.tsx";

const ApplicantPage = lazy(() => import("../pages/Applicant"));
const DashboardPage = lazy(() => import("../pages/Dashboard"));
const SchedulePage = lazy(() => import("../pages/Schedule"));
const AnnoucementPage = lazy(() => import("../pages/Annoucement"));
const ExaminiesPage = lazy(() => import("../pages/Examiniees"));
const ToolPage = lazy(() => import("../pages/Tools.tsx"));
const ProfilePage = lazy(() => import("../pages/Profile.tsx"));
const MasterListPage = lazy(() => import("../pages/MasterList.tsx"));
const UserPage = lazy(() => import("../pages/Users.tsx"));
const BatchPage = lazy(() => import("../pages/Batch.tsx"));
const ArchievePage = lazy(() => import("../pages/Archieve.tsx"));
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
        <DashboardPage />
      </ProviderWrapper>
    ),
  },
  {
    path: "/applicants",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <ApplicantPage />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/schedule",
    element: (
      <ProviderWrapper loader={<ScheduleSkeleton />}>
        <SchedulePage />
      </ProviderWrapper>
    ),
  },

  {
    path: "/annoucement",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <AnnoucementPage />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/masterlist",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <MasterListPage />
        </TableProvider>
      </Suspense>
    ),
  },
  {
    path: "/examiniees",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <ExaminiesPage />
        </TableProvider>
      </Suspense>
    ),
  },

  {
    path: "/batch",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <BatchPage />
        </TableProvider>
      </Suspense>
    ),
  },

  {
    path: "/users",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <UserPage />
        </TableProvider>
      </Suspense>
    ),
  },

  {
    path: "/tools",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <ToolPage />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfilePage />
      </Suspense>
    ),
  },
  {
    path: "/applicant/archieve",
    element: (
      <Suspense fallback={<TablePanelSkeleton />}>
        <TableProvider>
          <ArchievePage />
        </TableProvider>
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
