exports.up = function(knex) {
    return knex.schema.createTable("courses", table => {
        table.bigincrements();
        table.string('name');
        table.bigint('subject_id').unsigned().notNull().references('id').inTable('subjects');
    });
};

exports.down = function(knex) {
    knex.schema.table('courses', function (table) {
        table.dropForeign('subject_id');
    });
    return knex.schema.dropTableIfExists('courses');
};