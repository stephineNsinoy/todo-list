import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Icon = ({ id, icon, className }) => (
  <i className={cn(styles.Icon, className)} id={id}>
    {icon}
  </i>
);

Icon.defaultProps = {
  id: null,
  className: null,
};

Icon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default Icon;
