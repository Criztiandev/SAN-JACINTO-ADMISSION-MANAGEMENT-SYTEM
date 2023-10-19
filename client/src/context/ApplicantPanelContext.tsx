/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext, useState } from "react";
import useDrawer from "../hooks/useDrawer";
import ViewDrawer from "../containers/Applicants/ViewDrawer";
import CreateDrawer from "../containers/Applicants/CreateDrawer";
import EditDrawer from "../containers/Applicants/EditDrawer";
import MessageDrawer from "../containers/Applicants/MessageDrawer";
import DeleteDrawer from "../containers/Applicants/DeleteDrawer";
import { ColumnDef } from "@tanstack/react-table";
import FirstColumn from "../containers/Table/FirstColumn";
import ActionColumn from "../containers/Applicants/ActionColumn";
import TitleHeader from "../containers/Table/TitleHeader";
import { Badge } from "../components";
import { toast } from "react-toastify";
import { ToastConfig } from "../utils/notifUtils";

interface ApplicantProviderProps {
  children: ReactNode;
}

interface ApplicantPanelContextType {
  TableConfig: Array<object>;
  createToggle: () => void;
  DrawerLists: DrawerListProps[];
}

interface DrawerListProps {
  id: string;
  Component: any;
  data?: Array<object> | string;
  state: boolean;
  onClose: () => void;
}

const Context = createContext<ApplicantPanelContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useApplicantPanelContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Applicant Panel Context Doest Exist");
  return context;
};

const ApplicantProvider = ({ children }: ApplicantProviderProps) => {
  const [selectedApplicant, setSelectedApplicant] = useState("");
  const createToggle = useDrawer();
  const viewToggle = useDrawer();
  const editToggle = useDrawer();
  const messageToggle = useDrawer();
  const deleteToggle = useDrawer();

  const handleAction = (data: any, toggle: () => void) => {
    setSelectedApplicant(data);
    toggle();
  };

  const handleAccept = () => {
    toast.success("Applicant Accepted Successfully", ToastConfig);
  };

  const handleUpdateStatus = (target: string, status: string) => {
    toast.info("Applicat is Updated Successfully", ToastConfig);
  };

  const DrawerLists: DrawerListProps[] = [
    {
      id: "0",
      Component: ViewDrawer,
      data: selectedApplicant,
      state: viewToggle.active,
      onClose: viewToggle.toggleDrawer,
    },

    {
      id: "1",
      Component: CreateDrawer,
      state: createToggle.active,
      onClose: createToggle.toggleDrawer,
    },

    {
      id: "2",
      Component: EditDrawer,
      data: selectedApplicant,
      state: editToggle.active,
      onClose: editToggle.toggleDrawer,
    },

    {
      id: "3",
      Component: MessageDrawer,
      data: selectedApplicant,
      state: messageToggle.active,
      onClose: messageToggle.toggleDrawer,
    },

    {
      id: "4",
      Component: DeleteDrawer,
      data: selectedApplicant,
      state: deleteToggle.active,
      onClose: deleteToggle.toggleDrawer,
    },
  ];

  return (
    <Context.Provider
      value={{
        createToggle: createToggle.toggleDrawer,
        TableConfig,
        DrawerLists,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ApplicantProvider;
