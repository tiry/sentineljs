var express = require('express');

var api = express.Router();

api.post('/uploadFile', function(req, res, next) {

    let cassette;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Give me the cassette!!!');
    }
  
    cassette = req.files.cassette;

    storePath = './store/' + cassette.md5;
    try {
        cassette.mv(storePath);
    } catch (err) {
        return res.status(500).send('Upload Issue ' + err);
    }

    res.send({
        status: true,
        message: 'Cassette uploaded',
        data: {
            name: cassette.name,
            mimetype: cassette.mimetype,
            size: cassette.size
        }
    });
 
});

module.exports = api;
