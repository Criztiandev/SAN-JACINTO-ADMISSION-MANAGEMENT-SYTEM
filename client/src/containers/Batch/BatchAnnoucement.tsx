/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import useURL from "../../hooks/useURL";
import MessageIcon from "../../assets/icons/Message_Dark.svg";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import Typography from "../../components/Typography";

import FilterButton from "../Applicants/FilterButton";

const BatchAnnoucement = ({ APID }: { APID: string }) => {
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: `/batch/${APID}`,
    key: ["batch"],
    option: {
      enabled: !!APID,
    },
  });

  const { data: querySchedPayload } = useFetch({
    route: `/schedule/${data?.schedule}`,
    key: ["shceduled"],
    option: {
      queryKey: ["shceduled"],
      enabled: !!data?.schedule,
    },
  });

  const handleCancell = () => {
    updateURL(`/`);
  };

  if (isError || isLoading) return <FetchLoader />;

  const currentYear = new Date().getFullYear();
  const formateDate = (date: Date | undefined) => {
    return date?.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
        <div>
          <h1>{data?.title || "Title"}</h1>
          <span>
            {data?.schedule === null
              ? "📅 Not yet specified"
              : `${formateDate(
                  new Date(querySchedPayload?.schedule?.start)
                )} - ${formateDate(
                  new Date(querySchedPayload?.schedule?.end)
                )}, ${currentYear}`}
          </span>
        </div>
      </header>

      <main>
        <div className="flex justify-between items-center">
          <Typography as="h4">Message</Typography>
          <FilterButton
            title="Platform"
            icon=""
            option={[
              { title: "Facebook", icon: "" },
              { title: "Gmail", icon: "" },
            ]}
          />
        </div>
        <div className="my-4">
          <Textarea name="annoucement" className="font-semibold h-[250px]" />
        </div>

        <div className="flex justify-end gap-4">
          <Button title="Cancel" as="outlined" onClick={handleCancell} />
          <Button
            title="Annouce"
            icon={MessageIcon}
            disabled={!data?.schedule}
          />
        </div>
      </main>
    </>
  );
};

export default BatchAnnoucement;
