import { useState } from "react";

import Button from "../../UI/Button/Button";
import OrderContent from "../OrderContent/OrderContent";

import styles from "./OrderItem.module.css";

const OrderItem = (props) => {
  const [orderContentIsShown, setOrderContentIsShown] = useState(false);

  const showOrderContentHandler = () => {
    setOrderContentIsShown(true);
  };

  const hideOrderContentHandler = () => {
    setOrderContentIsShown(false);
  };

  return (
    <>
      {orderContentIsShown && (
        <OrderContent items={props.items} onClose={hideOrderContentHandler} />
      )}
      <li className={styles.order}>
        <div className={styles.summary}>
          <h3>{props.name}</h3>
          <p className={styles.address}>{`${props.address}, ${props.city}`}</p>
          <h3 className={styles.total}>${props.total}</h3>
        </div>
        <Button
          label="See items"
          onClickHandler={showOrderContentHandler}
          className={styles.button}
        />
      </li>
    </>
  );
};

export default OrderItem;
