import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];
const buildControls = props => (
  <div className={classes.BuildControls}>
    {/* prevent binary floating point problem */}
    <p>
      Current Price:{" "}
      <strong>{"$" + props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.type}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() =>
          props.ingredientRemoved(control.type)
        }
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
    </button>
  </div>
);

export default buildControls;
