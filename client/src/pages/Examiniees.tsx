/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Project Components
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";

// Context and Helpers
import { useTableContext } from "../context/TableContext";
import useFetch from "../hooks/useFetch";

// React Table
import { ColumnDef } from "@tanstack/react-table";

import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";

// Applicant Components

import DrawerWrapper from "../containers/Drawers/DrawerWrapper";

// Assets

import Button from "../components/Button";
import PromoteExaminiees from "../containers/Examiniees/PromoteExaminiees";
import useURL from "../hooks/useURL";
import FirstColumn from "../containers/Table/FirstColumn";
import TitleHeader from "../containers/Table/TitleHeader";

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

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: ({ table }) => <TitleHeader data={table} />,
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
      accessorFn: ({ examDate }) => {
        console.log(examDate);
        return examDate === null ? "📅 Not Yet Specified" : examDate;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        return (
          <div className="px-4 py-2 border rounded-full capitalize bg-[#FFEE7D]">
            {getValue()}
          </div>
        );
      },
    },
  ];

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

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
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="320px 100px 250px 200px 200px 200px 150px "
        />
      </BaseLayout>

      <DrawerWrapper state="view" Component={PromoteExaminiees} />
      <DrawerWrapper state="promote" Component={PromoteExaminiees} />
    </>
  );
};

export default Examiniees;
