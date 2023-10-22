export const handleToggle = (
  data: object | string,
  toggle = () => {},
  selection: (data: Array<object>) => {}
) => {
  selection(data);
  toggle();
};
