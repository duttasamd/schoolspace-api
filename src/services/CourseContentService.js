const knex = require('../utils/knexutil');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');

class CourseContentService {
    async add(courseContent, files, user) {
        courseContent.user_id = user.user_id;
        courseContent.created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        courseContent.updated_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        
        const courseContentId 
            = await knex('coursecontents').insert(courseContent)
                .then((res) => {return res[0]});

        for (const file of files) {
            const id = path.parse(file.id).name;
            // if(!uuid.validate(id))
            //     throw new Error("Not a valid UUID");

            let newFile = {
                id : id,
                filename : file.name,
                filetype : file.type,
                uploaded_by : user.user_id,
                created_at : moment.utc().format("YYYY-MM-DD HH:mm:ss"),
                updated_at : moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            }

            await knex('files').insert(newFile)
                .then(async (res) => {
                    const coursecontent_file = {
                        coursecontent_id : courseContentId,
                        file_id : id
                    }

                    await knex('coursecontent_file').insert(coursecontent_file);
                });
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