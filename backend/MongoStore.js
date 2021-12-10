const MongoClient = require("mongodb").MongoClient;
const config = require('./../config');

function getMongoClient () {

    //mongodb://root:secret@127.0.0.1:27017

    uri = "mongodb://"
     + config.db.user + ":"
     + config.db.password + "@"
     + config.db.server + ":"
     + config.db.port //+ "/"
     // + config.db.name; // connecting to the non default DB break auth ...
     // could add options (writeConcerns) + support for full replicaset

    //console.log(uri);
    return new MongoClient(uri);
}

async function checkAvailable() {
    client = getMongoClient();
    try {
        client = await client.connect();
    
        database = client.db(config.db.name);
        cassettes = database.collection(config.db.collection);
        client.close();
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

async function saveJsonToMongo(metadata) {
        
    client = getMongoClient();
    try {
        client = await client.connect();
    
        database = client.db(config.db.name);
        cassettes = database.collection(config.db.collection);
    
        // force unique id and avoid risk of duplicates
        metadata._id = metadata.digest;
        //console.log(metadata);

        res = await cassettes.insertOne(metadata);    
        client.close();
        return res;

    } catch(e) {
        console.log("ERROR");
        console.log(e);
    }
}

module.exports = {

    _getMongoClient: getMongoClient ,

    _saveJsonToMongo: saveJsonToMongo,

    saveMetaData: (metadata)  => {        
        return saveJsonToMongo(metadata);
    },

    checkAvailable:checkAvailable
}