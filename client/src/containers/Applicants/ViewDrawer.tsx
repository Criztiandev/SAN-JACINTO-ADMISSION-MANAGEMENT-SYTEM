/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { Button, Drawer, Input } from "../../components";
import { useDrawerProps } from "../../interface/commonInterface";
import { applicantInputMaps } from "../../models/applicantModel";

interface ViewDrawerProps {
  details: Array<object> | any;
  event: useDrawerProps | any;
}

const ViewDrawer = ({ details, event }: ViewDrawerProps) => {
  const { active, toggleDrawer } = event;
  const { first_name, middle_name, last_name, LRN } = details;
  return (
    <>
      {active && (
        <Drawer
          title={`${last_name} ${first_name}, ${middle_name}`}
          subtitle={`LRN: ${LRN}`}
          active={active}
          handleToggle={toggleDrawer}>
          <Formik initialValues={details} onSubmit={() => {}}>
            <Form className="">
              {applicantInputMaps.map(items => (
                <section className="mb-8">
                  <h4 className="border-b border-gray-300 pb-2 mb-4">
                    {items.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {items.details.map(data => (
                      <Input {...data} disabled={true} />
                    ))}
                  </div>
                </section>
              ))}

              <section className="flex justify-end gap-4">
                <Button as="button" title="Hold" type="outlined" />
                <Button as="submit" title="Submit" />
              </section>
            </Form>
          </Formik>
        </Drawer>
      )}
    </>
  );
};

export default ViewDrawer;
