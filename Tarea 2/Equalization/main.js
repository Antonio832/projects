let dropZ;
var img;
let hasfile = false;
let avg;
let Prob = [];
let histogram = [];
let canvHist;
let preImg;

function preload() {
    img = loadImage("preload.jpg");
}

function setup() {
    preImg = createImg("preload.jpg");
    let MN = img.width * img.height;
    let c = createCanvas(img.width, img.height);
    c.parent("output");
    background(100);

    image(img, 0, 0);

    for (let i = 0; i < 256; i++) {
        histogram[i] = 0;
        Prob[i] = 0;
    }

    loadPixels();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var pixIndex = (y * width + x) * 4;
            avg = (pixels[pixIndex] + pixels[pixIndex + 1] + pixels[pixIndex + 2]) / 3;
            let index = floor(avg);
            histogram[index] = histogram[index] + 1;
            avg = 0;
        }
    }

    Prob[0] = 255 * ((histogram[0] / MN));
    for (let i = 1; i < 256; i++) {
        Prob[i] = round(Prob[i - 1] + (255 * ((histogram[i] / MN))));
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var pixIndex = (y * width + x) * 4;
            pixels[pixIndex] = Prob[pixels[pixIndex]]; //red
            pixels[pixIndex + 1] = Prob[pixels[pixIndex + 1]]; //green
            pixels[pixIndex + 2] = Prob[pixels[pixIndex + 2]]; //blue
            pixels[pixIndex + 3] = 255; //Alpha or transparency
        }
    }

    updatePixels();

    dropZ = select('#dropzone');
    dropZ.dragOver(highlight);
    dropZ.dragLeave(unhighlight);
    dropZ.drop(gotFile, unhighlight);
}

function draw() {

}

function gotFile(file) {
    preImg.hide();
    img = loadImage(file.data, redo());
    preImg = createImg(file.data);
    
}

function highlight() {
    dropZ.style('background-color', 'grey');
}

function unhighlight() {
    dropZ.style('background-color', 'white')
}

function redo(){
    resizeCanvas(img.width,img.height);
    image(img, 0, 0);
    let MN = img.width * img.height;

    

    for (let i = 0; i < 256; i++) {
        histogram[i] = 0;
        Prob[i] = 0;
    }
    
    loadPixels();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var pixIndex = (y * width + x) * 4;
            avg = (pixels[pixIndex] + pixels[pixIndex + 1] + pixels[pixIndex + 2]) / 3;
            pixels[pixIndex] = avg; //red
            pixels[pixIndex + 1] = avg; //green
            pixels[pixIndex + 2] = avg; //blue
            pixels[pixIndex + 3] = 255; //Alpha or transparency
            let index = floor(avg);
            histogram[index] = histogram[index] + 1;
            avg = 0;
        }
    }
    Prob[0] = 255 * ((histogram[0] / MN));
    for (let i = 1; i < 256; i++) {
        Prob[i] = round(Prob[i - 1] + (255 * ((histogram[i] / MN))));
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var pixIndex = (y * width + x) * 4;
            pixels[pixIndex] = Prob[pixels[pixIndex]]; //red
            pixels[pixIndex + 1] = Prob[pixels[pixIndex + 1]]; //green
            pixels[pixIndex + 2] = Prob[pixels[pixIndex + 2]]; //blue
            pixels[pixIndex + 3] = 255; //Alpha or transparency
        }
    }

    updatePixels();

}

// for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//         var index = (x + y * img.width) * 4;
//         var pixIndex = (y * width + x) * 4;
//         pixels[pixIndex] = mappedC * pow(img.pixels[index + 0],mappedga); //red
//         pixels[pixIndex + 1] = mappedC * pow(img.pixels[index + 1],mappedga); //green
//         pixels[pixIndex + 2] = mappedC * pow(img.pixels[index + 2],mappedga); //blue
//         pixels[pixIndex + 3] = 255; //Alpha or transparency
//     }
// }