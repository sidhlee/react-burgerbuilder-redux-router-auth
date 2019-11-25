import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  console.log("thunk: auth is dispatched");
  return dispatch => {
    dispatch(authStart());
    const payload = {
      email,
      password,
      returnSecureToken: true
    };
    const url = isSignup
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPGXurrG0sPfBIpZ7DYjFb74OOgKjo17k"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPGXurrG0sPfBIpZ7DYjFb74OOgKjo17k";
    axios
      .post(url, payload)
      .then(res => {
        console.log(res);
        dispatch(
          authSuccess(res.data.idToken, res.data.localId)
        );
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        // axios wraps response inside error object
        // whose message is just 400
        // To use firebase' detailed error obj, you need to reach into
        // the response.data.error
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
