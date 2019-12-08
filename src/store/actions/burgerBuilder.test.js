import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import axios from "../../axios.orders";

import * as actions from "./burgerBuilder";
import * as types from "../actions/actionTypes";
import { ingredientsMock } from "../../__mocks__";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("burgerBuilder actions", () => {
  it("should create an action to add an ingredient", () => {
    const ingName = "cheese";
    const expectedAction = {
      type: types.ADD_INGREDIENT,
      ingredientName: ingName
    };
    expect(actions.addIngredient(ingName)).toEqual(
      expectedAction
    );
  });

  it("should create an action to remove an ingredient", () => {
    const ingName = "cheese";
    const expectedAction = {
      type: types.REMOVE_INGREDIENT,
      ingredientName: ingName
    };
    expect(actions.removeIngredient(ingName)).toEqual(
      expectedAction
    );
  });

  it("Dispatches SET_INGREDIENTS after fetching ingredients", () => {
    // import and pass your custom axios instance
    moxios.install(axios);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: ingredientsMock
      });
    });

    const expectedActions = [
      {
        type: types.SET_INGREDIENTS,
        ingredients: {
          salad: 1,
          cheese: 1,
          meat: 1,
          bacon: 1
        }
      }
    ];
    const store = mockStore({ ingredients: {} });

    return store
      .dispatch(actions.initIngredients())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        // import and pass your custom axios instance
        moxios.uninstall(axios);
      });
  });
});
