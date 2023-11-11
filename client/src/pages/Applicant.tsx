/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import BaseLayout from "../layouts/BaseLayout";
import { Table, SearchBar, Badge, IconButton } from "../components";

import { useTableContext } from "../context/TableContext";
import {
  RenderCreateButton,
  RenderFilterButton,
} from "../helper/Applicant.Helper";
import useFetch from "../hooks/useFetch";
import { ColumnDef } from "@tanstack/react-table";
import TitleHeader from "../containers/Table/TitleHeader";
import ApplicantActionColumn from "../containers/Applicants/ApplicantActionColumn";
import FirstColumn from "../containers/Table/FirstColumn";
import TablePanelSkeleton from "../containers/Skeleton/ApplicantSkeleton";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleAxiosError } from "../utils/Api.utils";
import ApplicantDrawer from "../containers/Applicants/ApplicantDrawer";
import ViewApplicant from "../containers/Applicants/ViewApplicant";
import EditApplicant from "../containers/Applicants/EditApplicant";
import MessageApplicant from "../containers/Applicants/MessageApplicant";
import ArchieveApplicant from "../containers/Applicants/ArchieveApplicant";
import CreateApplicant from "../containers/Applicants/CreateApplicant";
import ArchieveIcon from "../assets/icons/Arhive_light.svg";
import { useNavigate } from "react-router-dom";

const Applicant = () => {
  const { handleSearch, handleMutateData } = useTableContext();
  const navigate = useNavigate();

  const { isLoading, isPending, isFetched, refetch } = useFetch({
    route: "/applicant",
    overrideFn: handleMutateData,
    key: ["applicants"],
  });

  // mutation
  const { mutateAsync } = useMutation({
    mutationFn: ({ UID, status }: { UID: string; status: string }) => {
      return axios.put(`${import.meta.env.VITE_SERVER_URL}/applicant/${UID}`, {
        status,
      });
    },

    onSuccess: () => {
      toast.success("Applicant Accepted Successfully");
      refetch();
    },

    onError: (e: AxiosError) => {
      handleAxiosError(e);
    },
  });

  const handleAction = async (id: string, currentStatus: string) => {
    void mutateAsync({ UID: id, status: currentStatus });
  };

  if (isLoading || isPending || isFetched) return <TablePanelSkeleton />;

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
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <ApplicantActionColumn data={row.original} onAction={handleAction} />
        );
      },
    },
  ];

  return (
    <>
      <BaseLayout
        title="Applicants"
        actions={
          <RenderCreateButton
            toggle={() => {}}
            loading={isLoading || isPending}
          />
        }>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={""}
            onChange={handleSearch}
            disabled={isPending}
          />

          <div className="flex justify-between gap-4">
            <RenderFilterButton loading={isPending} />
            <IconButton
              as="outlined"
              icon={ArchieveIcon}
              onClick={() => navigate("/applicant/archieve")}
            />
          </div>
        </div>

        <Table
          config={ApplicantTableConfig}
          layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px"
        />
      </BaseLayout>

      <ApplicantDrawer pref="create" Component={CreateApplicant} />
      <ApplicantDrawer pref="view" Component={ViewApplicant} />
      <ApplicantDrawer pref="edit" Component={EditApplicant} />
      <ApplicantDrawer pref="archieve" Component={ArchieveApplicant} />
      <ApplicantDrawer pref="message" Component={MessageApplicant} />
    </>
  );
};

export default Applicant;
