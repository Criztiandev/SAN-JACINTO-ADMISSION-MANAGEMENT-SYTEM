import { Link } from "react-router-dom";
import { Suspense } from "react";
import Logo from "../../assets/image/Logo.png";
import Skeleton from "react-loading-skeleton";
import Typography from "../../components/Typography";
interface AdmissionSidebarProps {
  content: string;
  toggle: () => void;
}

const AdmissionSideBar = ({ content, toggle }: AdmissionSidebarProps) => {
  return (
    <div className="relative">
      <aside className="sticky h-[100vh] top-0 bg-backgroundImage bg-cover bg-no-repeat object-cover flex flex-col p-6 gap-4 justify-between">
        <Link to={"/"}>
          <div className="flex items-center gap-4">
            <figure className="w-16 h-16">
              <Suspense fallback={<Skeleton width={64} height={64} />}>
                <img src={Logo} alt="Logo Icon" />
              </Suspense>
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
            {content}
          </Typography>

          <Typography className="text-white" as="p">
            Hey 👋, I just wanted to take a moment to express my heartfelt
            gratitude to you. Your kindness and support have meant the world to
            me. Thank you for being there, for your generosity, and for making a
            positive difference in my life. I am truly grateful, and I feel
            blessed to have you in my life.
          </Typography>
        </section>

        <section>
          <Typography as="span" className="text-white">
            Have a question ? <button onClick={toggle}>Click me</button>
          </Typography>
        </section>
      </aside>
    </div>
  );
};

export default AdmissionSideBar;
