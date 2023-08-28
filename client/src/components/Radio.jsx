import PropTypes from "prop-types";
import Text from "./Text";

let groupName = null; // To hold the group name for radio inputs

// Radio group component
const Radio = ({ group, space, children }) => {
  groupName = group; // Set the group name for radio inputs
  return <div className={`flex flex-col gap-${space}`}>{children}</div>;
};

// Radio title component
const RadioTitle = ({ title }) => <Text content={title} />;

// Radio item component
const RadioItem = ({ name }) => (
  <label className="flex gap-[8px]">
    <input type="radio" name={groupName} />
    <Text content={name} />
  </label>
);

// PropTypes validation
Radio.propTypes = {
  group: PropTypes.string.isRequired,
  space: PropTypes.any,
  children: PropTypes.node,
};
RadioItem.propTypes = {
  name: PropTypes.string.isRequired,
};
RadioTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

// Default props
Radio.defaultProps = {
  space: "8px",
};

// Attach the RadioItem and RadioTitle components to the Radio component
Radio.Item = RadioItem;
Radio.Title = RadioTitle;

export default Radio;
