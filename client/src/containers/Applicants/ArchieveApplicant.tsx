/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import { Formik, Form } from "formik";
import Textarea from "../../components/Textarea";
import useCustomMutation from "../../hooks/useCustomMutation";
import { toast } from "react-toastify";
import useURL from "../../hooks/useURL";
interface ArchieveApplicantProps {
  APID: string;
}

const ArchieveApplicant: React.FC<ArchieveApplicantProps> = ({ APID }) => {
  const { updateURL } = useURL();

  const { data, isLoading, isPending } = useFetch({
    route: `/applicant/${APID}`,
    key: ["applicants"],
    option: {
      retry: true,
    },
  });

  const { mutate } = useCustomMutation({
    route: "/applicant/status",
    overrideFn: () => {
      toast.success("Archive Successfully");
      updateURL("refetch=true");
    },
    type: "put",
  });

  const handleSubmit = (value: any, action: any) => {
    mutate({ _id: APID, status: "archive" });
    action.reset();
  };

  const handleCancel = () => {
    updateURL("/");
  };

  if (isLoading || isPending) return <FetchLoader />;

  const { personalDetails } = data;

  return (
    <section className="grid grid-rows-[72px_auto_64px] gap-4 h-full">
      <header className="border-b border-gray-300 pb-4">
        <Typography as="h3">Archive Applicant</Typography>
      </header>

      <main style={{ lineHeight: "1.8" }}>
        <section>
          Are you absolutely certain you want to proceed with archiving{" "}
          <span className="font-bold border-b border-gray-600">
            {`${personalDetails?.lastName || "Last Name"}, ${
              personalDetails?.firstName || "First Name"
            } ${personalDetails?.middleName[0] || "middle Name"}. ${
              personalDetails?.suffix || "Suffix"
            }`}
          </span>
          's data? Archiving is a reversible action within the Archive table.
          However, it's important to note that this process may lead to the
          storage of applicant data, rendering it inaccessible for further
          processing.
        </section>

        <section>
          <Formik initialValues={{ message: "R" }} onSubmit={handleSubmit}>
            <Form>
              <div className="my-4 text-bold">
                <Typography as="h4" className="mb-2">
                  Reason
                </Typography>
                <Textarea
                  name="message"
                  className="h-[200px]"
                  placeholder="Enter your reason"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  as="outlined"
                  type="button"
                  title="Cancel"
                  icon=""
                  onClick={handleCancel}
                />
                <Button type="submit" as="contained" icon="" title="Archive" />
              </div>
            </Form>
          </Formik>
        </section>
      </main>
    </section>
  );
};

export default ArchieveApplicant;
