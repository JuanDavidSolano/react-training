import { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./components/Layout/Header/Header";
import Cart from "./components/Cart/Cart/Cart";
import CartProvider from "./store/CartProvider";

import Meals from "./pages/Meals";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import OrderContent from "./components/Orders/OrderContent/OrderContent";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Switch>
          <Redirect exact from="/" to="/menu" />
          <Route path="/menu">
            <Meals />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
        </Switch>
      </main>
    </CartProvider>
  );
}

export default App;
