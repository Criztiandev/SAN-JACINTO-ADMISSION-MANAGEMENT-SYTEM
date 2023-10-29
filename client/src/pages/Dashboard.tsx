/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton } from "../components";
import {
  CalendarIcon,
  SettingIcon,
  SignOutIcon,
  ApplicantIcon,
  GraphIcon,
} from "../assets/icons";
import { BaseLayout } from "../layouts";
import DashboardStats from "../containers/Dashboard/DashboardStats";
import GrapButton from "../containers/Dashboard/GrapButton";
import useDrawer from "../hooks/useDrawer";
import SettingsDrawer from "../containers/Dashboard/SettingsDrawer";
import { useState, MouseEvent, useTransition } from "react";
import AdmissionCalendar from "../containers/Dashboard/AdmissionCalendar";

const ApplicantStats = [
  { value: "18,000", subtitle: "Junior" },
  { value: "12,000", subtitle: "Senior" },
  { value: "13,000", subtitle: "SPE & SPJ" },
];

const DashboardPanel = [
  { title: "Graph", icons: GraphIcon },
  { title: "Admission", icons: CalendarIcon },
  { title: "Applicant", icons: ApplicantIcon },
];

const PanelTitle = [
  { key: "Graph", title: "Applicant Graph" },
  { key: "Admission", title: "Admission Calendar" },
  { key: "Applicant", title: "Recent Applicant Table" },
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState([]);
  const [activePanel, setActivePanel] = useState("Applicant");
  const { active: drawerActive, toggleDrawer } = useDrawer();

  const [isPending, startTransition] = useTransition();

  const handleSelectPanel = (event: MouseEvent<HTMLButtonElement>) => {
    startTransition(() => {
      setActivePanel(event.currentTarget.name);
    });
  };

  return (
    <>
      <BaseLayout
        title="Welcome to Hell"
        subtitle="Hi! Criztian, Its beeen a while,"
        actions={
          <>
            <IconButton icon={SettingIcon} onClick={toggleDrawer} />
            <IconButton icon={SignOutIcon} />
          </>
        }
        style="free"
        className="border h-full">
        <section className="grid grid-cols-3 gap-4">
          {ApplicantStats.map(props => (
            <DashboardStats {...props} />
          ))}
        </section>

        <section className="grid grid-cols-[1fr_300px] gap-4 my-4">
          <div className="relative border w-full h-[400px] rounded-[5px] flex flex-col gap-2 overflow-hidden">
            <div className="w-full bg-gray-300 px-2">
              <h3 className="p-2">
                {PanelTitle.find(title => title.key === activePanel)?.title ||
                  "Title"}
              </h3>
            </div>
            {/* <SummaryTable layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px" /> */}
            <AdmissionCalendar />
          </div>

          {/* // Content */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
              {DashboardPanel.map(props => (
                <GrapButton
                  {...props}
                  selected={activePanel}
                  pending={isPending}
                  onClick={handleSelectPanel}
                />
              ))}
            </div>

            <div className="w-full border h-full"></div>
          </div>
        </section>
      </BaseLayout>

      {drawerActive && (
        <SettingsDrawer state={drawerActive} onClose={toggleDrawer} />
      )}
    </>
  );
};

export default Dashboard;
