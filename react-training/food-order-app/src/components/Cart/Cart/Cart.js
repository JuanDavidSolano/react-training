import axios from "axios";

import { useContext, useState } from "react";

import CartItem from "../CartItem/CartItem";
import CartContext from "../../../store/cart-context";

import Modal from "../../UI/Modal/Modal";

import styles from "./Cart.module.css";
import Checkout from "../Checkout/Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    console.info(item.name);
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={`item ${item.id}`}
      price={item.price * item.amount}
      name={item.name}
      amount={item.amount}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const onOrderHandler = () => {
    setShowCheckout(true);
  };

  const onCancelOrder = () => {
    setShowCheckout(false);
  };

  const onConfirmHandler = (userInfo) => {
    const order = {
      userInfo,
      cart: cartCtx.items,
      total: cartCtx.totalAmount.toFixed(2),
    };

    props.onClose();

    for (const item of cartCtx.items) {
      for (let i = 0; i < item.amount; i++) {
        cartCtx.removeItem(item.id);
      }
    }
    axios.post(
      "https://starwars-api-7f80e-default-rtdb.firebaseio.com/orders.json",
      order
    );
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={styles["cart-items"]}>{cartItems}</div>

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={styles.button} onClick={onOrderHandler}>
            Order
          </button>
        )}
      </div>
      <div>
        {showCheckout && (
          <Checkout onConfirm={onConfirmHandler} onCancel={onCancelOrder} />
        )}
      </div>
    </Modal>
  );
};

export default Cart;
