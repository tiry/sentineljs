// Helper to check Bounding boxes errors



function isBoxOutside(box) {
    return (box.x1+box.x_off>1) || (box.y1+box.y_off>1);
}

// basic overlap check : thanks you stackoverflow :)
function areBoxesOverlapping (b1, b2) {
    return (Math.abs((b1.x1 + b1.x_off/2) - (b2.x1 + b2.x_off/2)) * 2 < (b1.x_off + b2.x_off)) &&
    (Math.abs((b1.y1 + b1.y_off/2) - (b2.y1 + b2.y_off/2)) * 2 < (b1.y_off + b2.y_off));
}

// export "internals" to make testing easier
// there is probably a cleaner way to do this ...

module.exports = {

_isBoxOutside: isBoxOutside,

_areBoxesOverlapping: areBoxesOverlapping,

checkBoundingBoxes: (boxes) => {
    errors=[];
    for (i=0; i < boxes.length; i++) {

        b1=boxes[i];
        if (isBoxOutside(b1)) {
            errors.push({ "type": "outsideImageArea", "boxIndex": i });
        }
        for (j=i+1; j < boxes.length; j++) {
            b2 = boxes[j];
            if (areBoxesOverlapping(b1,b2)) {
                errors.push({ "type": "overlap", "boxIndexes": [i,j] });
            }
        }
    }
    return errors;
}
}