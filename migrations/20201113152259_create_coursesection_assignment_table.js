exports.up = function(knex) {
    return knex.schema.createTable("coursesection_assignment", table => {
        table.bigincrements();
        table.bigint('coursesection_id').unsigned().notNull().references('id').inTable('course_section');
        table.bigint('assignment_id').unsigned().notNull().references('id').inTable('assignments');
        table.boolean('is_published').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.dateTime('published_at');
        table.dateTime('due_by');
    });
};

exports.down = function(knex) {
    knex.schema.table('courses', function (table) {
        table.dropForeign('coursesection_id');
        table.dropForeign('assignment_id');
    });
    return knex.schema.dropTableIfExists('coursesection_assignment');
};
