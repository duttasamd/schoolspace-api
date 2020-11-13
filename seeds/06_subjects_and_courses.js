const { ConstraintViolationError } = require("objection");

exports.seed = async function(knex) {
	await knex('course_section').del();
	await knex('courses').del();
    await knex('subjects').del();
	
	console.time("Seed subjects and courses")

    const allstds = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    const primary = ["I", "II", "III", "IV"];
	const secondary = ["V", "VI", "VII", "VIII", "IX", "X"];
	const highersecondary = ["XI", "XII"];

	const sections = await knex('standards')
		.join('sections', 'standards.id', '=', 'sections.standard_id')
		.select('standards.name', 'sections.id');
	
	let sectionDict = {};

	sections.forEach(standard => {
		if(standard.name in sectionDict) {
			sectionDict[standard.name].push(standard.id);
		} else {
			sectionDict[standard.name] = [standard.id];
		}
	});

    const subjects =
    { 
      "Mathematics" : allstds,
      "English" : allstds,
      "Bengali" : allstds,
	  "Science" : primary,
	  "Social Science" : [...primary, ...secondary],
	  "Humanities" : [...secondary, ...highersecondary],
      "Painting" : primary,
      "Physical Science" : secondary,
      "Life Science" : secondary,
      "History" : [...secondary, ...highersecondary],
      "Geography" : [...secondary, ...highersecondary],
	  "Computer Science" : [...secondary, ...highersecondary],
	  "Physics" : highersecondary,
	  "Chemistry" : highersecondary,
	  "Biology" : highersecondary,
	  "Statistics" : highersecondary,
	  "Economics" : highersecondary,
	  "Political Science" : highersecondary
	}
	
	subjectpromises = [];
	coursepromises = [];
	coursesectionpromises = [];
	

    for(let key in subjects) {
		let subject = {
			name : key
		};
		// console.log("Outside $", key);
		let subjectpromise = knex('subjects')
			.insert(subject)
			.then((res) => 
			{
				// console.log(key);
				let courses = [];
				for (const std of subjects[key]) {
					const course = {
						name : key + " " + std,
						subject_id : res[0]
					}
		
					let coursepromise = knex('courses')
						.insert(course)
						.then((cres) => {
							if(std !== "XI" && std !== "XII") {
								const sections = sectionDict[std];
								for (const section of sections) {
									const course_section = {
										course_id : cres[0],
										section_id : section
									}

									coursesectionpromises.push(knex('course_section')
									.insert(course_section));
								}
							}							
						});

					coursepromises.push(coursepromise);
				}
			});
		  
		subjectpromises.push(subjectpromise);
	}
	
	await Promise.all(subjectpromises);
	await Promise.all(coursepromises);
	await Promise.all(coursesectionpromises);

	console.timeEnd("Seed subjects and courses")
};
