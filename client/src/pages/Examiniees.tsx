/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";

// Context and Helpers
import useFetch from "../hooks/useFetch";
import { useTableContext } from "../context/TableContext";
import { ColumnDef } from "@tanstack/react-table";

import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ViewExaminiee from "../containers/Examiniees/ViewExaminiee";
import GridIcon from "../assets/icons/Group.svg";
// Assets
import Button from "../components/Button";
import useURL from "../hooks/useURL";
import IconButton from "../components/IconButton";

const Examiniees = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { updateURL } = useURL();
  const { isLoading, isPending, isFetched } = useFetch({
    route: "/examiniees",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  const handleToggleUpdate = () => {
    updateURL("state=promote");
  };

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: "Name",
      accessorKey: "fullName",
      cell: ({ row, getValue }) => {
        const { original } = row;
        return (
          <FirstColumn
            UID={original?._id}
            gender={original?.gender}
            value={getValue()}
          />
        );
      },
    },
    { header: "Score", accessorKey: "score" },
    { header: "Track", accessorKey: "track" },
    { header: "Email", accessorKey: "email" },
    { header: "Contact", accessorKey: "contact" },
    {
      header: "Schedule",
      accessorKey: "schedule",
      accessorFn: ({ schedule }) => {
        return schedule === null ? "📅 Not Yet Specified" : schedule;
      },
    },
    {
      id: "action",
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        return (
          <div
            className={`px-4 py-2 border rounded-full capitalize text-black font-semibold ${
              getValue() === "finished"
                ? "bg-green-400 "
                : getValue() === "pending"
                ? "bg-[#FFEE7D]"
                : "bg-orange-400"
            }`}>
            {getValue()}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseLayout
        title="Examiniees"
        actions={<Button title="Promite" onClick={handleToggleUpdate} />}>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={isPending}
          />

          <div>
            <IconButton icon={GridIcon} />
          </div>
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="320px 100px 250px 200px 200px 200px 150px "
        />
      </BaseLayout>

      <DrawerWrapper state="view" Component={ViewExaminiee} />
    </>
  );
};

export default Examiniees;
