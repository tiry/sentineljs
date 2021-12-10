var checker = require('./../backend/bboxHelper');
var expect = require('chai').expect;
var assert = require('chai').assert;

t_b1= {
    "x1": 0.25,
    "y1": 0.25,
    "x_off": 0.1,
    "y_off": 0.85
  }
t_b2={
    "x1": 0.5,
    "y1": 0.27,
    "x_off": 0.2,
    "y_off": 0.5
  }

t_b3= {
    "x1": 0.38,
    "y1": 0.535,
    "x_off": 0.2,
    "y_off": 0.05
  }

t_b4= {
    "x1": 0.31,
    "y1": 0.28,
    "x_off": 0.1,
    "y_off": 0.1
  }

describe('BoundingBox Checking System', function() {

    it('Should detect Oversized boxes', function() {

        assert(checker._isBoxOutside(t_b1),"this box is bigger than the image");
        assert(!checker._isBoxOutside(t_b2),"this box is smaller than the image");

    });


    it('Should detect Box Overlap', function() {

        assert(checker._areBoxesOverlapping(t_b3, t_b2),"B2 and B3 have an overlap");
        assert(!checker._areBoxesOverlapping(t_b3, t_b4),"B3 and B4 should not overlap");
        
    });

});