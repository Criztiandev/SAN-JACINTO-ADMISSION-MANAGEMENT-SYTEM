/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { fetchAdminById } from "../api/Auth.Api";
import { toast } from "react-toastify";
import FetchLoader from "../containers/General/FetchLoader";

const Profile = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const payload = await fetchAdminById(user);
      return payload;
    },
    queryKey: [""],
  });

  const { active: settingsIsActive, toggleDrawer: toggleSettings } =
    useDrawer();
  const { active: logoutIsActive, toggleDrawer: toggleLogout } = useDrawer();

  if (isLoading || isError) return <FetchLoader />;

  return (
    <>
      <BaseLayout
        title={`Hello, ${data?.fullName} 👋`}
        actions={
          <ActionHeader
            onSettings={toggleSettings}
            onLogout={toggleLogout}
            loading={true}
          />
        }
        className="h-full"
        free></BaseLayout>
    </>
  );
};

export default Profile;
