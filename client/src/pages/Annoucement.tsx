/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, SearchBar, Badge, IconButton } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import MoreOption from "../containers/Applicants/MoreOption";
import { useTableContext } from "../context/TableContext";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import TitleHeader from "../containers/Table/TitleHeader";
import FirstColumn from "../containers/Table/FirstColumn";
import { handleAccept, handleToggleDrawer } from "../utils/Table.utils";
import ActionColumn from "../containers/Applicants/ActionColumn";
import { useDrawerContext } from "../context/DrawerContext";
import ViewDrawer from "../containers/Applicants/ViewDrawer";
import MessageDrawer from "../containers/Applicants/MessageDrawer";
import { DrawerListProps } from "../interface/Drawer.Types";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import StatusFilter from "../containers/Applicants/StatusFilter";
import GradeFilter from "../containers/Applicants/GradeFilter";

import {
  CreateApplicantDrawer,
  ViewApplicantDrawer,
  UpdateApplicantDrawer,
  DeleteApplicantDrawer,
  MessageApplicantDrawer,
} from "../containers/Applicants";

const DrawerLists = (selected, options) => {
  const { viewToggle, createToggle, editToggle, messageToggle, deleteToggle } =
    options;

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
      state: editToggle.active,
      onClose: editToggle.toggleDrawer,
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

const Annoucement = () => {
  const { isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/api/applicant");
      handleMutateData(data.payload);
      return data;
    },
    queryKey: ["applicants"],
  });

  const {
    tableData,
    search,
    selected,
    handleSearch,
    handleSelected,
    handleColumnSearch,
    setTableConfig,
    handleMutateData,
  } = useTableContext();

  // Drawer Context
  const {
    createToggle,
    deleteToggle,
    viewToggle,
    messageToggle,
    editToggle,
    holdToggle,
  } = useDrawerContext();

  const handleToggle = (data: object | string, toggle = () => {}) => {
    handleSelected(data);
    toggle();
  };

  const TableConfig: ColumnDef<any, any>[] = [
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
            handleToggle(row.original._id, viewToggle.toggleDrawer)
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
            onAccept={() => handleAccept(UID)}
            onDelete={() =>
              handleToggle(row.original._id, deleteToggle.toggleDrawer)
            }
            onEdit={() =>
              handleToggle(row.original._id, editToggle.toggleDrawer)
            }
            onHold={() =>
              handleToggle(row.original._id, holdToggle.toggleDrawer)
            }
            onMessage={() =>
              handleToggleDrawer(row.original._id, messageToggle.toggleDrawer)
            }
          />
        );
      },
    },
  ];

  // Setting up the Table Config
  useEffect(() => {
    if (!TableConfig) throw new Error("No Config");
    setTableConfig(TableConfig);

    return () => {
      setTableConfig([]);
    };
  }, []);

  // Checking if there us an error
  if (isError) toast.error(error.message);
  if (isLoading) return <Loading />;

  return (
    <>
      <BaseLayout
        title="Annoucement"
        header={
          <>
            <IconButton />

            <Button
              dir="left"
              title="Create"
              icon={CreateApplicantIcon}
              onClick={createToggle.toggleDrawer}
            />
          </>
        }
        action>
        {tableData.length > 0 ? (
          <div className="flex justify-between items-center">
            <SearchBar value={search} onChange={handleSearch} />

            <div className="flex gap-4">
              <GradeFilter
                title="Grade"
                onSelect={e =>
                  handleColumnSearch({
                    id: "studentDetails.yearLevel",
                    value: e.currentTarget.value,
                  })
                }
              />
              <StatusFilter
                title="Filter"
                onSelect={e =>
                  handleColumnSearch({
                    id: "status",
                    value: e.currentTarget.value,
                  })
                }
              />
              <MoreOption />
            </div>
          </div>
        ) : (
          <span></span>
        )}
        <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px" />
      </BaseLayout>

      {DrawerLists(selected, {
        viewToggle,
        createToggle,
        editToggle,
        messageToggle,
        deleteToggle,
      }).map(({ id, Component, state, ...props }: DrawerListProps) => (
        <Component key={id} state={state} {...props} />
      ))}
    </>
  );
};

export default Annoucement;
