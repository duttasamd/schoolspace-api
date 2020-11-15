exports.up = function(knex) {
    return knex.schema.createTable("entitygroups", table => {
        table.bigincrements();
        table.bigint('group_id').unsigned().notNull().references('id').inTable('groups');
        table.string('role').notNull();
        table.string('entity').nullable();
        table.bigint('entity_id').nullable();
    });
};

exports.down = function(knex) {
    knex.schema.table('entitygroups', function (table) {
        table.dropForeign('subject_id');
    });
    return knex.schema.dropTableIfExists('entitygroups');
};