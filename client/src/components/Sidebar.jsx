import { Link } from "react-router-dom";

const Sidebar = () => {
  const routes = [
    {
      id: 0,
      name: "Dashboard",
      path: "/",
      icon: "D",
    },
    {
      id: 1,
      name: "Dashboard",
      path: "/",
      icon: "D",
    },

    {
      id: 2,
      name: "Dashboard",
      path: "/",
      icon: "D",
    },
  ];

  const userRoute = [
    {
      id: 0,
      path: "/account",
      icon: "A",
    },

    {
      id: 1,
      path: "/account",
      icon: "A",
    },
  ];

  const routesTransformer = (link) =>
    link.map(({ id, icon, path }) => (
      <li
        className="cursor w-8 h-8 border flex justify-center items-center rounded-full"
        key={id}
      >
        <Link to={path}>{icon}</Link>
      </li>
    ));

  return (
    <aside className="p-4  flex flex-col justify-between border border-black h-full">
      <div className="">
        <div className="w-8 h-8 border rounded-full mb-8 border-black "></div>
        <ul className="flex gap-4 flex-col ">{routesTransformer(routes)}</ul>
      </div>
      <ul className="flex gap-4 flex-col">{routesTransformer(userRoute)}</ul>
    </aside>
  );
};

export default Sidebar;
