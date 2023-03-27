const knex = require('../database/knex');

class FoodsController {
  async create(req, res) {
    const { user_id } = req.params
    const { nome, avatar, categoria, preco, descricao, ingredients } = req.body;

    const food_id = await knex('foods').insert({
      user_id,
      nome,
      avatar,
      categoria,
      preco,
      descricao
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        food_id: food_id[0],
        ingredient
      }
    })

    if(ingredientsInsert.length){
      await knex('ingredients').insert(ingredientsInsert)
    } 

    res.json(`Food created successfully`)
  }

  async update(req, res) { }

  async delete(req, res) { }

  async index(req, res) { }

  async get(req, res) { }

}

module.exports = FoodsController