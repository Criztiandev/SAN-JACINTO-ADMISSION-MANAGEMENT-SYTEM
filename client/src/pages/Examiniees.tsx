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
import ViewApplicant from "../containers/Applicants/ViewApplicant";
import PromoteBatch from "../containers/Examiniees/PromoteBatch";
import useURL from "../hooks/useURL";
import { useEffect } from "react";

const Examiniees = () => {
  const { search, handleSearch, handleMutateData } = useTableContext();
  const { updateURL, queryParams } = useURL();

  const isRefetch = queryParams.get("refetch");

  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/examiniees",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  useEffect(() => {
    if (isRefetch) {
      refetch();
      updateURL("/");
    }
  }, [isRefetch]);

  if (isLoading || isPending || !isFetched) return <TablePanelSkeleton />;

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: "Name",
      accessorKey: "fullName",
      cell: ({ row, getValue }) => {
        const { original } = row;

        console.log(original);
        return (
          <FirstColumn
            UID={original?._id}
            gender={original?.personalDetails?.gender}
            value={getValue()}
          />
        );
      },
    },
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
      <BaseLayout title="Examiniees">
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
          layout="320px 250px 200px 200px 200px auto "
        />
      </BaseLayout>

      <DrawerWrapper state="view" Component={ViewExaminiee} />
      <DrawerWrapper state="viewApp" Component={ViewApplicant} />
      <DrawerWrapper state="promote" Component={PromoteBatch} />
    </>
  );
};

export default Examiniees;
