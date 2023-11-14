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

const BatchTable = () => {
  const { handleMutateData } = useTableContext();

  const { isLoading, isPending, isFetched } = useFetch({
    route: "/applicant",
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

  if (isPending || isLoading || !isFetched) return <FetchLoader />;

  return (
    <Table
      config={ApplicantTableConfig}
      layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
    />
  );
};

export default BatchTable;
