import reducer from "./burgerBuilder";
import * as types from "../actions/actionTypes";

describe("burgerBuilder reducer", () => {
  it("should return the initial state", () => {
    const BASE_PRICE = 3;
    const initialState = {
      ingredients: null,
      totalPrice: BASE_PRICE,
      error: false,
      building: false
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_INGREDIENT", () => {
    const mockState = {
      ingredients: {
        cheese: 0
      },
      totalPrice: 0
    };
    expect(
      reducer(mockState, {
        type: types.ADD_INGREDIENT,
        ingredientName: "cheese"
      })
    ).toEqual({
      ingredients: { cheese: 1 },
      totalPrice: 0.4,
      building: true
    });
  });

  it("should handle REMOVE_INGREDIENT", () => {
    const mockState = {
      ingredients: {
        cheese: 1
      },
      totalPrice: 0.4
    };
    expect(
      reducer(mockState, {
        type: types.REMOVE_INGREDIENT,
        ingredientName: "cheese"
      })
    ).toEqual({
      ingredients: { cheese: 0 },
      totalPrice: 0,
      building: true
    });
  });

  it("should handle SET_INGREDIENTS", () => {
    expect(
      reducer(
        {},
        {
          type: types.SET_INGREDIENTS,
          ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 3,
            meat: 4
          }
        }
      )
    ).toEqual({
      ingredients: {
        salad: 1,
        bacon: 2,
        cheese: 3,
        meat: 4
      },
      totalPrice: 3 + 1 * 0.5 + 2 * 0.7 + 3 * 0.4 + 4 * 1.3,
      error: false,
      building: true
    });
  });

  it("should handle FETCH_INGREDIENTS_FAILED", () => {
    expect(
      reducer(
        {},
        {
          type: types.FETCH_INGREDIENTS_FAILED
        }
      )
    ).toEqual({ error: true });
  });
});
