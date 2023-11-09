import { BaseLayoutProps } from "../interface/Layout.Types";
import { Header } from "../layouts";
import Nav from "../layouts/Nav";

const SkeletonLayout = ({
  actions,
  children,
  className,
  free,
}: BaseLayoutProps) => {
  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside className="">
        <Nav />
      </aside>

      <div className="flex flex-col gap-6 overflow-hidden px-8 py-4">
        <Header.Layout title={"Loading"} subtitle={""}>
          {actions}
        </Header.Layout>

        {/* // Main Component */}
        <main
          className={`${
            free ? className : "grid grid-rows-[64px_auto_32px] gap-4 h-full"
          }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SkeletonLayout;
