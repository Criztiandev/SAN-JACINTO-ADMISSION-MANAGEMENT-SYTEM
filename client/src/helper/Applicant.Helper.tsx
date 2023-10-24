/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateApplicantDrawer,
  ViewApplicantDrawer,
  UpdateApplicantDrawer,
  DeleteApplicantDrawer,
  MessageApplicantDrawer,
} from "../containers/Applicants";

import FirstColumn from "../containers/Table/FirstColumn";
import TitleHeader from "../containers/Table/TitleHeader";
import { ColumnDef } from "@tanstack/react-table";

import useDrawer from "../hooks/useDrawer";
import { useTableContext } from "../context/TableContext";
import ActionColumn from "../containers/Applicants/ActionColumn";
import { Badge } from "../components";

export const DrawerLists = (selected: any, toggles) => {
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
      Component: ViewApplicantDrawer,
      data: selected,
      state: viewToggle.active,
      onClose: viewToggle.toggleDrawer,
    },

    {
      id: "1",
      Component: CreateApplicantDrawer,
      state: createToggle.active,
      onClose: createToggle.toggleDrawer,
    },

    {
      id: "2",
      Component: UpdateApplicantDrawer,
      data: selected,
      state: updateToggle.active,
      onClose: updateToggle.toggleDrawer,
    },

    {
      id: "3",
      Component: MessageApplicantDrawer,
      data: selected,
      state: messageToggle.active,
      onClose: messageToggle.toggleDrawer,
    },

    {
      id: "4",
      Component: DeleteApplicantDrawer,
      data: selected,
      state: deleteToggle.active,
      onClose: deleteToggle.toggleDrawer,
    },
  ];
};

export const TableConfig = (
  toggles,
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
