import { panelTitleInterface } from "../interface/Registration.Type";
import { RegistrationLayoutProps } from "../interface/Layout.Types";
import AdmissionSideBar from "../containers/Layout/AdmissionSideBar";
import { CustomSideBarContent } from "../helper/Layout.Helper";
const RegistrationLayout = ({
  activePanel,
  children,
}: RegistrationLayoutProps) => {
  console.log(activePanel);

  const selectedPanelContent: string =
    CustomSideBarContent[activePanel as keyof panelTitleInterface] ||
    `Tell us about your ${activePanel}`;

  return (
    <>
      <div className="relative grid grid-cols-[500px_auto] h-[100vh] ">
        <AdmissionSideBar content={selectedPanelContent} toggle={() => {}} />
        <main className="p-6 flex flex-col gap-8">{children}</main>
      </div>
    </>
  );
};

export default RegistrationLayout;
