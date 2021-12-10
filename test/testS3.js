var s3Store = require('./../backend/S3Store');
var expect = require('chai').expect;
var assert = require('chai').assert;
const config = require('./../config');

describe('Test S3 store ', function() {

    before(function(done) {
        console.log("running check");
        s3Client=s3Store._getS3Client();
        params = {
            Bucket: config.blobStore.bucket
        };
        
        // check if bucket exists before running the test
        s3Client.headBucket(params, function(err, data) {
            if (err) {
                console.log("Bucket does not exist, trying to create it");
                console.log(err.statusCode);
                params = {
                    Bucket: config.blobStore.bucket
                };
                // create if needed
                s3Client.createBucket(params, function(err, data) {
                    if (err) {
                        console.log("Unable to create Bucket");
                        console.log(err);
                        done(new Error(err));
                    } else {
                        console.log("Bucket created");
                        done();
                    } 
                })
                // XXX would need to wait before continuing
                // should probably move from callback to promise ...
            } 
            else {
                done();
            }
        });         
    });
      
    it('Should Store in S3', function() {

        let dummyFileContent=new Date().toString();
        let dummyDigest="digest-" + Math.floor( Math.random() * 1000000);

        path = s3Store._saveBlobToS3(dummyFileContent, dummyDigest);

        assert.equal(path, config.blobStore.bucket+"/"+dummyDigest);
        
        // check that file is there and content is ok

        s3Client=s3Store._getS3Client();
        params = {
            Bucket: config.blobStore.bucket,
            Key: dummyDigest
        };

        s3Client.getObject(params,function(err, data) {
            if (err) {
                console.log("can not download from s3");
                console.log(err);
                //done(new Error(err));
                throw err;
            }
            assert.equal(data.Body.toString(), dummyFileContent);
        });


    });

    // XXX Cleanup 


});