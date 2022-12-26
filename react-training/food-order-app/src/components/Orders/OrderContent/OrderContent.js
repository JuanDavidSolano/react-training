import Modal from "../../UI/Modal/Modal";
import OrderContentItem from "../OrderContentItem/OrderContentItem";

import styles from "./OrderContent.module.css";

const OrderContent = (props) => {
  const orderContentItems = props.items.map((item) => {
    console.info(item);
    return (
      <OrderContentItem name={item.name} amount={item.amount} key={item.id} />
    );
  });

  return (
    <Modal onClose={props.onClose}>
      <div className={styles["order-items"]}>{orderContentItems}</div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default OrderContent;
