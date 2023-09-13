exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.timestamp('end_date').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.enum('priority', ['High', 'Medium', 'Low']).notNullable();
    table.enum('status', ['to be executed', 'in progress', 'completed', 'canceled']).notNullable();
    table.integer('creator_id').unsigned().references('id').inTable('users');
    table.integer('responsible_id').unsigned().references('id').inTable('users');
  });
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks").dropTableIfExists("tasks");
};
