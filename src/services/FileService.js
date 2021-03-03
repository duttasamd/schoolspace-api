const knex = require('../utils/knexutil');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

class FileService {
    getSignedUrl(filename, filetype, fileextension=null, context=null) {        
        if(!fileextension) {
            switch(filetype) {
                case "image/png" :
                case "png" : fileextension = "png";
                    break;
                case "image/jpeg" :
                case "jpeg" :
                case "jpg" : fileextension = "jpg";
                    break;
                case "image/tiff" : fileextension = "tiff";
                case "tiff" : fileextension = "tiff";
                    break;
                case "application/pdf" : fileextension = "pdf";
                case "pdf" : fileextension = "pdf";
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

        if(context) {
            fileId = `${context}/${fileId}`;
        }

        const s3Params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileId,
            Expires: 60,
            ContentType: filetype,
            ACL: 'public-read'
        };

        const s3 = new aws.S3({
            signatureVersion: 'v4',
            region: 'eu-central-1'
        });

        const data = s3.getSignedUrl('putObject', s3Params);

        const returnData = {
            signedRequest: data,
            fileId : fileId,
            url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileId}`
        };

        return returnData;
    }

    remove (fileId, callback) {
        if(!fileId) {
            throw new Error("No file Id.");
        }

        // if(context) {
        //     fileId = `${context}/${fileId}`;
        // }

        const s3Params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileId
        }

        const s3 = new aws.S3({
            signatureVersion: 'v4',
            region: 'eu-central-1'
        });


        s3.deleteObject(s3Params, (err, data) => {
            if(err)
                callback(false);
            
            callback(true);
        });
    }
}

module.exports = new FileService();