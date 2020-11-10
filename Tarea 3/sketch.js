let imageData;
let image;
let gotFile = false;
//let btnSubmit;


var m = function (p) { //p es el handler para p5
  let input;
  let btn;
  let selectbox;


  p.setup = function () {
    p.createCanvas(400, 400);
    input = p.createFileInput(getFile);
    input.parent('inputFile');

    p.background(0);
    btn = p.createButton('Update');
    btn.parent('inputFile');
    btn.mousePressed(redo);
    btn.id('btnSubmit');

    selectbox = p.createSelect();
    selectbox.id('selectInput');
    selectbox.parent('inputFile');
    selectbox.option('3 x 3');
    selectbox.option('5 x 5');
    selectbox.option('7 x 7');
    selectbox.selected('3 x 3');
    selectbox.changed(p.redraw);

    p.pixelDensity(1);
    p.background(0);
  };

  function redo() {
    p.redraw();
  }

  p.draw = function () {

    let item = selectbox.value();
    if (gotFile) {
      if (item === '3 x 3') {
        p.loadPixels();
        image.loadPixels();

        let kernel = [
          [1.0 / 16.0, 1.0 / 8.0, 1.0 / 16.0],
          [1.0 / 8.0, 1.0 / 4.0, 1.0 / 8.0],
          [1.0 / 16.0, 1.0 / 8.0, 1.0 / 16.0]
        ];
        for (let x = 0; x < p.width - 1; x++) {
          for (let y = 0; y < p.height - 1; y++) {
            let c = convolution(x, y, kernel, 3, image);
            let loc = (x + y * image.width) * 4;
            p.pixels[loc] = p.red(c);
            p.pixels[loc + 1] = p.green(c);
            p.pixels[loc + 2] = p.blue(c);
            p.pixels[loc + 3] = p.alpha(c);
          }
        }

        p.updatePixels();
        p.noLoop();

      } else if (item === '5 x 5') {
        p.loadPixels();
        image.loadPixels();

        let kernel = [
          [1.0 / 64.0, 1.0 / 32.0, 1.0 / 16.0, 1.0 / 32.0, 1.0 / 64.0],
          [1.0 / 32.0, 1.0 / 16.0, 1.0 / 8.0, 1.0 / 16.0, 1.0 / 32.0],
          [1.0 / 16.0, 1.0 / 8.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 16.0],
          [1.0 / 32.0, 1.0 / 16.0, 1.0 / 8.0, 1.0 / 16.0, 1.0 / 32.0],
          [1.0 / 64.0, 1.0 / 32.0, 1.0 / 16.0, 1.0 / 32.0, 1.0 / 64.0],
        ];
        for (let x = 0; x < p.width - 1; x++) {
          for (let y = 0; y < p.height - 1; y++) {
            let c = convolution(x, y, kernel, 5, image);
            let loc = (x + y * image.width) * 4;
            p.pixels[loc] = p.red(c);
            p.pixels[loc + 1] = p.green(c);
            p.pixels[loc + 2] = p.blue(c);
            p.pixels[loc + 3] = p.alpha(c);
          }
        }

        p.updatePixels();
        p.noLoop();

      } else if (item === '7 x 7') {
        p.loadPixels();
        image.loadPixels();

        let kernel = [
          [1.0 / 256.0, 1.0 / 128.0, 1.0 / 64.0, 1.0 / 32.0, 1.0 / 64.0, 1.0 / 128.0, 1.0 / 256.0],
          [1.0 / 128.0, 1.0 / 64.0, 1.0 / 32.0, 1.0 / 16.0, 1.0 / 32.0, 1.0 / 64.0, 1.0 / 128.0],
          [1.0 / 64.0, 1.0 / 32.0, 1.0 / 16.0, 1.0 / 8.0, 1.0 / 16.0, 1.0 / 32.0, 1.0 / 64.0],
          [1.0 / 32.0, 1.0 / 16.0, 1.0 / 8.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 16.0, 1.0 / 32.0],
          [1.0 / 64.0, 1.0 / 32.0, 1.0 / 16.0, 1.0 / 8.0, 1.0 / 16.0, 1.0 / 32.0, 1.0 / 64.0],
          [1.0 / 128.0, 1.0 / 64.0, 1.0 / 32.0, 1.0 / 16.0, 1.0 / 32.0, 1.0 / 64.0, 1.0 / 128.0],
          [1.0 / 256.0, 1.0 / 128.0, 1.0 / 64.0, 1.0 / 32.0, 1.0 / 64.0, 1.0 / 128.0, 1.0 / 256.0],
        ];
        for (let x = 0; x < p.width - 1; x++) {
          for (let y = 0; y < p.height - 1; y++) {
            let c = convolution(x, y, kernel, 7, image);
            let loc = (x + y * image.width) * 4;
            p.pixels[loc] = p.red(c);
            p.pixels[loc + 1] = p.green(c);
            p.pixels[loc + 2] = p.blue(c);
            p.pixels[loc + 3] = p.alpha(c);
          }
        }

        p.updatePixels();
        p.noLoop();
      }
    } else {

    }
  };

  function convolution(x, y, matrix, matrixsize, img) {
    let rtotal = 0.0;
    let gtotal = 0.0;
    let btotal = 0.0;
    const offset = Math.floor(matrixsize / 2);
    for (let i = 0; i < matrixsize; i++) {
      for (let j = 0; j < matrixsize; j++) {
        const xloc = (x + i - offset);
        const yloc = (y + j - offset);
        let loc = (xloc + img.width * yloc) * 4;

        loc = p.constrain(loc, 0, img.pixels.length - 1);

        rtotal += (img.pixels[loc]) * matrix[i][j];
        gtotal += (img.pixels[loc + 1]) * matrix[i][j];
        btotal += (img.pixels[loc + 2]) * matrix[i][j];
      }
    }

    rtotal = p.constrain(rtotal, 0, 255);
    gtotal = p.constrain(gtotal, 0, 255);
    btotal = p.constrain(btotal, 0, 255);

    return p.color(rtotal, gtotal, btotal);
  }

  function getFile(file) {
    if (file.type === 'image') {
      imageData = file;
      image = p.loadImage(imageData.data, function () {
        p.resizeCanvas(image.width, image.height);
        p.image(image, 0, 0, image.width, image.height);
        //p.filter(p.BLUR, 3);
      });
      gotFile = true;
    }
  }
};

var sketchFiltro = new p5(m, 'filtro');
//********************************************************************************************

var o = function (p) { //p es el handler para p5
  let btn;

  p.setup = function () {
    p.createCanvas(400, 400);
    p.background(0);
    btn = p.select('#btnSubmit');
    btn.mousePressed(handleSubmit);
  };

  p.draw = function () {
    if (gotFile) {
      p.resizeCanvas(image.width, image.height);
      p.image(image, 0, 0, image.width, image.height);
      p.noLoop();
    } else {

    }
  };

  function handleSubmit() {
    p.redraw();
  }

};
var sketchOG = new p5(o, 'fotoOg');