
exports.up = function(knex) {
    return knex.schema.createTable("teachers", table => {
        table.bigincrements();
        table.bigint('userId').unsigned().references('id').inTable('users').unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('teachers');
};
