
exports.seed = async function(knex) {

  await knex('sections').del();
  await knex('standards').del();

  const stds = ["I", "II", "III", "IV", "V", "VI", 
  "VII", "VIII", "IX", "X", "XI", "XII"];

  const secs = ["A", "B", "C", "D", "E", "F", "G"];

  console.time("Seed standards and sections")

  let promises = [];
  for(let i=1; i<=12; i++) {
    const standard = {
      name : stds[i-1],
      sequence : i,
    }

    let standardId = knex('standards')
      .insert(standard)
      .then((res) => 
        {return res[0];});

    let num_sections = 7;

    if(i > 4 && i <= 10) {
      num_sections = 5;
    } else if(i > 10) {
      num_sections = 2;
    }

    standardId = await Promise.resolve(standardId);

    let sections = [];
    for(let j=0; j<num_sections; j++) {
      const section = {
        name : secs[j],
        standardId : standardId
      }
      sections.push(section);
    }

    promises.push(knex('sections').insert(sections));
  }

  await Promise.all(promises);

  console.timeEnd("Seed standards and sections")
};
