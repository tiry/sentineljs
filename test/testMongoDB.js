var mongoStore = require('./../backend/MongoStore');
var expect = require('chai').expect;
var assert = require('chai').assert;
const config = require('./../config');

describe('Test MongoDB store ', function() {

    it('Should Store in MongoDB', function(done) {

        // generate some random content
        dummyContent=new Date().toString();
        dummyDigest=Math.floor( Math.random() * 1000000);

        metadata = {
            digest : dummyDigest,
            content : dummyContent
        };
        
        //console.log(mongoStore._saveJsonToMongo);
        //console.log(mongoStore.saveMetaData);
        //console.log(mongoStore._getMongoClient);

        mongoStore._saveJsonToMongo(metadata).then(result => {
            //console.log(result);
            assert.equal(result.insertedId, dummyDigest);
            done();    
        }).catch(err => {
            done(new Error(err));
        })

    });

});