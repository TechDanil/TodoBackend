exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('last_name').notNullable();
        table.string('patronymic');
        table.string('login').notNullable().unique();
        table.string('password').notNullable();
        table.integer('supervisor_id').unsigned().references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("users");
};
