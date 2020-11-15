exports.up = function(knex) {
    return knex.schema.createTable("group_group", table => {
        table.bigincrements();
        table.bigint('group_id').unsigned().notNull().references('id').inTable('groups');
        table.bigint('linkedgroup_id').unsigned().notNull().references('id').inTable('groups');
    });
};

exports.down = function(knex) {
    knex.schema.table('group_group', function (table) {
        table.dropForeign('group_id');
        table.dropForeign('linkedgroup_id');
    });
    return knex.schema.dropTableIfExists('group_group');
};