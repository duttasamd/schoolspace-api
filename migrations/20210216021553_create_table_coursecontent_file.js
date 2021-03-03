exports.up = function(knex) {
    return knex.schema.createTable("coursecontent_file", table => {
        table.bigincrements();
        table.bigint('coursecontent_id').unsigned().notNull()
            .references('id').inTable('coursecontents');
        table.uuid('file_id').notNull()
            .references('id').inTable('files')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    knex.schema.table('coursecontent_file', function (table) {
        table.dropForeign('coursecontent_id');
        table.dropForeign('file_id');
    });
    return knex.schema.dropTableIfExists('coursecontent_file');
};