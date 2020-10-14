const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

class UserService {
    async list (pageIndex, pageSize, search) {
        let query = knex('users')
                    .join('roles', 'users.roleId', 'roles.id');

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
        return await knex('users')
                    .where('username', '=', username)
                    .select('firstname', 'lastname', 'roleId', 'email', 'username')
                    .first();

    }

    async count() {
        return await knex('users').count('id as count').then((res) => {return res[0].count });
    }
}

module.exports = new UserService()