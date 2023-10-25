/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateLazyDrawer,
  ViewLazyDrawer,
  UpdateLazyDrawer,
  DeleteLazyDrawer,
  MessageLazyDrawer,
} from "../containers/Applicants";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../components";
import ActionColumn from "../containers/Applicants/ActionColumn";
import TitleHeader from "../containers/Table/TitleHeader";
import FirstColumn from "../containers/Table/FirstColumn";
import { useDrawerProps } from "../interface/Drawer.Types";

interface ToggleProps {
  viewToggle: useDrawerProps;
  createToggle: useDrawerProps;
  updateToggle: useDrawerProps;
  deleteToggle: useDrawerProps;
  messageToggle: useDrawerProps;
}

export const DrawerLists = (selected: any, toggles: ToggleProps) => {
  const {
    viewToggle,
    createToggle,
    updateToggle,
    deleteToggle,
    messageToggle,
  } = toggles;

  return [
    {
      id: "0",
      Component: ViewLazyDrawer,
      data: selected,
      state: viewToggle.active,
      onClose: viewToggle.toggleDrawer,
    },

    {
      id: "1",
      Component: CreateLazyDrawer,
      state: createToggle.active,
      onClose: createToggle.toggleDrawer,
    },

    {
      id: "2",
      Component: UpdateLazyDrawer,
      data: selected,
      state: updateToggle.active,
      onClose: updateToggle.toggleDrawer,
    },

    {
      id: "3",
      Component: MessageLazyDrawer,
      data: selected,
      state: messageToggle.active,
      onClose: messageToggle.toggleDrawer,
    },

    {
      id: "4",
      Component: DeleteLazyDrawer,
      data: selected,
      state: deleteToggle.active,
      onClose: deleteToggle.toggleDrawer,
    },
  ];
};

export const TableConfig = (
  toggles: ToggleProps,
  onToggle: (id: string, toggle: () => void) => void,
  onAccept: (id: string, status: string) => void
): ColumnDef<any, any>[] => {
  const { viewToggle, updateToggle, deleteToggle, messageToggle } = toggles;

  return [
    {
      id: "select",
      header: ({ table }) => <TitleHeader data={table} />,
      accessorFn: ({ personalDetails }) =>
        `${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName}`,

      cell: ({ row, getValue }) => (
        <FirstColumn
          data={row}
          value={getValue()}
          viewApplicant={() =>
            onToggle(row.original._id, viewToggle.toggleDrawer)
          }
        />
      ),
    },

    { header: "LRN", accessorKey: "studentDetails.LRN" },
    {
      header: "Grade Level",
      accessorKey: "studentDetails.yearLevel",
      accessorFn: ({ studentDetails }) =>
        `${studentDetails.yearLevel.split(" ")[1]}`,
    },
    { header: "Gender", accessorKey: "personalDetails.gender" },
    { header: "BOD", accessorKey: "personalDetails.birthDate" },
    { header: "Age", accessorKey: "personalDetails.age" },
    {
      header: "Guardian",
      accessorKey: "guardianDetails.legalGuardian",
      accessorFn: ({ guardianDetails }) => {
        const { firstName, middleName, lastName } =
          guardianDetails.legalGuardian;

        return `${lastName}, ${firstName} ${middleName[0]}.`;
      },
    },

    { header: "Contact", accessorKey: "personalDetails.contact" },
    { header: "Average", accessorKey: "gradeDetails.generalAve" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => (
        <Badge as="neutral" type={getValue()} title={getValue()} />
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const credentials = row.original;
        const UID = credentials?._id;
        return (
          <ActionColumn
            onAccept={() => onAccept(UID, "hold")}
            onDelete={() => onToggle(UID, deleteToggle.toggleDrawer)}
            onEdit={() => onToggle(UID, updateToggle.toggleDrawer)}
            onHold={() => onAccept(UID, "hold")}
            onMessage={() => onToggle(UID, messageToggle.toggleDrawer)}
          />
        );
      },
    },
  ];
};
