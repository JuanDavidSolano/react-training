import styles from "./OrderContentItem.module.css";

const OrderContentItem = (props) => {
  return (
    <li className={styles["order-item"]}>
      <div className={styles.summary}>
        <h3>{props.name}</h3>
        <span className={styles.amount}>x {props.amount}</span>
      </div>
    </li>
  );
};

export default OrderContentItem;
