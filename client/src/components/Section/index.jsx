import cn from "classnames";
import PropTypes from "prop-types";

import { Text } from "..";
import { textTypes } from "../constants";

import styles from "./styles.module.scss";

const Section = ({ id, children, className, titleClassName, title }) => (
  <section className={cn(styles.Section, className)} id={id}>
    {title && (
      <div className={cn(styles.Section_title, titleClassName)}>
        <Text
          className={cn(styles.Section_title_text, titleClassName)}
          id={id ? `${id}-title` : null}
          type={textTypes.HEADING.XL}
        >
          {title}
        </Text>
      </div>
    )}
    {children}
  </section>
);

Section.defaultProps = {
  id: null,
  className: null,
  children: null,
  title: null,
};

Section.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Section;
