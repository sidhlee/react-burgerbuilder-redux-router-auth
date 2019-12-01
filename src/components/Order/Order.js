import React from "react";
import classes from "./Order.module.css";

const order = props => {
  const ingredientsOutput = Object.keys(
    props.ingredients
  ).map(v => (
    <span className={classes.IngSpan} key={v}>
      {v} ({props.ingredients[v]})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price:
        <strong>
          {" "}
          USD {Number.parseFloat(props.price).toFixed(2)}
        </strong>
      </p>
    </div>
  );
};

export default order;
