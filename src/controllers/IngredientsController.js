const knex = require('../database/knex');

class IngredientsCotroller {
  async index(req, res) { }

  async get(req, res) {
    const { id } = req.params
    const maxId = await knex('ingredients').where({food_id: id}).max('id as maxId')
    const nextId = maxId[0].maxId ? maxId[0].maxId + 1 : 1

    return res.json(nextId)
  }
}

module.exports = IngredientsCotroller