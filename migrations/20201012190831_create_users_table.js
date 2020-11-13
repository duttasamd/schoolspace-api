
exports.up = async function(knex) {
  return await knex.schema.createTable("users", table => {
     table.bigincrements();
     table.string('firstName').notNull();
     table.string('lastName').notNull();
     table.string('email');
     table.string('phone');
     table.string('username').unique().notNull();
     table.string('password').notNull();
     table.string('refresh_token').nullable();
     table.date('dateOfBirth').notNull();
     table.bigint('role_id').unsigned().notNull().references('id').inTable('roles')
  });
};

exports.down = function(knex) {
    knex.schema.table('users', function (table) {
      table.dropForeign('role_id')
    });
    return knex.schema.dropTableIfExists('users');
};
