let dropZ;
let prevImg;
var img;
let hasfile = false;
let resized = false;
var C;
var ga;
var mappedC;
var mappedga;

function setup() {
    let c = createCanvas(1200, 1000);
    c.parent("output");
    background(0);

    let p1 = createP("C:");
    p1.parent("options");

    C = createSlider(0,100);
    C.parent("options");

    let p2 = createP("y:");
    p2.parent("options");

    ga = createSlider(0,200);
    ga.parent("options");

    dropZ = select('#dropzone');
    dropZ.dragOver(highlight);
    dropZ.dragLeave(unhighlight);
    dropZ.drop(gotFile, unhighlight);
}

function draw() {
    mappedC = map(C.value(),0,100,0,1);
    mappedga = map(ga.value(),0,200,0,2);
    if (hasfile) {
        loadPixels();
        img.loadPixels();

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                var index = (x + y * img.width) * 4;
                var pixIndex = (y * width + x) * 4;
                pixels[pixIndex] = mappedC * pow(img.pixels[index + 0],mappedga); //red
                pixels[pixIndex + 1] = mappedC * pow(img.pixels[index + 1],mappedga); //green
                pixels[pixIndex + 2] = mappedC * pow(img.pixels[index + 2],mappedga); //blue
                pixels[pixIndex + 3] = 255; //Alpha or transparency
            }
        }
        updatePixels();
    }
}

function gotFile(file) {
    //prevImg = createImg(file.data);
    img = loadImage(file.data, function () {
        resizeCanvas(img.width, img.height);
    });
    image(img, 0, 0, img.width, img.height);
    hasfile = true;
}

function highlight() {
    dropZ.style('background-color', 'grey');
}

function unhighlight() {
    dropZ.style('background-color', 'white')
}