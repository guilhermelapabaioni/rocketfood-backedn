class IngredientServices {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async getIngredientMaxId(food_id) {
    const maxId = await this.ingredientRepository.maxId(food_id);

    const nextId = maxId[0].maxId ? maxId[0].maxId + 1 : 1

    return nextId
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
    try {
      const existingIngredients = await this.ingredientRepository.findById(food_id)

      const existingIngredientsIds = existingIngredients.map(ingredient => ingredient.id)

      if (oldIngredients.length) {
        if (JSON.stringify(existingIngredients) !== JSON.stringify(oldIngredients)) {
          const oldIngredientsIds = oldIngredients.map(ingredient => ingredient.id)

          const removedIngredientsId = existingIngredientsIds.filter(id => !oldIngredientsIds.includes(id))

          if (removedIngredientsId.length) {
            await this.ingredientRepository.deleteIngredient(removedIngredientsId)
          }
        }
      }

      if (ingredients.length) {
        if (JSON.stringify(existingIngredients) !== JSON.stringify(ingredients)) {
          const ingredientsIds = ingredients.map(ingredient => ingredient.id)


          if (ingredientsIds.length) {
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
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = IngredientServices