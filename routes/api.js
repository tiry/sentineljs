var express = require('express');

var api = express.Router();

api.post('/uploadFile', function(req, res, next) {

    res.send("give me the cassette");
 
});

module.exports = api;
