/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const ArchieveApplicant = ({ APID }: { APID: string }) => {
  const navigate = useNavigate();

  const { data, isLoading, isPending } = useFetch({
    route: `/applicant/${APID}`,
    key: ["applicantss"],
  });

  const handleArchieve = () => {};

  const handleCancel = () => {
    navigate("/applicants");
  };

  if (isLoading || isPending) return <FetchLoader />;

  const { personalDetails } = data;

  return (
    <section className="grid grid-rows-[72px_auto_64px] gap-4 h-full">
      <header className="border-b border-gray-300 pb-4">
        <h3>Archieve Applicant</h3>
        <span>Archieve this Applicant hold all the applicnt</span>
      </header>

      <main style={{ lineHeight: "1.8" }}>
        Are you absolutely certain you want to proceed with deleting{" "}
        <span className="font-bold border-b border-gray-600">
          {personalDetails.lastName}, {personalDetails.firstName}{" "}
          {personalDetails.middleName[0]}. {personalDetails.suffix}
        </span>
        's data? Deleting data is an irreversible action and can lead to
        permanent loss of information. Please take a moment to consider the
        potential consequences before confirming this action. If you proceed,
        the data will be removed from the system, and any associated records or
        references may be lost.
      </main>

      <footer className="flex justify-end items-center gap-4">
        <Button
          as="outlined"
          type="button"
          title="Cancel"
          icon=""
          onClick={handleCancel}
        />
        <Button
          as="contained"
          icon=""
          title="Delete"
          onClick={handleArchieve}
        />
      </footer>
    </section>
  );
};

export default ArchieveApplicant;
