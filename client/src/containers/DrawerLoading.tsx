import { BarLoader, Drawer } from "../components";

const DrawerLoading = () => {
  return (
    <Drawer
      className="overflow-scroll"
      width="600px"
      state={true}
      onClick={() => {}}>
      <div className="w-full h-full flex justify-center items-center bg-gray-200">
        <BarLoader />
      </div>
    </Drawer>
  );
};

export default DrawerLoading;
