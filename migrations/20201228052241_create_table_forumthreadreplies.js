exports.up = function(knex) {
    return knex.schema.createTable("forumthreadreplies", table => {
        table.bigincrements();
        table.bigint('forumthread_id').unsigned().notNull().references('id').inTable('forumthreads');
        table.bigint('user_id').unsigned().notNull().references('id').inTable('users');
        table.timestamps();
        table.text('reply').notNull();
    });
};

exports.down = function(knex) {
    knex.schema.table('forumthreadrepliess', function (table) {
        table.dropForeign('forumthread_id');
        table.dropForeign('user_id');
    });
    return knex.schema.dropTableIfExists('forumthreadreplies');
};