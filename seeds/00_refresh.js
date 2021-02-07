
exports.seed = async function(knex) {
    await knex('forumthreadreplies').del();
    await knex('forumthreads').del();
    await knex('entitygroups').del();
    await knex('groups').del();
    await knex('coursesection_teacher').del();
    await knex('teacher_subject').del();
    await knex('course_section').del();
	await knex('courses').del();
	await knex('subjects').del();
    await knex('forums').del();
    await knex('teachers').del();
    await knex('students').del();
    await knex('sections').del();
    await knex('standards').del();
    await knex('users').del();
    await knex('roles').del();
      
    console.time("Database refreshed.");
    
  };
  