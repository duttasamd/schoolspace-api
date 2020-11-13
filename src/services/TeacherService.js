const db = require('../utils/knexutil');

class TeacherService {
    async count () {
        return await db('teachers').count('id as count').then((res) => {return res[0].count });
    }

    async list (pageIndex, pageSize, search) {
        let query = db('teachers')
                    .join('users', 'teachers.user_id', 'users.id');

        if(search && search != "") {
            const searchParam = '%' + search + '%';
            query = query.where('users.firstname', 'like', searchParam)
                        .orWhere('users.lastname', 'like', searchParam);
        }

        let recordsTotal = await query.clone().count('teachers.id as count');

        let teachers = await query.offset(pageIndex).limit(pageSize)
                        .select('firstname', 'lastname');

        return {
                recordsTotal : recordsTotal[0].count,
                recordsFiltered : teachers.length,
                data : teachers,
            };
    }
}

module.exports = new TeacherService()