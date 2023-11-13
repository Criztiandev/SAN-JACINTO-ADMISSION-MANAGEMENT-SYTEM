/* eslint-disable react-refresh/only-export-components */
import { FC, ReactElement, Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { TableProvider, ScheduleProvider } from "../context";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import ErrorPage from "../pages/ErrorPage";
import DashboardSkeleton from "../containers/Skeleton/DashbardSkeleton";

const ApplicantPage = lazy(() => import("../pages/Applicant"));
const DashboardPage = lazy(() => import("../pages/Dashboard"));
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
  // {
  //   path: "/schedule",
  //   element: (
  //     <ProviderWrapper loader={<ScheduleSkeleton />}>
  //       <SchedulePage />
  //     </ProviderWrapper>
  //   ),
  // },

  // {
  //   path: "/annoucement",
  //   element: (
  //     <Suspense fallback={<TablePanelSkeleton />}>
  //       <TableProvider>
  //         <AnnoucementPage />
  //       </TableProvider>
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "/masterlist",
  //   element: (
  //     <Suspense fallback={<TablePanelSkeleton />}>
  //       <TableProvider>
  //         <MasterListPage />
  //       </TableProvider>
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "/examiniees",
  //   element: (
  //     <Suspense fallback={<TablePanelSkeleton />}>
  //       <TableProvider>
  //         <ExaminiesPage />
  //       </TableProvider>
  //     </Suspense>
  //   ),
  // },

  // {
  //   path: "/users",
  //   element: (
  //     <Suspense fallback={<TablePanelSkeleton />}>
  //       <TableProvider>
  //         <UsersPage />
  //       </TableProvider>
  //     </Suspense>
  //   ),
  // },

  // { path: "/tools", element: <Tools /> },
  // {
  //   path: "/profile",
  //   element: (
  //     <Suspense fallback={<ProfileSkeleton />}>
  //       <ProfilePage />
  //     </Suspense>
  //   ),
  // },
];

export const privateRoutes = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorPage />,
  }))
);
