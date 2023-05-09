class IngredientServices {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async createIngredient({ food_id, ingredients }) {
    if (ingredients) {
      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          food_id: food_id,
          ingredient
        }
      })

      if (ingredientsInsert.length) {
        const ingredientCreated = await this.ingredientRepository.createIngredient(ingredientsInsert)

        return ingredientCreated
      }
    }
  }

  async updateIngredient({ food_id, oldIngredients, ingredients }) {
    const existingIngredients = await this.ingredientRepository.findById(food_id)
    console.log(food_id);

    const existingIngredientsIds = existingIngredients.map(ingredient => ingredient.id)

    if (JSON.stringify(existingIngredients) !== JSON.stringify(oldIngredients)) {
      const oldIngredientsIds = oldIngredients.map(ingredient => ingredient.id)

      const removedIngredientsId = existingIngredientsIds.filter(id => !oldIngredientsIds.includes(id))

      if (removedIngredientsId.length) {
        await this.ingredientRepository.deleteIngredient(removedIngredientsId)
      }
    }

    if (JSON.stringify(existingIngredients) !== JSON.stringify(ingredients)) {
      const ingredientsIds = ingredients.map(ingredient => ingredient.id)

      const addedIngredientsIds = existingIngredients.filter(id => !ingredientsIds.includes(id))
      if (addedIngredientsIds.length) {
        const ingredientsInsert = ingredients.map(ingredient => {
          return {
            food_id: food_id,
            ingredient
          }
        })

        await this.ingredientRepository.createIngredient(
          ingredientsInsert
        )
      }
    }
  }
}

module.exports = IngredientServices