const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

class FileController {
    async getSignedUrl (req, res) {
        const s3 = new aws.S3({
            signatureVersion: 'v4',
            region: 'eu-central-1'
        });
        let filename = req.query.filename;
        const filetype = req.query.filetype;
        let fileextension = req.query.fileextension;

        if(!filetype) {
            res.status(400);
            return;
        }

        if(!fileextension) {
            switch(filetype) {
                case "image/png" : fileextension = "png";
                    break;
                case "image/jpeg" : fileextension = "jpg";
                    break;
                case "image/tiff" : fileextension = "tiff";
                    break;
                case "application/pdf" : fileextension = "pdf";
                    break;

                default : {
                    fileextension = "data"
                };
            }
        }
        

        let fileId = uuidv4();
        fileId += `.${fileextension}`;

        if(!filename){
            filename = fileId;
        }

        const S3_BUCKET = process.env.S3_BUCKET;
        try {
            const s3Params = {
                Bucket: S3_BUCKET,
                Key: fileId,
                Expires: 60,
                ContentType: filetype,
                ACL: 'public-read',
                // signatureVersion: 'v4'
            };

            s3.getSignedUrl('putObject', s3Params, (err, data) => {
                if(err){
                    console.log(err);
                    return res.end();
                }
                const returnData = {
                    signedRequest: data,
                    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileId}`
                };

                res.status(200);
                res.json(returnData);
            });
        } catch(err) {
            console.log(err);
            res.status(500);
        }
        return;
    }
}

module.exports = new FileController();