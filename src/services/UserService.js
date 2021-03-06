const db = require('../utils/knexutil');

class UserService {
    async list (pageIndex, pageSize, search) {
        let query = db('users')
                    .join('roles', 'users.role_id', 'roles.id');

        if(search && search != "") {
            const searchParam = '%' + search + '%';
            query = query.where('firstname', 'like', searchParam)
                        .orWhere('lastname', 'like', searchParam)
                        .orWhere('email', 'like', searchParam)
                        .orWhere('phone', 'like', searchParam)
                        .orWhere('roles.name', 'like', searchParam)
        }

        let recordsTotal = await query.clone().count('users.id as count');

        let users = await query.offset(pageIndex).limit(pageSize)
                        .select('firstname', 'lastname', 'email', 'phone', 'roles.name as role');

        return {
                recordsTotal : recordsTotal[0].count,
                recordsFiltered : users.length,
                data : users,
            };
    }

    async get (username) {
        return await db('users')
                    .where('username', '=', username)
                    .select('firstname', 'lastname', 'role_id', 'email', 'username', 'id')
                    .first();

    }

    async count() {
        return await db('users').count('id as count').then((res) => {return res[0].count });
    }

    async staffCount() {
        return await db('users').where('role_id', 3).count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new UserService()