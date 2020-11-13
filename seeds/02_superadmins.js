const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  console.time("Seed super admins")
    
  const superadmin = await knex('roles').where({ name : "Super Admin"}).select('id').first();

  let users = [
    {
      firstName : 'Samrat',
      lastName : 'Dutta',
      email : 'dutta.sam.d@gmail.com',
      phone : "+491603508895",
      username : 'samrat',
      dateOfBirth : new Date('1994', '03', '09'),
      role_id : superadmin.id
    },
    {
      firstName : 'Suman',
      lastName : 'Das',
      email : 'suman@mail.com',
      phone : "+91000100010",
      username : 'suman',
      dateOfBirth : new Date('1990', '01', '01'),
      role_id : superadmin.id
    },
    {
      firstName : 'Priyanka',
      lastName : 'Paul',
      email : 'priyanka@mail.com',
      phone : "+498238192012",
      username : 'priyanka',
      dateOfBirth : new Date('1992', '11', '18'),
      role_id : superadmin.id
    },
  ]


  //equivalent. ~386ms
  // let promises = [];
  // users.forEach(user => {
  //   promises.push(bcrypt.hash('admin123', 12).then(
  //     (hash) => {user.password = hash;}
  //   ));
  // });
  //await Promise.all(promises);

  await Promise.all(
    users.map(
      async user => {
        user.password = await bcrypt.hash('admin123', 12);
      }
    )
  )
  
  await knex('users').insert(users);

  console.timeEnd("Seed super admins")
};
