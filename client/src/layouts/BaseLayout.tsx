import { ComponentProps } from "../interface/CommonInterface";
import IconButton from "../components/IconButton";

import Nav from "../containers/Nav";
import Typography from "../components/Typography";

const BaseLayout = ({ children }: ComponentProps) => {
  const name = "Criztian Jade M Tuplano";
  return (
    <div className=" grid grid-cols-[70px_auto]">
      <aside>
        <Nav />
      </aside>

      <main className="px-8 py-4 flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <span>
            <Typography as="h1">Welcome {name}</Typography>
            <Typography as="small">Hello there, I miss you</Typography>
          </span>

          <span className="flex gap-4">
            <IconButton />
            <IconButton />
          </span>
        </header>

        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
