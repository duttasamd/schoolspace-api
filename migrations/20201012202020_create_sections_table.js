
exports.up = function(knex) {
    return knex.schema.createTable("sections", table => {
        table.bigincrements();
        table.string('name');
        table.bigint('standardId').unsigned().references('id').inTable('standards');
        table.unique(['name', 'standardId']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sections');
};
