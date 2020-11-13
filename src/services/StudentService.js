const db = require('../knexService');

class StudentService {
    async count () {
        return await db('students').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new StudentService()