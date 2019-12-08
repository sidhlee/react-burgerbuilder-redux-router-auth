import * as actionTypes from "./actionTypes";
import axios from "../../axios.orders";

export const purchaseBurgerSuccess = (
  orderId,
  orderData
) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    return axios
      .post("/orders.json?auth=" + token, orderData)
      .then(res => {
        dispatch(
          purchaseBurgerSuccess(res.data.name, orderData)
        );
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

/* 
By default, REST requests are executed with no authentication 
and will only succeed if the Realtime Database Rules 
allow public read or write access to the data. 
To authenticate your request, use the 
access_token= or auth= query parameters.

Learn more about authentication through the REST API 
in https://firebase.google.com/docs/database/rest/auth */
export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    // https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-ordered-data
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    return axios
      .get("/orders.json" + queryParams) // https://firebase.google.com/docs/database/rest/auth
      .then(res => {
        // data transformation in thunkedActionCreator
        // (so that reducer just takes data it needs)
        // { id: {ingredients, orderData, price }, ...}
        // =>
        // [{ingredients, orderData, price, id}, ...]
        // (we're going to map array members into Order Components)
        // ** Maping, Filtering or Reducing list of things -> ARRAY!! **
        const fetchedOrders = [];
        for (var key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
