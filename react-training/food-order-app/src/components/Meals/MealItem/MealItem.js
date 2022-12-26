import { useContext } from "react";
import { Link } from "react-router-dom";

import MealItemForm from "../MealItemForm/MealItemForm";
import CartContext from "../../../store/cart-context";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>
          {
            <Link className={styles["meal-link"]} to={`/product/${props.id}`}>
              {props.name}
            </Link>
          }
        </h3>
        <p className={styles.description}>{props.description}</p>
        <h3 className={styles.price}>${props.price}</h3>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
