
exports.up = function(knex) {
    return knex.schema.createTable("students", table => {
        table.bigincrements();
        table.bigint('user_id').unsigned().references('id').inTable('users').unique();
        table.bigint('section_id').unsigned().references('id').inTable('sections');
        table.integer('roll').notNull();
        table.unique(['section_id', 'roll']);
    });
};

exports.down = function(knex) {
    knex.schema.table('students', function (table) {
        table.dropForeign('user_id');
        table.dropForeign('section_id');
    });
    
    return knex.schema.dropTableIfExists('students');
};
