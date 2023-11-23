/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import EditIcon from "../../assets/icons/Edit_light.svg";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Typography from "../../components/Typography";
import BatchCard from "./BatchCard";
import FetchLoader from "../General/FetchLoader";
import useFormSubmit from "../../hooks/useFormSubmit";
import { scheduleSchema } from "../../schema/schedule.Schema";
import TrashIcon from "../../assets/icons/Delete.svg";
import useURL from "../../hooks/useURL";
import useCustomMutation from "../../hooks/useCustomMutation";
import { toast } from "react-toastify";

const ViewCalendar = ({ APID }: { APID: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateURL, baseRoute } = useURL();

  const { data, isFetching, refetch } = useFetch({
    route: `${baseRoute}/${APID}`,
    key: ["schedule"],
  });

  const { handleSubmit, isSuccess } = useFormSubmit({
    route: `${baseRoute}/${APID}`,
    type: "put",
  });

  const finishSchedule = useCustomMutation({
    route: `${baseRoute}/finish/${APID}`,
    overrideFn: () => {
      toast.success("Schedule is Finished");
    },
    type: "post",
  });

  const deleteMutation = useCustomMutation({
    route: `${baseRoute}/force/${APID}`,
    overrideFn: () => {
      updateURL("refetch=true");
    },
    type: "delete",
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setIsEdit(false);
    }
  }, [isSuccess]);

  const handleFinishSchedule = () => {
    finishSchedule.mutate({ _id: APID, status: "Finished" });
    deleteMutation.mutate({});
  };

  const handleDeleteSchedule = () => {
    updateURL(`state=delete&APID=${APID}`);
  };

  if (isFetching) return <FetchLoader />;

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={scheduleSchema}>
      <Form>
        <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
          <div className="flex flex-col">
            <RenderTitle title={data?.title} active={isEdit} />
            <RenderSubtitle data={data} active={!isEdit} />
          </div>

          <div className="flex gap-2">
            <IconButton
              as="outlined"
              icon={EditIcon}
              onClick={() => setIsEdit((prev) => !prev)}
              className={`p-2 border border-gray-400 rounded-full  ${
                isEdit ? "border-green-500 bg-[#22f86275]" : ""
              }`}
            />

            <IconButton
              as="outlined"
              icon={TrashIcon}
              onClick={handleDeleteSchedule}
              className={`p-2 border border-gray-400 rounded-full `}
            />
          </div>
        </header>

        <main className="flex flex-col gap-8">
          {isEdit && (
            <section className="mt-2">
              <Typography
                as="h4"
                className="pb-2 border-b border-gray-300 mb-4">
                Details
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Facilitator"
                  name="facilitator"
                  placeholder="Enter Facilitators"
                />
                <Input label="Venue" name="venue" placeholder="Enter Venue" />
              </div>
            </section>
          )}

          <section className="cursor-pointer">
            <Typography as="h4" className="pb-2 border-b border-gray-300 mb-4">
              Batches
            </Typography>

            <div className="max-h-[350px] overflow-y-auto pr-4">
              {data?.batches?.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 ">
                  {data?.batches?.map((props: any) => {
                    return (
                      <BatchCard
                        key={props.title}
                        examiniees={props?.selected?.length}
                        {...props}
                        schedule={"Settled"}
                        disabled={true}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full border rounded-[5px] p-4 bg-gray-200 h-[150px] text-bold flex justify-center items-center font-bold text-[28px] ">
                  No Batch Available
                </div>
              )}
            </div>
          </section>

          <section>
            <Typography as="h4" className="pb-2 border-b border-gray-400 mb-4">
              Schedule
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start" name="schedule.start" disabled={true} />
              <Input label="End" name="schedule.end" disabled={true} />
            </div>
          </section>

          <section>
            <Typography as="h4" className="pb-2 border-b border-gray-400 mb-4">
              Time
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="time"
                label="Start"
                name="time.start"
                placeholder="Enter Time"
                disabled={!isEdit}
              />
              <Input
                type="time"
                label="End"
                name="time.end"
                placeholder="Enter End Time"
                disabled={!isEdit}
              />
            </div>
          </section>

          <section>
            <Textarea
              label="Details"
              name="details"
              placeholder="Enter the details of this schedule"
              className="h-[250px]"
              disabled={!isEdit}
            />
          </section>
        </main>

        <footer className="flex gap-4 justify-end mt-4">
          {isEdit ? (
            <Button type="submit" as="contained" title="Submit" />
          ) : (
            <div className="flex gap-4">
              <Button
                type="button"
                as="contained"
                title="Finish"
                onClick={handleFinishSchedule}
              />
            </div>
          )}
        </footer>
      </Form>
    </Formik>
  );
};

export default ViewCalendar;

const RenderTitle = ({ title, active }: { title: string; active: boolean }) => {
  return active ? (
    <Field
      name="title"
      className="border rounded-[5px] border-gray-400 text-black px-2 text-[30px] font-bold"
    />
  ) : (
    <h2 className="font-bold">{title}</h2>
  );
};

const RenderSubtitle = ({ data, active }: { data: any; active: boolean }) => {
  return (
    <>
      {active && (
        <div className="flex items-center gap-2 text-gray-400 my-2">
          <span className="">{data?.facilitator}</span>
          <span>||</span>
          <span className="">{data?.venue}</span>
        </div>
      )}
    </>
  );
};
