const knex = require('../utils/knexutil');
const db = require('../utils/knexutil');

class SectionService {
    async count () {
        return await db('sections').count('id as count').then((res) => {return res[0].count });
    }

    async list(standard_id, search) {
        let query = db('sections')
        .join('students', 'students.section_id', 'sections.id');

        let sections = await query
        .groupBy('sections.id', 'sections.name')
        .where('standard_id', standard_id)
        .orderBy('sections.name')
        .select('sections.id as id', 'sections.name as name', 
            db.raw('count(students.id) as students'))

        let countpromises = [];

        for (const section of sections) {
            const countpromise = db('teachers')
                .join('coursesection_teacher', 'coursesection_teacher.teacher_id', 'teachers.id')
                .join('course_section', 'coursesection_teacher.coursesection_id', 'course_section.id')
                .where('course_section.section_id', section.id)
                .countDistinct('teachers.id as count')
                .then((res) => { 
                    section.teachers = res[0].count;
                });

            countpromises.push(countpromise);
        }

        await Promise.all(countpromises);

        return sections;
    }

    async get(sectionId) {
        return await knex('sections')
            .join('standards', 'standards.id', 'sections.standard_id')
            .where('sections.id', sectionId)
            .first('sections.id', 'sections.name', 'standards.name as standard');
    }
}

module.exports = new SectionService();