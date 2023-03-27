
exports.up = knex =>
  knex.schema.createTable('foods', table => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users')
    table.text('nome');
    table.text('avatar').nullable();
    table.text('categoria')
    table.double('preco')
    table.text('descricao')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })



exports.down = knex => knex.schema.dropTable('foods')
