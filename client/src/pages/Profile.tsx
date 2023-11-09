/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "../layouts";
import useDrawer from "../hooks/useDrawer";
import ActionHeader from "../containers/Dashboard/ActionHeader";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../containers/Loaders/PageLoader";
import { fetchAllData } from "../utils/Api.utils";

const Profile = () => {
  const { data, isLoading, isFetched } = useQuery({
    queryFn: () => fetchAllData("applicants"),
    queryKey: ["admin"],
  });

  const { active: settingsIsActive, toggleDrawer: toggleSettings } =
    useDrawer();
  const { active: logoutIsActive, toggleDrawer: toggleLogout } = useDrawer();

  if (isLoading) return <PageLoader />;

  return (
    <>
      <BaseLayout
        title="Hello, Criztian Jade 👋"
        actions={
          <ActionHeader onSettings={toggleSettings} onLogout={toggleLogout} />
        }
        className="h-full"
        free></BaseLayout>
    </>
  );
};

export default Profile;
