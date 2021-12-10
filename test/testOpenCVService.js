var opencv = require('./../backend/opencvService');
var expect = require('chai').expect;
var assert = require('chai').assert;


describe('Verify mock OpenCV service runs', function() {

    it('Simulate call to service', function() {
        opencv.getBoundingBoxes(null).then(function (bboxes) {
            assert.isAbove(bboxes.boxes.length, 0, "Result should contain at least one box");
            assert.isNotNull(bboxes.errors, "error field should be defined");
    
        });
    });

});