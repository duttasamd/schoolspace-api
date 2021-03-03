const CourseContentService = require('../services/CourseContentService');


class CourseContentController {
    async add(req, res) {
        const courseSectionId = req.body.courseSectionId;
        const title = req.body.title;
        const description = req.body.description;
        const files = req.body.files;

        if(!title) {
            res.status(400);
            res.json({
                message : "Title is required.",
            })
        }
        try {
            const courseContent = {
                coursesection_id : courseSectionId,
                title : title,
                description : description
            }

            await CourseContentService.add(courseContent, files, req.user);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
        
    }

    async list(req, res) {
        const courseSectionId = req.query.courseSectionId || "";
        const onlyIds = req.query.onlyIds;

        if(!courseSectionId) {
            res.status(400);
            res.json({
                message : "CourseSectionId required."
            })
        }

        if(onlyIds) {
            try {
                const ids = await CourseContentService.getListForCourseSection(courseSectionId);
                res.status(200);
                res.json(ids);
            } catch(err) {
                res.status(500);
                res.json({
                    error : err
                })
            }
        }
    }

    async get(req, res) {
        const courseContentId = req.params.id;

        try {
            const courseContent = await CourseContentService.get(courseContentId);
            res.status(200);
            res.json(courseContent);
        } catch (err) {
            res.status(500);
            res.json({
                error : err
            })
        }
    }
}

module.exports = new CourseContentController();