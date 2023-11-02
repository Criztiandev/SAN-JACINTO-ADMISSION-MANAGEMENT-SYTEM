/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, FormikHelpers } from "formik";
import { Button, Drawer, Input } from "../../components";
import { DrawerProps } from "../../interface/Drawer.Types";
import { scheduleModelInit } from "../../data/initialValue/annoucementInit";
import { CoverSelect, DateSelect } from ".";
import { useScheduleContext } from "../../context/ScheduleContext";
import { toast } from "react-toastify";
import { InputProps } from "../../interface/FormInterface";

import ExaminesItems from "./ExaminesItems";
import { ScheduleModelProps } from "../../interface/Schedule.Types";

const DetailsInput: InputProps[] = [
  {
    label: "Title",
    name: "title",
    placeholder: "Enter title",
  },

  {
    label: "Facilitator",
    name: "facilitator",
    placeholder: "Enter the Facilitator of this event",
  },
  {
    label: "Venue",
    name: "venue",
    placeholder: "Enter the Venue",
  },
];

const Examinees = [
  {
    _id: "123123123",
    name: "Tuplano, Criztian Jade M.",
    yearLevel: "Grade 7",
    genAve: "95",
  },

  {
    _id: "222323",
    name: "Kaizer, Jose Marie G.",
    yearLevel: "Grade 7",
    genAve: "95",
  },
];

const CreateScheduleDrawer = ({
  onClick = () => {},
  ...props
}: DrawerProps) => {
  const { selectedSlot } = useScheduleContext();

  const handleSubmit = (
    values: ScheduleModelProps,
    action: FormikHelpers<ScheduleModelProps>
  ) => {
    try {
      console.log(values);
      toast.success("Schedule is Created Successfully");
      onClick();
      action.resetForm();
    } catch (error: any) {
      toast.error(error);
      throw error;
    }
  };

  return (
    <Drawer
      onClick={onClick}
      {...props}
      className="overflow-scroll"
      width="600px">
      <Formik initialValues={scheduleModelInit} onSubmit={handleSubmit}>
        <Form className="">
          <header className="flex flex-col border-b border-gray-400 p-2">
            <h2>Create New Annoucement</h2>
            <span>You can create event to this form, I miss you</span>
          </header>
          <main>
            <section className="my-4">
              <CoverSelect />
            </section>

            <section>
              <h5 className="pb-2 my-4 border-b border-gray-400">Students</h5>

              <div className="grid grid-cols-2 gap-4 justify-items-between items-center max-h-[300px] overflow-y-scroll my-4">
                {Examinees.map((cards) => (
                  <ExaminesItems key={cards.name} {...cards} />
                ))}
              </div>
            </section>

            <section>
              <h5 className="pb-2 my-4 border-b border-gray-400">Details</h5>
              <div className="grid grid-cols-2 gap-4">
                {DetailsInput.map((props) => (
                  <Input key={props.label} {...props} />
                ))}
              </div>
            </section>

            <section>
              <h5 className="pb-2 my-4 border-b border-gray-400">
                Date && Time
              </h5>

              <DateSelect {...selectedSlot} />
            </section>

            <section className="h-[350px] flex flex-col mb-4">
              <h5 className="pb-2 my-4 border-b border-gray-400">Content</h5>
              <Textarea label="Annoucement" name="content" />
            </section>
          </main>

          <div className="flex justify-end gap-4">
            <Button as="reset" title="Reset" />
            <Button as="submit" title="Submit" />
          </div>
        </Form>
      </Formik>
    </Drawer>
  );
};

export default CreateScheduleDrawer;
