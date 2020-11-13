exports.up = function(knex) {
    return knex.schema.createTable("course_section", table => {
        table.bigincrements();
        table.bigint('course_id').unsigned().notNull().references('id').inTable('courses');
        table.bigint('section_id').unsigned().notNull().references('id').inTable('sections');
    });
};

exports.down = function(knex) {
    knex.schema.table('course_section', function (table) {
        table.dropForeign('course_id');
        table.dropForeign('section_id');
    });
    return knex.schema.dropTableIfExists('course_section');
};