const moment = require('moment');
const knex = require('../utils/knexutil');

class AttendanceService {
    async list(sectionId, date) {

        if(!date)
            date = moment()
        date = moment(date).utc().startOf('day').format("YYYY-MM-DD HH:mm:ss");

        // return await knex('attendances')
        //     .rightJoin('users', 'attendances.user_id', 'users.id')
        //     .join('students', 'users.id', 'students.user_id')
        //     .leftJoin('users as loggers', 'attendances.logged_by', 'users.id')
        //     .where('students.section_id', sectionId)
        //     .where((builder) => builder
        //         .andWhere('date', date)
        //         .orWhereNull('date'))
        //     .orderBy('students.roll')       
        //     .select('attendances.id as id', 'students.roll as roll', 
        //     'users.id as user_id', 'users.firstname as user_fn',
        //     'users.lastname as user_ln', 'loggers.firstname as logger_fn',
        //     'loggers.lastname as logger_ln', 'date', 'attendances.is_present', 'attendances.created_at');
 
        // return await knex('students')
        //     .join('users', 'students.user_id', 'users.id')
        //     .leftJoin('attendances', 'attendances.user_id', 'users.id')
        //     .leftJoin('users as loggers', 'attendances.logged_by', 'loggers.id')
            
        //     .andWhere((builder) => builder
        //         .andWhere('date', date)
        //         .orWhereNull('date'))
        //     .orderBy('students.roll')       
        //     .select('attendances.id as id', 'students.roll as roll', 
        //     'users.id as user_id', 'users.firstname as user_fn',
        //     'users.lastname as user_ln', 'loggers.firstname as logger_fn',
        //     'loggers.lastname as logger_ln', 'date', 'attendances.is_present', 'attendances.created_at');


        return await knex
            .select('*')
            .from(function () {
                this.select(
                    'students.roll as roll',
                    'users.id as user_id', 
                    'users.firstname as user_fn',
                    'users.lastname as user_ln')
                    .from('students')
                        .join('users', 'students.user_id', 'users.id')
                            .where('students.section_id', sectionId)
                            .as('t1');
            })
            .leftJoin(
                knex('attendances')
                .join('users as loggers', 'attendances.logged_by', 'loggers.id')
                .where((builder) => builder
                    .andWhere('date', date)
                    .orWhereNull('date'))
                .andWhere('section_id', sectionId)
                .select('attendances.id as id',
                    'attendances.user_id as auser_id',
                    'loggers.firstname as logger_fn',
                    'loggers.lastname as logger_ln', 'date', 'attendances.is_present', 'attendances.created_at')
                .as('t2')
                , function () {
                    this.on('t1.user_id', '=', 't2.auser_id');
            })
            
        
    }

    async add(attendance) {
        attendance.created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        attendance.updated_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");

        attendance.date = moment(attendance.date).startOf('day').format("YYYY-MM-DD HH:mm:ss");

        return await knex('attendances').insert(attendance);
    }
}

module.exports = new AttendanceService();