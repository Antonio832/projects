const _width = 500;
const _height = 500;

//Sketch de Linea************************************************************************************
var l = function (p) {
  let x1in, y1in, x2in, y2in;
  let x1, y1, x2, y2;

  p.setup = function () {
    p.createCanvas(_width, _height);
    x1in = p.select('#x1input');
    y1in = p.select('#y1input');
    x2in = p.select('#x2input');
    y2in = p.select('#y2input');

  };

  p.draw = function () {
    p.background(0);

    //Pinta los ejes
    p.push();
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, _height / 2, _width, _height / 2);
    p.line(_width / 2, 0, _width / 2, _height);
    p.pop();

    x1 = parseInt(x1in.value());
    y1 = parseInt(y1in.value());
    x2 = parseInt(x2in.value());
    y2 = parseInt(y2in.value());

    if (check(x1, y1, x2, y2)) {

    } else {
      _line(x1, y1, x2, y2);
    }

  };

  function check(x1, y1, x2, y2) {
    if (typeof (x1) == "string" || typeof (y1) == "string" || typeof (x2) == "string" || typeof (y2) == "string") {
      return true;
    } else {
      return false;
    }
  }

  function _line(X1, Y1, X2, Y2) {
    if (isNaN(X1) || isNaN(Y1) || isNaN(X2) || isNaN(Y2)) {

    } else {
      p.translate(_width / 2, _height / 2);
      p.scale(1, -1);

      let aux;

      let dY, dX, k, X, Y, av, avR, avI, IncYi, IncXi, IncXr, IncYr;

      if (X1 == X2) {
        if (Y1 < Y2) {
          while (Y1 <= Y2) {
            p.push();
            p.stroke(0, 255, 0);
            p.point(X1, Y1);
            p.pop();
            Y1++;
          }
        } else {
          while (Y2 <= Y1) {
            p.push();
            p.stroke(0, 255, 0);
            p.point(X1, Y2);
            p.pop();
            Y2++;
          }
        }
        return;
      }

      if (X2 < X1) {
        aux = X1;
        X1 = X2;
        X2 = aux;
      }

      dY = (Y2 - Y1);
      dX = (X2 - X1);
      // 1 - Incrementos para las secciones con avance inclinado
      if (dY >= 0) {
        IncYi = 1;
      } else {
        IncYi = -1;
      }

      if (dX >= 0) {
        IncXi = 1;
      } else {
        IncXi = -1;
      }
      // 2 - Incrementos para las secciones con avance recto:
      if (dX >= dY) {
        IncYr = 0;
        IncXr = IncXi;
      } else {
        IncXr = 0;
        IncYr = IncYi;
        // Cuando dy es mayor que dx, se intercambian, para reutilizar el mismo bucle.
        // ver octantes blancos en la imagen encima del cÃ³digo
        k = dX;
        dX = dY;
        dY = k;
      }

      // 3  - Inicializar valores (y de error).
      X = X1;
      Y = Y1;
      avR = (2 * dY);
      av = (avR - dX);
      avI = (av - dX);

      // 4  - Bucle para el trazado de las lÃnea
      while (X <= X2) {
        p.stroke(0, 255, 0);
        p.point(X, Y);
        if (av >= 0) {
          X = (X + IncXi); // X aumenta en inclinado.
          Y = (Y + IncYi); // Y aumenta en inclinado.
          av = (av + avI); // Avance Inclinado
        } else {
          X = (X + IncXr); // X aumenta en recto.
          Y = (Y + IncYr); // Y aumenta en recto.
          av = (av + avR); // Avance Recto
        }
      }
    }
  }
};
var sketchLinea = new p5(l, 'linea');
//Fin de Linea***************************************************************************************

//Sketch del circulo*********************************************************************************
var c = function (p) { //p es el handler para p5
  let input;
  let Rvalue;

  p.setup = function () {
    p.createCanvas(_width, _height);

    input = p.select('#inputCirc');

    Rvalue = 50;
  };

  p.draw = function () {
    p.background(0);

    p.push();
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, _height / 2, _width, _height / 2);
    p.line(_width / 2, 0, _width / 2, _height);
    p.pop();

    Rvalue = input.value();

    _circulo(Rvalue);
  };

  function _circulo(r) {
    let x, y, d, dE, dSE;
    p.translate(_width / 2, _height / 2); //Para cambiar punto de referencia hacia el centro del canvas
    x = 0;
    y = r;
    d = 1 - r;
    dE = 3;
    dSE = -2 * r + 5;

    P8(x, y); //Pinta 8

    while (y > x) {
      if (d < 0) {
        d += dE;
        dE += 2;
        dSE += 2;
        ++x;
      } else {
        d += dSE;
        dE += 2;
        dSE += 4;
        ++x;
        --y;
      }
      P8(x, y); //Pinta 8
    }
  }

  function P8(x, y) {
    p.stroke(0, 255, 0);
    p.point(x, y);
    p.point(y, x);
    p.point(y, -x);
    p.point(x, -y);
    p.point(-x, -y);
    p.point(-y, -x);
    p.point(-y, x);
    p.point(-x, y);
  }
};
var sketchCirculo = new p5(c, 'circulo');
//Fin de Circulo************************************************************************************


//Sketch de la Ellipse******************************************************************************
var e = function (p) { //p es el handler para p5
  let ain, bin;
  let a, b;

  p.setup = function () {
    p.createCanvas(_width, _height);

    ain = p.select('#aInElipse');
    bin = p.select('#bInElipse');
  };

  p.draw = function () {
    p.background(0);
    p.push();
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, _height / 2, _width, _height / 2);
    p.line(_width / 2, 0, _width / 2, _height);
    p.pop();

    a = parseInt(ain.value());
    b = parseInt(bin.value());

    p.translate(_width / 2, _height / 2);

    _elipse(a, b);


  };

  function _elipse(a, b) {
    let x, y, d1, d2;
    x = 0;
    y = b;
    d1 = p.pow(b, 2) - (p.pow(a, 2) * b) + (p.pow(a, 2) / 4);

    P4(x, y);

    while ((p.pow(a, 2) * (y - (0.5))) > (p.pow(b, 2) * (x + 1))) {
      if (d1 < 0) {
        d1 += (p.pow(b, 2) * (2 * x + 3));
        x++;
        P4(x, y);
      } else {
        d1 += (p.pow(b, 2) * (2 * x + 3)) + (p.pow(a, 2) * (-2 * y + 2))
        x++;
        y--;
        P4(x, y);

      }
    }

    d2 = (p.pow(b, 2) * p.pow(x + 0.5, 2)) + (p.pow(a, 2) * p.pow(y - 1, 2) - (p.pow(a, 2) * p.pow(b, 2)));

    while (y > 0) {
      if (d2 < 0) {
        d2 += (p.pow(b, 2) * (2 * x + 2)) + (p.pow(a, 2) * (-2 * y + 3));
        x++;
        y--;
      } else {
        d2 += (p.pow(a, 2) * (-2 * y + 3));
        y--;
      }
      P4(x, y);
    }
  }

  function P4(x, y) {
    p.stroke(0, 255, 0);
    p.point(x, y);
    p.point(x, -y);
    p.point(-x, -y);
    p.point(-x, y);
  }
};
var sketchCirculo = new p5(e, 'ellipse');
//Fin de Elipse**************************************************************************************


//Sketch de la Parabola******************************************************************************
var pa = function (p) { //p es el handler para p5
  let pin;
  let pa;

  p.setup = function () {
    p.createCanvas(_width, _height);
    pin = p.createSlider(1, 100, 5);
    pin.parent("pIn");
    pin.style('width', '100px');
  };

  p.draw = function () {
    p.background(0);

    p.push();
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, _height / 2, _width, _height / 2);
    p.line(_width / 2, 0, _width / 2, _height);
    p.pop();

    pa = pin.value();
    p.translate(_width / 2, _height / 2);
    p.scale(1, -1);
    console.log("simon");
    _parabola(pa);
  };

  function _parabola(param) {
    let x = 0;
    let y = 0;
    let d1, d2;
    d1 = p.pow(x + 1.0, 2) - 4 * (param * y + 0.5);

    //REGION I
    while (y < param && x <= 400) {
      x++;
      if (d1 <= 0) {
        //E
        d1 += 2 * x - 3;
      } else {
        //NE
        d1 += 2 * x + 3 - 4 * param;
        y++;
      }
      P2(x, y);
    }

    //REGION II
    d2 = p.pow(x + 0.5, 2) - 4 * (param * (y + 1.0));
    while (x <= 400) {
      y++;
      if (d2 <= 0) {
        //NE
        d2 += 2 * x - 4 * param + 2;
        x++;
      } else {
        //N
        d2 += -4 * param;
      }

      P2(x, y);
    }
  }

  function P2(x, y) {

    p.stroke(0, 255, 0);
    p.point(x, y);
    p.point(-x, y)
  }
};
var sketchCirculo = new p5(pa, 'parabola');

//Sketch de la Hiperbola*****************************************************************************
var h = function (p) { //p es el handler para p5
  let ain, bin;
  let a, b;

  p.setup = function () {
    p.createCanvas(_width, _height);

    ain = p.select('#aInHip');
    bin = p.select('#bInHip');
  };

  p.draw = function () {
    p.background(0);
    p.push();
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, _height / 2, _width, _height / 2);
    p.line(_width / 2, 0, _width / 2, _height);
    p.pop();

    a = parseInt(ain.value());
    b = parseInt(bin.value());

    p.translate(_width / 2, _height / 2);
    _hiperbola(a, b);

  };

  function _hiperbola(a, b) {
    x = a;
    y = 0;

    let aa = a * a;
    let bb = b * b;
    let d1, d2;
    //double d1 = 2*aa - bb - 2*a*bb;

    d1 = (bb * p.pow(x + 0.5, 2)) - (aa * p.pow(y + 1.0, 2)) - (aa * bb);

    //REGION I
    while (x <= 500) {
      y++;
      if (d1 > 0) {
        //N
        d1 += -2 * aa * y - 3 * aa;
      } else {
        //NE
        x++;
        d1 += 2 * bb * x + 2 * bb - 2 * aa * y - 3 * aa;
      }
      P4(x, y);
    }

    //REGION II
    if (b > a) {
      d2 = (bb * p.pow(x + 1.0, 2)) - (aa * p.pow(y + 0.5, 2)) - (aa * bb);
      while (x <= 500) {
        x++;
        if (d2 > 0) {
          //NE
          y++;
          d2 += (2 * bb * x) + (3 * bb) - (3 * aa * y) - (2 * aa);
        } else {
          //E
          d2 += -2 * bb * x - 3 * bb;
        }
        P4(x, y);
      }
    }
  }

  function P4(x, y) {
    p.stroke(0, 255, 0);
    p.point(x, y);
    p.point(x, -y);
    p.point(-x, -y);
    p.point(-x, y);
  }
};
var sketchCirculo = new p5(h, 'hiperbola');
