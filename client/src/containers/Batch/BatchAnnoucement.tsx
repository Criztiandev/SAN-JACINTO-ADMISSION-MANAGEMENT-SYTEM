/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import useURL from "../../hooks/useURL";
import MessageIcon from "../../assets/icons/Message_Dark.svg";
import Button from "../../components/Button";
import Typography from "../../components/Typography";

import FilterButton from "../Applicants/FilterButton";
import { useState } from "react";

const BatchAnnoucement = ({ APID }: { APID: string }) => {
  const [platform, setPlatform] = useState("Facebook");
  const [message, setMessage] = useState("");
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

  const handleSent = () => {
    console.log(`Platform: ${platform}`);
    console.log(`${message}`);
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
              {
                title: "Facebook",
                icon: "",
                onClick: () => setPlatform("Facebook"),
              },
              {
                title: "Gmail",
                icon: "",
                onClick: () => setPlatform("Gmail"),
              },
            ]}
          />
        </div>
        <div className="my-4">
          <textarea
            className="w-full h-[300px] p-4 rounded-[5px] border border-gray-400"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <Button title="Cancel" as="outlined" onClick={handleCancell} />
          <Button
            title="Annouce"
            icon={MessageIcon}
            disabled={!data?.schedule}
            onClick={handleSent}
          />
        </div>
      </main>
    </>
  );
};

export default BatchAnnoucement;
