import { useTableContext } from "../../context/TableContext";
import { useEffect } from "react";
import ApplicantData from "../../data/applicantData.json";
import { TableConfig } from "../../helper/Applicant.Helper";
import { Table } from "../../components";

interface SummaryTableConfigProps {
  layout: string;
}

const SummaryTable = ({ layout }: SummaryTableConfigProps) => {
  const { setTableConfig, handleMutateData } = useTableContext();
  useEffect(() => {
    handleMutateData(ApplicantData);

    const config = TableConfig({
      toggles: {},
      onAccept: () => {},
      onToggle: () => {
        alert("Please Go to the Applicant Table");
      },
      action: true,
    });
    if (!config) throw new Error("No Config");
    setTableConfig(config);

    return () => {
      setTableConfig([]);
    };
  }, []);

  return <Table layout={layout} />;
};

export default SummaryTable;
