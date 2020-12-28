exports.up = function(knex) {
    return knex.schema.createTable("forumthreads", table => {
        table.bigincrements();
        table.bigint('forum_id').unsigned().notNull().references('id').inTable('forums');
        table.bigint('user_id').unsigned().notNull().references('id').inTable('users');
        table.timestamps();
        table.text('post').notNull();
    });
};

exports.down = function(knex) {
    knex.schema.table('forumthreads', function (table) {
        table.dropForeign('forum_id');
        table.dropForeign('user_id');
    });
    return knex.schema.dropTableIfExists('forumthreads');
};