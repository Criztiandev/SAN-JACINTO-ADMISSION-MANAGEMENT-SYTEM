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
import { TableConfigProps } from "../interface/Table.types";
import { ToggleProps } from "../interface/Drawer.Types";
import { OptionItem } from "../interface/Component.Type";
import { ApplicantIcon } from "../assets/icons";

export const DrawerLists = (selected: any, toggles?: ToggleProps) => {
  const {
    viewToggle,
    createToggle,
    updateToggle,
    deleteToggle,
    messageToggle,
  } = toggles || {};

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

export const TableConfig = ({
  toggles,
  onAccept,
  onToggle,
  action = false,
}: TableConfigProps): ColumnDef<any, any>[] => {
  const { viewToggle, updateToggle, deleteToggle, messageToggle } =
    toggles || "";

  const config: ColumnDef<any, any>[] = [
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
        const currentStatus =
          credentials?.status === "hold" ? "Pending" : "Hold";
        return (
          <ActionColumn
            status={currentStatus}
            onAccept={() => onAccept(UID, "accept")}
            onDelete={() => onToggle(UID, deleteToggle.toggleDrawer)}
            onEdit={() => onToggle(UID, updateToggle.toggleDrawer)}
            onHold={() => onAccept(UID, currentStatus)}
            onMessage={() => onToggle(UID, messageToggle.toggleDrawer)}
          />
        );
      },
    },
  ];

  if (action) return config.filter((filter) => filter.header !== "Action");
  return config;
};

export const PersoanlDetailsNameInput = [
  { name: "personalDetails.lastName" },
  { name: "personalDetails.firstName" },
  { name: "personalDetails.middleName" },
  { name: "personalDetails.suffix" },
];

export const GradeOptions: OptionItem[] = [
  { icon: ApplicantIcon, title: "Grade 7" },
  { icon: ApplicantIcon, title: "Grade 8" },
  { icon: ApplicantIcon, title: "Grade 9" },
  { icon: ApplicantIcon, title: "Grade 10" },
  { icon: ApplicantIcon, title: "Grade 11" },
  { icon: ApplicantIcon, title: "Grade 12" },
];

export const StatusItems: OptionItem[] = [
  { title: "Default", icon: ApplicantIcon },
  { title: "Pending", icon: ApplicantIcon },
  { title: "Hold", icon: ApplicantIcon },
];
