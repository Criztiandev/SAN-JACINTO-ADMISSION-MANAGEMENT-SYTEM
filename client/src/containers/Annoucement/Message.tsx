/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useURL from "../../hooks/useURL";
import Button from "../../components/Button";
import Typography from "../../components/Typography";

import { useState } from "react";
import MessageIcon from "../../assets/icons/Message_light.svg";
import useCustomMutation from "../../hooks/useCustomMutation";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import FetchLoader from "../General/FetchLoader";

const Message = ({ APID }: { APID: string }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(`Dear`);
  const { updateURL } = useURL();

  if (!APID) {
    toast.error("There is no APID, Please Try again later");
    updateURL("/");
  }

  const {
    data,
    isPending: fetchPending,
    isError,
  } = useFetch({
    route: `/applicant/${APID}`,
    key: [`applicant-${APID}`],
    overrideFn: (data) => {
      const fullName = `${data?.personalDetails?.lastName}, ${data?.personalDetails?.firstName} ${data?.personalDetails?.middleName} ${data?.personalDetails?.suffix}`;
      setMessage(`Dear ${fullName} 👋`);
    },
  });

  const fullName = `${data?.personalDetails?.lastName}, ${data?.personalDetails?.firstName} ${data?.personalDetails?.middleName} ${data?.personalDetails?.suffix}`;

  const { mutate, isPending } = useCustomMutation({
    route: `/message/${APID}`,
    overrideFn: () => {
      updateURL("/");
      toast.success("Message Sent");
    },
  });

  const handleCancell = () => {
    updateURL(`/`);
  };

  const handleSent = () => {
    mutate({
      title: title,
      message: message,
      email: data?.personalDetails?.email,
    });
  };

  if (fetchPending || isError) return <FetchLoader />;

  return (
    <>
      <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
        <div>
          <h1>{"Message"}</h1>
        </div>
      </header>

      <main>
        <div className="flex justify-between items-center">
          <Typography as="h4" className="capitalize">
            To: {fullName}
          </Typography>
        </div>

        <div className="my-4 ">
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
          <Button title="Cancel" as="outlined" onClick={handleCancell} />
          <Button
            title="Message"
            icon={MessageIcon}
            onClick={handleSent}
            disabled={isPending}
          />
        </div>
      </main>
    </>
  );
};

export default Message;
