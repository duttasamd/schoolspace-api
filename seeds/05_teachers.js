const faker = require('faker');
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  console.time("Seed teachers");

  const teacherRole 
      = await knex('roles').where({ name : "Teacher"})
      .select('id').first();

  let teachers = [];

  for(let i=0; i<= 50; i++) {
    const user = {
      firstName : faker.name.firstName(),
      lastName : faker.name.lastName(),
      email : faker.internet.email(),
      username : faker.internet.userName(),
      dateOfBirth : faker.date.past(30,'1994-01-01'),
      roleID : teacherRole.id,
    }
    teachers.push(user);
  }

  await Promise.all(
    teachers.map(
      async user => {
        user.password = await bcrypt.hash('teacher123', 10);
      }
    )
  )
  
  let promises = [];

  teachers.forEach(
    teacher => {
      promises.push(knex('users').insert(teacher)
        .then(async ids => {
          await knex('teachers').insert({
            'userId' : ids[0]
          })
        }))
    }
  )

  await Promise.all(promises);
  console.timeEnd("Seed teachers");
};
