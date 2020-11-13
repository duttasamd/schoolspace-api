const db = require('../utils/knexutil');

class SectionService {
    async count () {
        return await db('sections').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new SectionService();