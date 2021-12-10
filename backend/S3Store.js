const AWS = require("aws-sdk");
const config = require('./../config');

function getS3Client () {
    return new AWS.S3({
        accessKeyId: config.blobStore.accessKeyId,
        secretAccessKey: config.blobStore.secretAccessKey,
        endpoint: config.blobStore.endpoint,
        region: config.blobStore.region,
        s3ForcePathStyle: true // it is needed for minio
    });
}

function saveBlobToS3(blobData, digest) {
        
    s3Client = getS3Client()

    params = {
        Bucket: config.blobStore.bucket,
        Key: digest,
        Body: blobData
    };

    s3Client.putObject(params,function(err, data) {
        if (err) {
            console.log("can not upload to s3");
            console.log(err);
            throw err;
        }
        console.log("File uploaded successfully");
    });
    
    return config.blobStore.bucket + "/" + digest;
}


module.exports = {

    // expose "private" methods to unit tests 
    // XXX - there should be a better way
    _getS3Client: getS3Client ,

    _saveBlobToS3: saveBlobToS3,

    saveBlob: (blob, digest) => {
        try {
            return saveBlobToS3(blob.data, blob.md5);
        }
        catch(err) {
            throw err;
        }
    }
}