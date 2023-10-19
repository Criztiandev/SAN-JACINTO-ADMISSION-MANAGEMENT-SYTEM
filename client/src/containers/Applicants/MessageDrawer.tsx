import { AnimatePresence } from "framer-motion";
import { Button, Drawer, IconButton } from "../../components";
import { Field, Form, Formik } from "formik";
import { EditIcon } from "../../assets/icons";

import { motion } from "framer-motion";

import { FetchingDrawerProps } from "../../interface/componentInterface";
import { toast } from "react-toastify";
import { useState } from "react";

const MessageDrawer = ({ data, state, onClose }: FetchingDrawerProps) => {
  // fetch ID for the user

  return (
    <>
      {state && (
        <AnimatePresence mode="wait">
          <Drawer
            className="overflow-scroll"
            width="600px"
            state={state}
            onClick={onClose}>
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values, action) => {
                toast.success("Applicant is Message Successfully");
                onClose();
                action.resetForm();
              }}>
              <Form className="grid grid-rows-[85px_1fr_48px] gap-4 h-full">
                <header className="pb-4 mb-4 border-b border-gray-400">
                  <h3>Message</h3>
                  <p>You can message the user with different categort</p>
                </header>
                <main className="h-full flex flex-col gap-4">
                  <section className="flex justify-between items-center">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer bg-red-900 border border-gray-400 rounded-full py-[12px] px-4 w-full max-w-[150px] text-white text-center">
                      Facebook
                    </motion.div>

                    <div className="flex gap-4">
                      <div className="cursor-pointer border border-gray-400 rounded-full py-[12px] px-4">
                        Criztian Jade M Tuplano
                      </div>
                      <IconButton type="outlined" />
                    </div>
                  </section>

                  {/* <Textarea  /> */}
                  <Field
                    as="textarea"
                    name="message"
                    className="w-full h-full border p-4"
                  />
                </main>
                <footer className="flex justify-end items-center gap-4">
                  <IconButton type="outlined" />
                  <Button
                    as="submit"
                    title="Submit"
                    dir="right"
                    icon={EditIcon}
                  />
                </footer>
              </Form>
            </Formik>
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default MessageDrawer;
