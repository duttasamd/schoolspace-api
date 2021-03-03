exports.up = function(knex) {
    return knex.schema.createTable('holidays', table => {
        table.bigincrements();
        table.string('name');
        table.integer('type');
        table.date('date');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('holidays');
};