import { Form, Formik } from "formik";
import Button from "../../components/Button";
import Typography from "../../components/Typography";

const ChangePassword = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <div className="flex justify-between flex-col h-full">
          <div>
            <div className="border-b border-gray-400 py-4">
              <Typography as="h2" className="font-bold">
                Change Password
              </Typography>
            </div>

            <div className="my-4">
              <Typography as="p" className="text-[16px]">
                Please note that once this data is deleted, it cannot be
                recovered. If you have any concerns or doubts about this action,
                please reply to this email or contact our support team at our
                school at your earliest convenience.
              </Typography>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button title="Cancel" type="button" as="outlined" />
            <Button type="submit" title="Confirm" />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
