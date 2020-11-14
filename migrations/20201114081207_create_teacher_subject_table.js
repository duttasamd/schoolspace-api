exports.up = function(knex) {
    return knex.schema.createTable("teacher_subject", table => {
        table.bigincrements();
        table.bigint('teacher_id').unsigned().notNull().references('id').inTable('teachers');
        table.bigint('subject_id').unsigned().notNull().references('id').inTable('subjects');
        table.string('preferred_level');
    });
};

exports.down = function(knex) {
    knex.schema.table('teacher_subject', function (table) {
        table.dropForeign('teacher_id');
        table.dropForeign('subject_id');
    });
    return knex.schema.dropTableIfExists('teacher_subject');
};