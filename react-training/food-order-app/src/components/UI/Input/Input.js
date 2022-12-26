import React from "react";

import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${styles.input} ${props.isColumn && styles.column}`}>
      <label>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
