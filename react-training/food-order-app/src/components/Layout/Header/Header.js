import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import HeaderCartButton from "../../HeaderCartButton/HeaderCartButton";

import mealsImage from "../../../assets/meals.jpeg";
import styles from "./Header.module.css";
import useWindowSize from "../../../hooks/useWindowSize";

const Header = (props) => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const windowWidth = useWindowSize();
  console.info(windowWidth);

  const toggleNavMenu = () => {
    setShowNavMenu((prevState) => !prevState);
  };

  return (
    <>
      <header
        className={`${showNavMenu ? styles.responsive : styles.header} ${
          styles.header
        }`}
      >
        <h1>ReactMeals</h1>
        <ul>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/menu"
              onClick={toggleNavMenu}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/orders"
              onClick={toggleNavMenu}
            >
              Orders
            </NavLink>
          </li>
        </ul>
        <HeaderCartButton onClick={props.onShowCart} />
        {windowWidth.width < 600 && (
          <FaBars onClick={toggleNavMenu} className={styles.icon} />
        )}
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt={""} />
      </div>
    </>
  );
};

export default Header;
