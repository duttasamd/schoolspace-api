
exports.seed = async function(knex) {
	await knex('entitygroups').del();
	await knex('groups').del();

	let grouppromises = [];
	let entitygrouppromises = [];

	//All users
	grouppromises.push(
		knex('groups').insert(
			{
				name : "All Users",
				type : "entity"
			}
		).then((res) => {
			entitygrouppromises.push(
				knex('entitygroups').insert({
					group_id : res[0],
					role : "all"
				})
			);
		})
	);

	//All teachers
	grouppromises.push(
		knex('groups').insert(
			{
				name : "All teachers",
				type : "entity"
			}
		).then((res) => {
			entitygrouppromises.push(
				knex('entitygroups').insert({
					group_id : res[0],
					role : "teachers"
				})
			);
		})
	);

	//All students
	grouppromises.push(
		knex('groups').insert(
			{
				name : "All students",
				type : "entity"
			}
		).then((res) => {
			entitygrouppromises.push(
				knex('entitygroups').insert({
					group_id : res[0],
					role : "students"
				})
			);
		})
	);

	// All standards
	const standards = await knex('standards').select();

	for (const standard of standards) {
		//All students in standard
		grouppromises.push(
			knex('groups').insert(
				{
					name : "Students Class " + standard.name,
					type : "entity"
				}
			).then((res) => {
				entitygrouppromises.push(
					knex('entitygroups').insert({
						group_id : res[0],
						role : "student",
						entity : "standard",
						entity_id : standard.id
					})
				);
			})
		);

		//All teachers in standard
		grouppromises.push(
			knex('groups').insert(
				{
					name : "Teachers Class " + standard.name,
					type : "entity"
				}
			).then((res) => {
				entitygrouppromises.push(
					knex('entitygroups').insert({
						group_id : res[0],
						role : "teacher",
						entity : "standard",
						entity_id : standard.id
					})
				);
			})
		);
	}

	// All sections
	const sections = await knex('sections')
					.join('standards', 'sections.standard_id', 'standards.id')
					.select('sections.id', 'sections.name as section', 'standards.name as standard');

	for (const section of sections) {
		//All students in standard
		grouppromises.push(
			knex('groups').insert(
				{
					name : "Students Class " + section.standard + " " + section.section,
					type : "entity"
				}
			).then((res) => {
				entitygrouppromises.push(
					knex('entitygroups').insert({
						group_id : res[0],
						role : "student",
						entity : "section",
						entity_id : section.id
					})
				);
			})
		);
	}

	// All courses
	const courses = await knex('courses').select();

	for (const course of courses) {
		//All students in course
		grouppromises.push(
			knex('groups').insert(
				{
					name : "Students " + course.name,
					type : "entity"
				}
			).then((res) => {
				entitygrouppromises.push(
					knex('entitygroups').insert({
						group_id : res[0],
						role : "student",
						entity : "course",
						entity_id : course.id
					})
				);
			})
		);
	}

	await Promise.all(grouppromises);
	await Promise.all(entitygrouppromises);
};
