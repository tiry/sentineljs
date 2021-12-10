const fakeData = [
    {
      "x1": 0.25,
      "y1": 0.25,
      "x_off": 0.1,
      "y_off": 0.1
    },
    {
      "x1": 0.5,
      "y1": 0.27,
      "x_off": 0.2,
      "y_off": 0.15
    },
    {
      "x1": 0.38,
      "y1": 0.535,
      "x_off": 0.2,
      "y_off": 0.05
    },
    {
      "x1": 0.31,
      "y1": 0.28,
      "x_off": 0.1,
      "y_off": 0.1
    },
    {
      "x1": 0.5,
      "y1": 0.27,
      "x_off": 0.64,
      "y_off": 0.15
    },
    {
      "x1": 0.30,
      "y1": 0.47,
      "x_off": 0.334,
      "y_off": 0.34
    }
  ]

var helper = require('./bboxHelper');

// generate random bounding boxes based on the provided data sample
function _getRandomBoundingBoxesFromFakeData() {
    nbBBoxes=1 + Math.floor( Math.random() * 3);

    idx=[];
    bboxes=[]
    while (idx.length < nbBBoxes) {
        i=Math.floor(Math.random() * fakeData.length);
        if (!idx.includes(i)) {
            idx.push(i);
            bboxes.push(fakeData[i])
        }   
    }
    return bboxes;
}

// XXX should probably be async in real life
function _getBoundingBoxes(imageFile) {
        
    bboxes=_getRandomBoundingBoxesFromFakeData();
    
    errors = helper.checkBoundingBoxes(bboxes);
    return {
        "boxes" : bboxes,
        "errors" : errors
    }
}

module.exports = {

    getBoundingBoxes: _getBoundingBoxes

}