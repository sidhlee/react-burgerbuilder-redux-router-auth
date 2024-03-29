import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // transform obj into array for list-iteration
  let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map(
        (_, i) => {
          return (
            <BurgerIngredient
              key={igKey + i}
              type={igKey}
            />
          );
        }
      );
    })
    .reduce((result, arr) => {
      return result.concat(arr);
    }, []);
  if (transformedIngredient.length === 0) {
    transformedIngredient = (
      <p>Please start adding ingredients!</p>
    );
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
