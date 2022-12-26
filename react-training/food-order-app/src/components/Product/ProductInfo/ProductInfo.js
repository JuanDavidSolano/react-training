import axios from "axios";
import { useEffect, useCallback, useState, useContext } from "react";

import styles from "./ProductInfo.module.css";

import Card from "../../UI/Card/Card";
import MealItemForm from "../../Meals/MealItemForm/MealItemForm";

import CartContext from "../../../store/cart-context";

const ProductInfo = (props) => {
  const [product, setProduct] = useState({});
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    console.info("PI", amount);
    cartCtx.addItem({
      id: props.id,
      name: product.name,
      amount: amount,
      price: product.price,
    });
  };

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://starwars-api-7f80e-default-rtdb.firebaseio.com/meals/${props.id}.json`
      );
      if (response.status !== 200) throw new Error("Something went wrong!");

      const productData = await response.data;

      console.info(productData);
      setProduct(productData);
    } catch (error) {
      console.info(error);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <section className={styles["product-info"]}>
      <Card>
        <div className={styles.summary}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
        <img src={product.img} alt="" />
      </Card>
    </section>
  );
};

export default ProductInfo;
