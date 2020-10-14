const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

class StudentService {
    async count () {
        return await knex('students').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new StudentService()