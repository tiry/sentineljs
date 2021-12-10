var express = require('express');
var store = require('../backend/storageService');
var opencv = require('../backend/opencvService');

var api = express.Router();


function saveCassette(cassette, req, res) {

    try {
      // use blob digest as key to easily do de-dup
      // md5 is good enough for that purpose
      blobStorePath = store.saveBlob(cassette, cassette.md5);

      // extend the meta-data 
      metadata = {
        originalName : cassette.name,
        digest : cassette.md5,
        size: cassette.size,
        mimetype: cassette.mimetype,
        storagePath: blobStorePath,
        // add some context info
        uploadTime: Date.now(),
        userAgent: req.get('User-Agent'),
        IP: req.socket.remoteAddress
      }
      // save in the "metadata store"
      key = store.saveMetaData(metadata);
      
      return key;

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
    
  }

api.post('/uploadFile', function(req, res, next) {

    let cassette;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Give me the cassette!!!');
    }
  
    cassette = req.files.cassette;
 
    // persist the data
    saveCassette(cassette, req, res);

    // call service
    bboxes = opencv.getBoundingBoxes();

    // may be save Bboxes for futur references ?

    res.send(bboxes);
     
});

module.exports = api;
