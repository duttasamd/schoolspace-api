
exports.up = function(knex) {
    return knex.schema.createTable("sections", table => {
        table.bigincrements();
        table.string('name');
        table.bigint('standard_id').unsigned().references('id').inTable('standards');
        table.unique(['name', 'standard_id']);
    });
};

exports.down = function(knex) {
    knex.schema.table('sections', function (table) {
        table.dropForeign('standard_id')
    });
    return knex.schema.dropTableIfExists('sections');
};
