exports.up = function(knex) {
    return knex.schema.createTable('attendances', table => {
        table.bigincrements();
        table.bigint('user_id')
            .unsigned().notNull().references('id').inTable('users');
        table.bigint('section_id')
            .unsigned().notNull().references('id').inTable('sections')
        table.date('date');
        table.bigint('logged_by')
            .unsigned().references('id').inTable('users');
        table.string('note');
        table.boolean('is_present');
        table.timestamps();
        table.unique(['user_id', 'date']);
    });
};

exports.down = function(knex) {
    knex.schema.table('attendances', function (table) {
        table.dropForeign('user_id');
        table.dropForeign('section_id');
        table.dropForeign('logged_by');
    });
    return knex.schema.dropTableIfExists('attendances');
};