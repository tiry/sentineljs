const config = require('./../config');
const s3store = require('./S3Store');
const mongo = require('./MongoStore');

// expose storage backend primitives
// switch between dummy and real impl depending on config

async function _saveMetaData (metadata) {
    if (config.db.type=="dummy") {
        console.log(metadata)
        console.log("Saved Metadata nowhere ");
        return metadata;
    } else {
        console.log("save into MongoDB")        
        ack = await mongo.saveMetaData(metadata);
        console.log(ack.insertedId);
        return key;         
    }
}

function _saveBlob(blob, digest) {
    if (config.blobStore.type=="dummy") {
        console.log("save into Dummy BlobStore");
        storePath = './store/' + digest;
        blob.mv(storePath);
        console.log("Saved Blov in " + storePath);
        return storePath;
    } else {
        console.log("save into S3")
        key= s3store.saveBlob(blob, digest);
        console.log(key);
        return key;
    }
}

module.exports = {

    saveBlob: _saveBlob,
    saveMetaData: _saveMetaData,

}