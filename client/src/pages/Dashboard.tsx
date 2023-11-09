/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent, useTransition } from "react";
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import SettingsDrawer from "../containers/Drawers/SettingsDrawer";
import StatsSection from "../containers/Dashboard/StatsSection";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import TabAction from "../containers/Dashboard/TabAction";
import TabContent from "../containers/Dashboard/TabContent";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("Admission");
  const [isPending, startTransition] = useTransition();
  const { active: settingsIsActive, toggleDrawer: toggleSettings } =
    useDrawer();
  const { active: logoutIsActive, toggleDrawer: toggleLogout } = useDrawer();

  const handleSelectPanel = (event: MouseEvent<HTMLButtonElement>) => {
    startTransition(() => {
      setActivePanel(event.currentTarget.name);
    });
  };

  return (
    <>
      <BaseLayout
        title="Hello, Criztian Jade 👋"
        actions={
          <ActionHeader
            onSettings={toggleSettings}
            onLogout={toggleLogout}
            loading={true}
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
            loading={true}
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
