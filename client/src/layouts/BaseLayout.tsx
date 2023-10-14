import { ReactNode } from "react";

import { Typography, IconButton, Dropdown, Button } from "../components";
import { BaseProps } from "../interface/componentInterface";
import Nav from "./Nav";
import { SettingsIcon, NotifIcon } from "../assets/icons";

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

      <main className="flex flex-col gap-6 overflow-hidden px-8 py-4">
        <header className="flex justify-between items-center">
          <span>
            <Typography as="h1">{title ? title : `Welcome ${name}`}</Typography>
            <Typography as="small">Hello there, I miss you</Typography>
          </span>

          <span className="flex gap-4">
            {action ? (
              <>
                <Dropdown>
                  <Button type="ghost" title="Master List" />
                </Dropdown>
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

        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
