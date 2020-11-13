const db = require('../knexService');

class TeacherService {
    async count () {
        return await db('teachers').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new TeacherService()