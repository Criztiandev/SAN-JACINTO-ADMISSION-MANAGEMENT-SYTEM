/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "../layouts";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import { useAuthContext } from "../context/AuthContext";
import { Formik, Form } from "formik";
import { Button, IconButton, Input, Typography } from "../components";
import { useState } from "react";
import { ProfileInputSection } from "../data/profile.Data";
import { EditIcon } from "../assets/icons";
import FetchLoader from "../containers/General/FetchLoader";
import useFormSubmit from "../hooks/useFormSubmit";
import useFetch from "../hooks/useFetch";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuthContext();
  const { handleSubmit } = useFormSubmit({ route: "/test" });

  const { data, isLoading, isPending } = useFetch({
    route: `/account/${user}`,
    key: ["profile"],
  });

  if (isLoading || isPending) return <FetchLoader />;

  return (
    <>
      <BaseLayout
        title={`Hello, ${data?.fullName} 👋`}
        actions={
          <ActionHeader
            onSettings={() => {}}
            onLogout={() => {}}
            loading={isLoading || isPending}
          />
        }
        className="h-full"
        free>
        <Formik
          initialValues={{
            fullName: data?.fullName,
            email: data?.email,
            password: data?.password,
            contact: data?.contact,
          }}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-4 my-4">
            <div className="flex justify-end">
              <IconButton
                icon={EditIcon}
                as={"outlined"}
                onClick={() => setIsEdit((prev) => !prev)}
              />
            </div>
            {ProfileInputSection.map((props) => (
              <div
                className="grid grid-cols-2 items-center justify-center gap-8 border-b border-b-gray-200 pt-2 pb-6"
                key={props.label}>
                {/* // left column */}
                <div className="w-[450px]">
                  <Typography as="h6" className="mb-2 font-semibold">
                    {props.label}
                  </Typography>
                  <Typography as="p">{props.description}</Typography>
                </div>
                <Input
                  {...props}
                  className={`bg-gray-300 placeholder-gray-400 text-black ${
                    isEdit
                      ? "bg-gray-100 placeholder-gray-500 cursor-default"
                      : "cursor-not-allowed"
                  } `}
                  disabled={!isEdit}
                />
              </div>
            ))}

            {isEdit && (
              <div className="flex gap-4 justify-end">
                <Button type="button" title="Cancel" as="outlined" />
                <Button type="submit" title="Submit" />
              </div>
            )}
          </Form>
        </Formik>
      </BaseLayout>
    </>
  );
};

export default Profile;
