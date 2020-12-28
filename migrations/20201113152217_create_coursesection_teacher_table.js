
exports.up = function(knex) {
    return knex.schema.createTable("coursesection_teacher", table => {
        table.bigincrements();
        table.bigint('coursesection_id').unsigned().notNull().references('id').inTable('course_section');
        table.bigint('teacher_id').unsigned().notNull().references('id').inTable('teachers');
    });
};

exports.down = function(knex) {
    knex.schema.table('courses', function (table) {
        table.dropForeign('coursesection_id');
        table.dropForeign('teacher_id');
    });
    return knex.schema.dropTableIfExists('coursesection_teacher');
};
