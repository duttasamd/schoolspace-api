exports.up = function(knex) {
    return knex.schema.createTable('files', table => {
        table.uuid('id').primary();
        table.string('filename');
        table.string('filetype');
        table.bigint('uploaded_by')
            .unsigned().notNull().references('id').inTable('users');
        table.string('description');
        table.string('bucket');
        table.string('url');
        table.timestamps();
    });
};

exports.down = function(knex) {
    knex.schema.table('files', function (table) {
        table.dropForeign('uploaded_by');
    });
    return knex.schema.dropTableIfExists('files');
};