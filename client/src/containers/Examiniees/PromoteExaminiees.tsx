/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../../components/Typography";
import Avatar from "../../components/Avatar";
import { FemaleProfile, MaleProfile } from "../../assets/image";
import Input from "../../components/Input";

import { Form, Formik } from "formik";
import FetchLoader from "../General/FetchLoader";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button";
import useFormSubmit from "../../hooks/useFormSubmit";
import Textarea from "../../components/Textarea";

const PromoteExaminiees = ({ APID }: { APID: string }) => {
  const { data, isLoading, isError } = useFetch({
    route: `/examiniees/${APID}`,
    key: ["applicant"],
  });

  const { handleSubmit } = useFormSubmit({
    route: "/examiniees/promote",
    type: "post",
  });

  if (isLoading || isError) return <FetchLoader />;
  const { gender, fullName, track, status } = data;

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      <Form className="h-full">
        <section className="flex justify-between flex-col ">
          <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
            <div className="flex items-center gap-4">
              <Avatar
                src={gender === "Male" ? MaleProfile : FemaleProfile}
                size="84px"
              />
              <div className="text-white">
                <Typography as="h4">{fullName}</Typography>
                <Typography as="span">
                  {track || "Regular"} | {status}
                </Typography>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input label="Score" type="text" name="score" disabled={true} />
            <Input
              label="Schedule"
              type="text"
              name="schedule"
              disabled={true}
            />
            <Input label="Contact" type="text" name="contact" disabled={true} />
            <Input label="Email" type="text" name="email" disabled={true} />
          </div>

          <section>
            <Textarea label="Message" name="message" className="h-[200px]" />
          </section>

          <section className="flex justify-end gap-4 my-4">
            <Button as="outlined" title="Fail" />
            <Button as="contained" title="Pass" />
          </section>
        </section>
      </Form>
    </Formik>
  );
};

export default PromoteExaminiees;
