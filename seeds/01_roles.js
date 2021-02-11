
exports.seed = async function(knex) {
  await knex('roles').del();
    
  console.time("Seed roles : ")
  await knex('roles').insert([
    {id: 1, name : 'Super Admin'},
    {id: 2, name : 'Admin'},
    {id: 3, name : 'Management'},
    {id: 4, name : 'Teacher'},
    {id: 5, name : 'Student'}
  ]);
  console.timeEnd("Seed roles : ");
};
