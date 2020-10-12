const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  console.time("Seed super admins : ")
    
  const superadmin = await knex('roles').where({ name : "Super Admin"}).select('id').first();

  let users = [
    {
      firstName : 'Samrat',
      lastName : 'Dutta',
      email : 'dutta.sam.d@gmail.com',
      username : 'samrat',
      roleID : superadmin.id
    },
    {
      firstName : 'Suman',
      lastName : 'Das',
      email : 'suman@mail.com',
      username : 'suman',
      roleID : superadmin.id
    },
    {
      firstName : 'Priyanka',
      lastName : 'Paul',
      email : 'priyanka@mail.com',
      username : 'priyanka',
      roleID : superadmin.id
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

  console.timeEnd("Seed super admins : ")
};
