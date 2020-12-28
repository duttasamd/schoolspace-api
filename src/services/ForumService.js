const db = require('../utils/knexutil');

class ForumService {
    async get(forum_id) {
        return await db('forums')
                .join('course_section', 'course_section.forum_id', 'forums.id')
                .join('courses', 'course_section.course_id', 'courses.id')
                .join('sections', 'course_section.section_id', 'sections.id')
                .where('forums.id', forum_id)
                .select(
                    'forums.id as id',
                    'courses.name as course',
                    'sections.name as section'
                ).first();
    }

    async listForumThreads (forum_id, pageIndex, pageSize, search) {
        let query = db('forumthreads')
                    .join('users', 'users.id', 'forumthreads.user_id');
                    

        if(search && search != "") {
            const searchParam = '%' + search + '%';
            query = query.where('forumthreads.post', 'like', searchParam)
                        .orWhere('users.username', 'like', searchParam);
        }

        query = query.andWhere('forumthreads.forum_id', forum_id);

        let recordsTotal = await query.clone().count('forumthreads.id as count').then((res) => {return res[0].count});

        let threads = await query.offset(pageIndex).limit(pageSize)
                            .select('forumthreads.id as id', 'forumthreads.post as post',
                                'users.username as username');

        if(threads !== null && recordsTotal > 0) {
            for (const thread of threads) {
                thread.replies = await db('forumthreadreplies')
                                    .where('forumthread_id', thread.id)
                                    .count('id as count')
                                    .then((res) => {
                                        return res[0].count
                                    });
            }
        }

        return {
                recordsTotal : 0,
                recordsFiltered : threads.length,
                data : threads,
            };
    }
}

module.exports = new ForumService();