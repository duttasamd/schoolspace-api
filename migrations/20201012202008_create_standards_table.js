
exports.up = function(knex) {
    return knex.schema.createTable("standards", table => {
        table.bigincrements();
        table.string('name').unique().notNull();
        table.integer('sequence').unique().notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('standards');
};
