/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { Button, Drawer, Input } from "../../components";
import { useDrawerProps } from "../../interface/commonInterface";
import applicantModel, {
  applicantInputMaps,
} from "../../models/applicantModel";

interface CreateDrawerProps {
  event: useDrawerProps | any;
}

const CreateDrawer = ({ event }: CreateDrawerProps) => {
  const { active, toggleDrawer } = event;
  return (
    <>
      {active && (
        <Drawer
          title={`Create Applicant`}
          subtitle={`Fill to create applicant`}
          active={active}
          handleToggle={toggleDrawer}>
          <Formik initialValues={applicantModel} onSubmit={() => {}}>
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
                <Button as="button" title="Reset" type="outlined" />
                <Button as="submit" title="Create" />
              </section>
            </Form>
          </Formik>
        </Drawer>
      )}
    </>
  );
};

export default CreateDrawer;
