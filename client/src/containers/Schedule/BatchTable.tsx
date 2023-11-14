/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ColumnDef } from "@tanstack/react-table";
import { useTableContext } from "../../context/TableContext";

import FetchLoader from "../General/FetchLoader";
import Table from "../../components/Table";
import Badge from "../../components/Badge";

import TitleHeader from "../Table/TitleHeader";
import FirstColumn from "../Table/FirstColumn";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button";
import DrawerWrapper from "../Drawers/DrawerWrapper";
import useURL from "../../hooks/useURL";
import CreateBatch from "./CreateBatch";

const BatchTable = () => {
  const { handleMutateData } = useTableContext();
  const { updateURL } = useURL();
  const { isLoading, isPending, isFetched } = useFetch({
    route: "/batch",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  const ApplicantTableConfig: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: ({ table }) => <TitleHeader data={table} />,
      accessorFn: ({ personalDetails }) =>
        `${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName}`,
      cell: ({ row, getValue }) => (
        <FirstColumn data={row} value={getValue()} />
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
  ];

  const handleCreateBatch = () => {
    updateURL(`state=create`);
  };

  if (isPending || isLoading || !isFetched)
    return (
      <div className="h-full border">
        <FetchLoader />
      </div>
    );

  return (
    <>
      <div className="h-full">
        <div className="flex justify-end mb-4">
          <Button title="Create" onClick={handleCreateBatch} />
        </div>
        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
        />
      </div>
      <DrawerWrapper state="create" Component={CreateBatch} />
    </>
  );
};

export default BatchTable;
