exports.up = function(knex) {
    return knex.schema.createTable("forums", table => {
        table.bigincrements();
        table.integer('type').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('forums');
};