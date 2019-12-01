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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const logoutOnExpiration = secondsToExpire => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, secondsToExpire * 1000);
  };
};

export const auth = (email, password, isSignup) => {
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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem(
          "expirationDate",
          expirationDate
        );
        localStorage.setItem("userId", res.data.localId);
        dispatch(
          authSuccess(res.data.idToken, res.data.localId)
        );
        dispatch(logoutOnExpiration(res.data.expiresIn));
      })
      .catch(err => {
        // axios wraps response inside error object
        // whose message is just 400
        // To use firebase' detailed error obj, you need to reach into
        // the response.data.error
        console.error(
          `[actions:auth(thunk)] url: ${url} err:`,
          err
        );
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  // we want to dispatch multiple actions within this
  // "thunked" action
  return dispatch => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(
      localStorage.getItem("expirationDate")
    );
    if (!token || expirationDate < new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      // CAUTION: GOTCHA!!
      // Date.getSeconds DOES NOT return the total
      // const secondsToExpire =
      //   expirationDate.getSeconds() -
      //   new Date().getSeconds();
      const secondsToExpire =
        (expirationDate.getTime() - new Date().getTime()) /
        1000;
      dispatch(logoutOnExpiration(secondsToExpire));
    }
  };
};
