
exports.seed = async function(knex) {
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
