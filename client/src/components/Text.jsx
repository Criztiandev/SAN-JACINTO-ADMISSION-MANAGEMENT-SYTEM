import PropTypes from "prop-types";
const Text = ({ content }) => {
  return <p>{content}</p>;
};

Text.propTypes = {
  content: PropTypes.string.isRequired,
};
export default Text;
