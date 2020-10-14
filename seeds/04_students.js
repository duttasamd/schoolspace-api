const faker = require('faker');
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('students').del()

  console.time("Seed students");
  const sections = await knex('sections')
                  .join('standards', 'standards.id', 'sections.standardId')
                  .select('sections.id as id', 'standards.sequence as seq');

  const studentRole 
      = await knex('roles').where({ name : "Student"})
      .select('id').first();

  let bcryptPromises = [];
  let bcryptPasswords = [];
  
  for(let i=0; i<100; i++) {
    bcryptPromises.push(
      bcrypt.hash('student123', 10).then(
        (hash) => { bcryptPasswords.push(hash) }
      )
    )
  }
  await Promise.all(bcryptPromises);

  let promises = [];

  for(const section of sections) {
    const num_students = Math.floor(Math.random() * (20 - 15)) + 15;

    const year = new Date(2015 - section.seq, 0);

    for(let roll=1; roll <= num_students; roll++) {
      let count = Math.floor(Math.random() * 100);
      const user = {
        firstName : faker.name.firstName(),
        lastName : faker.name.lastName(),
        email : faker.internet.email(),
        phone : faker.phone.phoneNumber(),
        username : faker.internet.userName(),
        dateOfBirth : faker.date.past(1,year),
        roleID : studentRole.id,
        password : bcryptPasswords[count]
      }
      
      await knex('users').insert(user)
      .then(async ids => {
        promises.push(knex('students').insert(
          {
            sectionId : section.id,
            userId : ids[0],
            roll : roll
          }
        ))
      })
    }
  }
  
  await Promise.all(promises);
  console.timeEnd("Seed students");
}

