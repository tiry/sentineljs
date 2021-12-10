

// dummy implementation for now

function _saveMetaData (metadata) {
    console.log(metadata)
    console.log("Saved Metadata nowhere ");
    return metadata;
}

function _saveBlob(blob, digest) {
    storePath = './store/' + digest;
    blob.mv(storePath);
    console.log("Saved Blov in " + storePath);
    return storePath;
}

module.exports = {

    saveBlob: _saveBlob,
    saveMetaData: _saveMetaData,

}