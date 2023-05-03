
exports.up = knex =>
  knex.schema.createTable('foods', table => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users')
    table.text('image').nullable();
    table.text('name');
    table.text('category')
    table.double('price')
    table.text('description')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })



exports.down = knex => knex.schema.dropTable('foods')
