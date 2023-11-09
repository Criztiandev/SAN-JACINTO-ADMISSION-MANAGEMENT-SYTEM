/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent, useTransition } from "react";
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import SettingsDrawer from "../containers/Drawers/SettingsDrawer";
import StatsSection from "../containers/Dashboard/StatsSection";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import TabAction from "../containers/Dashboard/TabAction";
import TabContent from "../containers/Dashboard/TabContent";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminById } from "../api/Auth.Api";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("Admission");
  const [isPending, startTransition] = useTransition();
  const { active: settingsIsActive, toggleDrawer: toggleSettings } =
    useDrawer();
  const { active: logoutIsActive, toggleDrawer: toggleLogout } = useDrawer();

  const { user } = useAuthContext();
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const res = await fetchAdminById(user);
      return res;
    },
    queryKey: ["admin"],
  });

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
            onSettings={toggleSettings}
            onLogout={toggleLogout}
            loading={isLoading}
          />
        }
        className="h-full"
        free>
        {/* // Stats */}
        <StatsSection serverUrl={import.meta.env.VITE_SERVER_URL} />

        <section className="h-[80vh] grid grid-cols-[1fr_300px] gap-4 my-4">
          <TabContent selected={activePanel} pending={isPending} />
          <TabAction
            selected={activePanel}
            onSelect={handleSelectPanel}
            pending={isPending}
            loading={isLoading}
          />
        </section>
      </BaseLayout>

      {settingsIsActive && (
        <SettingsDrawer state={settingsIsActive} onClose={toggleSettings} />
      )}

      {logoutIsActive && (
        <SettingsDrawer state={logoutIsActive} onClose={toggleLogout} />
      )}
    </>
  );
};

export default Dashboard;
