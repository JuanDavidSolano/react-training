import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClickHandler}
      type="button"
      className={styles.button}
    >
      {props.label}
    </button>
  );
};

export default Button;
