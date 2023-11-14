import useURL from "../../hooks/useURL";
import Input from "../../components/Input";
import { Formik, Form } from "formik";
import { scheduleInitialValue } from "../../models/scheduleModel";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import BatchCard from "./BatchCard";
import Textarea from "../../components/Textarea";
import { scheduleSchema } from "../../schema/schedule.Schema";
import useFormSubmit from "../../hooks/useFormSubmit";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";

const CreateCalendar = () => {
  const { queryParams, baseRoute, reload } = useURL();
  const start = queryParams.get("start");
  const end = queryParams.get("end");

  const { data, isFetched, isError } = useFetch({
    route: "/batch",
    key: ["batches"],
  });

  const { handleSubmit } = useFormSubmit({
    route: `${baseRoute}/create`,
    redirect: `${baseRoute}`,
    overideFn: reload,
    type: "post",
  });

  if (!isFetched || isError) return <FetchLoader />;

  return (
    <div>
      <header className="pb-4 mb-4 border-b border-gray-400">
        <h1>Create Scheule</h1>
        <span>You can create event to this form</span>
      </header>

      <main>
        <Formik
          initialValues={{
            schedule: {
              start: start,
              end: end,
            },
            ...scheduleInitialValue,
          }}
          onSubmit={handleSubmit}
          validationSchema={scheduleSchema}>
          <Form className="flex flex-col gap-4">
            <section className="grid grid-cols-2 gap-4">
              <Input
                label="Title"
                name="title"
                placeholder="Enter Event Title"
              />
              <Input
                label="Facilitator"
                name="facilitator"
                placeholder="Enter Facilitators"
              />
              <Input label="Venue" name="venue" placeholder="Enter Venue" />
            </section>

            <section className="cursor-pointer">
              <Typography
                as="h4"
                className="pb-2 border-b border-gray-200 mb-4">
                Batches
              </Typography>

              <div className="max-h-[350px] overflow-y-auto pr-4">
                {data?.length <= 0 ? (
                  <div className="w-full border h-[200px] bg-gray-400 rounded-[5px] flex justify-center items-center font-bold text-[32px]">
                    No Batch Available
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 ">
                    <BatchCard
                      UID="123123123"
                      title="Batch 1"
                      description="sdfsdfsdfsdfsdfsdf"
                    />
                    <BatchCard
                      UID="123123122222323233"
                      title="Batch 2"
                      description="asdasdadasd"
                    />
                  </div>
                )}
              </div>
            </section>

            <section>
              <Typography
                as="h4"
                className="pb-2 border-b border-gray-400 mb-4">
                Schedule
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start" name="schedule.start" disabled={true} />
                <Input label="End" name="schedule.start" disabled={true} />
              </div>
            </section>

            <section>
              <Typography
                as="h4"
                className="pb-2 border-b border-gray-400 mb-4">
                Time
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="time"
                  label="Start"
                  name="time.start"
                  placeholder="Enter Time"
                />
                <Input
                  type="time"
                  label="End"
                  name="time.end"
                  placeholder="Enter End Time"
                />
              </div>
            </section>

            <section>
              <Textarea
                label="Details"
                name="details"
                placeholder="Enter the details of this schedule"
                className="h-[250px]"
              />
            </section>
            <section className="flex justify-end gap-4">
              <Button
                type="submit"
                title="Submit"
                disabled={data?.length <= 0 && true}
              />
            </section>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default CreateCalendar;
