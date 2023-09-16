import IconButton from "../components/IconButton";

import Nav from "../containers/Nav";
import Typography from "../components/Typography";
import Notification from "../assets/icons/Bell_light.svg";
import Settings from "../assets/icons/Setting_alt_line_light.svg";
import { BaseProps } from "../interface/componentInterface";

import { ReactNode } from "react";

interface BaseLayoutProps extends BaseProps {
  title?: string;
  action?: boolean;
  header?: ReactNode;
}

const BaseLayout = ({ title, action, children, header }: BaseLayoutProps) => {
  const name = "Criztian Jade M Tuplano";
  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside>
        <Nav />
      </aside>

      <main className="px-8 py-4 flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <span>
            <Typography as="h1">{title ? title : `Welcome ${name}`}</Typography>
            <Typography as="small">Hello there, I miss you</Typography>
          </span>

          <span className="flex gap-4">
            {action ? (
              <>{header}</>
            ) : (
              <>
                <IconButton type="ghost" icon={Notification} />
                <IconButton type="ghost" icon={Settings} />
              </>
            )}
          </span>
        </header>

        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
