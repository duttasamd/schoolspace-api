const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

class TeacherService {
    async count () {
        return await knex('teachers').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new TeacherService()