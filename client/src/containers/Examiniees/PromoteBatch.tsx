/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../../components/Typography";
import useFetch from "../../hooks/useFetch";
import useURL from "../../hooks/useURL";
import { Form, Formik } from "formik";
import EmptyCard from "../Common/EmptyCard";
import PromoteCard from "./PromoteCard";
import Button from "../../components/Button";
import useFormSubmit from "../../hooks/useFormSubmit";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import IconButton from "../../components/IconButton";
import { useState } from "react";
import ExpandDownIcon from "../../assets/icons/Expand_down_light.svg";
import ExpandUp from "../../assets/icons/Expand_up_light.svg";
import { toast } from "react-toastify";
import Select from "../../components/Select";

const PromoteBatch = () => {
  const [hide, setHide] = useState(true);
  const { updateURL } = useURL();
  const { data } = useFetch({
    route: "/examiniees?status=finished",
    key: ["promite-examinies"],
  });

  const { handleSubmit, isPending } = useFormSubmit({
    route: "/examiniees/batch/promote",
    overideFn() {
      updateURL("refetch=true");
      toast.success("Batch Examiniees Promoted Successfully");
    },
  });

  return (
    <Formik
      initialValues={{
        title: "[SJNHS] ",
        message: "",
        selected: [],
        track: "",
      }}
      onSubmit={handleSubmit}>
      <Form className="">
        <header className="pb-4 mb-4 border-b border-gray-400 flex justify-between items-start">
          <div>
            <h1>Bulk Promote</h1>
          </div>

          <div className="flex gap-4">
            <Button type="submit" title="Promote" disabled={isPending} />
          </div>
        </header>

        <main>
          <div className="my-4 ">
            <div className="flex justify-between items-center mb-4">
              <h4>Details</h4>
              <IconButton
                as={hide ? "contained" : "outlined"}
                onClick={() => setHide((prev) => !prev)}
                icon={hide ? ExpandUp : ExpandDownIcon}
              />
            </div>
            {hide && (
              <div>
                <div className="flex justify-end">
                  <Select
                    name="track"
                    className="rounded-full p-4 py-3 border-gray-400 border">
                    <option value="">Track</option>
                    <option value="Regular">Regular</option>
                    <option value="STE">STE</option>
                    <option value="SPJ">SPJ</option>
                    <option value="STEM">STEM</option>
                  </Select>
                </div>
                <Input
                  label="Title"
                  name="title"
                  placeholder="Enter Message Title"
                />

                <Textarea
                  label="Message"
                  name="message"
                  placeholder="Enter your Message"
                  className="h-[250px]"
                />
              </div>
            )}
          </div>

          <Typography as="h4" className="mb-4 pb-2 border-b border-gray-300">
            Examiniees
          </Typography>

          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto h-full">
            {data?.length <= 0 ? (
              <EmptyCard title="No Exminees yet!!" />
            ) : (
              data?.map((props: any) => {
                return (
                  <PromoteCard
                    key={props._id}
                    name={props?.fullName}
                    status={props?.status}
                    track={props?.track}
                    {...props}
                  />
                );
              })
            )}
          </div>
        </main>
      </Form>
    </Formik>
  );
};

export default PromoteBatch;
