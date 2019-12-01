import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // This could be a functional component.(using componentWillUpdate for testing purpose)

  render() {
    const orderSummary = Object.keys(
      this.props.ingredients
    ).map(type => {
      return (
        <li key={type}>
          <span style={{ textTransform: "capitalize" }}>
            {type}
          </span>
          : {this.props.ingredients[type]}
        </li>
      );
    });

    const priceTotal =
      "$" + this.props.totalPrice.toFixed(2);
    return (
      <Aux>
        <div className={classes.OrderSummary}>
          <h3>Your Order</h3>
          <p>
            A delicious burger with the following
            ingredients:
          </p>
          <ul>{orderSummary}</ul>
          <p>Total: {priceTotal}</p>
          <p>Continue to Checkout?</p>
          <Button
            btnType="Danger"
            clicked={this.props.purchaseCanceled}
          >
            CANCEL
          </Button>
          <Button
            btnType="Success"
            clicked={this.props.purchaseContinued}
          >
            CONTINUE
          </Button>
        </div>
      </Aux>
    );
  }
}

export default OrderSummary;
