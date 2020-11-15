const db = require('../utils/knexutil');

class GroupService {
    async count () {
        return await db('groups').count('id as count').then((res) => {return res[0].count });
    }

    async list(searchterm = "") {
        return await db('groups')
                .where('name', 'like', '%'+ searchterm +'%')
                .select('id', 'name');
    }
}

module.exports = new GroupService();