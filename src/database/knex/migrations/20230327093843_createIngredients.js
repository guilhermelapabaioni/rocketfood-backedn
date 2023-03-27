
exports.up = knex => knex.schema.createTable('ingredients', table => {
  table.increments('id')
  table.integer('food_id').references('id').inTable('foods').onDelete('CASCADE')
  table.text('ingredient')
  table.timestamp('created_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('ingredients')
