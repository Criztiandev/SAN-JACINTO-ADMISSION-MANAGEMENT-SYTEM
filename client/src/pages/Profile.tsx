/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthContext } from "../context/AuthContext";
import { Formik, Form } from "formik";
import { useState } from "react";
import { ProfileInputSection } from "../data/profile.Data";
import FetchLoader from "../containers/General/FetchLoader";
import useFormSubmit from "../hooks/useFormSubmit";
import useFetch from "../hooks/useFetch";
import EditIcon from "../assets/icons/Edit_light.svg";
import BaseLayout from "../layouts/BaseLayout";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import Typography from "../components/Typography";
import useURL from "../hooks/useURL";
import DrawerWrapper from "../containers/Drawers/DrawerWrapper";
import ChangePassword from "../containers/Profile/ChangePassword";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateURL } = useURL();
  const { user } = useAuthContext();
  const { handleSubmit } = useFormSubmit({ route: "/test" });

  const { data, isLoading, isPending } = useFetch({
    route: `/account/${user}`,
    key: [`${user}`],
  });

  const handleTogglePassword = () => {
    updateURL(`state=password&APID=${user}`);
  };

  if (isLoading || isPending) return <FetchLoader />;

  return (
    <>
      <BaseLayout
        title={`Hello, ${data?.fullName} 👋`}
        actions={<IconButton />}
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
          <Form>
            <div className="flex justify-end">
              <IconButton
                icon={EditIcon}
                as={"outlined"}
                onClick={() => setIsEdit((prev) => !prev)}
              />
            </div>

            {ProfileInputSection.map((props) => (
              <div
                className="grid grid-cols-2 items-center justify-center gap-8 border-b border-b-gray-200 pb-6 mb-4"
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
                  className={`bg-gray-300  ${
                    isEdit
                      ? "bg-gray-100 cursor-default text-gray-600 placeholder-gray-600"
                      : "cursor-not-allowed text-gray-400 placeholder-gray-400"
                  } `}
                  disabled={!isEdit}
                />
              </div>
            ))}

            <div className="grid grid-cols-2 items-center justify-center gap-8 border-b border-b-gray-200 pb-6 mb-4">
              <div className="w-[450px]">
                <Typography as="h6" className="mb-2 font-semibold">
                  Password
                </Typography>
                <Typography as="p">
                  Changing your username will also affect your name and
                  appearance on all other Ionic websites like the Forum and
                  Market.
                </Typography>
              </div>
              <div className="flex">
                <Button
                  type="button"
                  title="Change Password"
                  disabled={!isEdit}
                  onClick={handleTogglePassword}
                />
              </div>
            </div>

            {isEdit && (
              <div className="flex gap-4 justify-end">
                <Button type="button" title="Cancel" as="outlined" />
                <Button type="submit" title="Submit" />
              </div>
            )}
          </Form>
        </Formik>
      </BaseLayout>

      <DrawerWrapper state="password" Component={ChangePassword} />
    </>
  );
};

export default Profile;
