/* eslint-disable react-hooks/exhaustive-deps */
import { useState, MouseEvent } from "react";
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import SettingsDrawer from "../containers/Drawers/SettingsDrawer";
import StatsSection from "../containers/Dashboard/StatsSection";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import TabAction from "../containers/Dashboard/TabAction";
import TabContent from "../containers/Dashboard/TabContent";

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("Admission");

  const { active: settingsIsActive, toggleDrawer: toggleSettings } =
    useDrawer();
  const { active: logoutIsActive, toggleDrawer: toggleLogout } = useDrawer();

  const handleSelectPanel = (event: MouseEvent<HTMLButtonElement>) => {
    setActivePanel(event.currentTarget.name);
  };

  return (
    <>
      <BaseLayout
        title="Welcome to Hell"
        subtitle="Hi! Criztian, Its beeen a while,"
        actions={
          <ActionHeader onSettings={toggleSettings} onLogout={toggleLogout} />
        }
        style="free"
        className="h-full">
        <StatsSection />

        <section className="grid grid-cols-[1fr_300px] gap-4 my-4">
          <TabContent selected={activePanel} />
          <TabAction
            selected={activePanel}
            isPending={false}
            onSelect={handleSelectPanel}
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
