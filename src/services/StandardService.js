const db = require('../utils/knexutil');

class StandardService {
    async count () {
        return await db('standards').count('id as count').then((res) => {return res[0].count });
    }

    async list (search) {
        let query = db('standards')
            .join('sections', 'sections.standard_id', 'standards.id')

        if(search.length <= 3) {
            query = query.where('standards.name', 'like', search + '%');
        } else if(search.length > 3) {
            query = query.join('course_section', 'course_section.section_id', 'sections.id')
            .join('courses', 'course_section.course_id', 'courses.id')
            .join('coursesection_teacher', 'course_section.id', 'coursesections_teacher.coursesection_id')
            .join('teachers', 'teachers.id', 'coursesection_teachers')
            .join('users', 'users.id', 'teachers.user_id')
            .where('courses.name', 'like', '%' + search + '%')
            .orWhere('users.firstname', 'like', '%' + search + '%')
            .orWhere('users.lastname', 'like', '%' + search + '%');
        }

        let standards = await query.groupBy('standards.id', 'standards.name')
            .orderBy('sequence')
            .select('standards.id as id', 'standards.name as name', db.raw('count(sections.id) as sections'))
            .catch(function(err) {
                console.log(err);
            });

        let countpromises = [];

        for (const standard of standards) {
            let studentcountpromise = db('students')
                .join('sections', 'sections.id', 'students.section_id')
                .where('sections.standard_id', standard.id)
                .countDistinct('students.id as count')
                .then((res) => { 
                    standard.students = res[0].count;
                });

            countpromises.push(studentcountpromise);

            let teachercountpromise = db('teachers')
                .join('coursesection_teacher', 'coursesection_teacher.teacher_id', 'teachers.id')
                .join('course_section', 'coursesection_teacher.coursesection_id', 'course_section.id')
                .join('sections', 'course_section.section_id', 'sections.id')
                .where('sections.standard_id', standard.id)
                .countDistinct('teachers.id as count')
                .then((res) => { 
                    standard.teachers = res[0].count;
                });

            countpromises.push(teachercountpromise);
        }

        await Promise.all(countpromises);

        return standards;
    }
}

module.exports = new StandardService();