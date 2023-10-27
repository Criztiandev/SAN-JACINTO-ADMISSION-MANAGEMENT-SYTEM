import { Typography, IconButton } from "../components";
import { SettingsIcon, NotifIcon } from "../assets/icons";
import ShortCut from "../containers/ShortCut";
import Nav from "./Nav";
import { BaseLayoutProps } from "../interface/Layout.Types";

const BaseLayout = ({
  title,
  action,
  children,
  header,
  shortcut,
}: BaseLayoutProps) => {
  const name = "Criztian Jade M Tuplano";
  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside className="">
        <Nav />
      </aside>

      <main className="flex flex-col gap-6 overflow-hidden px-8 py-4">
        <header className="flex justify-between items-center">
          <span>
            <Typography as="h1">{title ? title : `Welcome ${name}`}</Typography>
            <Typography as="small">Hello there, I miss you</Typography>
          </span>

          <span className="flex gap-4">
            {action ? (
              <>
                {shortcut && <ShortCut />}
                {header}
              </>
            ) : (
              <>
                <IconButton type="ghost" icon={NotifIcon} />
                <IconButton type="ghost" icon={SettingsIcon} />
              </>
            )}
          </span>
        </header>

        <div className="grid grid-rows-[64px_auto_32px] gap-4 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
