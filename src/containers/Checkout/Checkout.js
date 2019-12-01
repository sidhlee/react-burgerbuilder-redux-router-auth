import React, { Component } from "react";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary =
      this.props.ings && !this.props.purchased ? (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={
              this.checkoutCancelledHandler
            }
            checkoutContinued={
              this.checkoutContinuedHandler
            }
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      ) : (
        <Redirect to="/" />
      );

    return summary;
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
