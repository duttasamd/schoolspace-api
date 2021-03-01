const FileService = require("../services/FileService");

class FileController {
    getSignedUrl (req, res) {
        const filename = req.query.filename;
        const filetype = req.query.filetype;
        const fileextension = req.query.fileextension;
        const context = req.query.context;
        
        if(!filetype) {
            res.status(400);
            res.end();
        }
        
        let data;
        
        try {
            data = FileService.getSignedUrl(filename, filetype, fileextension, context);
            res.status(200);
            res.json(data);
        } catch(err) {
            res.status(200);
            res.json(err);
        }
    }

    remove (req, res) {
        const fileId = req.params.id;

        try {
            FileService.remove(fileId, (isRemoved) => {
                isRemoved ? res.sendStatus(200) : res.sendStatus(500);
            });
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

module.exports = new FileController();