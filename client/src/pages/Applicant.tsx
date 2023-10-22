/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, SearchBar, Badge } from "../components";
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
import CreateDrawer from "../containers/Applicants/CreateDrawer";
import DeleteDrawer from "../containers/Applicants/DeleteDrawer";
import MessageDrawer from "../containers/Applicants/MessageDrawer";
import EditDrawer from "../containers/Applicants/EditDrawer";
import { DrawerListProps } from "../interface/Drawer.Types";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicants } from "../api/applicant.api";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const Applicant = () => {
  const { isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/api/applicant");
      handleMutateData(data);
      return data;
    },
    queryKey: ["applicants"],
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });

  const {
    tableData,
    search,
    selected,
    handleSearch,
    handleSelected,
    setTableConfig,
    handleMutateData,
  } = useTableContext();
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
      accessorFn: ({ yearLevel }) => ` ${yearLevel}`,
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

  const DrawerLists: DrawerListProps[] = [
    {
      id: "0",
      Component: ViewDrawer,
      data: selected,
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
      data: selected,
      state: editToggle.active,
      onClose: editToggle.toggleDrawer,
    },

    {
      id: "3",
      Component: MessageDrawer,
      data: selected,
      state: messageToggle.active,
      onClose: messageToggle.toggleDrawer,
    },

    {
      id: "4",
      Component: DeleteDrawer,
      data: selected,
      state: deleteToggle.active,
      onClose: deleteToggle.toggleDrawer,
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

  // Storing the Data to the Table data

  // Checking if there us an error
  if (isError) toast.error(error.message);
  if (isLoading) return <Loading />;

  return (
    <>
      <BaseLayout
        title="Applicants"
        header={
          tableData.length > 0 && (
            <Button
              dir="left"
              title="Create"
              icon={CreateApplicantIcon}
              onClick={createToggle.toggleDrawer}
            />
          )
        }
        action>
        <>
          <div className="flex justify-between items-center">
            <SearchBar value={search} onChange={handleSearch} />

            <div className="flex gap-4">
              {/* // Status Filter */}
              {/* <StatusFilter
                onTitleUpdate={() => {}}
                onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                  handleColumnSearch({
                    status: { id: "status", value: e.currentTarget.value },
                  })
                }
              /> */}

              <MoreOption />
            </div>
          </div>
          <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px" />
        </>
      </BaseLayout>

      {DrawerLists.map(
        ({ id, Component, state, ...props }: DrawerListProps) => (
          <Component key={id} state={state} {...props} />
        )
      )}
    </>
  );
};

export default Applicant;
