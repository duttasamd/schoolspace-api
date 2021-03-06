
exports.up = async function(knex) {
    return knex.schema.createTable("roles", table => {
        table.bigincrements();
        table.string('name').notNull();
    });
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('roles');
};
