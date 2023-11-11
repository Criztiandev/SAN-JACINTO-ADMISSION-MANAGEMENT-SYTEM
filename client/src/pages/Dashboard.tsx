/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent, useTransition } from "react";
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import SettingsDrawer from "../containers/Drawers/SettingsDrawer";
import StatsSection from "../containers/Dashboard/StatsSection";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import TabAction from "../containers/Dashboard/TabAction";
import TabContent from "../containers/Dashboard/TabContent";
import { useAuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import DashboardSkeleton from "../containers/Skeleton/DashbardSkeleton";
import { Button, Typography } from "../components";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("Admission");
  const [isPending, startTransition] = useTransition();

  const { user } = useAuthContext();
  const {
    data,
    isLoading,
    isPending: isFetchPending,
  } = useFetch({ route: `/account/${user}`, key: ["stats"] });

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
          <ActionHeader
            onSettings={() => {}}
            onLogout={() => {}}
            loading={isLoading}
          />
        }
        className="h-full flex flex-col gap-8"
        free>
        {/* // Stats */}
        <StatsSection serverUrl={import.meta.env.VITE_SERVER_URL} />

        <section className="flex flex-col gap-4 h-[80vh]">
          <TabAction
            selected={activePanel}
            onSelect={handleSelectPanel}
            pending={isPending}
          />

          <TabContent selected={activePanel} pending={isPending} />
        </section>

        <section className="h-80vh bg-gray-500 p-4 rounded-[5px] grid grid-cols-[200px_auto]">
          <div className="h-full flex flex-col items-center gap-4">
            {/* //Profile */}
            <div className="w-[128px] h-[128px] rounded-full border border-gray-400"></div>
            {/* // Details */}
            <div className="text-center text-gray-100">
              <Typography as="h6">Criztian Jade M Tuplano</Typography>
              <Typography as="span" className="text-sm">
                @criztindev
              </Typography>
            </div>
            {/* // Action */}
            <Button title="Turn Off" className="hover:bg-red-500" />
          </div>
          <div className="text-white">
            <div className="flex gap-4 items-center">
              <span>🟢 Status:</span>
              <span className="bg-green-300 text-black px-3  py-1 rounded-full font-semibold cursor-default">
                Active
              </span>
            </div>
          </div>
        </section>
      </BaseLayout>

      {/* {settingsIsActive && (
        <SettingsDrawer state={settingsIsActive} onClose={toggleSettings} />
      )}

      {logoutIsActive && (
        <SettingsDrawer state={logoutIsActive} onClose={toggleLogout} />
      )} */}
    </>
  );
};

export default Dashboard;
