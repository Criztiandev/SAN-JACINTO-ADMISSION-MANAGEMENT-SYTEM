/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import useURL from "../../hooks/useURL";
import MessageIcon from "../../assets/icons/Message_light.svg";
import Button from "../../components/Button";
import Typography from "../../components/Typography";

import { useState } from "react";
import useCustomMutation from "../../hooks/useCustomMutation";
import { toast } from "react-toastify";

const BatchAnnoucement = ({ APID }: { APID: string }) => {
  const [title, setTitle] = useState("[SJNHS] ");
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

  const { mutate, isPending } = useCustomMutation({
    route: `/message/annoucement/${APID}`,
    overrideFn: () => {
      toast.success("Message Sent Successfully");
      updateURL("/");
    },
  });

  const handleCancel = () => {
    updateURL(`/`);
  };

  const handleSent = () => {
    mutate({ title, message, applicants: data?.selected });
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
          <Button title="Gmail" as="contained" icon={MessageIcon} />
        </div>
        <div className="my-2">
          <label>
            <h5 className="mb-2">Title</h5>
            <input
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.currentTarget.value)}
              className="border border-gray-400 w-full rounded-[5px] px-4 py-3"
            />
          </label>
        </div>
        <div className="my-4">
          <textarea
            className="w-full h-[300px] p-4 rounded-[5px] border border-gray-400"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <Button title="Cancel" as="outlined" onClick={handleCancel} />
          <Button
            title="Annouce"
            icon={MessageIcon}
            disabled={!data?.schedule || isPending}
            onClick={handleSent}
          />
        </div>
      </main>
    </>
  );
};

export default BatchAnnoucement;
