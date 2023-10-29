import Nav from "./Nav";
import { BaseLayoutProps } from "../interface/Layout.Types";
import { Header } from ".";

const BaseLayout = ({
  title = "Title",
  subtitle = "Subtitle",
  actions,
  children,
  style,
  className,
}: BaseLayoutProps) => {
  const defaultStyle =
    style === "free"
      ? className
      : "grid grid-rows-[64px_auto_32px] gap-4 h-full";

  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside className="">
        <Nav />
      </aside>

      <div className="flex flex-col gap-6 overflow-hidden px-8 py-4">
        <Header.Layout title={title} subtitle={subtitle}>
          {actions}
        </Header.Layout>

        {/* // Main Component */}
        <main className={defaultStyle}>{children}</main>
      </div>
    </div>
  );
};

export default BaseLayout;
