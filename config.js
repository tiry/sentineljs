config = {}

// for now, use a "python style" configuation file
//
// allow to override config using env variables
// => this will make confihguration from Docker / K8S easier

config.blobStore = {}
//***** BlobStore configuration

// could be s3 or dummy
config.blobStore.type= process.env.BLOBSTORE_TYPE || "dummy";
config.blobStore.type= process.env.BLOBSTORE_TYPE || "s3";

// S3 endpoint config - (only tested with minio) 
config.blobStore.endpoint=process.env.BLOBSTORE_ENDPOINT || "http://127.0.0.1:9000";
config.blobStore.region=process.env.BLOBSTORE_REGION || "us-east-1";
config.blobStore.accessKeyId=process.env.BLOBSTORE_ACCESS_KEY_ID || "minioadmin";
config.blobStore.secretAccessKey=process.env.BLOBSTORE_SECRET_ACCESS_KEY || "minioadmin";
config.blobStore.bucket=process.env.BLOBSTORE_BUCKET || "cassettes";

config.db = {}
//****** Database configuration

config.db.type = process.env.DB_TYPE || "dummy";
config.db.type = process.env.DB_TYPE || "mongodb";

// should define a config.db.uri to point to a cluster!
config.db.server = process.env.DB_SERVER || "127.0.0.1";
config.db.port = process.env.DB_PORT || "27017";
config.db.name = process.env.DB_NAME || "sentinel";
config.db.collection = process.env.DB_COLLECTION || "cassettes";

config.db.user = process.env.DB_USER || "root";
config.db.password = process.env.DB_PWD || "secret";

module.exports=config;
