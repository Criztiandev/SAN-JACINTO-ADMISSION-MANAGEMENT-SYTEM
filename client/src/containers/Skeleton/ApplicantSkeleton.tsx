import {
  RenderCreateButton,
  RenderFilterButton,
} from "../../helper/Applicant.Helper";
import FetchLoader from "../../containers/General/FetchLoader";
import { SearchBar } from "../../components";
import { Header } from "../../layouts";
import Nav from "../../layouts/Nav";

const ApplicantSkeleton = () => {
  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside className="">
        <Nav />
      </aside>

      <div className="flex flex-col gap-6 overflow-hidden px-8 py-4">
        <Header.Layout title={"Loading"} subtitle={""}>
          <RenderCreateButton toggle={() => {}} loading={true} />
        </Header.Layout>

        {/* // Main Component */}
        <main className="grid grid-rows-[64px_auto_32px] gap-4 h-full">
          <div className="flex justify-between items-center">
            <SearchBar
              dir="left"
              value={""}
              onChange={() => {}}
              disabled={true}
            />

            <div className="flex gap-4">
              <RenderFilterButton loading={true} />
            </div>
          </div>

          <FetchLoader />
        </main>
      </div>
    </div>
  );
};

export default ApplicantSkeleton;
