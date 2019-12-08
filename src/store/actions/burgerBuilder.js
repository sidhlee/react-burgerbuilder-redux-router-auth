import * as actionTypes from "./actionTypes";
import axios from "../../axios.orders";

export const addIngredient = ingName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName
});

export const removeIngredient = ingName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName
});

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    return axios
      .get(
        "https://react-my-burger-41a2a.firebaseio.com/ingredients.json"
      ) // make sure to include .json at the end!! (or you'll get a cors error)
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
