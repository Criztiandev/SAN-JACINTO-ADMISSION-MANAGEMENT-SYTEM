/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, SearchBar, Loading, IconButton } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import { useTableContext } from "../context/TableContext";
import { useEffect, MouseEvent } from "react";

import { DrawerListProps } from "../interface/Drawer.Types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  GradeFilterButton,
  StatusFilterButton,
  MoreOptionButton,
} from "../containers/Applicants";

import { DrawerLists, TableConfig } from "../helper/Applicant.Helper";
import useDrawer from "../hooks/useDrawer";
import { fetchApplicants, updateStatusApplicant } from "../api/Applicant.Api";
import FetchLoader from "../containers/General/FetchLoader";
import FilterButton from "../containers/Applicants/FilterButton";

const Applicant = () => {
  // Drawers
  const viewToggle = useDrawer();
  const createToggle = useDrawer();
  const updateToggle = useDrawer();
  const deleteToggle = useDrawer();
  const messageToggle = useDrawer();

  const { isLoading, isError, error, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await fetchApplicants();
      handleMutateData(data.payload);
      return data;
    },
    queryKey: ["applicants"],
  });

  const acceptApplicant = useMutation({
    mutationFn: async ({ APID, value }: any) => {
      return updateStatusApplicant(APID, value);
    },
    onSuccess: () => {
      toast.success("Applicant is Accepted Successfully");
    },

    onError: () => {
      toast.error("Failed, Please Try Again");
    },
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

  const toggleOptions = {
    viewToggle,
    createToggle,
    updateToggle,
    deleteToggle,
    messageToggle,
  };

  const handleToggle = (data: object | string, toggle = () => {}) => {
    handleSelected(data);
    toggle();
  };

  const handleAccept = async (id: string, status: string) => {
    await acceptApplicant.mutateAsync({ APID: id, value: status });
    refetch();
  };

  // Setting up the Table Config
  useEffect(() => {
    const config = TableConfig(toggleOptions, handleToggle, handleAccept);
    if (!config) throw new Error("No Config");
    setTableConfig(config);

    return () => {
      setTableConfig([]);
    };
  }, []);

  return (
    <>
      <BaseLayout
        title="Applicants"
        actions={
          <Button
            dir="left"
            title="Create"
            icon={CreateApplicantIcon}
            onClick={createToggle.toggleDrawer}
          />
        }>
        <div className="flex justify-between items-center">
          <SearchBar value={search} onChange={handleSearch} disabled={true} />

          <div className="flex gap-4">
            <FilterButton title="Grade" />
            <FilterButton title="Status" />
            <IconButton />
            {/* <GradeFilterButton
              title="Grade"
              onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                handleColumnSearch({
                  id: "studentDetails.yearLevel",
                  value: e.currentTarget.value,
                })
              }
            /> */}
            <StatusFilterButton
              title="Filter"
              onSelect={(e: MouseEvent<HTMLButtonElement>) =>
                handleColumnSearch({
                  id: "status",
                  value: e.currentTarget.value,
                })
              }
            />
            <MoreOptionButton />
          </div>
        </div>

        {isError || isLoading ? (
          <FetchLoader />
        ) : (
          <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 200px" />
        )}
      </BaseLayout>

      {DrawerLists(selected, toggleOptions).map(
        ({ id, Component, state, ...props }: DrawerListProps) =>
          state ? <Component key={id} state={state} {...props} /> : null
      )}
    </>
  );
};

export default Applicant;
