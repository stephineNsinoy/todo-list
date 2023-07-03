import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Container = ({ children, className }) => (
  <div className={cn(styles.Container, className)}>{children}</div>
);

Container.defaultProps = {
  className: null,
  children: null,
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Container;
