var express = require('express');

var healthcheck = express.Router();

healthcheck.get('/liveness', function(req, res, next) {

    res.send("I am alive");
 
});


healthcheck.get('/readyness', function(req, res, next) {

    res.send("I am ready");
 
});

module.exports = healthcheck;
