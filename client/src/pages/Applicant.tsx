/* eslint-disable @typescript-eslint/no-explicit-any */

import applicantData from "../data/applicantData.json";
import { ColumnDef } from "@tanstack/react-table";
import { useState, MouseEvent } from "react";

import { Badge, Button, Table, SearchBar } from "../components";
import BaseLayout from "../layouts/BaseLayout";

import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";

import useDrawer from "../hooks/useDrawer";
import TitleHeader from "../containers/Table/TitleHeader";
import FirstColumn from "../containers/Table/FirstColumn";
import CreateDrawer from "../containers/Applicants/CreateDrawer";
import ViewDrawer from "../containers/Applicants/ViewDrawer";
import GradeFilter from "../containers/Applicants/GradeFilter";
import StatusFilter from "../containers/Applicants/StatusFilter";
import MoreOption from "../containers/Applicants/MoreOption";
import ActionColumn from "../containers/Applicants/ActionColumn";
import EditDrawer from "../containers/Applicants/EditDrawer";
import MessageDrawer from "../containers/Applicants/MessageDrawer";
import DeleteDrawer from "../containers/Applicants/DeleteDrawer";
import { handleTitleUpdate } from "../helper/applicantPanelHelper";
import usePanelDrawer from "../hooks/usePanelDrawer";

interface ColumnInterface {
  yearLevel: { id: string; value: string };
  status: { id: string; value: string };
}

const Applicant = () => {
  const [selectedApplicant, setSelectedApplicant] = useState<any>({});
  const [search, setSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState<ColumnInterface>({
    yearLevel: { id: "studentDetails.yearLevel", value: "" },
    status: { id: "status", value: "" },
  });

  const CustomDrawer = usePanelDrawer([
    { data: selectedApplicant, Component: ViewDrawer },
    { data: null, Component: CreateDrawer },
    { data: selectedApplicant, Component: EditDrawer },
    { data: selectedApplicant, Component: DeleteDrawer },
    { data: selectedApplicant, Component: MessageDrawer },
  ]);

  console.log(CustomDrawer);

  const createToggle = useDrawer();
  const viewToggle = useDrawer();
  const editToggle = useDrawer();
  const messageToggle = useDrawer();
  const deleteToggle = useDrawer();

  const handleColumnSearch = (name: keyof ColumnInterface, value: string) => {
    setColumnSearch(prev => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));
  };

  const handleAction = (data: any, toggle: () => void) => {
    setSelectedApplicant(data);
    toggle();
  };

  // const handleAccept = () => {};

  const HeaderConfig: ColumnDef<any, any>[] = [
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
            handleAction(row.original._id, viewToggle.toggleDrawer)
          }
        />
      ),
    },

    { header: "LRN", accessorKey: "studentDetails.LRN" },
    {
      header: "Grade Level",
      accessorKey: "studentDetails.yearLevel",
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
    { header: "Average", accessorKey: "studentDetails.generalAverage" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: any) => (
        <Badge as="neutral" type={getValue()} title={getValue()} />
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <ActionColumn
          onDelete={() => handleAction(row.original, deleteToggle.toggleDrawer)}
          onHold={() => {}}
          onEdit={() => handleAction(row.original, editToggle.toggleDrawer)}
          onMessage={() =>
            handleAction(row.original, messageToggle.toggleDrawer)
          }
        />
      ),
    },
  ];

  return (
    <>
      <BaseLayout
        title="Applicants"
        header={
          <Button
            dir="left"
            title="Create"
            icon={CreateApplicantIcon}
            onClick={createToggle.toggleDrawer}
          />
        }
        action>
        <>
          <div className="flex justify-between items-center">
            <SearchBar
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="flex gap-4">
              {/* Grade Filter */}
              <GradeFilter
                onTitleUpdate={() =>
                  handleTitleUpdate(
                    "Grade",
                    `Grade ${columnSearch.yearLevel.value}`
                  )
                }
                onSelect={e =>
                  handleColumnSearch("yearLevel", e.currentTarget.value)
                }
              />

              {/* // Status Filter */}
              <StatusFilter
                onTitleUpdate={() =>
                  handleTitleUpdate("Status", columnSearch.status.value)
                }
                onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                  handleColumnSearch("status", e.currentTarget.value)
                }
              />

              <MoreOption />
            </div>
          </div>
          <Table
            data={applicantData}
            config={HeaderConfig}
            search={search}
            columnSearch={[{ ...columnSearch.status }]}
            layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px"
          />
        </>
      </BaseLayout>

      {CustomDrawer.map(({ id, Component, ...props }) => (
        <Component key={id} {...props} />
      ))}
    </>
  );
};

export default Applicant;
