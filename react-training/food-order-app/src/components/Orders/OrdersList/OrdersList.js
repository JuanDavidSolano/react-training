import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import OrderItem from "../OrderItem/OrderItem";
import Card from "../../UI/Card/Card";

import styles from "./OrdersList.module.css";

const OrdersList = (props) => {
  const [orders, setOrders] = useState([]);

  const fecthOrders = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://starwars-api-7f80e-default-rtdb.firebaseio.com/orders.json"
      );
      if (response.status !== 200) throw new Error("Something went wrong!");

      const ordersDataObject = await response.data;

      console.info(ordersDataObject);

      const ordersData = [];

      for (const key in ordersDataObject) {
        ordersData.push({
          id: key,
          cart: ordersDataObject[key].cart,
          userInfo: ordersDataObject[key].userInfo,
          total: ordersDataObject[key].total,
        });
      }

      console.info(ordersData);

      setOrders(ordersData);
    } catch (error) {
      console.info(error);
    }
  }, []);

  useEffect(() => {
    fecthOrders();
  }, []);

  const ordersList = orders.map((order) => {
    return (
      <OrderItem
        key={order.id}
        id={order.id}
        total={order.total}
        address={order.userInfo.address}
        city={order.userInfo.city}
        name={order.userInfo.name}
        items={order.cart}
      />
    );
  });
  return (
    <section className={styles.orders}>
      <Card>
        <ul>{ordersList}</ul>
      </Card>
    </section>
  );
};

export default OrdersList;
