const knex = require('../utils/knexutil');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');

class CourseContentService {
    async add(courseContent, files, user) {
        courseContent.user_id = user.user_id;
        courseContent.created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        courseContent.updated_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        
        const trx = await knex.transaction();
        try {
            const courseContentId = await trx('coursecontents').insert(courseContent)
                            .then((res) => {return res[0]});

            for (const file of files) {
                const id = path.parse(file.id).name;
    
                let newFile = {
                    id : id,
                    filename : file.name,
                    filetype : file.type,
                    uploaded_by : user.user_id,
                    created_at : moment.utc().format("YYYY-MM-DD HH:mm:ss"),
                    updated_at : moment.utc().format("YYYY-MM-DD HH:mm:ss"),
                }
    
                const file_id = await trx('files').insert(newFile)
                    .then((res) => {return res[0]});

                const coursecontent_file = {
                    coursecontent_id : courseContentId,
                    file_id : id
                }

                await trx('coursecontent_file').insert(coursecontent_file);
            }
            await trx.commit();
        } catch (err) {
            await trx.rollback(err);
            throw err;
        }
    }

    async getListForCourseSection(courseSectionId) {
        let ids = await knex('coursecontents')
            .where('coursesection_id', courseSectionId)
            .select('id');

        if(ids)
            ids = ids.map(x => {return x.id})
        
        return ids;
    }

    async get(courseContentId) {
        let courseContent = await knex('coursecontents')
            .where('id', courseContentId)
            .first();

        courseContent.files = await knex('files')
                .join('coursecontent_file', 'coursecontent_file.file_id', 'files.id')
                .where('coursecontent_file.coursecontent_id', courseContentId)
                .select('files.id', 'files.filename', 'files.filetype', 'files.uploaded_by', 'files.updated_at');
        
        return courseContent;
    }
}

module.exports =new CourseContentService();