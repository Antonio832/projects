var capture;
var w;
var h;
let imagen;
let imagenCopy;

function preload() {
    imagen = loadImage("og4.JPG");
}

function setup() {
    createCanvas(imagen.width, imagen.height);
    createImg('og4.JPG', "ajf");
    h = imagen.height;
    w = imagen.width
    background(0);
}

var captureMat, gray, blurred, thresholded;
var contours, hierarchy;

function cvSetup() {
    captureMat = new cv.Mat([h, w], cv.CV_8UC4);
    gray = new cv.Mat([h, w], cv.CV_8UC1);
    blurred = new cv.Mat([h, w], cv.CV_8UC1);
    thresholded = new cv.Mat([h, w], cv.CV_8UC1);
}

var ready = false;

function cvReady() {
    if (!cv || !cv.loaded) return false;
    if (ready) return true;
    cvSetup();
    ready = true;
    return true;
}

function draw() {

    imagenCopy = imagen;
    if (cvReady()) {
        imagenCopy.loadPixels();
        if (imagenCopy.pixels.length > 0) {
            captureMat.data().set(imagenCopy.pixels);

            cv.cvtColor(captureMat, gray, cv.ColorConversionCodes.COLOR_RGBA2GRAY.value, 0);
            cv.blur(gray, blurred, [10, 10], [-1, -1], cv.BORDER_DEFAULT);
            cv.threshold(blurred, thresholded, 50, 255, cv.ThresholdTypes.THRESH_BINARY.value);

            contours = new cv.MatVector();
            hierarchy = new cv.Mat();
            cv.findContours(thresholded, contours, hierarchy, 3, 2, [0, 0]);
        }
    }

    if (contours) {
        noStroke();
        for (var i = 0; i < contours.size(); i++) {
            fill(random(255), random(255), random(255));
            var contour = contours.get(i);
            beginShape();
            var k = 0;
            for (var j = 0; j < contour.total(); j++) {
                var x = contour.get_int_at(k++);
                var y = contour.get_int_at(k++);
                vertex(x, y);
            }
            endShape(CLOSE);
        }
        noLoop();
    }

}