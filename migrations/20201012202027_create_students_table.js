
exports.up = function(knex) {
    return knex.schema.createTable("students", table => {
        table.bigincrements();
        table.bigint('userId').unsigned().references('id').inTable('users').unique();
        table.bigint('sectionId').unsigned().references('id').inTable('sections');
        table.integer('roll').notNull();
        table.unique(['sectionId', 'roll']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
};
