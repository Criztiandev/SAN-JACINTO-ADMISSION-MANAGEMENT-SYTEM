import styled from "@emotion/styled";
import PropTypes from "prop-types";

const BaseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid black;
  font-size: 1rem;
  font-weight: 500;
`;

const RoundedButton = styled(BaseButton)`
  border-radius: 1rem;
`;

const GhostButton = styled(BaseButton)`
  background-color: transparent;
  border: none;
`;

const SmallButton = styled(BaseButton)`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
`;

const LargeButton = styled(BaseButton)`
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
`;

const Button = ({ variant, size, dir, icon, children }) => {
  const VariantComponent = {
    default: BaseButton,
    rounded: RoundedButton,
    ghost: GhostButton,
  }[variant];

  const SizeComponent = {
    sm: SmallButton,
    md: BaseButton,
    lg: LargeButton,
  }[size];

  return (
    <VariantComponent as={SizeComponent} dir={dir}>
      {icon && <img className="w-[24px] h-[24px]" src={icon} alt="" />}
      {children}
    </VariantComponent>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "rounded", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  dir: PropTypes.oneOf(["right", "left"]).isRequired,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: "default",
  size: "lg",
  dir: "left",
};

export default Button;
