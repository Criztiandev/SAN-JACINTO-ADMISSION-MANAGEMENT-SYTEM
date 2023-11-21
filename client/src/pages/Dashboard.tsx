/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent, useTransition, lazy } from "react";
import { useAuthContext } from "../context/AuthContext";

import LogoutIcon from "../assets/icons/Sign_out_Dark.svg";

import StatsSection from "../containers/Dashboard/StatsSection";
import TabAction from "../containers/Dashboard/TabAction";
import TabContent from "../containers/Dashboard/TabContent";
import useFetch from "../hooks/useFetch";
import BaseLayout from "../layouts/BaseLayout";
import DashboardSkeleton from "../containers/Skeleton/DashbardSkeleton";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
const NoticeContent = lazy(() => import("../containers/Drawers/NoticeContent"));
const ViewApplicant = lazy(
  () => import("../containers/Applicants/ViewApplicant")
);

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("Admission");
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const {
    data,
    isLoading,
    isPending: isFetchPending,
  } = useFetch({ route: `/account/${user}`, key: ["user"] });

  if (isLoading || isFetchPending) return <DashboardSkeleton />;

  const handleSelectPanel = (event: MouseEvent<HTMLButtonElement>) => {
    startTransition(() => {
      setActivePanel(event.currentTarget.name);
    });
  };

  return (
    <>
      <BaseLayout
        title={`Hello, ${data?.fullName} 👋`}
        actions={
          <IconButton
            icon={LogoutIcon}
            onClick={() => navigate("?state=logout")}
          />
        }
        className="h-full flex flex-col gap-8"
        free>
        {/* // Stats */}
        <StatsSection />

        <section className="flex flex-col gap-4 h-[80vh]">
          <TabAction
            selected={activePanel}
            onSelect={handleSelectPanel}
            pending={isPending}
          />

          <TabContent selected={activePanel} pending={isPending} />
        </section>
      </BaseLayout>

      <DrawerWrapper state="logout" Component={NoticeContent} />
      <DrawerWrapper state="view" Component={ViewApplicant} />
      <DrawerWrapper state="turnOff" Component={NoticeContent} />
    </>
  );
};

export default Dashboard;
