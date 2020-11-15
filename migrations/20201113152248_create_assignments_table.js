
exports.up = function(knex) {
    return knex.schema.createTable("assignments", table => {
        table.bigincrements();
        table.string('name').notNull();
        table.text('instructions');
        table.string('filepath');
        table.bigint('createdby').unsigned().notNull().references('id').inTable('teachers');
    });
};

exports.down = function(knex) {
    knex.schema.table('assignments', function (table) {
        table.dropForeign('createdby');
    });
    return knex.schema.dropTableIfExists('assignments');
};
