exports.up = function(knex) {
    return knex.schema.createTable("user_group", table => {
        table.bigincrements();
        table.bigint('group_id').unsigned().notNull().references('id').inTable('groups');
        table.bigint('user_id').unsigned().notNull().references('id').inTable('users');
    });
};

exports.down = function(knex) {
    knex.schema.table('user_group', function (table) {
        table.dropForeign('group_id');
        table.dropForeign('user_id');
    });
    return knex.schema.dropTableIfExists('user_group');
};