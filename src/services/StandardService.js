const db = require('../utils/knexutil');

class StandardService {
    async count () {
        return await db('standards').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new StandardService();