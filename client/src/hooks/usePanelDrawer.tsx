/* eslint-disable @typescript-eslint/no-explicit-any */
import useDrawer from "./useDrawer";

interface PanelDrawerProps {
  data: any;
  Component: any;
}

const usePanelDrawer = (components: PanelDrawerProps[]) => {
  return components.map(({ data, Component }, index) => {
    const { active, toggleDrawer } = useDrawer();

    return {
      id: `${index}`,
      Component,
      data,
      state: active,
      onClose: toggleDrawer,
    };
  });
};

// {
//     id: "0",
//     Component: ViewDrawer,
//     data: selectedApplicant,
//     state: viewToggle.active,
//     onClose: viewToggle.toggleDrawer,
//   },

export default usePanelDrawer;
