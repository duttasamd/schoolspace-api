
exports.up = async function(knex) {
  return await knex.schema.createTable("users", table => {
     table.bigincrements();
     table.string('firstName').notNull();
     table.string('lastName').notNull();
     table.string('email');
     table.string('username').unique().notNull();
     table.string('password').notNull();
     table.bigint('roleID').unsigned().notNull().references('id').inTable('roles')
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
