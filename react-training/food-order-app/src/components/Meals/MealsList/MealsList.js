import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";

import styles from "./MealsList.module.css";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://starwars-api-7f80e-default-rtdb.firebaseio.com/meals.json"
      );
      if (response.status !== 200) throw new Error("Something went wrong!");

      const mealsDataObject = await response.data;

      const mealsData = [];

      for (const key in mealsDataObject) {
        mealsData.push({
          id: key,
          name: mealsDataObject[key].name,
          description: mealsDataObject[key].description,
          price: mealsDataObject[key].price,
        });
      }

      setMeals(mealsData);
    } catch (error) {
      console.info(error);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsList;
