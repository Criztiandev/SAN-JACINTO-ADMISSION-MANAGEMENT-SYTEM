import { AnimatePresence } from "framer-motion";
import { Button, Drawer } from "../../components";
import applicantData from "../../data/applicantData.json";
import { Form, Formik } from "formik";
import { FetchingDrawerProps } from "../../interface/Component.Type";
import { toast } from "react-toastify";
import { ToastConfig } from "../../utils/notifUtils";

const DeleteDrawer = ({
  data,
  state = false,
  onClose = () => {},
}: FetchingDrawerProps) => {
  const response = applicantData[0];
  const { firstName, middleName, lastName, suffix } = response.personalDetails;

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
              initialValues={response}
              onSubmit={(values, action) => {
                // clean up
                toast.success(
                  "Applicant is Delete of Successfully",
                  ToastConfig
                );
                onClose();
                action.resetForm();
              }}>
              <Form className="grid grid-rows-[72px_auto_64px] gap-4 h-full">
                <header className="border-b border-gray-300 pb-4">
                  <h3>Deleting Applicant</h3>
                  <span>
                    Deleting this Applicant could lose all its credentials
                  </span>
                </header>

                <main style={{ lineHeight: "1.8" }}>
                  Are you absolutely certain you want to proceed with deleting{" "}
                  <span className="border-b-2 border-black font-bold">
                    {lastName}, {firstName} {middleName} {suffix && suffix}
                  </span>
                  's data? Deleting data is an irreversible action and can lead
                  to permanent loss of information. Please take a moment to
                  consider the potential consequences before confirming this
                  action. If you proceed, the data will be removed from the
                  system, and any associated records or references may be lost.
                </main>

                <footer className="flex justify-end items-center gap-4">
                  <Button
                    type="outlined"
                    as="button"
                    title="Cancel"
                    icon=""
                    onClick={onClose}
                  />
                  <Button type="outlined" as="submit" title="Submit" icon="" />
                </footer>
              </Form>
            </Formik>
          </Drawer>
        </AnimatePresence>
      )}
    </>
  );
};

export default DeleteDrawer;
