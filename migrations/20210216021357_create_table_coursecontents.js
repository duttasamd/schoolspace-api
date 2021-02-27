exports.up = function(knex) {
    return knex.schema.createTable("coursecontent", table => {
        table.bigincrements();
        table.bigint('coursesection_id').unsigned().notNull().references('id').inTable('course_section');
        table.bigint('user_id').unsigned().notNull().references('id').inTable('users');
        table.string('title');
        table.text('description');
        table.integer('sequence');
        table.boolean('is_published');
        table.timestamps();
    });
};

exports.down = function(knex) {
    knex.schema.table('coursecontent', function (table) {
        table.dropForeign('coursesection_id');
        table.dropForeign('user_id');
    });
    return knex.schema.dropTableIfExists('coursecontent');
};
