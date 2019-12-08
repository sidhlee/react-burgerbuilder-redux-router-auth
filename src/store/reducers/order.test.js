import reducer from "./order";
import * as actionTypes from "../actions/actionTypes";

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      orders: [],
      loading: false,
      purchased: false
    });
  });

  it("should handle PURCHASE_INIT", () => {
    expect(
      reducer([], {
        type: actionTypes.PURCHASE_INIT
      })
    ).toMatchObject({
      purchased: false
    });
  });

  it("should handle PURCHASE_BURGER_START", () => {
    expect(
      reducer([], {
        type: actionTypes.PURCHASE_BURGER_START
      })
    ).toEqual({
      loading: true
    });
  });

  it("should handle PURCHASE_BURGER_SUCCESS", () => {
    const state = {
      orders: []
    };

    expect(
      reducer(state, {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: { name: "John Doe" },
        orderId: "123"
      })
    ).toEqual({
      loading: false,
      orders: [{ name: "John Doe", id: "123" }],
      purchased: true
    });
  });

  it("should handle PURCHASE_BURGER_FAIL", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.PURCHASE_BURGER_FAIL
        }
      )
    ).toEqual({ loading: false });
  });

  it("should handle FETCH_ORDERS_START", () => {
    expect(
      reducer({}, { type: actionTypes.FETCH_ORDERS_START })
    ).toEqual({ loading: true });
  });

  it("should handle FETCH_ORDERS_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.FETCH_ORDERS_SUCCESS,
          orders: [{ id: "123" }]
        }
      )
    ).toEqual({ orders: [{ id: "123" }], loading: false });
  });

  it("should handle FETCH_ORDERS_FAIL", () => {
    expect(
      reducer({}, { type: actionTypes.FETCH_ORDERS_FAIL })
    ).toEqual({ loading: false });
  });
});
