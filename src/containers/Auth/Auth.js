import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.module.css";

import { Redirect } from "react-router-dom";

import { updateObject } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: false
  };

  componentDidMount() {
    if (
      !this.props.building &&
      this.props.authRedirectPath !== "/"
    ) {
      this.props.setAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(
      this.state.controls,
      {
        [controlName]: updateObject(
          this.state.controls[controlName],
          {
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              this.state.controls[controlName].validation
            ),
            touched: true
          }
        )
      }
    );

    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElements = [];
    // { controls: { key: value, ... }}
    // => tansform into array to use map
    // [{ id: key, config: value }, ...]
    for (var key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={e =>
          this.inputChangedHandler(e, formElement.id)
        }
      />
    ));

    const errorMessage = this.props.error ? (
      <p style={{ color: "red", fontWeight: "bold" }}>
        Error: {this.props.error.message}
      </p>
    ) : null;

    let authPage = this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          <h3
            style={{
              textAlign: "left",
              paddingLeft: "10px"
            }}
          >
            {this.state.isSignup ? "Sign up" : "Sign in"}
          </h3>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          {this.state.isSignup ? "Sign in" : "Sign up"}
        </Button>
        {errorMessage}
      </div>
    );

    return this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : (
      authPage
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => ({
  auth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  setAuthRedirectPath: () =>
    dispatch(actions.setAuthRedirectPath("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
