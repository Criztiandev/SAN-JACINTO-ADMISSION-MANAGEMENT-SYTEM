import { Typography, Image, Drawer, Input, IconButton } from "../components";
import Logo from "../assets/image/Logo.png";
import {
  panelTitleInterface,
  registrationLayoutProps,
} from "../interface/registrationInterface";
import useDrawer from "../hooks/useDrawer";
import { Form, Formik } from "formik";

const defaultPanelContent: panelTitleInterface = {
  Checkpoint: "Please Fill all necessary input",
  "Application Form": "This is your Application Form",
  "Thank you": "Welcome to the SJNHS",
};

const RegistrationLayout = ({
  activePanel,
  children,
}: registrationLayoutProps) => {
  const { active, setActive } = useDrawer();

  const panelContent: string =
    defaultPanelContent[activePanel as keyof panelTitleInterface] ||
    `Tell us about your ${activePanel}`;

  return (
    <>
      <div className="grid grid-cols-[500px_auto] h-[100vh] ">
        <div className="relative">
          <aside className="sticky h-[100vh] top-0 bg-backgroundImage bg-cover bg-no-repeat object-cover flex flex-col p-6 gap-4 justify-between">
            <div className="flex items-center gap-4">
              <figure className="w-16 h-16">
                <Image src={Logo} alt="Logo Icon" />
              </figure>
              <Typography className="text-white " as="h3">
                SJNHS
              </Typography>
            </div>

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
                <button onClick={() => setActive(prev => !prev)}>
                  Click me
                </button>
              </Typography>
            </section>
          </aside>
        </div>
        <main className="p-6 flex flex-col gap-8">{children}</main>
      </div>

      {active && (
        <Drawer
          title="FAQ"
          subtitle={"You can ask things here"}
          active={active}
          handleToggle={() => setActive(prev => !prev)}
          className="flex justify-between flex-col gap-4 h-[82%]">
          <div className="chat-container h-full p-4  flex flex-col gap-4 overflow-scroll">
            <div className="chat-heads bg-gray-200 rounded-[5px]  p-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              doloribus ut fugit deserunt? Odit dicta maiores in, optio corrupti
              quibusdam cupiditate sint inventore enim incidunt quasi, a
              consectetur maxime sed fuga reiciendis amet saepe quo veniam
              quidem sequi officia. Nihil deserunt esse quasi ad quis iusto
              dolorum repudiandae, iure adipisci!
            </div>

            <div className="chat-heads-self p-4 rounded-[5px] bg-red-200 ">
              What is Admission Management System ?
            </div>
          </div>
          <Formik
            onSubmit={() => {
              alert("Submit");
            }}
            initialValues={{ question: "" }}>
            <Form>
              <div className="grid grid-cols-[auto_64px]">
                <Input name="question" />
                <IconButton as="submit" />
              </div>
            </Form>
          </Formik>
        </Drawer>
      )}
    </>
  );
};

export default RegistrationLayout;
