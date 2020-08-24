let dropZ;
let prevImg;
var img;
let hasfile = false;
let resized = false;
var C;

function setup() {
    let c = createCanvas(1200, 1000);
    c.parent("output");
    background(0);
    C = createSlider(0,100, 50);
    C.parent("options");

    dropZ = select('#dropzone');
    dropZ.dragOver(highlight);
    dropZ.dragLeave(unhighlight);
    dropZ.drop(gotFile, unhighlight);
}

function draw() {
    if (hasfile) {
        loadPixels();
        img.loadPixels();

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                var index = (x + y * img.width) * 4;
                var pixIndex = (y * width + x) * 4;
                pixels[pixIndex] = C.value() * log(1 + img.pixels[index + 0]); //red
                pixels[pixIndex + 1] = C.value() * log(1 + img.pixels[index + 1]); //green
                pixels[pixIndex + 2] = C.value() * log(1 + img.pixels[index + 2]); //blue
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