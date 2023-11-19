const Checkbox = (props) => {
  return (
    <label htmlFor="#">
      <input type="checkbox" {...props} />
    </label>
  );
};

export default Checkbox;
