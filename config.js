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

module.exports=config;
