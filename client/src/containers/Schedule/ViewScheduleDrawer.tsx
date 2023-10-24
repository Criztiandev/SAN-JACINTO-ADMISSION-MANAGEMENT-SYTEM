import {
  Button,
  Drawer,
  IconButton,
  Image,
  Input,
  Textarea,
} from "../../components";
import { DrawerProps } from "../../interface/Drawer.Types";
import { AnimatePresence } from "framer-motion";
import { Formik, Form, Field } from "formik";
import { scheduleModelInit } from "../../data/initialValue/annoucementInit";
import CoverImage from "../../assets/image/cover_image.jpg";
import ExaminesItems from "./ExaminesItems";
import { InputProps } from "../../interface/FormInterface";
import { useScheduleContext } from "../../context/ScheduleContext";
import { DateFormat } from "../../utils/Date.utils";
import { useState } from "react";

import { toast } from "react-toastify";
import { EditIcon, DeleteIcon } from "../../assets/icons";

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

const ViewScheduleDrawer = ({ onClick = () => {}, ...props }: DrawerProps) => {
  const [isEdit, setIsEdit] = useState(true);
  const { selectedEvent } = useScheduleContext();
  const { title, _id, start, end } = selectedEvent;

  // Query the Date using the ID
  const handleSubmit = () => {};

  const handleDelete = () => {
    toast.success("Schedule Deleted Successfully");
    onClick();
  };

  return (
    <>
      {props.state && (
        <AnimatePresence>
          <Drawer
            onClick={onClick}
            {...props}
            className="overflow-scroll"
            width="600px">
            <Formik initialValues={scheduleModelInit} onSubmit={handleSubmit}>
              <Form className="">
                <header className="flex flex-col border-b border-gray-400 p-2">
                  <div className="flex justify-between items-center">
                    {isEdit ? (
                      <h2>{title || "No Title"}</h2>
                    ) : (
                      <Field
                        name="title"
                        className="border-b-2 text-[30px] font-bold outline-none mb-2 border-black"
                      />
                    )}
                    <div className="flex gap-4">
                      <IconButton
                        type="outlined"
                        icon={EditIcon}
                        onClick={() => setIsEdit(prev => !prev)}
                      />

                      <IconButton
                        type="outlined"
                        icon={DeleteIcon}
                        onClick={handleDelete}
                      />
                    </div>
                  </div>
                  <span>
                    {isEdit ? (
                      <>
                        {DateFormat({ format: start })} -
                        {DateFormat({ format: end })} | Mr Tuplano
                      </>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <Image
                          src={EditIcon}
                          alt="edit"
                          className="border rounded-full p-1 border-green-500 bg-[#22c55e80]"
                        />
                        Editing....
                      </span>
                    )}
                  </span>
                </header>

                <main>
                  <section className="my-4 w-full h-[200px] overflow-hidden rounded-[5px] ">
                    <Image src={CoverImage} alt="Cover_Image" />
                  </section>

                  <section>
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Students
                    </h5>

                    <div className="grid grid-cols-2 gap-4 justify-items-between items-center max-h-[300px] overflow-y-scroll my-4">
                      {Examinees.map(cards => (
                        <ExaminesItems
                          key={cards.name}
                          {...cards}
                          disabled={isEdit}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Details
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      {DetailsInput.map(props => (
                        <Input key={props.label} {...props} disabled={isEdit} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Date && Time
                    </h5>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Date Start"
                        name="date.start"
                        disabled={isEdit}
                      />
                      <Input
                        label="Date End"
                        name="date.end"
                        disabled={isEdit}
                        placeholder="Date Start"
                      />
                      <Input
                        label="Time Start"
                        name="time.start"
                        disabled={isEdit}
                        placeholder="Date Start"
                      />
                      <Input
                        label="Time End"
                        name="time.end"
                        disabled={isEdit}
                        placeholder="Date Start"
                      />
                    </div>
                  </section>

                  <section className="h-[350px] flex flex-col">
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Content
                    </h5>

                    <Textarea name="content" disabled={isEdit} />
                  </section>

                  <section className="flex justify-end gap-4">
                    <Button title="Reset" />
                    <Button title="Submit" />
                  </section>
                </main>
              </Form>
            </Formik>
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default ViewScheduleDrawer;
