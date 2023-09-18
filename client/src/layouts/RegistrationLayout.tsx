import Image from "../components/Image";
import { BaseProps } from "../interface/componentInterface";
import LogonIcon from "../assets/icons/Arhive_light.svg";
import Typography from "../components/Typography";
import { Link } from "react-router-dom";

interface RegistrationLayoutProps extends BaseProps {
  panels: string;
}

interface SpecifiedProps {
  Checkpoint: string;
  "Application Form": string;
  "Thank you": string;
}

const RegistrationLayout = ({ panels, children }: RegistrationLayoutProps) => {
  const SpecifiedPanel: SpecifiedProps = {
    Checkpoint: "Please Fill all necessary input",
    "Application Form": "This is your Application Form",
    "Thank you": "Welcome to the SJNHS",
  };

  return (
    <div className="grid grid-cols-[500px_auto] h-[100vh] ">
      <aside className="bg-backgroundImage bg-cover bg-no-repeat object-cover flex flex-col p-6 gap-4 justify-between">
        <div className="flex items-center gap-4">
          <figure className="w-9 h-9 rounded-full border flex justify-center items-center">
            <Image src={LogonIcon} alt="Logo Icon" />
          </figure>
          <Typography className="text-white " as="h2">
            SJNHS
          </Typography>
        </div>

        <section className="flex flex-col gap-4">
          <Typography as="h6" className="text-white font-medium">
            Thank you for processing
          </Typography>

          <Typography className="text-white" as="h3">
            {SpecifiedPanel[panels]
              ? SpecifiedPanel[panels]
              : `Tell us about your ${panels}`}
          </Typography>

          <Typography className="text-white" as="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In odit
            minus molestias rem, quod laborum recusandae mollitia animi
            consectetur debitis soluta vel deserunt error reiciendis voluptate
            voluptatum eaque ipsam optio repellat necessitatibus
          </Typography>
        </section>

        <section>
          <Typography as="span" className="text-white">
            Have a question ? <Link to={"/faq"}>Click me</Link>
          </Typography>
        </section>
      </aside>
      <main className="p-6 flex flex-col gap-8">{children}</main>
    </div>
  );
};

export default RegistrationLayout;
