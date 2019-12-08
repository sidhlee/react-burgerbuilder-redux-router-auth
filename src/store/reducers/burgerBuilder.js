import * as actionTypes from "../actions/actionTypes";
import { sumIngredientPrices } from "../../controllers/";
import { updateObject } from "../../shared/utility";

const BASE_PRICE = 3;

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  error: false,
  building: false
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]:
      state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(
    state.ingredients,
    updatedIngredient
  );
  const newState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice +
      INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, newState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]:
      state.ingredients[action.ingredientName] - 1
  };
  const updatedIngredients = updateObject(
    state.ingredients,
    updatedIngredient
  );
  const newState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice -
      INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, newState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: sumIngredientPrices(
      action.ingredients,
      INGREDIENT_PRICES,
      BASE_PRICE
    ),
    error: false, // in case we had an error earlier
    building: true
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
