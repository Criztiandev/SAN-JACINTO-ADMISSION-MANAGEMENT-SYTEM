/* eslint-disable react-hooks/exhaustive-deps */
import { useTableContext } from "../../context/TableContext";
import { useEffect } from "react";
import { TableConfig } from "../../helper/Applicant.Helper";
import { Table } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicants } from "../../api/Applicant.Api";
import FetchLoader from "../General/FetchLoader";

const SummaryTable = () => {
  const { setTableConfig, handleMutateData } = useTableContext();

  const { isError, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await fetchApplicants();
      handleMutateData(data.payload);
      return data;
    },
    queryKey: ["applicants"],
  });

  useEffect(() => {
    const config = TableConfig({
      toggles: {},
      onAccept: () => {},
      onToggle: () => {},
      action: true,
    });
    if (!config) throw new Error("No Config");
    setTableConfig(config);

    return () => {
      setTableConfig([]);
    };
  }, []);

  if (isError || isLoading) return <FetchLoader />;

  return (
    <Table layout="350px 150px 150px 100px 150px 100px 250px 200px 100px 150px" />
  );
};

export default SummaryTable;
