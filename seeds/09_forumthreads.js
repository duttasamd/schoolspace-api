const faker = require('faker');

exports.seed = async function(knex) {
	await knex('forumthreads').del();

  const forums = await knex('forums').select();
  const max_user_id = await knex('users').count('id as count').then((res) => {return res[0].count});
  
  let threadpromises = [];
  let threadreplypromises = [];

  for (const forum of forums) {
    const num_threads = Math.floor(Math.random() * 10) + 0;

    for(let i=0; i<num_threads; i++) {
      const user_id = Math.floor(Math.random() * max_user_id) + 1;
      const forumthread = {
        user_id : user_id,
        post : faker.lorem.sentence(),
        created_at : faker.date.past(),
        updated_at : faker.date.past(),
        forum_id : forum.id
      }

      let threadpromise = knex('forumthreads')
          .insert(forumthread)
          .then((res) => {
            // console.log(res[0]);
            const num_threadreplies = Math.floor(Math.random() * 10) + 0;

            for(let j=0; j<num_threadreplies; j++) {
              const replyuser_id = Math.floor(Math.random() * max_user_id) + 1;
              const forumthreadreply = {
                user_id : replyuser_id,
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
