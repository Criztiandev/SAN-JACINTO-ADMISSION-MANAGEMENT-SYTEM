/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, SearchBar } from "../components";
import BaseLayout from "../layouts/BaseLayout";
import { useTableContext } from "../context/TableContext";
import { useEffect } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  RenderCreateButton,
  RenderFilterButton,
  TableConfig,
  renderDrawerList,
  useDrawerOptions,
} from "../helper/Applicant.Helper";
import { updateStatusApplicant } from "../api/Applicant.Api";
import FetchLoader from "../containers/General/FetchLoader";
import { fetchAllData } from "../utils/Api.utils";
import { AxiosError } from "axios";

const Applicant = () => {
  // Drawers
  const toggleOption = useDrawerOptions();
  const { createToggle } = toggleOption;

  const { isLoading, isPending, refetch } = useQuery({
    queryFn: async () => {
      const { payload } = await fetchAllData("applicant");
      handleMutateData(payload);
      return payload;
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

    onError: (e: AxiosError | any) => {
      if (!e.response) {
        toast.error("Error: Something went wrong");
      }

      const { error } = e.response?.data as { error: string };
      toast.error(error);
    },
  });

  const {
    search,
    selected,
    handleSearch,
    setTableConfig,
    handleSelected,
    handleMutateData,
  } = useTableContext();

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
    const config = TableConfig({
      toggles: toggleOption,
      onToggle: handleToggle,
      onAccept: handleAccept,
    });

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
          <RenderCreateButton
            toggle={createToggle.toggleDrawer}
            loading={isLoading}
          />
        }>
        <div className="flex justify-between items-center">
          <SearchBar
            dir="left"
            value={search}
            onChange={handleSearch}
            disabled={isLoading || isPending}
          />

          <div className="flex gap-4">
            <RenderFilterButton loading={isLoading} />
          </div>
        </div>

        {isLoading || isPending ? (
          <FetchLoader />
        ) : (
          <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px 250px" />
        )}
      </BaseLayout>

      {renderDrawerList(selected, toggleOption)}
    </>
  );
};

export default Applicant;
