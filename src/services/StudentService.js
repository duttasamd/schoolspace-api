const db = require('../utils/knexutil');

class StudentService {
    async count () {
        return await db('students').count('id as count').then((res) => {return res[0].count });
    }

    async list (pageIndex, pageSize, search, sectionId=null) {
        let query = db('students')
                    .join('users', 'students.user_id', 'users.id')
                    .join('sections', 'students.section_id', 'sections.id')
                    .join('standards', 'sections.standard_id', 'standards.id');

        if(search && search != "") {
            const searchParam = '%' + search + '%';
            query = query.where('users.firstname', 'like', searchParam)
                        .orWhere('users.lastname', 'like', searchParam);
        }

        if(sectionId && sectionId > 0){
            query = query.where('students.section_id', sectionId);
        }

        let recordsTotal = await query.clone().count('students.id as count');

        if (pageSize > 0) {
            query = query.offset(pageIndex).limit(pageSize);
        }

        let students = await query
                        .select('firstname', 'lastname', 'sections.name as section', 'standards.name as standard', 'roll');

        return {
                recordsTotal : recordsTotal[0].count,
                recordsFiltered : students.length,
                data : students,
            };
    }
}

module.exports = new StudentService()