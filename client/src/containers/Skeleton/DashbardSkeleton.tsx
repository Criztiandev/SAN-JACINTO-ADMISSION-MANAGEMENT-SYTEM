/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "../../layouts";
import FetchLoader from "../General/FetchLoader";
import StatsLoader from "../Loaders/StatsLoader";
import Nav from "../../layouts/Nav";
import { ActionHeader } from "../Dashboard";

const DashboardSkeleton = () => {
  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside className="">
        <Nav />
      </aside>

      <div className="flex flex-col gap-6 overflow-hidden px-8 py-4">
        <Header.Layout title={"Loading"} subtitle={""}>
          <ActionHeader onSettings={() => {}} onLogout={() => {}} loading />
        </Header.Layout>

        {/* // Main Component */}
        <main className="">
          <StatsLoader />

          <section className="h-[80vh] grid grid-cols-[auto_300px] gap-4 my-4">
            <FetchLoader />
            <FetchLoader />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
