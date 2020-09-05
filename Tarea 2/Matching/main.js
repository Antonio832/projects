var img;
let avg;
let newHist = [];
let ProbAc = [];
let ProbMa = [];
let histogram = [];
let match;
let matchedHist = [];
let finalHist = [];
let sum = 0;

function preload() {
    img = loadImage("preload.jpg");
}

function setup() {
    let MN = img.width * img.height;
    let c = createCanvas(1920, 1080);
    c.parent("output");
    image(img, 0, 0);


    for (let i = 0; i < 256; i++) {
        histogram[i] = 0;
        newHist[i] = 0;
        finalHist[i] = 0;
    }

    loadPixels();
    background(100);

    translate(50, height - 50);

    text('0', -5, 10);
    text('255', 256, 10);
    text('Original', 256 / 2 - 20, 10);
    line(0, 0, 256, 0);

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            var pixIndex = (y * width + x) * 4;
            avg = (pixels[pixIndex] + pixels[pixIndex + 1] + pixels[pixIndex + 2]) / 3;
            let index = floor(avg);
            histogram[index] = histogram[index] + 1;
            avg = 0;
        }
    }

    match = shuffle(histogram);
    //Match histogram
    push(); //first push
    noStroke();
    translate(400, 0);
    text('0', -5, 10);
    text('255', 256, 10);
    text('Match', 256 / 2 - 20, 10);
    line(0, 0, 256, 0);

    beginShape();
    push(); //second push
    stroke(255);
    vertex(0, 0);
    for (let i = 0; i < 256; i++) {

        vertex(i, -match[i]);
    }
    vertex(256, 0);
    pop(); //second pop
    endShape();

    pop(); //first pop
    //end of random histogram

    beginShape();
    stroke(255);
    //noFill();
    vertex(0, 0);
    for (let i = 0; i < 256; i++) {
        vertex(i, -histogram[i]);
    }
    //console.log(sum);
    endShape();

    //Equalizacion del primer histograma
    newHist[0] = 255 * (histogram[0] / MN);
    ProbAc[0] = histogram[0] / MN;
    for (let i = 1; i < 256; i++) {
        ProbAc[i] = ProbAc[i - 1] + histogram[i] / MN;
        newHist[i] = round(newHist[i - 1] + (255 * (histogram[i] / MN)));
    }

    //Probabilidad acumulada del match
    ProbMa[0] = match[0] / MN;
    for (let i = 1; i < 256; i++) {
        ProbMa[i] = ProbMa[i - 1] + (match[i] / MN);
    }

    //Mapping
    let index;
    for (let i = 0; i < 256; i++) {
        var mini = abs(ProbAc[i] - ProbMa[0]);
        index = 0;
        for (let j = 1; j < 256; j++) {
            if (mini > abs(ProbAc[i] - ProbMa[j])) {
                mini = abs(ProbAc[i] - ProbMa[j]);
                index = j;
            }
        }
        matchedHist[i] = index;
    }

    //Switching
    for (let i = 0; i < 256; i++) {
        finalHist[i] = finalHist[i] + histogram[matchedHist[i]];
    }

    push();
    translate(800, 0);
    noStroke();
    text('0', -5, 10);
    text('255', 256, 10);
    text('Nuevo', 256 / 2 - 20, 10);
    line(0, 0, 256, 0);

    beginShape();
    vertex(0,0);
    for (let i = 0; i < 256; i++) {
        vertex(i, -finalHist[i]);
    }
    vertex(256,0);
    endShape();

    pop();
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