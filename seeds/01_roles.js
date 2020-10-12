
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('users').del();
  await knex('roles').del();
    
  console.time("Seed roles : ")
  await knex('roles').insert([
    {name : 'Super Admin'},
    {name : 'Admin'},
    {name : 'Management'},
    {name : 'Teacher'},
    {name : 'Student'}
  ]);
  console.timeEnd("Seed roles : ");
};
