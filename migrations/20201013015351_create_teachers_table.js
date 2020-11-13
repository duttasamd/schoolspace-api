
exports.up = function(knex) {
    return knex.schema.createTable("teachers", table => {
        table.bigincrements();
        table.bigint('user_id').unsigned().references('id').inTable('users').unique();
    });
};

exports.down = function(knex) {
    knex.schema.table('teachers', function (table) {
        table.dropForeign('user_id');
    });
    return knex.schema.dropTableIfExists('teachers');
};
