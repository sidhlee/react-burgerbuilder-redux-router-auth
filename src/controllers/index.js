// ingredients: { ingredient: number,... }
export const sumIngredientPrices = (
  ingredients,
  ingredientPrices,
  basePrice
) => {
  const newPrice =
    basePrice +
    Object.keys(ingredients).reduce((sum, key) => {
      return sum + ingredients[key] * ingredientPrices[key];
    }, 0);
  return newPrice;
};

export default {
  sumIngredientPrices
};
