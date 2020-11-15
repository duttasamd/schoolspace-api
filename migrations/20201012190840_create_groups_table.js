exports.up = function(knex) {
    return knex.schema.createTable("groups", table => {
        table.bigincrements();
        table.string('name').notNull();
        table.string('type').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('groups');
};