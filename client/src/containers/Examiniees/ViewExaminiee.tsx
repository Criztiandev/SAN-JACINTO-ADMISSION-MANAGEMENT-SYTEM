/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../../components/Typography";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import MaleProfile from "../../assets/image/Male_profile.png";
import FemaleProfile from "../../assets/image/Female_Profile.png";
import { Form, Formik } from "formik";
import FetchLoader from "../General/FetchLoader";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button";
import useFormSubmit from "../../hooks/useFormSubmit";
import Textarea from "../../components/Textarea";
import useURL from "../../hooks/useURL";

const ViewExaminiee = ({ APID }: { APID: string }) => {
  const { updateURL } = useURL();

  const { data, isLoading, isError } = useFetch({
    route: `/examiniees/${APID}`,
    key: [`examiniees${APID}`],
  });

  const { handleSubmit, isPending } = useFormSubmit({
    route: "/examiniees/promote",
    type: "post",
    overideFn: () => {
      updateURL("refetch=true");
    },
  });

  if (isLoading || isError) return <FetchLoader />;
  const { gender, fullName, track, permitID, schedule } = data;

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      <Form className="h-full">
        <section className="relative flex justify-between flex-col ">
          {/* Badge */}

          {/* Cover */}
          <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => updateURL(`state=viewApp&APID=${data?.APID}`)}>
              <Avatar
                src={gender === "Male" ? MaleProfile : FemaleProfile}
                size="84px"
              />
              <div className="text-white">
                <Typography as="h4">{fullName}</Typography>
                <Typography as="span">
                  {track || "Regular"} | {permitID}
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Permit ID"
              type="text"
              name="permitID"
              static
              disabled={true}
            />
            {schedule !== null && (
              <Input
                label="Schedule"
                type="text"
                name="schedule"
                disabled={true}
                static
              />
            )}
            <Input
              label="Contact"
              type="text"
              name="contact"
              disabled={true}
              static
            />
            <Input
              label="Email"
              type="text"
              name="email"
              disabled={true}
              static
            />
          </div>
          <section>
            <Textarea
              label="Message"
              name="message"
              className="h-[200px]"
              disabled={schedule === null}
            />
          </section>
          {schedule !== null && (
            <section className="flex justify-end gap-4 my-4">
              <Button
                type="button"
                as="outlined"
                title="Fail"
                disabled={isPending}
              />
              <Button as="contained" title="Pass" disabled={isPending} />
            </section>
          )}
        </section>
      </Form>
    </Formik>
  );
};

export default ViewExaminiee;
