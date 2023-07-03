import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Checkbox = ({ checked, className, onChange, disabled }) => (
  <div
    className={cn(className, styles.Checkbox, {
      [styles.Checkbox___disabled]: disabled,
    })}
    id={`${name}-container`}
  >
    <input
      checked={checked}
      className={styles.Checkbox_input}
      disabled={disabled}
      id={name}
      name={name}
      type="checkbox"
      onChange={onChange}
    />
  </div>
);

Checkbox.defaultProps = {
  checked: false,
  className: null,
  disabled: false,
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;
