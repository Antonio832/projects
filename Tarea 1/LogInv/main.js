let dropZ;
let prevImg;
var img;
let hasfile = false;
let resized = false;
var C;
var mappedC;

function setup() {
    let c = createCanvas(1200, 1000);
    c.parent("output");
    background(0);
    C = createSlider(0,100);
    C.parent("options");
    
    dropZ = select('#dropzone');
    dropZ.dragOver(highlight);
    dropZ.dragLeave(unhighlight);
    dropZ.drop(gotFile, unhighlight);
}

function draw() {
    mappedC = map(C.value(),0,100,0,1);
    if (hasfile) {
        loadPixels();
        img.loadPixels();

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                var index = (x + y * img.width) * 4;
                var pixIndex = (y * width + x) * 4;
                pixels[pixIndex] = exp(img.pixels[index + 0] * mappedC - 1); //red
                pixels[pixIndex + 1] = exp(img.pixels[index + 1] * mappedC - 1); //green
                pixels[pixIndex + 2] = exp(img.pixels[index + 2] * mappedC - 1); //blue
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