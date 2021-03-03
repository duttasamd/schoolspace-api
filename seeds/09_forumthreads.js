const faker = require('faker');

exports.seed = async function(knex) {
  await knex('forumthreadreplies').del();
	await knex('forumthreads').del();

  const forums = await knex('forums').select('id');
  const users = await knex('users').select('id');

  let threadpromises = [];
  let threadreplypromises = [];

  for (const forum of forums) {
    const num_threads = Math.floor(Math.random() * 10);
    
    for(let i=0; i<num_threads; i++) {
      let userid = users[Math.floor(Math.random() * users.length)].id;
      let forumthread = {
        user_id : userid,
        post : faker.lorem.sentence(),
        created_at : faker.date.past(),
        updated_at : faker.date.past(),
        forum_id : forum.id
      }

      let threadpromise = knex('forumthreads')
          .insert(forumthread)
          .then((res) => {
            const num_threadreplies = Math.floor(Math.random() * 10) + 0;

            for(let j=0; j<num_threadreplies; j++) {
              let forumthreadreply = {
                user_id : users[Math.floor(Math.random() * users.length)].id,
                reply : faker.lorem.sentences(),
                created_at : faker.date.past(),
                updated_at : faker.date.past(),
                forumthread_id : res[0]
              }

              const threadreplypromise = knex('forumthreadreplies')
                            .insert(forumthreadreply);

              threadreplypromises.push(threadreplypromise);
            }
          });

      threadpromises.push(threadpromise);
    }
  }

  await Promise.all(threadpromises);
  await Promise.all(threadreplypromises);
};
