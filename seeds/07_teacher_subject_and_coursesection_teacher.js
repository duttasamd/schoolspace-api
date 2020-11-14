exports.seed = async function(knex) {
	await knex('coursesection_teacher').del();
	await knex('teacher_subject').del();


	// SUBJECTS

	const subjects = await knex('subjects')
		.select('id', 'name');

	let subjectMap = {};
	for (const subject of subjects) {
		subjectMap[subject.name] = subject.id; 
	}


	// TEACHERS

	const teachers = await knex('teachers')
		.orderByRaw('RAND()')
		.select('id');

	
	// COURSE_SECTION
	// const primarycoursesection 



	// SEED DATA
	
	const primaryscience = [
		"Mathematics",
		"Science"
	];

	const primarybeng = [
		"Bengali",
		"Social Science",
	];

	const primaryeng = [
		"English",
		"Social Science",
		"Painting"
	];

	const secondaryeng = [
		"English",
		"Social Science"
	];

	const secondarybeng = [
		"Bengali",
		"Social Science",
	];

	const secondarymathsphy = [
		"Mathematics",
		"Physical Science"
	]

	const secondaryscience = [
		"Physical Science",
		"Life Science"
	]

	const secondarycomputers = [
		"Computer Science",
		"Mathematics"
	]

	const secondaryarts = [
		"History",
		"Geography"
	]

	const primary = [
		{
			subjects : primaryscience,
			number : 20
		},
		{
			subjects : primarybeng,
			number : 10
		},
		{
			subjects : primaryeng,
			number : 10
		},
	];

	const secondary = [
		{
			subjects : secondaryeng,
			number : 6
		},
		{
			subjects : secondarybeng,
			number : 6
		},
		{
			subjects : secondarymathsphy,
			number : 8
		},
		{
			subjects : secondaryscience,
			number : 10
		},
		{
			subjects : secondarycomputers,
			number : 8
		},
		{
			subjects : secondaryarts,
			number : 10
		},
	]

	let primaryct = {};
	let secondaryct = {};

	let teachersubjects = [];
	let teacherindextrack = 0;

	for (const item of [...primary, ...secondary]) {
		for(let i=teacherindextrack; i< teacherindextrack+item.number; i++) {
			for (const subject of item.subjects) {
				const subject_teacher = {
					teacher_id : teachers[i].id,
					subject_id : subjectMap[subject],
					preferred_level : i < 40 ? "primary" : "secondary"
				}
	
				teachersubjects.push(subject_teacher);

				if(i < 40) {
					if(subjectMap[subject] in primaryct) {
						primaryct[subjectMap[subject]].push(teachers[i].id);
					} else {
						primaryct[subjectMap[subject]] = [teachers[i].id];
					}
				} else {
					if(subjectMap[subject] in secondaryct) {
						secondaryct[subjectMap[subject]].push(teachers[i].id);
					} else {
						secondaryct[subjectMap[subject]] = [teachers[i].id];
					}
				}
			}
		}
		teacherindextrack += item.number;
	}	


	const primarycoursesections = 
		await knex('course_section')
		.join('courses', 'courses.id', 'course_id')
		.join('sections', 'section_id', 'sections.id')
		.join('standards', 'standard_id', 'standards.id')
		.where('standards.sequence', '<=', 4 )
		.select('course_section.id', 'courses.subject_id');

	let teacherload = {};

	let coursesections_teachers = [];
	
	for (const coursesection of primarycoursesections) {
		let randomIndex = 
			Math.floor(Math.random() * Math.floor(primaryct[coursesection.subject_id].length));

		let teacher_id = primaryct[coursesection.subject_id][randomIndex];

		if(teacher_id in teacherload && teacherload[teacher_id] > 6) {
			randomIndex = 
				Math.floor(Math.random() * Math.floor(primaryct[coursesection.subject_id].length));

			teacher_id = primaryct[coursesection.subject_id][randomIndex];
		}

		if(teacher_id in teacherload) {
			teacherload[teacher_id]++;
		} else {
			teacherload[teacher_id] = 1;
		}

		const coursesection_teacher = {
			coursesection_id : coursesection.id,
			teacher_id : teacher_id
		}

		coursesections_teachers.push(coursesection_teacher);
	}

	const secondarycoursesections = 
		await knex('course_section')
		.join('courses', 'courses.id', 'course_id')
		.join('sections', 'section_id', 'sections.id')
		.join('standards', 'standard_id', 'standards.id')
		.where('standards.sequence', '>', 4 )
		.andWhere('standards.sequence', '<=', 10)
		.select('course_section.id', 'courses.subject_id');

	for (const coursesection of secondarycoursesections) {
		let randomIndex = 
			Math.floor(Math.random() * Math.floor(secondaryct[coursesection.subject_id].length));

		let teacher_id = secondaryct[coursesection.subject_id][randomIndex];

		if(teacher_id in teacherload && teacherload[teacher_id] > 6) {
			randomIndex = 
				Math.floor(Math.random() * Math.floor(secondaryct[coursesection.subject_id].length));

			teacher_id = secondaryct[coursesection.subject_id][randomIndex];
		}

		if(teacher_id in teacherload) {
			teacherload[teacher_id]++;
		} else {
			teacherload[teacher_id] = 1;
		}

		const coursesection_teacher = {
			coursesection_id : coursesection.id,
			teacher_id : teacher_id
		}

		coursesections_teachers.push(coursesection_teacher);
	}

	await knex('teacher_subject').insert(teachersubjects);
	await knex('coursesection_teacher').insert(coursesections_teachers);
};
