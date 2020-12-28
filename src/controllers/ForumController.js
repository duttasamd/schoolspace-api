const ForumService = require('../services/ForumService');

class ForumController {
    async get (req, res) {
        const forum_id = req.params.id;
        if(forum_id === null || forum_id ==="") {
            res.sendStatus(403);
        }
        
        const forum = await ForumService.get(forum_id);
        res.json(forum);
    }

    async listForumThreads(req, res) {
        const forum_id = req.params.id;

        const pageIndex = req.query.pageIndex || 0;
        const pageSize = req.query.pageSize || 10;
        const search = req.query.search || "";

        const result = await ForumService.listForumThreads(forum_id, pageIndex, pageSize, search);

        res.json(result);
    }
}

module.exports = new ForumController();