import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios.orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  isPurchaseable() {
    const oldIngredients = { ...this.props.ings };
    const totalIngredients = Object.keys(
      oldIngredients
    ).reduce(
      (count, types) => count + oldIngredients[types],
      0
    );
    return totalIngredients >= 1;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue!');
    this.props.initPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (var ing in disabledInfo) {
      disabledInfo[ing] = disabledInfo[ing] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            disabled={disabledInfo}
            totalPrice={this.props.price}
            purchaseable={this.isPurchaseable()}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.price}
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingName =>
      dispatch(actions.addIngredient(ingName)),
    removeIngredient: ingName =>
      dispatch(actions.removeIngredient(ingName)),
    initIngredients: () =>
      dispatch(actions.initIngredients()),
    initPurchase: () => dispatch(actions.purchaseInit()),
    setAuthRedirectPath: path =>
      dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
