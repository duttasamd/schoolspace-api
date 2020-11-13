exports.up = function(knex) {
    return knex.schema.createTable("subjects", table => {
        table.bigincrements();
        table.string('name');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('subjects');
};
