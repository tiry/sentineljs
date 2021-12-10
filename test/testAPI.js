supertest = require('supertest');
var expect = require('chai').expect;
var assert = require('chai').assert;
var app = require('../app');

//var request = supertest('localhost:3000');

var request = supertest(app);

// need to generate a different file each time
// because since we use digest as key
// we will get a MongoDB error if we use the same file

function mkRandomFile() {
    dummyContent=new Date().toString();
    return Buffer.from(dummyContent.repeat(100));
}

describe('test sentinel API', function () {
    it('uploadFile ', function (done) {
        request.post('/runcv')
            .set( "User-Agent", "unit-test")
            .field('Content-Type', 'multipart/form-data')
            //.attach('cassette', './test/cassette.jpg')
            .attach('cassette', mkRandomFile(), 'random_cassette.jpg')
            .end(function (err, res) {
            if (err) {
                console.log(err);
            } else {
                expect(res.status).to.equal(200);
                key = res.body.key;
                assert(key.startsWith('cassettes/'))
            }
            done();
        });
    });
});
