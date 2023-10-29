/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import SettingsDrawer from "../containers/Dashboard/SettingsDrawer";
import { useState, MouseEvent, useTransition, lazy } from "react";
import StatsSection from "../containers/Dashboard/StatsSection";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import TabAction from "../containers/Dashboard/TabAction";
import TabContent from "../containers/Dashboard/TabContent";

const GraphComponent = lazy(
  () => import("../containers/Dashboard/GraphComponent")
);
const AdmissionCalendar = lazy(
  () => import("../containers/Dashboard/AdmissionCalendar")
);
const SummaryTable = lazy(() => import("../containers/Dashboard/SummaryTable"));

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("Graph");
  const { active: settingsIsActive, toggleDrawer: toggleSettings } =
    useDrawer();
  const { active: logoutIsActive, toggleDrawer: toggleLogout } = useDrawer();

  // const [isPending, startTransition] = useTransition();

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
        className="border h-full">
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
