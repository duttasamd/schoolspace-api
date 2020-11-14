const knex = require('../utils/knexutil');
const db = require('../utils/knexutil');

class CourseService {
    async listForUser(user) {
        return await knex('course_section')
            .join('courses', 'course_section.course_id', 'courses.id')
            .join('subjects', 'courses.subject_id', 'subjects.id')
            .join('sections', 'course_section.section_id', 'sections.id')
            .join('students', 'students.section_id', 'sections.id')
            .join('coursesection_teacher', 'coursesection_teacher.coursesection_id', 'course_section.id')
            .join('teachers', 'coursesection_teacher.teacher_id', 'teachers.id')
            .join('users', 'teachers.user_id' ,'users.id')
            .where('students.user_id', user.user_id)
            .select('course_section.id', 'courses.name as course', 'users.firstname', 'users.lastname', 'subjects.name as subject');
    }

    async getCourseSection(courseSectionId) {
        return await knex('course_section')
            .join('courses', 'course_section.course_id', 'courses.id')
            .join('subjects', 'courses.subject_id', 'subjects.id')
            .join('sections', 'course_section.section_id', 'sections.id')
            .join('standards', 'sections.standard_id', 'standards.id')
            .join('coursesection_teacher', 'coursesection_teacher.coursesection_id', 'course_section.id')
            .join('teachers', 'coursesection_teacher.teacher_id', 'teachers.id')
            .join('users', 'teachers.user_id' ,'users.id')
            .where('course_section.id', courseSectionId)
            .select('courses.name as course', 'users.firstname', 
                'users.lastname', 'subjects.name as subject', 
                'sections.name as section', 'standards.name as standard')
            .first();
    }
}

module.exports = new CourseService();