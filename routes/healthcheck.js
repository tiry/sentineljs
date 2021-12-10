var express = require('express');
const s3store = require('./../backend/S3Store');
const mongo = require('./../backend/MongoStore');

var healthcheck = express.Router();

async function basicHealthCheck() {

    s3Ready = await s3store.checkAvailable();
    mongoReady = await mongo.checkAvailable();

    globalStatus = s3Ready && mongoReady;

    return {
        globalStatus: globalStatus,
        s3Ready: s3Ready,
        mongoReady: mongoReady
    }
}

healthcheck.get('/liveness', async function(req, res, next) {

    healthStatus = await basicHealthCheck();
    if (!healthStatus.globalStatus) {
        res.status(500).send(healthStatus);
    }
    res.send(healthStatus);
 
});


healthcheck.get('/readyness', async function(req, res, next) {

    healthStatus = await basicHealthCheck();
    if (!healthStatus.globalStatus) {
        res.status(500).send(healthStatus);
    }
    res.send(healthStatus);
 
});

healthcheck.get('/status', async function(req, res, next) {

    healthStatus = await basicHealthCheck();
    res.send(healthStatus);
 
});
module.exports = healthcheck;
