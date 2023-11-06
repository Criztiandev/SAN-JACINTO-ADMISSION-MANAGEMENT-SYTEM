/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, SearchBar } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import CreateApplicantIcon from "../assets/icons/Create Applicant.svg";
import { useTableContext } from "../context/TableContext";
import { useEffect } from "react";

import { DrawerListProps } from "../interface/Drawer.Types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  DrawerLists,
  GradeOptions,
  StatusItems,
  TableConfig,
} from "../helper/Applicant.Helper";
import { updateStatusApplicant } from "../api/Applicant.Api";
import FetchLoader from "../containers/General/FetchLoader";
import { FilterIcon } from "../assets/icons";
import { fetchAllData } from "../utils/Api.utils";
import { FilterButton } from "../containers/Applicants";
import { useDrawer } from "../hooks";

const Applicant = () => {
  // Drawers
  const viewToggle = useDrawer();
  const createToggle = useDrawer();
  const updateToggle = useDrawer();
  const deleteToggle = useDrawer();
  const messageToggle = useDrawer();

  const { isLoading, isError, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await fetchAllData("applicant");
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
            type="button"
            dir="left"
            title="Create"
            icon={CreateApplicantIcon}
            onClick={createToggle.toggleDrawer}
            disabled={true}
          />
        }>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={true}
          />

          <div className="flex gap-4">
            <FilterButton
              icon={FilterIcon}
              title="Grade"
              option={GradeOptions}
              disabled={true}
            />
            <FilterButton
              icon={FilterIcon}
              title="Status"
              option={StatusItems}
              disabled={true}
            />
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
