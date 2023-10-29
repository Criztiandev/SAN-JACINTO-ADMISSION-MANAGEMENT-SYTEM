import { useTableContext } from "../../context/TableContext";
import { useEffect } from "react";
import { TableConfig } from "../../helper/Applicant.Helper";
import { Table } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicants } from "../../api/Applicant.Api";
import { toast } from "react-toastify";

const SummaryTable = () => {
  const layout = "350px 150px 150px 100px 150px 100px 250px 200px 100px 150px";
  const { setTableConfig, handleMutateData } = useTableContext();
  const { isError } = useQuery({
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
      handleMutateData([]);
      setTableConfig([]);
    };
  }, []);

  if (isError) {
    toast.error("Something Went Wrong");
  }

  return <Table layout={layout} />;
};

export default SummaryTable;
