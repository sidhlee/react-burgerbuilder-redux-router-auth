import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import axios from "../../axios.orders";

import * as actionTypes from "./actionTypes";
import * as actions from "./order";
import {
  orderDataMock,
  ingredientsMock,
  formDataMock
} from "../../__mocks__";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("order actions", () => {
  it("should create an action with orderId and orderData for successful burger purchase", () => {
    const orderId = "99";
    const orderData = { cheese: 1 };
    const expectedAction = {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId,
      orderData
    };
    expect(
      actions.purchaseBurgerSuccess(orderId, orderData)
    ).toEqual(expectedAction);
  });

  describe("async actions", () => {
    beforeEach(() => {
      moxios.install(axios);
    });
    afterEach(() => {
      moxios.uninstall(axios);
    });

    describe("purchaseBurger", () => {
      it("creates PURCHASE_BURGER_SUCCESS when placcing order has been done", () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { name: "orderId" }
          });
        });
        const expectedActions = [
          { type: actionTypes.PURCHASE_BURGER_START },
          {
            type: actionTypes.PURCHASE_BURGER_SUCCESS,
            orderId: "orderId",
            orderData: orderDataMock
          }
        ];
        const store = mockStore({});
        return store
          .dispatch(
            actions.purchaseBurger(orderDataMock, "token")
          )
          .then(() => {
            expect(store.getActions()).toEqual(
              expectedActions
            );
          });
      });
    });
    describe("fetchOrders", () => {
      it("creates FETCH_ORDERS_SUCCESS with orders when fetching orders has been done", () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              orderId: {
                ingredients: ingredientsMock,
                orderData: formDataMock,
                price: 5
              }
            }
          });
        });
        const expectedActions = [
          { type: actionTypes.FETCH_ORDERS_START },
          {
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            orders: [
              {
                ingredients: ingredientsMock,
                orderData: formDataMock,
                price: 5,
                id: "orderId"
              }
            ]
          }
        ];
        const store = mockStore({});
        return store
          .dispatch(actions.fetchOrders("token", "userId"))
          .then(() => {
            expect(store.getActions()).toEqual(
              expectedActions
            );
          });
      });
    });
  });

  it("should create an action to initialize purchase", () => {
    const expectedAction = {
      type: actionTypes.PURCHASE_INIT
    };
    expect(actions.purchaseInit()).toEqual(expectedAction);
  });
});
