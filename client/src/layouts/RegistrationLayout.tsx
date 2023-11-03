import { Typography, Image, Drawer } from "../components";
import Logo from "../assets/image/Logo.png";
import {
  panelTitleInterface,
  registrationLayoutProps,
} from "../interface/Registration.Type";
import useDrawer from "../hooks/useDrawer";
import { Link } from "react-router-dom";

const defaultPanelContent: panelTitleInterface = {
  Checkpoint: "Please Fill all necessary input",
  "Application Form": "This is your Application Form",
  "Thank you": "Welcome to the SJNHS",
};

const RegistrationLayout = ({
  activePanel,
  children,
}: registrationLayoutProps) => {
  const { active, toggleDrawer } = useDrawer();

  const panelContent: string =
    defaultPanelContent[activePanel as keyof panelTitleInterface] ||
    `Tell us about your ${activePanel}`;

  return (
    <>
      <div className="grid grid-cols-[500px_auto] h-[100vh] ">
        <div className="relative">
          <aside className="sticky h-[100vh] top-0 bg-backgroundImage bg-cover bg-no-repeat object-cover flex flex-col p-6 gap-4 justify-between">
            <Link to={"/"}>
              <div className="flex items-center gap-4">
                <figure className="w-16 h-16">
                  <Image src={Logo} alt="Logo Icon" />
                </figure>
                <Typography className="text-white " as="h3">
                  SJNHS
                </Typography>
              </div>
            </Link>

            <section className="flex flex-col gap-4">
              <Typography as="h6" className="text-white font-medium">
                Thank you for processing
              </Typography>

              <Typography className="text-white" as="h3">
                {panelContent}
              </Typography>

              <Typography className="text-white" as="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In odit
                minus molestias rem, quod laborum recusandae mollitia animi
                consectetur debitis soluta vel deserunt error reiciendis
                voluptate voluptatum eaque ipsam optio repellat necessitatibus
              </Typography>
            </section>

            <section>
              <Typography as="span" className="text-white">
                Have a question ?{" "}
                <button onClick={toggleDrawer}>Click me</button>
              </Typography>
            </section>
          </aside>
        </div>
        <main className="p-6 flex flex-col gap-8">{children}</main>
      </div>

      <Drawer state={active} onClick={toggleDrawer}>
        Hi
      </Drawer>
    </>
  );
};

export default RegistrationLayout;
