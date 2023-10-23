import { CoverSelect } from ".";
import { Formik, Form } from "formik";
import { Button, Drawer, Input, Textarea } from "../../components";
import { DrawerProps } from "../../interface/Drawer.Types";
import { AnimatePresence } from "framer-motion";
import { scheduleModelInit } from "../../data/initialValue/annoucementInit";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { DateSelect } from "./";
import { useScheduleContext } from "../../context/ScheduleContext";
import { toast } from "react-toastify";
import { Field } from "formik";

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
  useEffect(() => {}, []);

  return (
    <>
      {props.state && (
        <AnimatePresence>
          <Drawer {...props} className="overflow-scroll" width="600px">
            <Formik
              initialValues={scheduleModelInit}
              onSubmit={(values, action) => {
                try {
                  toast.success("Schedule is Created Successfully");
                  console.log(values);
                  onClick();
                } catch (e: TypeError) {
                  toast.error(e || e.message);
                }
              }}>
              <Form className="">
                <header className="flex flex-col border-b border-gray-400 p-2">
                  <h2>Create New Event</h2>
                  <span>You can create event to this form, I miss you</span>
                </header>
                <main>
                  <section className="my-4">
                    <CoverSelect />
                  </section>

                  <section>
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Students
                    </h5>

                    <div>
                      <div className="grid grid-cols-2 gap-4 justify-items-between items-center max-h-[300px] overflow-y-scroll p-4 my-4">
                        {Examinees.map(cards => (
                          <motion.label
                            key={cards._id}
                            whileHover={{ border: "1px solid black" }}
                            whileTap={{ scale: 0.9 }}
                            className="border rounded-[5px] p-4 w-[250px] flex flex-col gap-2 hover:cursor-pointer">
                            <div className="flex gap-2">
                              <Field
                                type="checkbox"
                                name="batch"
                                value={cards._id}
                              />
                              <h6>{cards.name}</h6>
                            </div>

                            <div className="">
                              <div>{cards.yearLevel}</div>
                              <div>Gen: {cards.genAve}</div>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Details
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Title" name="title" />
                      <Input label="Facilitator" name="facilitator" />
                      <Input label="Venue" name="venue" />
                    </div>
                  </section>

                  <section>
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Date && Time
                    </h5>
                    {/* <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start"
                        name="date.start"
                        value={DateFormat({
                          format: selectedSlot.start,
                          reverse: false,
                        })}
                      />
                      <Input
                        label="End"
                        name="date.end"
                        value={DateFormat({
                          format: selectedSlot.end,
                          reverse: false,
                        })}
                      />
                    </div> */}
                    <DateSelect selected={selectedSlot} />
                  </section>

                  <section className="h-[300px]">
                    <h5 className="pb-2 my-4 border-b border-gray-400">
                      Content
                    </h5>
                    <Textarea label="Annoucement" name="title" />
                  </section>
                </main>

                <div className="flex justify-end gap-4">
                  <Button as="reset" title="Reset" />
                  <Button as="submit" title="Submit" />
                </div>
              </Form>
            </Formik>
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default CreateScheduleDrawer;
